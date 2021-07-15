import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import './Homepage.css'

function Homepage() {
    const history = useHistory();

    const toMarket = () => {
        let path = `market`;
        history.push(path);
    }

    const toLedger = () => {
        let path = `ledger`;
        history.push(path);
    }

    return (
        <div>
            <h1 style={{ textAlign: "left" }}>Discover, collect, and sell extraordinary digital assets</h1>
            <p style={{ textAlign: "left" }} >on the world's 2nd and smallest digital assets marketplace!</p>
            <Button onClick={toMarket} variant="primary">Market Place</Button>
            <Button onClick={toLedger} variant="outline-secondary">Ledger</Button>

        </div>
    )
}

export default Homepage