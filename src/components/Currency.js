
import {useState,useEffect, useRef } from "react"
import styled from "styled-components"
const axios = require("axios");

const Currency = () => {
  const inputQuantity = useRef();
  const inputResult = useRef();
  const firstSelect = useRef();
  const secondSelect = useRef();
  const [resultInput, setResultInput] = useState(0) 
  const [currencies , setCurrencies ] = useState(null);
  const [amount, setAmount] = useState(1)
  
  useEffect(() => {
    const getData = async () => {
      // api fetched from https://app.exchangerate-api.com/
      try{
     let response = await axios.get('https://v6.exchangerate-api.com/v6/469d9f139e534d727572658a/latest/USD')
     setCurrencies(response.data.conversion_rates)
    }catch(error){
      console.error(error)
    }
    }
    getData()
  inputQuantity.current.defaultValue = 1 ;
  inputResult.current.defaultValue  = 1
},[]);

  const hundleAmount = (e) => {
     setAmount(e.target.value)  
}

const convertBtn = () => {
  setResultInput((secondSelect.current.value/firstSelect.current.value)* amount)
}
if(resultInput) {
  inputResult.current.value = resultInput
}


  return (

      <div>
       
      <CurrencyContainer>
        <h2>Convert Base USD</h2>
        <CurrencyRate>
          
        <select ref={firstSelect} > 
          {currencies && (Object.keys(currencies).map((el ,index) => {
            return (
              <option key={index} value={currencies[el]}>{el}</option>
              ) 
            }))}
        </select>
        <div>
          <span>Quantity : </span>
          <input id="amount" onChange={hundleAmount} ref={inputQuantity} />
          </div>
          </CurrencyRate>
          <br/>
           <button onClick={convertBtn}> Convert </button>
         <br/>
          <CurrencyRate >
          <select ref={secondSelect}> 
          { currencies && ( Object.keys(currencies).map((el ,index) => {
            return (
              <option key={index} value={currencies[el]}>{el}</option>
            ) 
          }))}
        </select>
        <div>
        <span> Conversion Rate : </span>
        <input id="rate" ref={inputResult}/>
        </div>
          </CurrencyRate>
        
      </CurrencyContainer>
      </div>
  )
}

export default Currency

const CurrencyContainer = styled.section`
display: flex;
flex-direction: column;
align-items: center;
  button{
    font-size: 1.2rem;
    background-color: greenyellow;
    padding: .5rem 1rem;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin: 1rem auto;
  &:hover{
    background-color: aliceblue;

  }
  }
`

const CurrencyRate = styled.div`
display: flex;
align-items:center;
font-size: 1.2rem;
div{
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
}
input{
  padding: .3rem;
  font-size: 1.2rem;
  border-radius: 8px;
}
select{
  padding: 0;
  border-radius:8px;
  font-size:1.2rem;
}

`

