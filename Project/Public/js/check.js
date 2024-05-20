const CONVENIENCE_FEES = 99;

window.addEventListener('load', () => {
    loadBagItems();
    displayOrderSummary();
    setUpWeb3();
});

async function setUpWeb3() {
    try {
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            await ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    } catch (error) {
        console.error('Error in Web3 setup:', error);
    }

    document.getElementById('connect-metamask').addEventListener('click', connectMetamask);
}

async function connectMetamask() {
    try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        document.getElementById('pay-with-metamask').disabled = false;
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
    }
}

async function payWithMetamask() {
    const deliveryAddress = document.getElementById('delivery-address').value;
    const totalPrice = parseInt(document.getElementById('final-amount').innerText);

    document.getElementById('transaction-status').textContent = 'Transaction Pending';

    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const transactionParameters = {
            to: '0x334f0f502797c4b77d4ad38d1c851ddcf30f1e84', // Replace 'RECEIVER_ADDRESS' with your Ethereum wallet address
            from: accounts[0],
            value: ethereum.request({ method: 'eth_sendTransaction', params: [{ to: '0x334F0f502797C4B77D4aD38D1C851ddCF30f1e84', value: web3.utils.toWei(totalPrice.toString(), 'ether') }] })
        };

        await ethereum.sendTransaction(transactionParameters);

        document.getElementById('transaction-status').textContent = 'Transaction successful!';
        localStorage.removeItem('bagItems'); // Clear bag after successful order
    } catch (error) {
        console.error('MetaMask transaction error:', error);
        document.getElementById('transaction-status').textContent = 'Transaction failed. Please try again.';
    }
}
