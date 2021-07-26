import React from 'react'
import LedgerList from "./LedgerList"
import '../App.css'

function Ledgerpage({props}) {
    return (
        <>
            <div className="ledger">
                <div className="ledger-section">
                    <LedgerList allTx={props.allTransactions}/>                     
                </div>
            </div>
        </>
    )
}

export default Ledgerpage