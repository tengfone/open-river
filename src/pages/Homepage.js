import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import './Homepage.css'
import heroImage from '../assets/heroImage.png'



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
        <div className="hero-section">
            <div className="hero-flex-container">
                <div className="hero-content">
                    <h1 style={{ textAlign: "left", fontSize: "48px", marginBottom:"20px"}}>Discover, collect, and sell extraordinary digital assets</h1>
                    <p style={{ textAlign: "left", fontSize: "18px", marginBottom:"40px" }} >on the world's 2nd and smallest digital assets marketplace!</p>
                    <div className="hero-form">
                        <Button onClick={toMarket} variant="primary">Market Place</Button>
                        <Button onClick={toLedger} variant="outline-secondary" className="ledgerButton">Ledger</Button>
                    </div>
                </div>
                <div className="heroImage">
                    <img id="heroImage" src={heroImage} alt="" width="550" height="515"/>
                </div>
            </div>
        </div>
    )
}

export default Homepage