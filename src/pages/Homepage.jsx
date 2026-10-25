import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import './Homepage.css'
import heroImage from '../assets/hero_img.gif'
import {Link} from "react-router-dom";



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
                    <p style={{ textAlign: "left", fontSize: "24px", marginBottom:"40px", maxWidth:"420px", fontWeight:"200" }} >on the world's 2nd and smallest digital assets marketplace!</p>
                    <div className="hero-form">
                        <Button onClick={toMarket} variant="primary">Market Place</Button>
                        <Button id="ledgerBtn" onClick={toLedger} variant="outline-secondary" className="ledgerButton">Ledger</Button>
                    </div>
                    <div className="link">
                        <Link to="/about">Learn more about its creators</Link>
                    </div>
                </div>
                <div className="heroImage">
                    <img id="heroImage" src={heroImage} alt="" width="450" height="525.77"/>
                </div>
            </div>
        </div>
    )
}

export default Homepage