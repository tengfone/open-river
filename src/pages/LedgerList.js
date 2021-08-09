import { div } from 'prelude-ls';
import ethIcon from '../assets/eth_icon.svg'
import './LedgerList.css'

const LedgerList = ({allTx}) => {
    const web3 = window.web3
    console.log(allTx)
    
    return (
        <div className="tx-container">
        {allTx.reverse().map(tx  => (
              <div className="ledger-card" key={tx.hash}>
                <div className="ledger-left">
                    <div className="tx-hash-block">
                        <div className="tx-label">
                            TX HASH
                        </div> 
                        {/* <p> */}
                        <div className="hash-val">
                            {tx.hash}
                        </div>
                        {/* </p> */}
                    </div>
                    <div className="address-block">
                        <div className="from-address">
                            <div className="label">
                                FROM ADDRESS
                            </div>
                            <div className="from-val">
                                {tx.from}
                            </div>
                            
                        </div>
                        <div className="to-address" >
                       
                                {tx.to ?   <div className="label">TO CONTRACT ADDRESS</div> : <div className="label">CREATED CONTRACT ADDRESS</div>}
                            <div className="from-val">
                                {tx.to ? tx.to : tx.contractAddress} 
            
                            </div>
                        </div>
                        <div className="gas-block">
                            <div className="label">
                                GAS PRICE
                            </div>
                            <div className="gas-val">
                                {Number((web3.utils.fromWei(tx.gasPrice, 'ether'))).toFixed(9)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ledger-right">
                    <div className="contract-type" style={{backgroundColor: tx.to ? "#D26770" : "#A4C6D3"}}>
                        {tx.to ? <p>CONTRACT CALL</p> : <p>CONTRACT CREATION</p>}
                    </div>
                    <div className="value-block">
                        <div className="label">
                        PRICE
                        </div>
                            
                        <div className="value-val-block">
                            <img src={ethIcon} alt="Eth Icon" width="14" height="14"/>
                            <div className="tx-val">
                                {Number((web3.utils.fromWei(tx.value, 'ether'))).toFixed(3)}
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        ))}
    </div>
    );
  }
   
  export default LedgerList;