// CHAT GPT 

// Grab MID and Name, store it and then forget completely. Prevent caching from previous page load
let observer = new MutationObserver((mutationsList, observer) => {
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      let element = document.querySelector('body > div.cp-cockpit.ng-scope > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2) > div.cp-value > span > a');
      if (element) {
        let merchantName = element.textContent;
        let href = element.getAttribute('href');
        let merchantId = href.split('/').pop();

        // Store the merchant name and ID found on the page to chrome storage
        chrome.storage.local.set({merchantName: merchantName, merchantId: merchantId});
        
        // Check if we have additional information for this merchant
        const info = data[merchantId];
        if (info) {
          // If we do, show the popup
          showPopup(info);
        }

        // Once we've found the element, we don't need to observe anymore
        observer.disconnect();
        break;
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function showPopup(info) {
  // Create a popup div
  var popupDiv = document.createElement('div');
  popupDiv.textContent = info;
  popupDiv.style.position = 'fixed';
  popupDiv.style.top = '10px';
  popupDiv.style.right = '10px';
  popupDiv.style.backgroundColor = 'rgb(186 151 255 / 80%)';
  popupDiv.style.padding = '20px';
  popupDiv.style.border = '2px solid white';
  popupDiv.style.zIndex = 9999;
  popupDiv.style.boxShadow = 'rgb(0 0 0 / 29%) 6px 10px 14px 2px';
  // '3px 5px 6px 1px rgba(6, 5, 23, 0.26)';
  popupDiv.style.borderRadius = '5px';
  popupDiv.style.height = '250px';
  popupDiv.style.width = '350px';
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
}




// ----- start --- caching issue presented. 
// Grab MID and Merchant Name 

// let observer = new MutationObserver((mutationsList, observer) => {
//   for(let mutation of mutationsList) {
//     if (mutation.type === 'childList') {
//       let element = document.querySelector('body > div.cp-cockpit.ng-scope > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2) > div.cp-value > span > a');
//       if (element) {
//         let merchantName = element.textContent;
//         let href = element.getAttribute('href');
//         let merchantId = href.split('/').pop();

//         // Store the merchant name and ID found on the page to chrome storage
//         chrome.storage.local.set({merchantName: merchantName, merchantId: merchantId});
        
//         // Once we've found the element, we don't need to observe anymore
//         observer.disconnect();
//         break;
//       }
//     }
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// // grab data for info on the merchant

// chrome.storage.local.get(['merchantId'], function(result) {
//   const info = data[result.merchantId];
//   if (info) {
//     // If info exists for this merchant ID, show it
//     chrome.notifications.create({
//       type: 'basic',
//       iconUrl: 'icon.png',  // Path to your extension's icon or other suitable image
//       title: 'Information found',
//       message: info
//     });
//   } else {
//     // No additional information found
//   }
// });

// // notification pop up for data found instances 

// chrome.storage.local.get(['merchantId'], function(result) {
//   const info = data[result.merchantId];
//   if (info) {
//     // If info exists for this merchant ID, create a popup
//     var popupDiv = document.createElement('div');
//     popupDiv.textContent = info;
//     popupDiv.style.position = 'fixed';
//     popupDiv.style.top = '10px';
//     popupDiv.style.right = '10px';
//     popupDiv.style.backgroundColor = '#5A4CFF';
//     popupDiv.style.padding = '20px';
//     popupDiv.style.border = '2px';
//     popupDiv.style.zIndex = 9999;

//     // Create a close button
//     var closeButton = document.createElement('button');
//     closeButton.textContent = 'X';
//     closeButton.style.position = 'absolute';
//     closeButton.style.top = '0';
//     closeButton.style.right = '0';
//     closeButton.style.backgroundColor = 'transparent';
//     closeButton.style.border = 'none';
//     closeButton.style.cursor = 'pointer';
//     closeButton.style.fontSize = '20px';

//     // Add the click event listener to the close button
//     closeButton.addEventListener('click', function() {
//       document.body.removeChild(popupDiv);
//     });

//     // Add the close button to the popup div
//     popupDiv.appendChild(closeButton);

//     // Add the popup div to the page
//     document.body.appendChild(popupDiv);
//   }
// });



// ------end


// try 3 WINNER WINNER CHICKEN DINNER
// let observer = new MutationObserver((mutationsList, observer) => {
//   for(let mutation of mutationsList) {
//     if (mutation.type === 'childList') {
//       let element = document.querySelector('body > div.cp-cockpit.ng-scope > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2) > div.cp-value > span > a');
//       if (element) {
//         let merchantName = element.textContent;

//         // Store the merchant name found on the page to chrome storage
//         chrome.storage.local.set({merchantName: merchantName});
        
//         // Once we've found the element, we don't need to observe anymore
//         observer.disconnect();
//         break;
//       }
//     }
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });






