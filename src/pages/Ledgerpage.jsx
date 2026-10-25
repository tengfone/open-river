import React from 'react'
import LedgerList from "./LedgerList"
import '../App.css'

function Ledgerpage({props}) {
    return (
        <>
            <div className="ledger">
                <div className="ledger-section" style={props.allTransactions.length == 0 ? {height: "93vh"} : {height: "100%"}}>
                    <LedgerList allTx={props.allTransactions}/>                     
                </div>
            </div>
        </>
    )
}

export default Ledgerpage