import ABI from '../ABI.json' assert { type: 'json' }
import Web3 from 'web3'


//<---------------Configure BLOCKCHAIN---------
const web3 = new Web3("https://go.getblock.io/be05c6a89399427ea942756170f0cf55")
const contractAddress = "0x3b0E3FD34289ebAF99dab695413B43B4e9D683c8"
const contract = new web3.eth.Contract(ABI, contractAddress)
// console.log(contract)



export default contract