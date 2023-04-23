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

    Counters.Counter private _tokenIdCounter;

    event TokenMinted(address indexed owner, uint256 indexed tokenId, string uri);
    event TokenTransferred(address indexed from, address indexed to, uint256 indexed tokenId);

    constructor() ERC721("ColabToken", "COT") {}

    /// @notice Mints a new token and assign the function caller to be the owner
    /// @param uri Token metadata URI
    function safeMint(string calldata uri) public {
        require(bytes(uri).length > 0, "Empty uri");
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

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        super.transferFrom(from, to, tokenId);
        emit TokenTransferred(from, to, tokenId);
    }
}
