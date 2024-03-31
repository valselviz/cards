import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

// The name of the table of users in DynamoDB
const playerTableName = "ccg-player";

// This is the function that gets executed each time someone calls the AWS-Lambda
export const handler = async (event) => {
  const path = event.requestContext.http.path;
  const method = event.requestContext.http.method;
  const body = event.body ? JSON.parse(event.body) : {};

  try {
    if (path === "/login" && method === "POST") {
      return await loginPlayer(body);
    }
    if (path === "/player" && method === "POST") {
      return await createPlayer(body);
    }
    if (path === "/player" && method === "PUT") {
      return await updatePlayer(body);
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

// Checks if the password is correct and returns the user data
async function loginPlayer({ username, password }) {
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
  if (getResponse.Item.hashedPassword !== simpleHash(password)) {
    return {
      statusCode: 401,
      body: JSON.stringify("Wrong password"),
    };
  }

  // Store into DynamoDB the login Date.
  const item = getResponse.Item;
  item.lastLoginDate = JSON.stringify(new Date());
  item.loginTimes ++;
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
  };
}

// Updates the macrogame data of a player
async function updatePlayer({ username, macrogame }) {
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

// Creates a new player in the database
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
