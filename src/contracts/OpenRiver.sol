pragma solidity ^0.8.0;
///@title OpenRiver
///@notice OpenRiver is a contract for uploading and transacting artwork leveraging on the ethereum network for proof of ownership
contract OpenRiver{
	string public productName;
	uint public artworkCount = 0;
	uint public transactionCount = 0;

	/* struct that represents an artwork that can be uploaded or sold
	@param
	id: unique artwork identifier
	name: name of artwork
	price: price set for artwork
	owner: payable address of the owner of this artwork
	isPurchased: has the artwork been purchased
	description: description of artwork
	imgHash: Hash of the image file  
	*/
	struct Artwork {
		uint id;
		string name;
		uint price;
		address payable owner;
		bool isPurchased;
		string description;
		string imgHash;
	}
	
	/* struct that represents the purchase transaction
	@param
	TransactionID: unique transaction identifier
	value: value transacted in this transaction
	from: address that sent this transaction(Seller)
	to: address that this transaction is addressed to(Purchaser)
	imgHash: Hash of the image file that is being purchased
	*/
	struct Transaction {
		uint TransactionID;
		uint value;
		address from;
		address to;
		string imgHash;
	}

	// Mapping between the id and the Artworks
	mapping(uint => Artwork) public artworks;

	//Mapping between the id and the Transactions
	mapping(uint => Transaction) public transactions;

	/*Event that is triggered when an Artwork is uploaded and created
	@param
	id: unique artwork identifier
	name: name of artwork
	price: price set for artwork
	owner: payable address of the owner of this artwork
	isPurchased: has the artwork been purchased
	description: description of artwork
	imgHash: Hash of the image file  
	*/
	event ArtworkCreated(
		uint id,
		string name,
		uint price,
		address payable owner,
		bool isPurchased,
		string description,
		string imgHash

	);
	/*Event that is triggered when an Artwork is sold
	@param
	id: unique transaction identifier
	name: name of artwork
	price: price paid for artwork
	owner: address of new owner
	description: description of artwork
	imgHash: Hash of the image file  
	*/
	event ArtworkSold(
		uint id,
		string name,
		uint price,
		address payable owner,
		bool isPurchased,
		string description,
		string imgHash
	);

  	/*
  	@title uploadArtwork
  	@notice This function is to upload the artwork into the blockchain
  	@param
  	_name: name of the artwork
  	_price: price set for the artwork
  	_description: description of the artwork
  	_imgHash: Hash of the image file 
  	*/
  	function uploadArtwork(string memory _name, uint _price, string memory _description,string memory _imgHash) public payable{
  		require(bytes(_name).length > 0);
  		require(_price > 0);
  		require(_price < (2**256)- 1);
  		require(bytes(_imgHash).length > 0);
		require(bytes(_description).length > 0);
  		address payable _sender;
  		_sender = payable(msg.sender);
  		artworkCount ++;
  		artworks[artworkCount] = Artwork(artworkCount,_name,_price,_sender,false,_description,_imgHash);
  		emit ArtworkCreated(artworkCount,_name,_price,_sender,false,_description,_imgHash);
  	}
  	/*
  	@title purchaseProduct
  	@notice This function is triggered to transfer ownership of an artwork from one person to another and make payment
  	@param
  	_id: artwork id of product purchased
  	*/
  	function purchaseProduct(uint _id) public payable {
  		address payable _sender;
  		_sender = payable(msg.sender);
  		Artwork memory _artwork = artworks[_id];
  		address payable _seller = _artwork.owner;
 		require (_artwork.id <= artworkCount);
 		require(msg.value >= _artwork.price, "You do not have enough money");
 		require(!_artwork.isPurchased);
 		require(_seller != msg.sender, "This is his own artwork!");
  		transactionCount ++;
  		_artwork.isPurchased = true;
  		transactions[transactionCount] = Transaction(transactionCount,_artwork.price,_artwork.owner,_sender,_artwork.imgHash);
  		_artwork.owner = payable(msg.sender);
  		artworks[_id] = _artwork;
  		emit ArtworkSold(artworkCount,_artwork.name,_artwork.price,_sender,true,_artwork.description,_artwork.imgHash);
  		_seller.transfer(msg.value);
  	}
  	
}