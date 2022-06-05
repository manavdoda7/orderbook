import React, { useEffect, useState } from 'react'
import "./topAsks.css"
const TopAsks = ({asks}) => {
    const [content, setContent] = useState('')
    useEffect(()=>{
        let data = asks.map(ask=>{
            return (
                <tr key={ask[0]}>
                  <td>{ask[0]}</td>
                  <td>{ask[1]}</td>
                  <td>{(ask[0]*ask[1]).toFixed(8)}</td>
                </tr>
              )
        })
        setContent(data)
    }, [asks])
  return (
    <div className='top-asks'>
      <h4>Top Asks</h4>
      <table>
        <tbody>
            <tr>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
            {content}
        </tbody>
      </table>
    </div>
  )
}

export default TopAsks