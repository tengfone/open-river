import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import '../App.css'

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
            <h1>Market Page</h1>
            <p>Was thinking should be a nice UI page covering full page where split into half, buy and sell</p>
            <Button onClick={toBuy} variant="primary">Buy</Button>
            <Button onClick={toSell} variant="outline-secondary">Sell</Button>
        </div>
    )
}

export default Marketpage