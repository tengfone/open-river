import React from 'react'
import fetchData from './FetchData'
import AssetList from './AssetList'
import '../App.css'
import { Button } from 'react-bootstrap'
import Web3 from 'web3'

function Buypage({ props }) {

    const openRiver = props.openRiver
    const account = props.account

    const { error, isPending, data: assets } = fetchData('http://localhost:8000/assets')

    const purchaseProducts = (id, price) => {
        openRiver.methods.purchaseProduct(id).send({ from: account, value: price })
            .once('receipt', (receipt) => {
                console.log("Purchase Success")
                console.log('receipt ', receipt);
            })
            .on('error', (error) => {
                console.log('receipt ', error);
            });
    }

    const testingBuy = () => {
        console.log("Buy")
        purchaseProducts(0, 3)
    }

    return (
        <>
            <h1>Marketplace</h1>
            <p>Choose from a myraid of original assets made curated by creative individuals</p>
            <Button onClick={testingBuy}>Buy</Button>
            <div className="buy-section">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {assets && <AssetList assets={assets} />}
            </div>
        </>
    )
}

export default Buypage