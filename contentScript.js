// Predtermine mapping of fields for UI


let fieldNamesMap = {
    "merchant_id": "Merchant ID",
    "merchant_name": "Merchant Name",
    "shipping_exceptions": "Shipping Exceptions",
    "chargaback_notice_reason_code": "CHB Notices and Reason Codes",
    "other": "Notes",
    // etc.
};

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
                    if (href.includes('/merchants/')) {
                        merchantId = href.split('/').pop();
                    } else {
                        merchantId = href;
                    }
                }

                let info = data.find(row => row.merchant_id === merchantId);
                if (info) {
                    var popupDiv = document.createElement('div');
                    popupDiv.className = 'popupClass';

                    var infoDiv = document.createElement('div');
                    infoDiv.className = 'infoClass';

                    for (let key in info) {
                        if (info.hasOwnProperty(key) && info[key] !== null && info[key] !== '') {
                            let keyValueDiv = document.createElement('div');
                            keyValueDiv.className = 'keyValueClass';                

                            let keyDiv = document.createElement('div');
                            keyDiv.textContent = fieldNamesMap[key] || key; // Use the mapped name if it exists, otherwise use the key itself
                            keyDiv.className = key;
                            keyValueDiv.appendChild(keyDiv);                                   

                            let valueDiv = document.createElement('div');
                            valueDiv.textContent = info[key];
                            valueDiv.className = 'valueClass';
                            keyValueDiv.appendChild(valueDiv);                                    

                            infoDiv.appendChild(keyValueDiv);
                        }
                    }

                    popupDiv.appendChild(infoDiv);
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


