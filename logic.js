const path = require('path')
const WhatsApee = require(path.join(__dirname, 'WhatsApee.js'))
//WhatsAppe.start( receiver callback)
WhatsApee.start(receiver);
// 
function receiver (message,chatElem,title) {
	  //message to lower case
	var lcMessage = message.toLowerCase();
      if (lcMessage.includes("hi bot")) {                  
                  var welcomeMessage = `Hi , hooman`;   
                  //WhatsApee.send(chat Elem is like chat id , message to send goes here)               
                  WhatsApee.send(chatElem,welcomeMessage);                  
      }  
      
}