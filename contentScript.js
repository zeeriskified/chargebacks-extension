// Predtermine mapping of fields for UI

let fieldNamesMap = {
    "merchant_id": "Merchant ID",
    "merchant_name": "Merchant Name",
    "shipping_exceptions": "Shipping Exceptions",
    "chargeback_notice_reason_code": "CHB Notices and Reason Codes",
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
                  // Create the main popup div
                    var popupDiv = document.createElement('div');
                    popupDiv.className = 'popupClass';


                      // Create the image div
                    var imageDiv = document.createElement('div');
                          imageDiv.style.backgroundImage = "url(" + chrome.runtime.getURL('review.png') + ")";
                          imageDiv.style.backgroundRepeat = 'no-repeat';
                          imageDiv.style.backgroundSize = 'cover';
                          imageDiv.style.backgroundPosition = 'center top';
                          imageDiv.style.height = '160px'; // adjust as needed
                          imageDiv.style.width = '100%';                          

                          // Add the image div to the body first
                          popupDiv.appendChild(imageDiv);



                    var infoDiv = document.createElement('div');
                    infoDiv.className = 'infoClass';
                    infoDiv.className = 'infoClass';
                    infoDiv.style.color = '#white'; // Changes text color to blue
                    infoDiv.style.backgroundColor = '#ba97fff2'; // Changes background color to yellow
                    // infoDiv.style.padding = '1px'
                    infoDiv.style.paddingLeft = '10px';
                    infoDiv.style.paddingTop = '1px';
                    infoDiv.style.paddingBottom ='1px';
                    infoDiv.style.paddingRight = '10px';

                    for (let key in info) {
                        if (info.hasOwnProperty(key) && info[key] !== null && info[key] !== '') {
                            let keyValueDiv = document.createElement('div');
                            keyValueDiv.className = 'keyValueClass';                

                            let keyDiv = document.createElement('div');
                            keyDiv.textContent = fieldNamesMap[key] || key; // Use the mapped name if it exists, otherwise use the key itself
                            keyDiv.className = key;
                            keyValueDiv.appendChild(keyDiv);
                            keyDiv.style.fontWeight = 'bold';
                            keyDiv.style.marginTop = '12px';

                            let valueDiv = document.createElement('div');
                            valueDiv.className = 'valueClass';
                            // Check if the value string matches a numbered list pattern
                            if (/\d+\.\s*/.test(info[key])) {
                                // If it does, split it into separate list items and create a new div for each one
                                let listItems = info[key].split(/\d+\.\s*/);
                                for (let item of listItems) {
                                    if (item !== "") { // to ignore any empty items
                                        let listItemDiv = document.createElement('div');
                                        listItemDiv.textContent = item;
                                        valueDiv.appendChild(listItemDiv);
                                    }
                                }
                            } else {
                                // If it doesn't, just set the textContent of the valueDiv as before
                                valueDiv.textContent = info[key];
                            }
                            keyValueDiv.appendChild(valueDiv);
                            valueDiv.style.marginBottom = '10px';

                            infoDiv.appendChild(keyValueDiv);
                        }
                    }

                    popupDiv.appendChild(infoDiv);
                    popupDiv.style.minHeight = '250px';
                    popupDiv.style.maxHeight = '90vh';
                    popupDiv.style.maxWidth = '450px';
                    popupDiv.style.overflowY = 'auto';
                    popupDiv.style.position = 'fixed';
                    popupDiv.style.top = '10px';
                    popupDiv.style.right = '10px';
                    popupDiv.style.backgroundColor = 'rgb(186 151 255 / 27%)';
                    popupDiv.style.padding = '20px';
                    popupDiv.style.border = '2px';
                    popupDiv.style.zIndex = 9999;
                    popupDiv.style.position = 'fixed';
                    popupDiv.style.boxShadow = 'rgb(0 0 0 / 29%) 6px 10px 14px 2px';
                    popupDiv.style.borderRadius = '5px';
                    popupDiv.style.color = 'white';
                    popupDiv.style.backdropFilter = 'blur(1px)';

                    // // Get all elements with the class 'infoClass'
                    // var infoClassStyle = document.getElementsByClassName('infoClass');                    

                    // // Loop through each element
                    // for (var i = 0; i < infoClassStyle.length; i++) {
                    //     // Apply styles
                    //     infoClassStyle[i].style.color = 'blue'; // Changes text color to blue
                    //     infoClassStyle[i].style.backgroundColor = 'yellow'; // Changes background color to yellow
                    // }

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


