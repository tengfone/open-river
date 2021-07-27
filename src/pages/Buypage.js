import React from 'react'
import fetchData from './FetchData'
import AssetList from './AssetList'
import '../App.css'
import { Button } from 'react-bootstrap'
import Web3 from 'web3'

const Buypage = ({ props }) => {

    const openRiver = props.openRiver
    const account = props.account

    // const { error, isPending, data: assets } = fetchData('http://localhost:8000/assets')

    const purchaseProducts = (id, price) => {
        // need to parse to int or can accept float?
        const id_parsed = parseInt(id)
        // const price_parsed = parseInt(price)
        // console.log(id_parsed)
        // console.log(price_parsed)
        openRiver.methods.purchaseProduct(id_parsed).send({ from: account, value: window.web3.utils.toWei(price, 'Ether') })
            .once('receipt', (receipt) => {
                console.log("Purchase Success")
                console.log('receipt ', receipt);
            })
            .on('error', (error) => {
                console.log('receipt ', error);
            });
    }

    return (
        <>
            <h1>Marketplace</h1>
            <p>Choose from a myraid of original assets made curated by creative individuals</p>
            <div className="buy-section">
                {/* {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {assets && <AssetList assets={assets} />} */}
                <AssetList assets={props.totalArtwork} purchaseProducts={purchaseProducts}/>
            </div>
        </>
    )
}

export default Buypage