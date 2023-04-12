# CUSD NFT MINTER DAPP

#### NFT minter decentralised application

- [Demo App](https://cusd-minter-dapp.vercel.app/)

## About the dapp
Nft Minter is a decentralized minting app that allows users to mint their unique Nfts with built in name and description using the Nft Url generated from [pinata(ipfs)](https://www.pinata.cloud/).
Its Built on the [Celo(alfajores testnet)](https://docs.celo.org/network) network.

## Getting started for Developers

- Clone the repository by running the command:
```bash
git clone https://github.com/pelzfx/Cusd-Minter-Dapp
```
_Please ensure you have Git installed before running the above command and subsequent commands_

- Then install dependencies by running the command 

```bash
- npm install
- npm install web3 @celo/contractkit 
```

- Compile the contracts using the command
````bash
npx hardhat compile
````

- To deploy, run the command:

```bash
npx hardhat run scripts/deploy.js --network alfajores
```
- To launch on localHost run the command:

```bash
npm start
```

> **Note** Please ensure to create a `.env` file in your project directory and add your secret keys before running the deployment command. Check out the `.env-sample` file to see how to structure your `.env` file.


To learn more about Hardhat, check out the [Hardhat documentation](https://hardhat.org/hardhat-runner/docs/getting-started)
To learn more about Celo, check out the [Celo documentation](https://docs.celo.org/)
