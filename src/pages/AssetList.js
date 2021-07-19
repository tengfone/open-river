import "./AssetList.css";
import ethIcon from '../assets/eth_icon.svg'

const AssetList = ({ assets }) => {
    return (
      <div className="assets-container">
        {assets.map(asset  => (
          <div className="card" key={asset.id}>
               <div className="card-image"><img src={asset.img}/></div>
               <div className="card-placeholder">
                   <p>{asset.owner_name}</p>
                   <p>Price</p>
               </div>
               <div className="asset-information">
                    <p>{asset.title}</p>
                   <div className="right-information-block">
                        <img src={ethIcon} alt="Eth Icon" width="14" height="14"/>
                        <p>{asset.price}</p>
                   </div>
               </div>
            </div>
        ))}
      </div>
    );
  }
   
  export default AssetList;