import { useState } from 'react';
import './App.css';
import * as web3 from "@solana/web3.js";

const network = "https://api.devnet.solana.com";
const conn = new web3.Connection(network, "confirmed")

function App() {
  const [userInput, setUserInput] = useState("")
  const [balance, setBalance] = useState<any>(null)

  const userInputHandle = (e: any) => {
    const { value } = e.currentTarget
    setUserInput(value)
  }
  const handleSubmit = async () => {
    const key = new web3.PublicKey(userInput);
    const tx = await conn.getBalance(key)
    setBalance(tx / web3.LAMPORTS_PER_SOL)
  }
  return (
    <div className="App">
      <input onChange={userInputHandle} value={userInput} type="text" />
      <button onClick={handleSubmit}>Click</button>
      <p>{balance === null ? "nothing" : `${balance} SOL`}</p>
    </div>
  );
}

export default App;
