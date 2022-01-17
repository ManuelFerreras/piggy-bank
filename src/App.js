import React, { useState } from 'react';
import { ethers, Contract } from 'ethers';

import SideBar from './SideBar';
import Connections from './Connections';
import DashBoard from './DashBoard';
import Withdraw from './Withdraw';
import Store from './Store';
import Contact from './Contact';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config';

import logo from './piggy.png';

import "./normalize.css";
import "./styles.css";
import { wait } from '@testing-library/user-event/dist/utils';

const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {

  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [accountBalance, setAccountBalance] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [accountStoredBalance, setAccountStoredBalance] = useState(0);
  const [contract, setContract] = useState(undefined);

  const [withdrawMenuOpened, setWithdrawMenuOpened] = useState(false);
  const [storeMenuOpened, setStoreMenuOpened] = useState(false);
  const [dashboardMenuOpened, setDashboardMenuOpened] = useState(true);
  const [contactMenuOpened, setContactMenuOpened] = useState(false);

  const openStoreMenu = () => {
    setDashboardMenuOpened(false);
    setWithdrawMenuOpened(false);
    setContactMenuOpened(false);
    setStoreMenuOpened(true);
  }

  const openWithdrawMenu = () => {
    setDashboardMenuOpened(false);
    setStoreMenuOpened(false);
    setContactMenuOpened(false);
    setWithdrawMenuOpened(true);
  }

  const openDashboardMenu = () => {
    setStoreMenuOpened(false);
    setWithdrawMenuOpened(false);
    setContactMenuOpened(false);
    setDashboardMenuOpened(true);
  }

  const openContactMenu = () => {
    setStoreMenuOpened(false);
    setWithdrawMenuOpened(false);
    setDashboardMenuOpened(false);
    setContactMenuOpened(true);
  }

  const login = async () => {
    try {
      let newAccount = await window.ethereum.request({ method: 'eth_requestAccounts' });
      let newSigner = await provider.getSigner();
      let newAccountBalance = await provider.getBalance(newAccount[0]);
      let newContractBalance = await provider.getBalance(CONTRACT_ADDRESS);
      let newContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, newSigner);
      let newAccountStoredBalance = await newContract.getBalanceOf(newAccount[0]);
      setAccount(newAccount);
      setSigner(newSigner);
      setAccountBalance(ethers.utils.formatEther(newAccountBalance));
      setContractBalance(ethers.utils.formatEther(newContractBalance));
      setAccountStoredBalance(ethers.utils.formatEther(newAccountStoredBalance));
      setContract(newContract);
    } catch (error) {
      console.log(error);
    }

  }

  const storeFunds = async amount => {
    const tx = await signer.sendTransaction({
      to: CONTRACT_ADDRESS,
      value: ethers.utils.parseEther(amount)
    });
    const receipt = await tx.wait();
    if(receipt.status) {
      login();
    }
  }

  const withdrawFunds = async amount => {
    const tx = await contract.withdrawEther(ethers.utils.parseEther(amount));
    const receipt = await tx.wait();
    if(receipt.status) {
      login();
    }
  }


  const getBalanceOf = async address => {
    let balance = await provider.getBalance(address);
    return balance;
  }


  return (
    <>
      <div className='mainContainer'>
        <SideBar openWithdrawMenu={openWithdrawMenu} openStoreMenu={openStoreMenu} openDashboardMenu={openDashboardMenu} openContactMenu={openContactMenu} />

        <div className='right'>
          <Connections login={login} setConnected={setConnected} connected={connected} account={account} />

          {dashboardMenuOpened ? (
            <DashBoard openWithdrawMenu={openWithdrawMenu} openStoreMenu={openStoreMenu} login={login} connected={connected} setConnected={setConnected} accountBalance={accountBalance} contractBalance={contractBalance} accountStoredBalance={accountStoredBalance} />
          ) : null}

          {withdrawMenuOpened ? (
            <Withdraw withdrawFunds={withdrawFunds} openDashboardMenu={openDashboardMenu} openStoreMenu={openStoreMenu} login={login} connected={connected} setConnected={setConnected} accountBalance={accountBalance} contractBalance={contractBalance} accountStoredBalance={accountStoredBalance} />
          ) : null}

          {storeMenuOpened ? (
            <Store storeFunds={storeFunds} openWithdrawMenu={openWithdrawMenu} openDashboardMenu={openDashboardMenu} login={login} connected={connected} setConnected={setConnected} accountBalance={accountBalance} contractBalance={contractBalance} accountStoredBalance={accountStoredBalance} />
          ) : null}

          {contactMenuOpened ? (
            <Contact openDashboardMenu={openDashboardMenu} login={login} connected={connected} setConnected={setConnected} accountBalance={accountBalance} contractBalance={contractBalance} accountStoredBalance={accountStoredBalance} />
          ) : null}
          
        </div>
      </div>

    </>
  );
}

export default App;