import React from 'react'
import fetchData from './FetchData'
import AssetList from './AssetList'
import '../App.css'

function Buypage() {

    const { error, isPending, data: assets } = fetchData('http://localhost:8000/assets')

    return (
        <>
            <h1>Marketplace</h1>
            <p>Choose from a myraid of original assets made curated by creative individuals</p>
            <div className="buy-section">
                { error && <div>{ error }</div> }
                { isPending && <div>Loading...</div> }
                { assets && <AssetList assets={assets} /> }
            </div>
        </>
    )
}

export default Buypage