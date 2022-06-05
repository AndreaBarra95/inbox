// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    //Get a list of all available accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract on testnet
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ 
            data: bytecode, 
            arguments: ['Hello There!'] })
        .send({ from: accounts[0], gas: '1000000' })
    
});

describe('Inbox Smart Contract', () => {
    it('contract deployment', () => {
        assert.ok(inbox.options.address);
    });

    it('a default message is initialized', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hello There!');
    });

    it('setMessage function should set a new message', async () => {
        await inbox.methods.setMessage('Hello buddy!').send({from: accounts[0], gas: '1000000'});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hello buddy!');
    });

    it('getMessage function should return a message string', async () => {
        const message = await inbox.methods.getMessage().call();
        assert.equal(message, 'Hello There!');
    });

    it('Testing setMessage and getMessage together', async () => {
        await inbox.methods.setMessage('Ciao bello').send({ from: accounts[0], gas: '1000000' });
        const message = await inbox.methods.message().call();
        const newMessage = await inbox.methods.getMessage().call();
        assert.equal(newMessage, message);
    } );

});

//To run this script, execute the command 'npm run test'