// let submit = document.getElementById("b1").addEventListener('click', sendIt)


// document.getElementById("i1")
//     .addEventListener("keyup", function(event) {
//     event.preventDefault();
//     if (event.key === "Enter") {
//         document.getElementById("b1").click();
//     }
// });

// function getAllExceptions(array){
//     array.forEach(element => {
//         const newDiv = document.createElement("li")
//         const newContent = document.createTextNode(element)
//         newDiv.appendChild(newContent)
//         document.getElementById("p1").appendChild(newDiv)
//      });
    
// }

// function getLinks(link){
//     const newDiv = document.createElement("a")
//     const newContent = document.createTextNode(link)
//     newDiv.appendChild(newContent)
//     newDiv.href = link
//     document.getElementById("p1").appendChild(newDiv)
// }

// function sendIt(){
//     document.getElementById('p1').innerHTML = ''
//    let res = document.getElementById("i1").value.toLowerCase()
//    let excpList = merchants[res].exceptions
//    if(merchants[res] && merchants[res].links){
   
//     getAllExceptions(excpList)
//     getLinks(merchants[res].links)
//    } 

//    else if (merchants[res]&& !merchants[res].links){
//     getAllExceptions(excpList)
//    }
//    else {
//     document.getElementById('p1').innerHTML = "Please, check your spelling"
//    }
//    document.getElementById('i1').value = ''
// }



// chat gpt solution

// Get the merchant name from chrome storage
chrome.storage.local.get(['merchantName'], function(result) {
  // Handle case when no matching element was found
  if (result.merchantName === null) {
    document.getElementById('content').textContent = 'No matching merchant was found on the page.';
  } else {
    document.getElementById('content').textContent = result.merchantName;
  }
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