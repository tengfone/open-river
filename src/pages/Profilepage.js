import React from 'react'
import '../App.css'
import profileImage from '../assets/orprofile.png'
import './Profilepage.css'
import { FaRegCopy } from 'react-icons/fa';
import ethIcon from '../assets/eth_icon.svg'
import { useRef, useState } from 'react';
import AssetList from './AssetList';
import pbanner from '../assets/pbanner.png'

function Profilepage({ props }) {
    const account = props.account
    const ethBalance = props.ethBalance

    return (
        <>
            <div className="profile-section">
                <div className="banner-bg">
                    <img id="pbannerimg" src={pbanner} alt="banner background" />
                    <div className="value-details">
                        <img src={ethIcon} alt="Eth Icon" width="30" height="30" />
                        <p>{Number(ethBalance).toFixed(2)}</p>
                    </div>
                </div>
                <div className="profile" style={props.myArtWorks.length == 0 ? {height: "53vh"} : {}}>
                    <div className="profile-img">
                        <img src={profileImage} alt="Avatar" className="avatar" />
                        <div className="profile-details">
                            <div className="copy-address">
                                <p>{account.substring(0, 6)}...{account.slice(-4)}</p>
                                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(account)}><FaRegCopy /></button>
                            </div>
                        </div>
                    </div>
                    <div className="myartwork-section">
                    </div>
                    <div className="asset-container">
                        <AssetList assets={props.myArtWorks} isClickable = {false} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profilepage