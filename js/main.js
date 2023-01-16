const web3 = new Web3(Web3.givenProvider)
let contractAddress = "0x2fb201C382b4b8D18D45Fb18562DFE02DC174a3f"
let contract = null
let account = null
let counter = null
let owner = null

$(document).ready(async function () {
    const chainId = await web3.eth.getChainId()

    if (chainId === 5) {
        fetch("../contract_abi.json").then(
            response => {
                return response.json()
            }
        ).then(async abi => {
            contract = new web3.eth.Contract(abi, contractAddress);
            account = await web3.eth.getAccounts()
            owner = await contract.methods.owner().call()
            counter = await contract.methods.counter().call()
        })
    } else {
        Swal.fire({
            title: 'Unable to Connect',
            text: 'You need to connect your MetaMask wallet to Goerli chain to play this game.',
            icon: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            iconColor: 'beige',
            customClass: 'swal-style'
        }).then(() => {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        })
    }
})

window.ethereum.on('accountsChanged', async function () {
    window.location.reload()
})

// if the user switches the chain
window.ethereum.on('chainChanged', function (_chainId) {
    window.location.replace('../html/index.html')
})