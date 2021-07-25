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

	  //FAILURE: Product have a name

	  await this.OpenRiver.uploadArtwork('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected

	  //FAILURE: Product have a price

	  await this.OpenRiver.uploadArtwork('', 0, {from: seller}).should.be.rejected

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