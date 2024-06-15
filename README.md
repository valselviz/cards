# Collectable Cards Game by Valeria Selviz

This is a project I created with [Create React App](https://github.com/facebook/create-react-app).

It is a game about using your deck of cards to face and defeat an opponent.

You can play it [HERE](https://valselviz.github.io/cards/#/duel)

Features:

- backend on AWS Lambda + DynamoDB, that allows to persist the players games.
- a vast pool of cards where each card has its own unique stats and special effects.
- an opponent AI that allows a single player experience.
- a deck management page, where the player can add/remove cards to/from his deck.
- a card store page, where the player can buy cards.
- a rivals page, where the player can select the rival he wants to face.

Comming soon:

- Automatic League:
Playing CCG duels can be fun, but selecting the appropriate cards to build a strong deck is even funnier.
If you want to know how good your deck is, you can check your score in the Automatic League.
Every day a script is executed that makes players decks duel against each other.
These duels are held by AIs in behalf of the players.
The smartest players that built strong decks full of complementary cards will climb up o the top of the scoreboard.

## Available Scripts

To run the project execute:

### `npm run start`

Open it on [http://localhost:3000](http://localhost:3000)

To run the Jest tests execute:

### `npm test`

To deploy the game into github pages:

### `npm run deploy`