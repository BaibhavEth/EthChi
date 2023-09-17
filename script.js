const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "batchStages",
		"outputs": [
			{
				"internalType": "enum SupplyChainContract.Stage",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "batchToProduct",
		"outputs": [
			{
				"internalType": "string",
				"name": "productId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "expiryDate",
				"type": "string"
			},
			{
				"internalType": "enum SupplyChainContract.Stage",
				"name": "stage",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "stages",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			}
		],
		"name": "getProductDetailsByBatch",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "enum SupplyChainContract.Stage",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			}
		],
		"name": "getProductStageByBatch",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_productId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expiryDate",
				"type": "string"
			}
		],
		"name": "initializeProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			}
		],
		"name": "moveToNextStage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];  
    const contractAddress = '0x7584C0Aaf3466A604AE4b3008bdeecD77502D225';  // Deployed contract address
    let contract;

    const labAddress = '0x809f55C55868BE01AF3E8A16AB2ecb7A86aF6Ae2';  
    const warehouseAddress = '0x5ba0Fab8BFd1DE64353744E19Ac517c3196c7772'; 
    const pharmacyAddress = '0xFa2EC6a29Ab999C1c1D0840c9A5BcD27eC27b519';  
    const consumerAddress="0x43eD152A9E3C1ff49b1604aB7232B207769Ea502"
   window.addEventListener('load', async () => {
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  await window.ethereum.enable();
  contract = new web3.eth.Contract(contractABI, contractAddress);

  const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
  const currentAddress = accounts[0];

  if (currentAddress.toLowerCase() === labAddress.toLowerCase()) {
    document.getElementById('labDiv').style.display = 'block';
  } else if (currentAddress.toLowerCase() === warehouseAddress.toLowerCase()) {
    document.getElementById('warehouseDiv').style.display = 'block';
  } else if (currentAddress.toLowerCase() === pharmacyAddress.toLowerCase()) {
    document.getElementById('pharmacyDiv').style.display = 'block';
  }
});

// Initialize Product
document.getElementById('initializeProduct').addEventListener('submit', async (e) => {
  e.preventDefault();
  const productId = document.getElementById('productId').value;
  const expiryDate = document.getElementById('expiryDate').value;
  const batchNumber = document.getElementById('batchNumber').value;
  const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});

  await contract.methods.initializeProduct(productId, expiryDate, batchNumber).send({
    from: accounts[0]
  });
});

// Move Product in Warehouse
document.getElementById('moveProductWarehouse').addEventListener('submit', async (e) => {
  e.preventDefault();
  const productId = document.getElementById('moveProductIdWarehouse').value;
  const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});

  await contract.methods.moveToNextStage(productId).send({
    from: accounts[0]
  });
});

// Get Product for Pharmacy
document.getElementById('getProductConsumer').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const batchId = document.getElementById('getProductIdConsumer').value; // Changed to batchId for clarity
  
  // Fetch product details

  document.getElementById('productDetails').textContent = "";
  console.log("works tll here")
  // Fetch product stage
  const stage = await contract.methods.getProductStageByBatch(batchId).call();
  console.log(stage)
  if (parseInt(stage) >=2) { // 3 for ShippedToPharmacy stage in the enum
    let verifiedMessage = "<span style='font-size: 36px;'>✓</span>";
    verifiedMessage += "<ul>";
    verifiedMessage += "<li>Process took all the right procedures</li>";
    verifiedMessage += "<li>It was shipped to a licensed warehouse</li>";
    verifiedMessage += "</ul>";
    document.getElementById('productDetails').innerHTML += verifiedMessage;
  }
  else{
    let verifiedMessage = "<span style='font-size: 36px;'>STOP</span>";
    verifiedMessage += "<ul>";
    verifiedMessage += "<li>Process was not verifiable</li>";
    verifiedMessage += "<li>Please report NOW</li>";
    verifiedMessage += "</ul>";
    document.getElementById('productDetails').innerHTML += verifiedMessage;
    
  }
});



// Initialize Product
document.getElementById('initializeProduct').addEventListener('submit', async (e) => {
  e.preventDefault();
  const productId = document.getElementById('productId').value;
  const expiryDate = document.getElementById('expiryDate').value;
  const batchNumber = document.getElementById('batchNumber').value;
  const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});

  await contract.methods.initializeProduct(productId, expiryDate, batchNumber).send({
    from: accounts[0]
  });

  // Call animateDiv to change the appearance of labDiv
  animateDiv('labDiv', 'green', 'white');
});

// Move Product in Warehouse


// Animate div function
function animateDiv(divId, bgColor, textColor) {
  const div = document.getElementById(divId);
  div.style.backgroundColor = bgColor;
  div.style.color = textColor;
  setTimeout(() => {
    div.style.backgroundColor = "";
    div.style.color = "";
  }, 1000);
}
