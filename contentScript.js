
// parsing CSV, Observer, Display data 

// Fetch and parse CSV

let data;
fetch(chrome.runtime.getURL('exceptions.csv'))
    .then(response => response.text())
    .then(text => {
        data = Papa.parse(text, { header: true }).data;
    });

let observer = new MutationObserver((mutationsList, observer) => {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            let elements = document.querySelectorAll('body > div.cp-cockpit.ng-scope > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2) > div.cp-value > span > a, body > div.cp-cockpit.ng-scope > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(3) > div.cp-value > span > a');
            if (elements && elements.length) {
                let merchantId;
                for (let element of elements) {
                    let href = element.getAttribute('href');
                    // Check if href is of the form `https://ngadmin.riskxint.com/admin/ngadmin/#/merchants/<merchantId>`
                    if (href.includes('/merchants/')) {
                        merchantId = href.split('/').pop();
                    } else {
                        merchantId = href;
                    }
                }

                // Check if the merchantId is in the CSV data
                let info = data.find(row => row.merchant_id === merchantId);
                if (info) {
                    // If info exists for this merchant ID, create a popup
                    var popupDiv = document.createElement('div');
                    popupDiv.className = 'popupClass'; // add a class name to div for styling

                    // Create a div to hold the data
                    var infoDiv = document.createElement('div');
                    infoDiv.className = 'infoClass';

                    // Assume `info` is an object like { merchant_id: '123', name: 'Merchant name', field1: 'data1', field2: 'data2', ... }
                    for (let key in info) {
                        if (info.hasOwnProperty(key) && info[key] !== null && info[key] !== '') { // Check if value is not null or empty
                            let keyValueDiv = document.createElement('div');
                            keyValueDiv.className = 'keyValueClass';                                    

                            let keyDiv = document.createElement('div');
                            keyDiv.textContent = key;
                            keyDiv.className = key; // here we assign the class name to be the key itself
                            keyValueDiv.appendChild(keyDiv);                                    

                            let valueDiv = document.createElement('div');
                            valueDiv.textContent = info[key];
                            valueDiv.className = 'valueClass';
                            keyValueDiv.appendChild(valueDiv);                                    

                            infoDiv.appendChild(keyValueDiv);
                        }
                    }
                    

                    popupDiv.appendChild(infoDiv);
                    // styler to be moved overto style sheet
                    popupDiv.style.minHeight = '250px'; // Minimum height
                    popupDiv.style.maxHeight = '90vh'; // Maximum height, 90% of the viewport height
                    popupDiv.style.overflowY = 'auto'; // Add a scrollbar if the content exceeds the max height

                    popupDiv.style.position = 'fixed';
                    popupDiv.style.top = '10px';
                    popupDiv.style.right = '10px';
                    popupDiv.style.backgroundColor = 'rgb(186 151 255 / 80%)';
                    popupDiv.style.padding = '20px';
                    popupDiv.style.border = '2px';
                    popupDiv.style.zIndex = 9999;
                    popupDiv.style.position = 'fixed';
                    popupDiv.style.boxShadow = 'rgb(0 0 0 / 29%) 6px 10px 14px 2px';
                    popupDiv.style.borderRadius = '5px';
                    // popupDiv.style.height = '250px';
                    // popupDiv.style.width = '350px';
                    popupDiv.style.color = 'white';
                    popupDiv.style.backdropFilter = 'blur(1px)';

                    // Create a close button
                    var closeButton = document.createElement('button');
                    closeButton.textContent = 'x';
                    closeButton.style.position = 'absolute';
                    closeButton.style.top = '0';
                    closeButton.style.right = '0';
                    closeButton.style.backgroundColor = 'transparent';
                    closeButton.style.border = 'none';
                    closeButton.style.cursor = 'pointer';
                    closeButton.style.fontSize = '15px';
                    // Add the click event listener to the close button
                    closeButton.addEventListener('click', function() {
                        document.body.removeChild(popupDiv);
                    });

                    // Add the close button to the popup div
                    popupDiv.appendChild(closeButton);

                    // Add the popup div to the page
                    document.body.appendChild(popupDiv);

                    // Once we've found the element and displayed the popup, we don't need to observe anymore
                    observer.disconnect();
                    break;
                }
            }
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });



