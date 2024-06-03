import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import asd from "folder/file.mjs";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

// The name of the table of users in DynamoDB
const playerTableName = "ccg-player";

// This is the function that gets executed each time someone calls the AWS-Lambda
export const handler = async (event) => {
  //const players = await getPlayersFromDynamoDB();
  //await automaticLeague(players);
  return asd();
};

async function getPlayersFromDynamoDB() {
  const players = [];
  const params = {
    TableName: playerTableName,
  };
  while (true) {
    const response = await dynamo.send(new ScanCommand(params));
    //return JSON.stringify(response.Items);
    response.Items.forEach((item) => players.push(item));
    if (typeof response.LastEvaluatedKey !== "undefined") {
      params.ExclusiveStartKey = response.LastEvaluatedKey;
    } else {
      return players;
    }
  }
}

async function automaticLeague(players) {
  // TODO
  // order the players by score
  // make each player face the 3 players that are on top (or below)
  // update the scores for the losers and winners
  for (const player of players) {
    player.leagueScore = 123;
    const putResponse = await dynamo.send(
      new PutCommand({
        TableName: playerTableName,
        Item: player,
      })
    );
  }
}
