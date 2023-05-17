<template>
  <div>
    <h1> L28D </h1>
    <button @click="login" v-if="!walletConnected">Connect</button>
    <ul v-if="walletConnected">
      <li>address: {{ user.address }}</li>
      <li>balance: {{ user.balance }}</li>
      <li>L28D balance: {{ user.l28dBalance }}</li>
      <li>USDC balance: {{ user.usdcBalance }}</li>
    </ul>

    <button @click="mint" v-if="walletConnected">Mint 10 L28D Token</button>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ethers } from "ethers";
import erc20Abi from "./contracts/erc20-abi.js";

let signer;
const user = reactive({
  address: '',
  balance: 0,
  l28dBalance: 0,
  usdcBalance: 0,
  mintAmount: 10,
});
const walletConnected = computed(() => user.address != '');

import l28dContractJSON from "./contracts/L28D.json";
const web3Provider = new ethers.BrowserProvider(window.ethereum);
const l28dContractABI = l28dContractJSON.abi;
const l28dContractAddress = "0xC63Db2afc1E5046494cC93803d2E015F95fD0436";
const usdcContractAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

const login = async () => {
  await web3Provider.send("eth_requestAccounts", []);

  signer = await web3Provider.getSigner();
  user.address = await signer.getAddress();
  user.balance = await web3Provider.getBalance(user.address);
  console.log("User's account: ", user.address);
  console.log("Curent blocknumber: ", await web3Provider.getBlockNumber());

  const usdcContract = new ethers.Contract(usdcContractAddress, erc20Abi, signer);
  const l28dContract = new ethers.Contract(l28dContractAddress, l28dContractABI, signer);
  user.l28dBalance = await l28dContract.balanceOf(user.address);
  user.usdcBalance = await usdcContract.balanceOf(user.address);
}

const mint = async () => {
  const amount = 10000000;
  let receipt;
  let tx;

  // approve usdc transfer
  const usdcContract = new ethers.Contract(usdcContractAddress, erc20Abi, signer);
  tx = await usdcContract.approve(l28dContractAddress, amount);
  receipt = await tx.wait();
  console.log("Transaction receipt: ", receipt);

  const l28dContract = new ethers.Contract(l28dContractAddress, l28dContractABI, signer);
  console.log("Contract ABI: ", l28dContractABI);
  tx = await l28dContract.mint(amount);
  receipt = await tx.wait();
  console.log("Transaction receipt: ", receipt);
}

const getL28DBalance = async () => {
  const l28dContract = new ethers.Contract(l28dContractAddress, l28dContractABI, signer);
  const balance = await l28dContract.balanceOf(user.address);
  console.log("User's L28D token balance:", balance.toString());
}

</script>
<style lang="scss">
h1 {
  font-size: 48px;
  text-align: center;

  span {
    font-size: 32px;
  }
}
</style>
