import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const MIN_LEAGUE_CARDS = 32;

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

// The name of the table of users in DynamoDB
const playerTableName = "ccg-player";

// This is the function that gets executed each time someone calls the AWS-Lambda
export const handler = async (event) => {
  const path = event.requestContext.http.path;
  const method = event.requestContext.http.method;
  const body = event.body ? JSON.parse(event.body) : {};
  const sessionToken = event?.headers?.sessiontoken; // Note that lambda converts the headers names to lowercases

  try {
    if (path === "/login" && method === "POST") {
      return await loginPlayer(body, sessionToken);
    }
    if (path === "/player" && method === "POST") {
      return await createPlayer(body);
    }
    if (path === "/player" && method === "PUT") {
      return await updatePlayer(body, sessionToken);
    }
    if (path === "/league-players" && method === "GET") {
      return await getPlayersFromDynamoDB();
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify("Endpoint not found"),
  };
};

// If the request contains a user password, it checks if the
// password is correct and generates a new session token
// Otherwise, it just checks the token validity
// If everything is ok this endpoint returns the user data
async function loginPlayer({ username, password }, sessionToken) {
  const getResponse = await dynamo.send(
    new GetCommand({
      TableName: playerTableName,
      Key: {
        username: username,
      },
    })
  );

  if (getResponse.$metadata.httpStatusCode !== 200) {
    return {
      statusCode: 500,
      body: JSON.stringify(getResponse),
    };
  }
  if (!getResponse.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify("Player not found"),
    };
  }

  const item = getResponse.Item;

  if (password) {
    if (getResponse.Item.hashedPassword === simpleHash(password)) {
      sessionToken = (Math.random() * 0xffffffffffffffff).toString(16);
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify("Wrong password"),
      };
    }
  } else {
    if (!sessionToken || sessionToken !== item.sessionToken) {
      return {
        statusCode: 401,
        body: JSON.stringify("Invalid session token "),
      };
    }
  }

  // Store into DynamoDB the login Date.
  item.lastLoginDate = JSON.stringify(new Date());
  item.loginTimes++;
  item.sessionToken = sessionToken;
  const putResponse = await dynamo.send(
    new PutCommand({
      TableName: playerTableName,
      Item: item,
    })
  );
  if (putResponse.$metadata.httpStatusCode !== 200) {
    return {
      statusCode: 500,
      body: JSON.stringify(getResponse),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(getResponse.Item.macrogame),
    headers: {
      sessionToken: sessionToken,
    },
  };
}

// Updates the macrogame data of a player
async function updatePlayer({ username, macrogame }, sessionToken) {
  const getResponse = await dynamo.send(
    new GetCommand({
      TableName: playerTableName,
      Key: {
        username: username,
      },
    })
  );
  if (getResponse.$metadata.httpStatusCode !== 200) {
    return {
      statusCode: 500,
      body: JSON.stringify(getResponse),
    };
  }
  if (!getResponse.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify("Player not found"),
    };
  }

  const item = getResponse.Item;

  if (!sessionToken || sessionToken !== item.sessionToken) {
    return {
      statusCode: 401,
      body: JSON.stringify("Invalid session token"),
    };
  }

  item.macrogame = macrogame;
  // These attributes will also be saved as independent columns to make searches easier
  item.manualGamesStarted = macrogame.manualGamesStarted;
  item.manualGamesFinished = macrogame.manualGamesFinished;
  item.manualGamesWon = macrogame.manualGamesWon;
  const putResponse = await dynamo.send(
    new PutCommand({
      TableName: playerTableName,
      Item: item,
    })
  );
  if (putResponse.$metadata.httpStatusCode !== 200) {
    return {
      statusCode: 500,
      body: JSON.stringify(getResponse),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify("Player updated successfully"),
  };
}

// Creates a new player in the database, and generates a new session token
async function createPlayer({ username, password, email }) {
  // Check if the username is already taken
  const getResponse = await dynamo.send(
    new GetCommand({
      TableName: playerTableName,
      Key: {
        username: username,
      },
    })
  );
  if (getResponse.$metadata.httpStatusCode !== 200) {
    return {
      statusCode: 500,
      body: JSON.stringify(getResponse),
    };
  }
  if (getResponse.Item) {
    return {
      statusCode: 409,
      body: JSON.stringify("Username already taken"),
    };
  }

  // Creting username into the data base
  const sessionToken = (Math.random() * 0xffffffffffffffff).toString(16);
  const response = await dynamo.send(
    new PutCommand({
      TableName: playerTableName,
      Item: {
        username: username,
        hashedPassword: simpleHash(password),
        email: email,
        macrogame: "",
        creationDate: JSON.stringify(new Date()),
        lastLoginDate: JSON.stringify(new Date()),
        loginTimes: 1,
        manualGamesStarted: 0,
        manualGamesFinished: 0,
        manualGamesWon: 0,
        sessionToken: sessionToken,
      },
    })
  );
  if (response.$metadata.httpStatusCode !== 200) {
    return {
      statusCode: 500,
      body: JSON.stringify(response),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify("Player created successfully"),
    headers: {
      sessionToken: sessionToken,
    },
  };
}

// This is a very simple hashing function that reduces a string into a 3 digits number.
// It should be replaced by a proper function in the future.
function simpleHash(password) {
  let sum = 0;
  for (let i = 0; i < password.length; i++) {
    sum += password.charCodeAt(i);
  }
  return sum % 1000;
}

async function getPlayersFromDynamoDB() {
  let players = [];
  const params = {
    TableName: playerTableName,
  };
  while (true) {
    const response = await dynamo.send(new ScanCommand(params));
    response.Items.forEach((item) => players.push(item));
    if (typeof response.LastEvaluatedKey !== "undefined") {
      params.ExclusiveStartKey = response.LastEvaluatedKey;
    } else {
      break;
    }
  }
  players = players
    .filter((player) => player.username[0] !== "_")
    .filter((player) => player.macrogame.deck.length >= MIN_LEAGUE_CARDS)
    .map((player) => ({
      username: player.username,
      score: player.leagueScore ? player.leagueScore : 0,
      portrait: player.macrogame.portraitCard
        ? player.macrogame.portraitCard
        : player.macrogame.deck[0],
    }));
  players.sort((playerA, playerB) => playerB.score - playerA.score);
  return players;
}
