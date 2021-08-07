import React from 'react'
import './Aboutpage.css'
import aboutImg from '../assets/aboutImg.png'

function Aboutpage() {
    return (
        
        <div class="about-section">
            <div className="description">
                <h1>Open River is a decentralised marketplace for buying and selling of unique digital assets. We attribute our inspiration to Open Sea. For everyone, by SUTD.
</h1>  
            </div>
            <div className="aboutImg">
                <img id="aboutImg" src={aboutImg} alt="" width="800" />
            </div>
            <div className="footer">
                © All rights reserved – Ryan Gen, Ng Ming Bing, Gerald Lim, Phang Teng Fone 
            </div>
                    
        </div>
        
    )
}

export default Aboutpage