import React from 'react'
import fetchData from './FetchData'
import AssetList from './AssetList'
import '../App.css'
import { Button } from 'react-bootstrap'
import Web3 from 'web3'
import "./Buypage.css"

const Buypage = ({ props }) => {

    const openRiver = props.openRiver
    const account = props.account

    // const { error, isPending, data: assets } = fetchData('http://localhost:8000/assets')

    function purchaseProducts(id, price) {
        return new Promise(resolve => {
            const id_parsed = parseInt(id)
            openRiver.methods.purchaseProduct(id_parsed).send({ from: account, value: price })
                .once('receipt', (receipt) => {
                    console.log("Purchase Success")
                    console.log('receipt ', receipt);
                    if (receipt.status) {
                        resolve(200)
                    }
                })
                .on('error', (error) => {
                    if (error.code === 4001) {
                        resolve(4001)
                    } else {
                        resolve(404)
                    }
                    console.log('receipt ', error);
                });
        })
    }

    // const purchaseProducts = (id, price) => {
    //     // Receipt codes:
    //     // receipt.code: 4001 == User deny transcation
    //     const id_parsed = parseInt(id)
    //     openRiver.methods.purchaseProduct(id_parsed).send({ from: account, value: window.web3.utils.toWei(price, 'Ether') })
    //         .once('receipt', (receipt) => {
    //             console.log("Purchase Success")
    //             console.log('receipt ', receipt);
    //             if (receipt.code === 4001) {
    //                 return 4001
    //             }
    //             if (receipt.status) {
    //                 return 200
    //             }
    //         })
    //         .on('error', (error) => {
    //             console.log('receipt ', error);
    //             return 404
    //         });
    // }

    return (
        <div className="buy-bg">
            <div className="buy-section">
                <p id="buypageTag">Choose from a myraid of original assets made curated by creative individuals</p>
                {/* {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {assets && <AssetList assets={assets} />} */}
                <AssetList assets={props.totalArtwork} purchaseProducts={purchaseProducts} isClickable={true} />
            </div>
        </div>
    )
}

export default Buypage