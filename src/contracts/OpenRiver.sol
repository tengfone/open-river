pragma solidity ^0.8.0;
contract OpenRiver{
	string public productName;
	uint public artworkCount = 0;
	uint public transactionCount = 0;

	struct Artwork {
		uint id;
		string name;
		uint price;
		address payable owner;
		bool isPurchased;
		string description;
		string imgHash;
	}
	struct Transaction {
		uint TransactionID;
		uint value;
		address from;
		address to;
		string imgHash;
	}
	mapping(uint => Artwork) public artworks;
	mapping(uint => Transaction) public transactions;
	event ArtworkCreated(
		uint id,
		string name,
		uint price,
		address payable owner,
		bool isPurchased,
		string description,
		string imgHash

	);

	event ArtworkSold(
		uint id,
		string name,
		uint price,
		address payable owner,
		bool isPurchased,
		string description,
		string imgHash
	);

	constructor() public {
    	productName = "Project";
  	}

  	function uploadArtwork(string memory _name, uint _price, string memory _description,string memory _imgHash) public payable{
  		require(bytes(_name).length > 0);
  		require(_price > 0);
  		require(bytes(_imgHash).length > 0);
  		address payable _sender;
  		_sender = payable(msg.sender);
  		artworkCount ++;
  		artworks[artworkCount] = Artwork(artworkCount,_name,_price,_sender,false,_description,_imgHash);
  		emit ArtworkCreated(artworkCount,_name,_price,_sender,false,_description,_imgHash);
  	}

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
  		_seller.transfer(msg.value);
  		_artwork.isPurchased = true;
  		transactions[transactionCount] = Transaction(transactionCount,_artwork.price,_artwork.owner,_sender,_artwork.imgHash);
  		_artwork.owner = payable(msg.sender);
  		artworks[_id] = _artwork;
  		emit ArtworkSold(artworkCount,_artwork.name,_artwork.price,_sender,true,_artwork.description,_artwork.imgHash);
  	}

  	//check the data type of msg.sender
  	// function getID () constant returns(uint){
  	// 	return msg.sender;
  	// }
  	
}