import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import { loadAllCardModels } from "duel/cards-collection/load-all-card-models.js";
import { executeDuel } from "duel/executeDuel.js";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

// The name of the table of users in DynamoDB
const playerTableName = "ccg-player";

// This is the function that gets executed each time someone calls the AWS-Lambda
export const handler = async (event) => {
  loadAllCardModels();
  const players = await getPlayersFromDynamoDB();
  return executeAllDuels(players);
  //await updatePlayerScoresOnDynamo(players);
};

async function getPlayersFromDynamoDB() {
  const players = [];
  const params = {
    TableName: playerTableName,
  };
  while (true) {
    const response = await dynamo.send(new ScanCommand(params));
    response.Items.forEach((item) => players.push(item));
    if (typeof response.LastEvaluatedKey !== "undefined") {
      params.ExclusiveStartKey = response.LastEvaluatedKey;
    } else {
      return players;
    }
  }
}

function executeAllDuels(players) {
  // TODO this function should face every player with
  // the 3 players on top of him
  const deck0 = players[0].macrogame.deck;
  const deck1 = players[1].macrogame.deck;
  const duelWinner = executeDuel(deck0, deck1);
  return duelWinner;
}

/*async function updatePlayerScoresOnDynamo(players) {
  for (const player of players) {
    player.leagueScore = 123;setiar un score correcto
    const putResponse = await dynamo.send(
      new PutCommand({
        TableName: playerTableName,
        Item: player,
      })
    );
  }
}*/
