# CUSD NFT MINTER DAPP-

### NFT minter decentralised application:

- [Demo App](https://cusd-minter-dapp-891d47.spheron.app/)

## About the dapp:

NFT Minter is a decentralized minting app that allows users to mint their unique Nfts with built-in name & description using the NFT URL generated from [pinata(ipfs)](https://www.pinata.cloud/).
Its Built on the [Celo(alfajores testnet)](https://docs.celo.org/network) network.

## Getting started for Developers:

### **STEP 1**- Clone the repository by running the command:

```bash
# Clone the Cusd-Minter-Dapp repository from GitHub
git clone https://github.com/pelzfx/Cusd-Minter-Dapp
```
_Please ensure you have Git installed before running the above command and subsequent commands_

### **STEP 2**- Then, install dependencies by running the command:

```bash
# Install dependencies using npm
npm install

# Install web3 and @celo/contractkit packages using npm
npm install web3 @celo/contractkit
```

### **STEP 3**- Compile the contracts using the command:

````bash
# Compile the smart contracts using Hardhat
npx hardhat compile
````

### **STEP 4**- To deploy, run the command:

```bash
# Deploy the smart contracts using Hardhat on the Alfajores network
npx hardhat run scripts/deploy.js --network alfajores
```

### **STEP 5**- To launch on localHost run the command:

```bash
# Start the application using npm
npm start
```

> **Note** Please ensure to create a `.env` file in your project directory and add your secret keys before running the deployment command. Check out the `.env-sample` file to see how to structure your `.env` file.

## Conclusion:

Therefore, in the end of this tutorial users can interact with the DApp to mint NFTs by paying with CUSD, providing a seamless and decentralized way to create unique digital assets. The CUSD NFT Minter DApp showcases the potential of blockchain technology in enabling decentralized ownership and creation of digital assets using stablecoins like CUSD.


To learn more about Hardhat, check out the [Hardhat documentation](https://hardhat.org/hardhat-runner/docs/getting-started)
To learn more about Celo, check out the [Celo documentation](https://docs.celo.org/)
