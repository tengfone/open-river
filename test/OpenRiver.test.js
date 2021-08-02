require('chai').use(require('chai-as-promised')).should()
const OpenRiver = artifacts.require('./OpenRiver.sol')
//Deploying Contract
contract('OpenRiver',([deployer,seller,buyer]) =>{
	let productCount
	before(async () => {
    this.OpenRiver = await OpenRiver.deployed()
  })
//Test to check if contract was deployed sucessfully
	it('deploys successfully', async () => {
	    const address = await this.OpenRiver.address
	    assert.notEqual(address, 0x0)
	    assert.notEqual(address, '')
	    assert.notEqual(address, null)
	    assert.notEqual(address, undefined)
  	})
//Uploading test artwork 
  	before(async () => {
  	result = await this.OpenRiver.uploadArtwork('Testname', web3.utils.toWei('1', 'Ether'),'descp', 'TestHash',{from: seller})
  	productCount = await this.OpenRiver.artworkCount()
  })
//testing uploadArtwork function
  	it('create artwork', async () => {
  
	  assert.equal(productCount, 1)
	  const event = result.logs[0].args
	  assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
	  assert.equal(event.name, 'Testname', 'name is correct')
	  assert.equal(event.price, '1000000000000000000', 'price is correct')
	  assert.equal(event.owner, seller, 'owner is correct')
	  assert.equal(event.isPurchased, false, 'purchase is correct')
	  assert.equal(event.imgHash,'TestHash')
	  assert.equal(event.description,'descp')
	  //test cases that would throw errors
	  await this.OpenRiver.uploadArtwork('', web3.utils.toWei('1', 'Ether'), '',{from: seller}).should.be.rejected
	  await this.OpenRiver.uploadArtwork('', 0,'', {from: seller}).should.be.rejected

})
//  	testing purchaseProduct function
  	  	it('sell product', async () => {
  
  	  		//check initial seller balance
  	  		let sellerOldBalance
  	  		oldBalanceOfSeller =  await web3.eth.getBalance(seller);
      		oldBalanceOfSeller = new web3.utils.BN(oldBalanceOfSeller);
      		let oldBalanceofBuyer
      		oldBalanceofBuyer = await web3.eth.getBalance(buyer);
      		// console.log(oldBalanceofBuyer)
      		//Purchasing test Product
			result = await this.OpenRiver.purchaseProduct(productCount, {from: buyer, value: web3.utils.toWei('1', 'Ether')});
			const event = result.logs[0].args;
			assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct');
			assert.equal(event.name, 'Testname', 'name is correct');
			assert.equal(event.price, '1000000000000000000', 'price is correct');
			assert.equal(event.owner, buyer, 'buyer is correct');
			assert.equal(event.isPurchased, true, 'purchase is correct');

			//check final seller balance
			let newBalanceOfSeller;
			newBalanceOfSeller =  await web3.eth.getBalance(seller);
			newBalanceOfSeller = new web3.utils.BN(newBalanceOfSeller);
			let price;
			price = web3.utils.toWei('1','Ether');
			price = new web3.utils.BN(price);
			newBalanceofBuyer = await web3.eth.getBalance(buyer)
			// console.log(newBalanceofBuyer)
			// console.log(oldBalanceOfSeller.toString())
			// console.log(newBalanceOfSeller.toString())
			const exceptedBalance = oldBalanceOfSeller.add(price);
			//checking to ensure that the correct amount of balance for the seller
      		assert.equal(newBalanceOfSeller.toString(), exceptedBalance.toString());

})
})