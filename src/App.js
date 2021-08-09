import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Web3 from 'web3'
import { Component } from 'react';
import { FaPlus } from 'react-icons/fa';


// BsX
// Abis
import OpenRiver from './abis/OpenRiver.json'

// Components
import Header from './components/Header'

// Pages
import HomePage from './pages/Homepage'
import AboutPage from './pages/Aboutpage'
import ProfilePage from './pages/Profilepage'
import MarketPage from './pages/Marketpage'
import LedgerPage from './pages/Ledgerpage'
import BuyPage from './pages/Buypage'
import SellPage from './pages/Sellpage'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      ethBalance: 0,
      openRiver: {},
      totalArtwork: [],
      loading: true,
      allTransactions: [],
      myArtWorks: [],
      networkStatusDisplay: "block",
      networkName: "rinkeby"
    }
    this.hideNetworkStatus = this.hideNetworkStatus.bind(this);
  }
  async componentDidMount() {
    await this.loadWeb3()
    await this.getNetwork()
    await this.loadBlockchainData()
    await this.pullAllTransactions()
  }

  async getNetwork() {
    const web3 = window.web3
    const network = await web3.eth.net.getNetworkType()
    this.setState({
      networkName: network
    })
  }


  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    var ethBalance = await web3.eth.getBalance(accounts[0])
    ethBalance = web3.utils.fromWei(ethBalance, 'ether');
    this.setState({ account: accounts[0], ethBalance: ethBalance })
    const networkId = await web3.eth.net.getId()
    let totalArtwork = [];
    let myArtWorks = []
    // Load OpenRiver Contract
    const openRiverData = OpenRiver.networks[networkId]
    if (openRiverData) {
      const openRiver = new web3.eth.Contract(OpenRiver.abi, openRiverData.address)
      this.setState({ openRiver })
      openRiver.methods.artworkCount().call().then(value => {
        for (let i = 1; i <= value; i++) {
          openRiver.methods.artworks(i).call().then(products => {
            if (products.owner == accounts[0]) {

              myArtWorks.push(products)
            }

            if (!products.isPurchased && products.owner !== accounts[0]) {
              totalArtwork.push(products)
            }
          })
        }
        this.setState({
          totalArtwork: totalArtwork,
          myArtWorks: myArtWorks
        })
      })
    } else {
      window.alert('openRiver contract not deployed to detected network.')
    }


    this.setState({ loading: false })
  }

  async pullAllTransactions() {
    require('dotenv').config()
    const web3 = window.web3
    const apiToken = process.env.REACT_APP_ETHERSCAN_TOKEN
    fetch(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${this.state.account}&startblock=0&endblock=99999999&sort=asc&apikey=${apiToken}`)
      .then((response) => response.json())
      .then((data) =>
        {
          if(data.message === "OK"){
            this.setState({
              allTransactions: data.result
            })
          }
        }
      );
    

    //// These codes pull ALL transcation from the blockchain. Not recommended
    // const latest = await web3.eth.getBlockNumber()
    // let allTransactions = []
    // for (var i = 0; i < latest; i++) {
    //   const block = await web3.eth.getBlock(latest - i)
    //   for (let txHash of block.transactions) {
    //     let tx = await web3.eth.getTransaction(txHash)
    //     let txR = await web3.eth.getTransactionReceipt(txHash);
    //     let merged = { ...tx, ...txR }
    //     allTransactions.push(merged)
    //   }
    // }
    // this.setState({
    //   allTransactions: allTransactions
    // })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please download MetaMask!')
    }
   
  }

  handleTotalArtwork = (newArtWorkArray) => {
    this.setState({ totalArtwork: [...this.state.totalArtwork, newArtWorkArray] })
  }

  hideNetworkStatus() {
    this.setState({
      networkStatusDisplay: "none"
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header account={this.state.account} />
         
          <Switch>
            <Route exact path='/'>
            {this.state.networkName == "rinkeby" ? 
            <div className="networkbar" style={{display: this.state.networkStatusDisplay}}>
              <p>Welcome to Open River! You are successfully connected to the {this.state.networkName} Network</p>
              <button className="close-btn" onClick={this.hideNetworkStatus}><FaPlus /></button>
            </div> :
            <div className="errorBar" style={{display: this.state.networkStatusDisplay}}>
            <p>Opps sorry! Open River does not support {this.state.networkName} network</p>
            <button className="close-btn" onClick={this.hideNetworkStatus}><FaPlus /></button>
          </div> 
            }
              <HomePage />
            </Route>
            <Route exact path='/profile'>
              <ProfilePage props={this.state} />
            </Route>
            <Route exact path='/about'>
              <AboutPage />
            </Route>
            <Route exact path='/market'>
              <MarketPage />
            </Route>
            <Route exact path='/ledger'>
              <LedgerPage props={this.state} />
            </Route>
            <Route exact path='/market/buy'>
              <BuyPage props={this.state} />
            </Route>
            <Route exact path='/market/sell'>
              <SellPage props={this.state} updateParentState={this.handleTotalArtwork} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;