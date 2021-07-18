import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import './Marketpage.css'
import buyImage from '../assets/buyImage.png'
import sellImage from '../assets/sellImage.png'

function Marketpage() {
    let history = useHistory();

    const toBuy = () => {
        history.push('/market/buy')
    }

    const toSell = () => {
        history.push('/market/sell')
    }

    return (
        <div>
            <h1>Buy and Sell</h1>
            <p>At Open river, buying and selling art is made simple and secure</p>
            <div className="market-flex-container">
                <div className="buySellContainer">
                    <img id="buyImg" className="marketplaceImg" src={buyImage} alt="" width="477" height="693"/>
                    <div className="middle">
                        <div className="buyText" onClick={toBuy}>Buy</div>
                    </div>
                </div>
                <div className="buySellContainer">
                    <img id="sellImg" className="marketplaceImg" src={sellImage} alt="" width="477" height="693"  onClick={toSell}/>
                    <div className="middle">
                        <div className="sellText">Sell</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Marketpage