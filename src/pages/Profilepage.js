import React from 'react'
import '../App.css'

function Profilepage({props}) {
    const account = props.account
    const ethBalance = props.ethBalance
    return (
        <div>
            <h1>Profile Page</h1>
            <h5>Account ID: {account}</h5>
            <h5>Moolah in Eth: Ξ{ethBalance}</h5>
        </div>
    )
}

export default Profilepage