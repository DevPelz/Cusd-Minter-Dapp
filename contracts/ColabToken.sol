// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Colab Token Contract
/// @notice NFT contract for celo 
contract ColabToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    uint256 public transferFee = 0.1 ether;

    Counters.Counter private _tokenIdCounter;
    uint256 private constant MAX_TOKENS = 10000;

    event TokenMinted(address indexed owner, uint256 indexed tokenId, string uri);
    event TokenTransferred(address indexed from, address indexed to, uint256 indexed tokenId);
    
     uint256 public mintingFee;

    constructor() ERC721("ColabToken", "COT") {
        mintingFee = _mintingFee;
    }

    /// @notice Mints a new token and assign the function caller to be the owner
    /// @param uri Token metadata URI
    function safeMint(string calldata uri) public {
        require(msg.value >= mintingFee, "Insufficient fee");
        require(bytes(uri).length > 0, "Empty uri");
         require(_tokenIdCounter.current() < MAX_TOKENS, "Maximum number of tokens minted");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        emit TokenMinted(msg.sender, tokenId, uri);
    }

    /// @notice Keeps track of total number of tokens minted 
    /// @return Total number of tokens minted 
    function tokenCounter() public view returns (uint256) {
        return  _tokenIdCounter.current();
    }
    
    /// @notice Transfer a token to another user
    /// @param to The address of the user to receive the token
    /// @param tokenId The ID of the token to transfer
    function transfer(address to, uint256 tokenId) public payable {
        require(msg.value >= transferFee, "Insufficient transfer fee");

        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved to transfer");
        _transfer(msg.sender, to, tokenId);

        if (msg.value > transferFee) {
            payable(msg.sender).transfer(msg.value - transferFee);
        }
    }
    
    /// @notice Set the transfer fee for tokens
    /// @param fee The new transfer fee amount
    function setTransferFee(uint256 fee) public onlyOwner {
        transferFee = fee;
    }

    /// The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(_exists(tokenId), "Token does not exist");
        return super.tokenURI(tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        super.transferFrom(from, to, tokenId);
        emit TokenTransferred(from, to, tokenId);
    }
    
    fallback() external payable {
        revert("This contract does not accept this token/payment.");
    }

    receive() external payable {
        revert("This contract does not accept this token/payment .");
    }
}
