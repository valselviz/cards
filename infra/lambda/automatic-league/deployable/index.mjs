import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import { loadAllCardModels } from "duel/cards-collection/load-all-card-models.js";
import { executeDuel } from "duel/executeDuel.js";
import { RND } from "duel/Rnd.js";

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
  players = players.filter((player) => player.username[0] !== "_");
  for (const player of players) {
    if (!player.leagueScore) {
      player.leagueScore = 0;
    }
  }
  players.sort((playerA, playerB) => playerA.leagueScore - playerB.leagueScore);
  return players;
}

function executeAllDuels(players) {
  for (let i = 0; i < players.length - 3; i++) {
    executeSingleDuel(players[i], players[i + 1]);
    executeSingleDuel(players[i], players[i + 2]);
    executeSingleDuel(players[i], players[i + 3]);
  }
}

function executeSingleDuel(playerA, playerB) {
  console.log(`Executing ${playerA.username} vs ${playerB.username}`);
  console.log(`Random seed: ${RND.seed}`);
  console.log(playerA.macrogame.deck);
  console.log(playerB.macrogame.deck);
  executeDuel(playerA.macrogame.deck, playerB.macrogame.deck);
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
