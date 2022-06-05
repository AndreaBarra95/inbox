// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'write your mnemonic seed phrase here',
    'https://rinkeby.infura.io/v3/990cf9ae8430440c97aedaf7ea6f2c79'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ 
        data: bytecode, 
        arguments: ['Hello There!'] })
    .send({ from: accounts[0], gas: '1000000' })

    console.log('Contract is deployed to ', result.options.address);
};

deploy();

//To run this script, type the command 'node deploy.js'