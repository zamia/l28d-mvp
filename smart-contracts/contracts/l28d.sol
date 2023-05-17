// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

/// @custom:security-contact dev@l28d.xyz
contract L28D is ERC20, Pausable, Ownable, ERC20Permit {
    IERC20 public usdc;
    address public treasury;

    constructor(
        address _usdc,
        address _treasury
    ) ERC20("L28D", "L28D") ERC20Permit("L28D") {
        require(_usdc != address(0), "USDC address cannot be 0");

        usdc = IERC20(_usdc);
        treasury = _treasury;
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint256 amount) public {
        usdc.transferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, amount);
    }

    function withdraw(uint256 amount) public onlyOwner {
        _transfer(address(this), treasury, amount);
    }

    function _burn(address, uint256) internal pure override {
        revert("Burning tokens is not allowed");
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
