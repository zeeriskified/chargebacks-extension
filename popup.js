

// Get the merchant name from chrome storage
chrome.storage.local.get(['merchantName'], function(result) {
  // Handle case when no matching element was found
  if (result.merchantName === null) {
    document.getElementById('content').textContent = 'No matching merchant was found on the page.';
  } else {
    document.getElementById('content').textContent = result.merchantName;
  }
});

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let trackingNumber = document.getElementById('trackingNumber').value;

    // Now you would build the URL to redirect to the getcircuit with the tracking number.
    let circuitUrl = 'https://getcircuit.com/package-tracker/tracking?trackingCode=' + encodeURIComponent(trackingNumber);

    // Now open the URL in a new tab.
    chrome.tabs.create({ url: circuitUrl });
});


const merchants = {
    'zara': {
        'exceptions':['exception1', 'exception2', 'exception3'],
        'links':'',
        'images':''
    },
    'lv': {
        'exceptions':['exception1', 'exception2', 'exception3'],
        'links':'',
        'images':''
    },
    'eufyus':{
        'exceptions':['exception1', 'exception2', 'exception3'],
        'links':'',
        'images':''
    },
    'aldo':{
        'exceptions':['Aldo do no have notices or reason codes therefore, we do not request reason codes or notices as they do not have them.'],
        'links':'',
        'images':''
    },
    'alibaba':{
        'exceptions':['Excluded shipping from chargeback automation - This was approved by Naama'],
        'links':'https://riskified.atlassian.net/browse/CSP-1154',
        'images':''
    }

}