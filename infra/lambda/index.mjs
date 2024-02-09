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

  if (path === "/login" && method === "POST") {
    return await loginPlayer(body);
  }
  if (path === "/player" && method === "POST") {
    return await createPlayer(body);
  }
  if (path === "/player" && method === "PUT") {
    return await updatePlayer(body);
  }

  return {
    statusCode: 404,
    body: JSON.stringify("Endpoint not found"),
  };
};

// Checks if the password is correct, and returns the user data
async function loginPlayer({ username, password }) {
  return dynamo.send(
    new GetCommand({
      TableName: playerTableName,
      Key: {
        username: username,
      },
    })
  );

  // TODO check if the user exists, return error 404 if he doesn't exists
  //   also check if the password is right, return error code 401 if the password does not match
}

// Updates the macrogame data of a player
async function updatePlayer({ username, macrogame }) {
  // TODO
  // get the user data from Dynamo with a GetCommand
  // save the user new data into Dynamo with a PutCommand
  //   DONT FORGET TO INCLUDE ALL THE ATTRIBUTES: username, hashedPassword, email, macrogame

  return null;
}

// Creates a new player in the database
async function createPlayer({ username, password, email }) {
  // TODO check the username does not exist already
  //   If it already exists, return an error code 409 and a proper error message

  const response = await dynamo.send(
    new PutCommand({
      TableName: playerTableName,
      Item: {
        username: username,
        hashedPassword: simpleHash(password),
        email: email,
      },
    })
  );
  if (response.$metadata.httpStatusCode === 200) {
    return {
      statusCode: 200,
      body: JSON.stringify("User created successfully"),
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify(response),
    };
  }
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
