import React, { useState, useEffect } from "react";
import ADDRESS from "./contracts/Token-address.json";
import ABI from "./contracts/Token.json";
import { ethers } from "ethers";
import "./App.css";
import axios from "axios";
import BigNumber from "bignumber.js";

const ALFAJORES_DECIMALS = 18;
const ALFAJORES_CHAIN_ID = 44787;
// const ALFAJORES_CHAIN_ID = 31337

function App() {
  const [walletAddress, setWalletAddress] = useState(null); // State to store the wallet address
  const [walletBalance, setWalletBalance] = useState(0); // State to store the wallet balance
  const [tokenUri, setTokenUri] = useState(null); // State to store the token URI
  const [nfts, setNfts] = useState([]); // State to store the NFTs
  const [chainId, setChainId] = useState(null); // State to store the current chain ID
  const [notifMessage, setNotifMessage] = useState(); // State to store notification messages

  // Check if Metamask is already connected and set as account
  const checkWalletStatus = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Metamask not installed");
      return;
    } else {
      const accounts = await ethereum.request({ method: "eth_accounts" }); // Check if there are any connected accounts
      if (accounts.length !== 0) setWalletAddress(accounts[0]); // If there is a connected account, set it as the wallet address

      const chainId = await ethereum.request({ method: "eth_chainId" }); // Get the current chain ID
      setChainId(chainId);

      ethereum.on("chainChanged", handleChainChange); // Listen for changes in chain ID

      function handleChainChange(_chainId) {
        window.location.reload(); // Reload the page when chain ID changes
      }
    }
  };

  // Connect Metamask to dapp
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install Metamask wallet");
        return;
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts", // Request user to connect their Metamask account
        });
        setWalletAddress(accounts[0]); // Set the connected account as the wallet address
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchNfts = async () => {
    if (parseInt(chainId) !== ALFAJORES_CHAIN_ID) { // Check if the current chain ID is not equal to the expected chain ID
      setNotifMessage(
        "Please switch your Metamask network to ALFAJORES. Visit https://chainlist.org for help"
      ); // Display a notification message to switch to the expected network
      return;
    }
    setNotifMessage("Loading dapp...");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum); // Create a provider with the connected Ethereum provider
        const signer = provider.getSigner(); // Get the signer from the provider
        const bal = Number(await signer.getBalance()).toString(); // Get the balance of the connected wallet address
        const tokenContract = new ethers.Contract(
          ADDRESS.Token,
          ABI.abi,
          signer
        );


        const tokenLength = Number(await tokenContract.tokenCounter());
        const _tokens = [];
        for (let counter = 0; counter < tokenLength; counter++) {
          const tokenUri = await tokenContract.tokenURI(counter);
          const tokenMeta = await axios.get(tokenUri);
          _tokens.push(tokenMeta.data);
        }

        setWalletBalance(bal)
        setNfts(_tokens);
      } else {
        console.log("Metamask not installed");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setNotifMessage(null);
    }
  };

  // Mint new NFT
  const mintNft = async () => {
    if (!tokenUri) {
      setNotifMessage("Please enter a valid token URI");
      return;
    }

    if (!walletAddress) {
      setNotifMessage("Please connect Metamask to continue");
      return;
    }
    
    if (parseInt(chainId) !== ALFAJORES_CHAIN_ID) {
      setNotifMessage("Please switch your Metamask network to ALFAJORES. Visit https://chainlist.org for help")
      return;
    }

    setNotifMessage("Minting NFT 🔥🔥🔥");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(
          ADDRESS.Token,
          ABI.abi,
          signer
        );
        const txn = await tokenContract.safeMint(tokenUri);
        await txn.wait(1)

        setNotifMessage("Successfully minted NFT 🚀🚀🚀")

        // Update page with newly minted NFT
        await fetchNfts();
        console.log("len: ", nfts.length)
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (walletAddress && chainId) {
      fetchNfts();
    }
  }, [walletAddress, chainId]);

  useEffect(() => {
    checkWalletStatus();
  }, []);

  return (
    <div className="app">
      {notifMessage && (
        <div className="notice">
          <span className="msg">{notifMessage}</span>{" "}
          <span onClick={() => setNotifMessage(null)} className="close">
            &times;
          </span>
        </div>
      )}
      <div className="nav">
        {walletAddress ? (
          <>
            <div className="nav_bal">{new BigNumber(walletBalance).shiftedBy(-ALFAJORES_DECIMALS).toFixed(2)} Cusd</div>
            <div className="nav_address">{walletAddress}</div>
          </>
        ) : (
          <div className="nav_connect" onClick={() => connectWallet()}>
            Connect
          </div>
        )}
      </div>
      <div className="mint-form">
        <input
          onChange={(e) => setTokenUri(e.target.value)}
          placeholder="Enter NFT URI here"
        />
        <button onClick={() => mintNft()}>Mint</button>
      </div>
      <div className="nft-list">
        {nfts.length > 0 ? (
          nfts.map((nft) => (
            <div className="nft-card">
              <img src={nft.image} />
              <div className="nft-card_details">
                <div className="nft-name">{nft.name}</div>
                <div className="nft-desc">{nft.description}</div>
              </div>
            </div>
          ))
        ) : (
          <div>You have not minted any NFT yet</div>
        )}
      </div>
    </div>
  );
}

export default App;

// 0xe15E637047eE5123eE4dD8b599E55192CfB27868

