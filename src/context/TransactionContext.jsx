//Eth enviroment context
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

//Fetch the contract 
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const TransactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return TransactionContract;
}


//Wrap all the app with the Contract Information
//All the info here can be used with all components
export const TransactionProvider = ({children}) => { 

    //useState to save the current account when connected:
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setformData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    //As the transaction take time, we created an isloading useState
    //to use with the transactionContract.addToBlockchain call
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, settransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    
    //important: name should  be equal to the word into the input
    //e is for event.
    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
      };

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert ('Please, install Metamask');

            const transactionsContract = getEthereumContract();

            const availableTransactions = await transactionsContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
              amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));

            console.log(structuredTransactions);

            setTransactions(structuredTransactions);

        } catch (error) {
            console.log(error);
        }
    };
    

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert ('Please, install Metamask');

            const accounts = await ethereum.request({method : 'eth_accounts'});

            //As this function is called at the start
            //If wallet is connected we set currentAccount to the account
            if(accounts.length) {
            setCurrentAccount(accounts[0]);

            getAllTransactions();

        }else {
            console.log('No accounts found');
        }

        }catch(error){
            console.log(error);
            throw new Error('No Ethereum Object');
        }

    }

    const checkIfTransactionsExists = async () => {
        try {
            
            const transactionsContract = getEthereumContract();
            const transactionCount = await  transactionsContract.getAllTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };


    const connectWallet = async () => {
        try {
            if (!ethereum) return alert ('Please, install Metamask');
            const accounts = await ethereum.request({method : 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);

            window.location.reload();

        } catch(error) {
            console.log(error);
            throw new Error('No Ethereum Object');

        }
    }

    const sendTransaction = async () => {
        try{
            if (!ethereum) return alert ('Please, install Metamask');

            //Data from the form using the useState 'formData':
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            

            //Trasform the amount to Gwei
            const parseAmount = ethers.utils.parseEther(amount);


            //Sending the transaction request
            await ethereum.request({ 
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    //Calculate the gas with https://www.rapidtables.com/convert/number/decimal-to-hex.html
                    //0x5208 = 21000 Gwei -> 0.000021 eth. https://eth-converter.com/
                    //0.000021 eth = 0.06361 $ https://currencio.co/eth/usd/
                    gas: '0x5208',
                    value: parseAmount._hex,
                }]
            })

            const transactionHash = transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword);

            setIsLoading(true);
            console.log("Loading - ${transactionHash.hash}");
            //await transactionHash.wait();
            setIsLoading(false);
            console.log("Success - ${transactionHash.hash}");

            const transactionCount = await  transactionContract.getAllTransactionCount();

            settransactionCount(transactionCount.toNumber());

            window.reload();


        }catch(error){
            console.log(error);
            throw new Error('No Ethereum Object');
        }
    }


    //useEffect to call checkIfWalletIsConnected just at the load 
    //of the Website
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
    }, []);

 

    return (
        <TransactionContext.Provider value={{ 
            transactionCount,
            connectWallet,
            currentAccount,
            formData,
            isLoading,
            handleChange,
            sendTransaction,
            transactions,
            isLoading
             }}>
            {children}
        </TransactionContext.Provider>
    )

}