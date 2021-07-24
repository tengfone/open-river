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
		string imgHash

	);

	event ArtworkSold(
		uint id,
		string name,
		uint price,
		address payable owner,
		bool isPurchased,
		string imgHash
	);

	constructor() public {
    	productName = "Project";
  	}

  	function uploadArtwork(string memory _name, uint _price, string memory _imgHash) public {
  		require(bytes(_name).length > 0);
  		require(_price > 0);
  		require(bytes(_imgHash).length > 0);
  		artworkCount ++;
  		artworks[artworkCount] = Artwork(artworkCount,_name,_price,msg.sender,false,_imgHash);
  		emit ArtworkCreated(artworkCount,_name,_price,msg.sender,false,_imgHash);
  	}

  	function purchaseProduct(uint _id) public payable {
  		Artwork memory _artwork = artworks[_id];
  		address payable _seller = _artwork.owner;
  		require(_artwork.id > 0 && _artwork.id <= artworkCount);
  		require(msg.value >= _artwork.price);
  		require(!_artwork.isPurchased);
  		require(_seller != msg.sender, "This is his own artwork!");
  		transactionCount ++;

  		address(_seller).transfer(msg.value);
  		_artwork.purchased = true;
  		transactions[transactionCount] = Transaction(transactionCount,_artwork.price,_artwork.owner,msg.sender,_artwork.imgHash);
  		_artwork.owner = msg.sender;
  		artworks[_id] = _artwork;
  		emit ArtworkSold(artworkCount,_artwork.name,_artwork.price,msg.sender,true);
  	}

  	//check the data type of msg.sender
  	// function getID () constant returns(uint){
  	// 	return msg.sender;
  	// }
  	
}