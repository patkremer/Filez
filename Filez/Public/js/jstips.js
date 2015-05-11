/*
2 – use === instead of ==

The == (or !=) operator performs an automatic type conversion if needed. The === (or !==) operator will not perform any conversion. It compares the value and the type, which could be considered faster than ==.

[10] === 10    // is false
[10]  == 10    // is true
'10' == 10     // is true
'10' === 10    // is false
 []   == 0     // is true
 [] ===  0     // is false
 '' == false   // is true but true == "a" is false
 '' ===   false // is false 


 3. undefined, null, 0, false, NaN, '' (empty string) are all falsy.
*/

// Select random item from array
var items = [12, 548, 'a', 2, 5478, 'foo', 8852, , 'Doe', 2145, 119];
var randomItem = items[Math.floor(Math.random() * items.length)];
//log("random item from array", randomItem);

// Get a random number in a specific range
var max = 100,
   min = 0;

//log("random number in range", x);

// generate an array of numbers with numbers from 0 to max;
//var numbersArray = [], max = 100;
//for (var i; numbersArray.push(i++) < max;);

//for (var i = 0; i < numbersArray.length; i++) {
//   log('generated numbers array at index ' + i, numbersArray[i]);
//}

// generate random set of alphanumeric charaters

//shuffle an array of numbers
var numbers = [5, 458, 120, -215, 228, 400, 122205, -85411];
numbers = numbers.sort(function () { return Math.random() - 0.5 });
/* the array numbers will be equal for example to [120, 5, 228, -215, 400, 458, -85411, 122205]  */
//log('numbers shuffled', numbers);


//Use splice instead of using delete to delete an item from an array. Using delete replaces the item with undefined instead of the removing it from the array.
//Instead of…
var items = [12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 ]; 
items.length; // return 11 
delete items[3]; // return true 
items.length; // return 11 
/* items will be equal to [12, 548, "a", undefined × 1, 5478, "foo", 8852, undefined × 1, "Doe", 2154,       119]   */
//Use…

var items = [12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 ]; 
items.length; // return 11 
items.splice(3,1) ; 
items.length; // return 10 
/* items will be equal to [12, 548, "a", 5478, "foo", 8852, undefined × 1, "Doe", 2154,       119]   */


//Pass functions, not strings, to setTimeout() and setInterval()
//If you pass a string into setTimeout() or setInterval(), the string will be evaluated the same way as with eval, which is slow. Instead of using…
//setInterval('doSomethingPeriodically()', 1000);  
//setTimeout('doSomethingAfterFiveSeconds()', 5000);
////…use…
//setInterval(doSomethingPeriodically, 1000);  
//setTimeout(doSomethingAfterFiveSeconds, 5000);


// Html escaper function 
function escapeHTML(text) {  
   var replacements= {"<": "&lt;", ">": "&gt;","&": "&amp;", "\"": "&quot;"};                      
   return text.replace(/[<>&"]/g, function(character) {  
      return replacements[character];  
   }); 
}

//41 – Set timeouts to XMLHttpRequests
//You could abort the connection if an XHR takes a long time (for example, due to a network issue), by using setTimeout() with the XHR call.
//var xhr = new XMLHttpRequest (); 
//xhr.onreadystatechange = function () {  
//   if (this.readyState == 4) {  
//      clearTimeout(timeout);  
//      // do something with response data 
//   }  
//}  
//var timeout = setTimeout( function () {  
//   xhr.abort(); // call error callback  
//}, 60*1000 /* timeout after a minute */ ); 
//xhr.open('GET', url, true);  

//xhr.send();
//As a bonus, you should generally avoid synchronous XHR calls completely.

//function GetData(url, success, failure) {
//   var xhr = new XMLHttpRequest();
//   var data;

//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//           if (xhr.status === 200 || !failure)
//               success(xhr.responseText);
//           else if (failure)
//               failure(xhr.status, xhr.statusText);
//       }
//   };
//   xhr.send(null);
   //if (xhr.status === 200) {
   //   return xhr;
   //} else {
   //   return 'There was an error with a status code ' + xhr.status + '!';
   //}
//}

function getSuccess(responseText) {
    log('success response text', responseText);
}
function getFailure(status, statusText) {
    log(status, statusText);
}





$(document).ready(function () {
   var xhr = new XMLHttpRequest();
   xhr.open('GET', '/Home/Keepalive', false);

   xhr.send(null);
   var data;

   if (xhr.status === 200) {
      data = JSON.parse(xhr.responseText);

      //log('response text', data);
      //log('response text', data.timeOut);


      SetSessionTimer();
   }

   var timeOut;
   var pageLoad;

   function SetSessionTimer() {
      SetPageTimes();
     
      setTimeout(ShowTimeoutAlert, timeOut);
   }

   function SetPageTimes() {
      pageLoad = new Date().getTime();
      //log('timeout', data.timeOut);
      //log('timeout', (data.timeOut - 1) * 60 * 1000);
      timeOut = (data.timeOut - 1) * 60 * 1000;
   }

   function ShowTimeoutAlert() {
      var request = new XMLHttpRequest();
      request.open('GET', '/Home/KeepAlive?status=yes', false);

      request.send(null);
      
      if (request.status === 200) {

         var container = $('#container');
        //og('container', container);
         container.append($('<p></p>').text(request.responseText));

         SetSessionTimer();
      } else {
         
         alert('Your session will be ending in 1 minute.');
         $('#container').append($('<p></p>').text(request.responseText));
      }

     
   }
   //ShowTimeoutAlert();

   function addText() {
      var container = $('#container');
      //log('container', container);
      container.append($('<p></p>').text('Interval is triggered'));
     
   }
   //setInterval(addText, 500);
   
   //GetData('/Api/Ballers', getSuccess, getFailure);
  // var ballers = JSON.parse(response.responseText);
   //log('response', response);
   //log('ballers', ballers);
});





//42 – Deal with WebSocket timeout
//Generally when a WebSocket connection is established, a server could time out your connection after 30 seconds of inactivity. The firewall could also time out the connection after a period of inactivity.
//To deal with the timeout issue you could send an empty message to the server periodically. To do this, add these two functions to your code: one to keep alive the connection and the other one to cancel the keep alive. Using this trick, you’ll control the timeout.
//Add a timerID…

var timerID = 0; 
function keepAlive() { 
    var timeout = 15000;  
    if (webSocket.readyState == webSocket.OPEN) {  
        webSocket.send('');  
}  
    timerId = setTimeout(keepAlive, timeout);  
}  
function cancelKeepAlive() {  
   if (timerId) {  
      cancelTimeout(timerId);  
   }  
}
//The keepAlive() function should be added at the end of the onOpen() method of the webSocket connection and the cancelKeepAlive() at the end of the onClose() method.



function log(name, value) {
   console.log(name);
   console.log(value);
}
