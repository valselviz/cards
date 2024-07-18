import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import { loadAllCardModels } from "duel/cards-collection/load-all-card-models.js";
import { executeDuel } from "duel/executeDuel.js";
import { RND } from "duel/Rnd.js";

const MIN_LEAGUE_CARDS = 33;

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

// The name of the table of users in DynamoDB
const playerTableName = "ccg-player";

// This is the function that gets executed each time someone calls the AWS-Lambda
export const handler = async (event) => {
  loadAllCardModels();
  const players = await getPlayersFromDynamoDB();
  executeAllDuels(players);
  await updatePlayerScoresOnDynamo(players);
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
  players = players
    .filter((player) => player.username[0] !== "_")
    .filter((player) => player.macrogame.deck.length >= MIN_LEAGUE_CARDS);
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

// This method expects that player B is on top of playe A in the score board
// (even if they have the same score)
function executeSingleDuel(playerA, playerB) {
  console.log(`Executing ${playerA.username} vs ${playerB.username}`);
  //console.log(`Random seed: ${RND.seed}`);
  //console.log(playerA.macrogame.deck);
  //console.log(playerB.macrogame.deck);
  const winner = executeDuel(playerA.macrogame.deck, playerB.macrogame.deck);
  if (winner === 0) {
    if (playerA.leagueScore < playerB.leagueScore) {
      playerB.leagueScore--;
    }
    playerA.leagueScore++;
  }
}

async function updatePlayerScoresOnDynamo(players) {
  console.log("Storing results in DynamoDB");
  for (const player of players) {
    await dynamo.send(
      new PutCommand({
        TableName: playerTableName,
        Item: player,
      })
    );
  }
}
