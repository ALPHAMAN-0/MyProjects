// Popup script
let extractedBillData = null;

// DOM Elements
const extractBtn = document.getElementById('extractBtn');
const sendToTrackerBtn = document.getElementById('sendToTrackerBtn');
const billDataSection = document.getElementById('billDataSection');
const messageContainer = document.getElementById('messageContainer');
const trackerUrlInput = document.getElementById('trackerUrl');

// Load saved tracker URL
chrome.storage.local.get(['trackerUrl'], (result) => {
    if (result.trackerUrl) {
        trackerUrlInput.value = result.trackerUrl;
    }
});

// Save tracker URL when changed
trackerUrlInput.addEventListener('change', () => {
    chrome.storage.local.set({ trackerUrl: trackerUrlInput.value });
    showMessage('Finance Tracker URL saved!', 'success');
});

// Extract bill button
extractBtn.addEventListener('click', async () => {
    setLoading(extractBtn, true);
    showMessage('Extracting bill data...', 'info');
    
    try {
        // Get current active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Check if we're on DPDC website
        if (!tab.url.includes('amiapp.dpdc.org.bd')) {
            showMessage('Please navigate to the DPDC website first!', 'error');
            setLoading(extractBtn, false);
            return;
        }
        
        // Send message to content script
        chrome.tabs.sendMessage(tab.id, { action: 'extractBill' }, (response) => {
            setLoading(extractBtn, false);
            
            if (chrome.runtime.lastError) {
                showMessage('Error: ' + chrome.runtime.lastError.message, 'error');
                return;
            }
            
            if (response && response.amount) {
                extractedBillData = response;
                displayBillData(response);
                showMessage('Bill extracted successfully!', 'success');
                sendToTrackerBtn.classList.remove('hidden');
            } else {
                showMessage('Could not find bill amount on the page. Make sure the bill is loaded.', 'error');
            }
        });
    } catch (error) {
        setLoading(extractBtn, false);
        showMessage('Error: ' + error.message, 'error');
    }
});

// Send to tracker button
sendToTrackerBtn.addEventListener('click', async () => {
    if (!extractedBillData || !extractedBillData.amount) {
        showMessage('No bill data to send!', 'error');
        return;
    }
    
    setLoading(sendToTrackerBtn, true);
    
    try {
        const trackerUrl = trackerUrlInput.value;
        
        // Prepare transaction data
        const transactionData = {
            description: `DPDC Electricity Bill - ${extractedBillData.customerNumber || 'N/A'}`,
            amount: extractedBillData.amount,
            type: 'expense',
            category: 'bills',
            date: new Date().toISOString().split('T')[0],
            source: 'dpdc-extension'
        };
        
        // Store data for the Finance Tracker to pick up
        chrome.storage.local.set({ 
            pendingTransaction: transactionData,
            transactionTimestamp: Date.now()
        });
        
        // Open Finance Tracker in a new tab
        chrome.tabs.create({ url: trackerUrl }, (tab) => {
            showMessage('Opening Finance Tracker...', 'success');
            
            // Wait for the tab to load and send the transaction
            setTimeout(() => {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'addTransaction',
                    data: transactionData
                }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.log('Will use storage method instead');
                    }
                });
            }, 2000);
        });
        
        setTimeout(() => {
            setLoading(sendToTrackerBtn, false);
            showMessage('Transaction sent! Check your Finance Tracker.', 'success');
        }, 1000);
        
    } catch (error) {
        setLoading(sendToTrackerBtn, false);
        showMessage('Error: ' + error.message, 'error');
    }
});

// Display bill data
function displayBillData(data) {
    document.getElementById('billAmount').textContent = data.amount.toFixed(2);
    document.getElementById('customerNumber').textContent = data.customerNumber || 'N/A';
    
    const date = new Date(data.extractedAt);
    document.getElementById('extractedTime').textContent = date.toLocaleString();
    
    billDataSection.classList.remove('hidden');
}

// Show message
function showMessage(text, type = 'info') {
    messageContainer.innerHTML = `
        <div class="message ${type}">
            ${text}
        </div>
    `;
    
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 5000);
}

// Set loading state
function setLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<div class="loading"></div> Loading...';
    } else {
        button.disabled = false;
        if (button.id === 'extractBtn') {
            button.innerHTML = '📊 Extract Bill from DPDC';
        } else {
            button.innerHTML = '✅ Send to Finance Tracker';
        }
    }
}

// Check for previously extracted bill on load
chrome.storage.local.get(['lastExtractedBill'], (result) => {
    if (result.lastExtractedBill && result.lastExtractedBill.amount) {
        extractedBillData = result.lastExtractedBill;
        displayBillData(result.lastExtractedBill);
        sendToTrackerBtn.classList.remove('hidden');
        showMessage('Previous bill data loaded', 'info');
    }
});
