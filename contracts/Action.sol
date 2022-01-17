pragma solidity >=0.7.0 < 0.9.0;
import "./TokenERC20.sol";
contract Action is TokenERC20{
     function sendToken(address to, uint tokens) public {
         transfer(to, tokens);
     }
}