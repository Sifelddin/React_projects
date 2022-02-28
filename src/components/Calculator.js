import React , {useState, useRef , useEffect} from 'react'
import styled from 'styled-components'

const Calculator = () => {

    const operation = useRef()
    const result = useRef();
    const resultValue = useRef("");
    const [isPoint , setIsPoint] = useState(true)
    const [prev , setPrev] = useState("")
    const addOperator = (arg) => {
     let regExp = /[÷|+|x|-]{1}$/

        if(!prev && arg === "-" && !regExp.test(prev)){
            return setPrev(prev.concat(arg))
          }
        if(regExp.test(prev)){
            return
        }
       prev && setPrev(prev.concat(arg)); setIsPoint(true)
    }
    
    const hundleClick = (e) => {
        
        switch(e.target.innerText){
            case "C" : setPrev(''); resultValue.current = "";
            break
            case "%" : addOperator(e.target.innerText);
            break
            case "DEL" : deleteNum()
            break
            case "÷" :  addOperator(e.target.innerText);  
            break
            case "+" :  addOperator(e.target.innerText);  
            break
            case "=" :  equal()
            break
            case "x" :  addOperator(e.target.innerText);  
            break
            case "-" :  addOperator(e.target.innerText);  
            break
            case "." :  addPoint(e.target.innerText);  
            break
            default : 
            setPrev(prev.concat(e.target.innerText)) 
        }      
    }

    const deleteNum = () => prev ? setPrev(prev.slice(0 , -1)) : "";
    const equal = () => {
       setPrev(resultValue.current.toString());
       resultValue.current = ""
    };
    const addPoint = (point) => {
        if(!prev || /[x|÷|+|-]$/.test(prev)){
           setPrev(prev.concat("0" + point)) 
           return setIsPoint(false)
        }
        if(isPoint){
             setPrev(prev.concat("."))
             return setIsPoint(false)
        }

    }
    let regExp = /[÷|+|x|-]{1}$/
    let operExp = /(-?\d+%+)?(-?\d+[-|+|x|÷]\d+)?(([-|+|x|÷]\d+){1,})?/

    if(operExp.test(prev) && !regExp.test(prev)){
      let replacedExp = /(%+)(\d+)|%|x|÷|,/g
      let str =""
       str = prev.replace(replacedExp,(e,g1,g2) => {
           if(g1 && g2){
            e = g1+ "*"+g2
           return e.replaceAll("%" , "/100")   
           }
           if(e === "÷"){
               e = "/"
           }
           if(e ==="x"){
               e = "*"
           }
           if(e === "%"){
            e = "/100"
           }
           return e
       })
    
          if(str && /[/|*|+|-]/g.test(str)){
            resultValue.current =  eval(str)
        }   
     }
     
     useEffect(()=>{
         operation.current.innerText = prev;
         result.current.innerText = resultValue.current
    },[prev,result])
  return (
      <>
      <Container>
        <ScreenContent>
         <div ref={operation} className='operation'></div>
         <div ref={result} className='nextResult'></div>
        </ScreenContent>
        <Buttons>
        <button onClick={hundleClick}>C</button>
        <button onClick={hundleClick}>%</button>
        <button onClick={hundleClick}>DEL</button>
        <button onClick={hundleClick}>÷</button>
        <button onClick={hundleClick}>7</button>
        <button onClick={hundleClick}>8</button>
        <button onClick={hundleClick}>9</button>
        <button onClick={hundleClick}>x</button>
        <button onClick={hundleClick}>4</button>
        <button onClick={hundleClick}>5</button>
        <button onClick={hundleClick}>6</button>
        <button onClick={hundleClick}>-</button>
        <button onClick={hundleClick}>1</button>
        <button onClick={hundleClick}>2</button>
        <button onClick={hundleClick}>3</button>
        <button onClick={hundleClick}>+</button>
        <button onClick={hundleClick}>00</button>
        <button onClick={hundleClick}>0</button>
        <button onClick={hundleClick}>.</button>
        <button onClick={hundleClick}>=</button>
        </Buttons>
      </Container>
      </>
   
  )
}

export default Calculator

const Container = styled.div`
    width: 300px;
`
const ScreenContent = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
justify-content: space-between;
word-wrap: break-word;
word-break: break-all;
font-size: large;
background-color: rgba(240,240,250,1);
margin-bottom: .5rem;
padding: .5rem;
letter-spacing: 1px;
.operation{
    font-size: 1.5rem;
    min-height: 2rem;
}
.nextResult{
    color: rgba(0,0,0,.7);
    min-height: 2rem;
}
`
const Buttons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 3px;
    button{
        font-size: 1.3rem;
        padding: .5rem;
        background-color: rgba(250,240,250,.9);
        border: 1px solid gray;
        cursor: pointer;
        
        &:hover{
            background-color: white;
        }

    }
    `
