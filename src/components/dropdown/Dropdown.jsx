import React from 'react'
import { useEffect, useState } from "react";
import "./dropdown.css"
import TopAsks from '../topAsks/TopAsks';
import TopBids from '../topBids/TopBids';

let prevInterval

const Dropdown = () => {
  const [asks, setAsks] = useState('')
  const [bids, setBids] = useState('')
  const [symbols, setSymbols] = useState([])
  const [currencies, setCurrencies] = useState('Loading...')
  const [search, setSearch] = useState('')
  const [symbol, setSymbol] = useState('')
  const valueHandler = (e) => {
    setSearch(e.target.value)
  }
  useEffect(()=>{
    console.log("a", prevInterval);
    let conversions = []
    let count = 0
    if(search==='') {
      conversions = symbols.map(symbol=>{
        return <button className='suggestions' onClick={(e)=>onclick(e, symbol)} key={symbol}>{symbol}</button>
      })
      if(conversions.length>8) conversions.length=8
    } else {
      // console.log("search", search);
      for(let i=0;i<symbols.length;i++) {
        if(symbols[i].includes(search.toUpperCase())) {
          conversions.push(symbols[i])
          count++;
          if(count===8) break;
        }
        // console.log(symbols);
      }
      // console.log(conversions);
      conversions = conversions.map(symbol=>{
        return <button className='suggestions' onClick={(e)=>onclick(e, symbol, prevInterval)} key={symbol}>{symbol}</button>
      })
    }
    console.log(search);
    setCurrencies(conversions)
  }, [search])

  const onclick = (e, symbol) => {
    e.preventDefault()
    setSymbol(symbol)
    if(prevInterval!=='') clearInterval(prevInterval);
    let i = setInterval(()=> {
      prevInterval = i
      fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=10`,
      {method: 'GET'}
      )
      .then(response => response.json())
      .then(data => {
          setAsks(<TopAsks asks={data.asks} />)
          setBids(<TopBids bids={data.bids} />)
      })
      .catch(err => {
        console.log(err);
        setAsks("Please try again after sometime.")
        setBids("")
      })
    }, 500)
  }
  // To fetch all the symbols
  // https://api.binance.com/api/v3/exchangeInfo
  // To fetch asks and bids
  // https://api.binance.com/api/v3/depth?symbol=1INCHBTC&limit=10
  useEffect(()=>{
    console.log('Triggered');
    fetch('https://api.binance.com/api/v3/exchangeInfo',
    {method: 'GET'}
    )
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let symbolStrings = data.symbols.map(symbol=> {
        return symbol.symbol
      })
      setSymbols(symbolStrings);
      let result = symbolStrings.map(symbol=> {
        return <button className='suggestions' onClick={(e)=>onclick(e, symbol)} key={symbol}>{symbol}</button>
      })
      if(result.length>8) result.length=8
      setCurrencies(result)
    })
    .catch(err => {
      console.log(err);
      setCurrencies("Error in fetching.")
    })
  }, [])
  return (
    <div>
        <div className='search-div'>
        <input placeholder='Search symbols' className='search' type='text' value={search} onChange={(e)=>valueHandler(e)} />
        <button type='submit' className='submit'><i className="fa fa-search" aria-hidden="true"></i></button>
        </div>
        <div className='suggestions-div'>
          <span className='suggestion-heading'>Suggestions:</span>
          {currencies}
        </div>
        {symbol!=='' && <h2>{symbol}</h2>}
        {asks}
        {bids}
    </div>
  )
}

export default Dropdown