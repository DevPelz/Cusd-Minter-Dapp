// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Colab Token Contract
/// @notice NFT contract for Colab code academy
contract ColabToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ColabToken", "COT") {}

    /// @notice Mints a new token and assign the function caller to be the owner
    /// @param uri Token metadata URI
    function safeMint(string memory uri) public {
     require(bytes(uri).length > 0, "URI must not be empty"); // validate input

         uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenIdCounter.increment();

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /// @notice Keeps track of total number of tokens minted 
    /// @return Total number of tokens minted 
    function tokenCounter() public view returns (uint256) {
        uint256 counter = _tokenIdCounter.current();
        return counter;
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

    /// @notice Transfer ownership of a token from one address to another
    /// @param from Address of the current owner of the token
    /// @param to Address of the new owner of the token
    /// @param tokenId ID of the token to be transferred
function transferToken(address from, address to, uint256 tokenId) public {
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ColabToken: transfer caller is not owner nor approved");
    require(to != address(0), "ColabToken: transfer to the zero address");

    _transfer(from, to, tokenId);
}

}