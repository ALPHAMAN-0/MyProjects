// Content script that runs on DPDC website
console.log('DPDC Bill Extractor: Content script loaded');

// Function to extract bill amount from the page
function extractBillAmount() {
    try {
        // Try multiple selectors to find the bill amount
        let amount = null;
        let customerNumber = null;
        
        // Extract customer number from input field
        const accountInput = document.querySelector('input[name="accountId"]');
        if (accountInput) {
            customerNumber = accountInput.value;
        }
        
        // Method 1: Look for table cells with amount
        const tableCells = document.querySelectorAll('th.MuiTableCell-body, td.MuiTableCell-body');
        for (const cell of tableCells) {
            const text = cell.textContent.trim();
            // Match patterns like "৳ 805.54" or "805.54"
            const match = text.match(/৳?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/);
            if (match) {
                amount = match[1].replace(/,/g, '');
                break;
            }
        }
        
        // Method 2: Look for any element containing amount
        if (!amount) {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
                const text = el.textContent.trim();
                if (text.includes('৳') && text.length < 50) {
                    const match = text.match(/৳?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/);
                    if (match) {
                        amount = match[1].replace(/,/g, '');
                        break;
                    }
                }
            }
        }
        
        // Method 3: Look in specific parent elements
        if (!amount) {
            const containers = document.querySelectorAll('.MuiTableCell-root, .amount, .bill-amount, [class*="amount"]');
            for (const container of containers) {
                const text = container.textContent.trim();
                const match = text.match(/৳?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/);
                if (match) {
                    amount = match[1].replace(/,/g, '');
                    break;
                }
            }
        }
        
        return {
            amount: amount ? parseFloat(amount) : null,
            customerNumber: customerNumber,
            extractedAt: new Date().toISOString(),
            url: window.location.href
        };
    } catch (error) {
        console.error('Error extracting bill amount:', error);
        return {
            amount: null,
            error: error.message
        };
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractBill') {
        console.log('Extracting bill amount...');
        const billData = extractBillAmount();
        console.log('Extracted data:', billData);
        sendResponse(billData);
    }
    return true; // Keep the message channel open for async response
});

// Auto-detect and notify when bill amount is available
function autoDetectBill() {
    const billData = extractBillAmount();
    if (billData.amount) {
        // Store in chrome storage for popup to access
        chrome.storage.local.set({ 
            lastExtractedBill: billData 
        });
        
        // Show a subtle notification on the page
        showNotification(`Bill Amount Detected: ৳${billData.amount}`, 'success');
    }
}

// Show notification on the DPDC page
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.getElementById('dpdc-extension-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.id = 'dpdc-extension-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 999999;
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Run auto-detection after page loads
setTimeout(autoDetectBill, 2000);

// Also listen for dynamic content changes
const observer = new MutationObserver(() => {
    autoDetectBill();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
