import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Web3 from 'web3'
import { Component } from 'react';

// Abis
import OpenRiver from './abis/OpenRiver.json'
import MetaCoin from './abis/MetaCoin.json'
import ConvertLib from './abis/ConvertLib.json'

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
      allTransactions:[]
    }
  }
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.pullAllTransactions()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    var ethBalance = await web3.eth.getBalance(accounts[0])
    ethBalance = web3.utils.fromWei(ethBalance, 'ether');
    this.setState({ account: accounts[0], ethBalance: ethBalance })

    const networkId = await web3.eth.net.getId()
    let totalArtwork = [];
    // Load OpenRiver Contract
    const openRiverData = OpenRiver.networks[networkId]
    if (openRiverData) {
      const openRiver = new web3.eth.Contract(OpenRiver.abi, openRiverData.address)
      this.setState({ openRiver })
      openRiver.methods.artworkCount().call().then(value => {
        for (let i = 1; i <= value; i++) {
          openRiver.methods.artworks(i).call().then(products => {
            totalArtwork.push(products) 
          })
        }
        this.setState({
          totalArtwork: totalArtwork
        })
      })
    } else {
      window.alert('openRiver contract not deployed to detected network.')
    }


    this.setState({ loading: false })
  }

  async pullAllTransactions() {
    const web3 = window.web3
    const latest = await web3.eth.getBlockNumber()
    let allTransactions = []
    for (var i=0; i < latest; i++) {
      const block = await web3.eth.getBlock(latest - i)
      for (let txHash of block.transactions) {
        let tx = await web3.eth.getTransaction(txHash);
        allTransactions.push(tx)
      }
    }
    this.setState({
      allTransactions: allTransactions
    })
  }

  async pullMyInventory() {
    // to find the address of the user, we can use msg.sender in the .sol file
    const artworkCount = await App.OpenRiver.artworkCount()
    for (var i = 1; i <= artworkCount; i++) {
      const artwork = await App.OpenRiver.artworks(i)
      const ID = await App.OpenRiver.getID()
      if (artwork[3] == ID) {
        const artwork_id = artwork[0].toNumber()
        const artwork_name = artwork[1].toString()
        const artwork_price = artwork[2].toNumber()
        const imgHash = artwork[5]
        //do frontend thing here
      }
    }

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

  render() {
    return (
      <div className="App">
        <Router>
          <Header account={this.state.account} />
          <Switch>
            <Route exact path='/'>
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