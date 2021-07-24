import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Web3 from 'web3'
import { Component } from 'react';

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
      loading: true
    }
  }
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    var ethBalance = await web3.eth.getBalance(accounts[0])
    ethBalance = web3.utils.fromWei(ethBalance, 'ether');
    this.setState({ account: accounts[0], ethBalance: ethBalance })

    const networkId = await web3.eth.net.getId()

    // Add all token here

    this.setState({ loading: false })
  }
  async pullAllTransactions(){
    const transactionCount = await App.OpenRiver.transactionCount()

    for(var i=1; i<=transactionCount; i++){
      const transaction = await App.OpenRiver.transactions(i)
      const transactionId = transaction[0].toNumber()
      const transactionValue = transaction[1].toNumber()
      const addrFrom = transaction[2]
      const addrTo = transaction[3]
      const imgHash = transaction[4]
      //do frontend thing here
    }
  }
  
  async pullMyInventory(){
    // to find the address of the user, we can use msg.sender in the .sol file
    const artworkCount = await App.OpenRiver.artworkCount()
    for(var i=1; i<=artworkCount; i++){
      const artwork = await App.OpenRiver.artworks(i)
      const ID = await App.OpenRiver.getID()
      if(artwork[3] == ID){
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

  render() {
    return (
      <div className="App">
        <Router>
          <Header account={this.state.account}/>
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/profile'>
              <ProfilePage props={this.state}/>
            </Route>
            <Route exact path='/about'>
              <AboutPage />
            </Route>
            <Route exact path='/market'>
              <MarketPage />
            </Route>
            <Route exact path='/ledger'>
              <LedgerPage />
            </Route>
            <Route exact path='/market/buy'>
              <BuyPage />
            </Route>
            <Route exact path='/market/sell'>
              <SellPage />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
