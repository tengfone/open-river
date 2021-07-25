// const { assert } = require('chai');
require('chai').use(require('chai-as-promised')).should()
const OpenRiver = artifacts.require('./OpenRiver.sol')

contract('OpenRiver',([deployer,seller,buyer]) =>{
	let productCount
	before(async () => {
    this.OpenRiver = await OpenRiver.deployed()
    
  })

	it('deploys successfully', async () => {
	    const address = await this.OpenRiver.address
	    assert.notEqual(address, 0x0)
	    assert.notEqual(address, '')
	    assert.notEqual(address, null)
	    assert.notEqual(address, undefined)
  	})
  	before(async () => {
  	result = await this.OpenRiver.uploadArtwork('Testname', web3.utils.toWei('1', 'Ether'), 'TestHash',{from: seller})
  	productCount = await this.OpenRiver.artworkCount()
  })
  	it('create artwork', async () => {
  
	  assert.equal(productCount, 1)
	  const event = result.logs[0].args
	  assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
	  assert.equal(event.name, 'Testname', 'name is correct')
	  assert.equal(event.price, '1000000000000000000', 'price is correct')
	  assert.equal(event.owner, seller, 'owner is correct')
	  assert.equal(event.isPurchased, false, 'purchase is correct')
	  assert.equal(event.imgHash,'TestHash')
	  await this.OpenRiver.uploadArtwork('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected
	  await this.OpenRiver.uploadArtwork('', 0, {from: seller}).should.be.rejected

})
  	  	it('sell product', async () => {
  
  	  		//check seller balance
  	  		let sellerOldBalance
  	  		oldBalanceOfSeller =  await web3.eth.getBalance(seller);
      		oldBalanceOfSeller = new web3.utils.BN(oldBalanceOfSeller);
      		let oldBalanceofBuyer
      		oldBalanceofBuyer = await web3.eth.getBalance(buyer);
      		console.log(oldBalanceofBuyer)
			result = await this.OpenRiver.purchaseProduct(productCount, {from: buyer, value: web3.utils.toWei('1', 'Ether')});
			const event = result.logs[0].args;
			assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct');
			assert.equal(event.name, 'Testname', 'name is correct');
			assert.equal(event.price, '1000000000000000000', 'price is correct');
			assert.equal(event.owner, buyer, 'buyer is correct');
			assert.equal(event.isPurchased, true, 'purchase is correct');

			//check seller after balance
			let newBalanceOfSeller;
			newBalanceOfSeller =  await web3.eth.getBalance(seller);
			newBalanceOfSeller = new web3.utils.BN(newBalanceOfSeller);
			let price;
			price = web3.utils.toWei('1','Ether');
			price = new web3.utils.BN(price);
			newBalanceofBuyer = await web3.eth.getBalance(buyer)
			console.log(newBalanceofBuyer)
			console.log(oldBalanceOfSeller.toString())
			console.log(newBalanceOfSeller.toString())
			const exceptedBalance = oldBalanceOfSeller.add(price);
      		assert.equal(newBalanceOfSeller.toString(), exceptedBalance.toString());

})
})


// contract('OpenRiver', (accounts) => {
//   before(async () => {
//     this.OpenRiver = await OpenRiver.deployed()
//   })

//   it('deploys successfully', async () => {
//     const address = await this.OpenRiver.address
//     assert.notEqual(address, 0x0)
//     assert.notEqual(address, '')
//     assert.notEqual(address, null)
//     assert.notEqual(address, undefined)
//   })
// 	it('lists transactions', async () => {
// 	const transactionCount = await this.OpenRiver.transactionCount()
// 	const transaction = await this.OpenRiver.transactions(transactionCount)
// 	assert.equal(transaction.id.toNumber(), transactionCount.toNumber())
// 	assert.equal(transaction.value, 10)
// 	assert.equal(task.completed, false)
// 	assert.equal(taskCount.toNumber(), 1)
//   })
//   })