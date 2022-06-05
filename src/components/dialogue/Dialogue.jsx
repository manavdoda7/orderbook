import React, { useEffect, useState } from 'react'
import "./dialogue.css"
let sear, page=0;

const Dialogue = ({search, onclick, trigger}) => {
    const [conversions, setConversions] = useState([])
    const [symbols, setSymbols] = useState([])
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [display, setDisplay] = useState([])
    const [className, setClassName] = useState('dialogue-container')
    useEffect(()=> {
        fetch('https://api.binance.com/api/v3/exchangeInfo',
            {method: 'GET'}
        )
        .then(response => response.json())
        .then(data => {
        // console.log(data)
        let symbolStrings = data.symbols.map(symbol=> {
                return symbol.symbol
            })
            setSymbols(symbolStrings);
        })
    },[])
    useEffect(()=> {
        // console.log(props);
        sear = search
        let temp = []
        console.log(typeof(sear)==String, sear.length);
        if(typeof(sear)==typeof("abc") && sear.length) {
            console.log("here");
            for(let i=0;i<symbols.length;i++) if(symbols[i].includes(sear.toUpperCase())) temp.push(symbols[i])
        } else {
            temp=symbols
        }
        let content = temp.map(button=>{
            return <button onClick={(e)=>{
                closeDialogue(e)
                onclick(e, button)
            }} key={button} className='dialog-buttons'>{button}</button>
        })
        setConversions(content)
        let arr = []
        for(let i=0;i<Math.min(content.length, 60); i++) {
            arr.push(content[i])
        }
        setPrev(false)
        setNext(content.length>60)
        setDisplay(arr)
        setClassName('dialogue-container')
    }, [search, symbols, trigger])

    const renderPrev = (e) => {
        e.preventDefault();
        setClassName('dialogue-container')
        page--;
        let arr = []
        for(let i=page*60;i<(page+1)*60; i++) {
            arr.push(conversions[i])
        }
        setPrev(page>0)
        setNext(true)
        setDisplay(arr)
    }
    const renderNext = (e) => {
        e.preventDefault();
        setClassName('dialogue-container')
        page++;
        let arr = []
        for(let i=page*60;i<Math.min(conversions.length,(page+1)*60); i++) {
            arr.push(conversions[i])
        }
        setPrev(page>0)
        setNext((page+1)*60<conversions.length)
        setDisplay(arr)
    }
    const closeDialogue = (e) => {
        e.preventDefault()
        setClassName('dont-display')
    }
  return (
    <div className={className}>
        <div className='overlay'></div>
        <div className='content'>
            <button onClick={closeDialogue} className='close-button'><i class="fa fa-times-circle" aria-hidden="true"></i></button>
            <h1>Available Conversions</h1>
            <div className='buttons-div'>
                {display}
            </div>
            <div className='nav-buttons'>
                {prev && <button onClick={renderPrev}><i class="fa fa-chevron-circle-left" aria-hidden="true"></i></button>}
                {next && <button onClick={renderNext}><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></button>}
            </div>
        </div>
    </div>
  )
}

export default Dialogue