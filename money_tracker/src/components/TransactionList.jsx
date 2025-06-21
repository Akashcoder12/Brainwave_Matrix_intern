import React, {useState } from 'react'
import './Transaction.css'

export default function TransactionList() {
    const [transactionList,setTransactionList]=useState([]);
    const [text,setText]=useState('');
    const [amount,setAmount]=useState('');
    const handleSubmit=(e)=>{
         e.preventDefault();
        //set transaction
         
        if(!text || !amount){
             alert("Both fields are required");
             return;
        }

      //create new transaction object
      const transaction={
        id: new Date().toLocaleString(), // unique ID
        text,
        amount:parseFloat(amount)
      };

      setTransactionList([transaction,...transactionList])

      //Clear inputs
      setText('');
      setAmount('');
         
     }
    
    return (
    <div className='container'>
      
    <div className='form-Container'>
          <h2>Add new transactions</h2>
       <form onSubmit={handleSubmit}>
          <input 
          type="text"
          placeholder='enter transaction name'
          value={text}
          onChange={(e)=>{setText(e.target.value)}} 
             />
         <br />  
         <input 
          type="number"
          placeholder='enter amount'
          value={amount}
          onChange={(e)=>{setAmount(e.target.value)}}
           />
         <br />
         <button type="submit">save</button>  
       </form>

   </div>
    
   <div className='box-container-1'>
       <div className='box-1'> 
        <h3> Transaction History:</h3>
         <ul>
            {
                transactionList.map((txn)=>{
                     return(<li key={txn.id}>
                        {txn.id}:  {txn.text} {txn.amount}
                     </li>)
                })
            }
         </ul>   
     </div>
     <div className='box-2'>
        <h3>total amount</h3>
        <p>
            {
                transactionList.map((tnx)=>{
                  return Math.abs(tnx.amount);
                }).reduce((acc,curr)=>{
                    return acc+curr;         
                },0)
            }
        </p>
     </div>
   </div>   

   <div className='box-container-2'>
      <div className='box-3'>
      <h3>income</h3>
      <p>
        {
          transactionList.map((tnx)=>{
             return tnx.amount
          }).filter((amount)=>{
                return amount>0 
          }).reduce((sm,amt)=>{
              return sm+amt
          },0)
        }
      </p>
     </div>

     <div className='box-4'>
       <h3>expenses</h3>
       <p>
        {
         Math.abs(transactionList.map((tnx)=>{
             return tnx.amount
          }).filter((amt)=>{
             return amt<0
          }).reduce((sm,amt)=>{
            return sm+amt;
          },0))
        }
       </p>
     </div>

   </div> 
    
    <div className='box-container-3'>
       <div className='box-5'>
        <h3>balance</h3>
        <p>
        {
          transactionList.map((tnx)=>{
               return tnx.amount
          }).reduce((sm,amt)=>{
                return sm+amt
          },0)
        }
        </p>
     </div>
    </div>
    </div>
  )
}
