import React from 'react'
import { Web3 } from "web3"
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import ABI from "./ABI.json"

const Wallet = ({ saveState }) => {
    const navigateTo = useNavigate();
    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum)
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                })
                const contractAddress = "0x3b0E3FD34289ebAF99dab695413B43B4e9D683c8"
                const contract = new web3.eth.Contract(ABI, contractAddress)
                saveState({ web3: web3, contract: contract, account: accounts[0] })
                toast.success("Welcome")
                navigateTo("/view-all-task")
                console.log(accounts)
            } else {
                throw new Error;
            }
        } catch (error) {
            console.error(error)
            toast.error("Error connecting to wallet!")
        }
    }
    return (
        <>
            <div >
                <span>WELCOME TO</span> <p>TODO 3.0</p>
            </div>
            <div >
                <p> Please connect metamask wallet to access the app </p>
                <button onClick={connectWallet}>Connect Wallet</button>
            </div>
        </>
    )
}

export default Wallet