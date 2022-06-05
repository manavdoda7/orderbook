import React, { useEffect, useState } from 'react'
import "./topBids.css"

const TopBids = ({bids}) => {
    let [content, setContent] = useState('')
    useEffect(() => {
        const data = bids.map(bid=>{
            return (
              <tr key={bid[0]}>
                <td>{bid[0]}</td>
                <td>{bid[1]}</td>
                <td>{(bid[0]*bid[1]).toFixed(8)}</td>
              </tr>
            )
        });
        setContent(data);
    }, [bids])
  return (
    <div className='top-bids'>
      <h4>Top Bids</h4>
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

export default TopBids