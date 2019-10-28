
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://forthebadge.com) 
# WhatsApee [![Node version](https://img.shields.io/node/v/electron.svg?style=for-the-badge)](http://nodejs.org/) ![GitHub](https://img.shields.io/github/license/updatesvc/WhatsApee.svg?style=for-the-badge)
Whatsapee is a web based bot for Whatsapp.
This project is heavily inspired by [bruno222/whatsapp-web-bot](https://github.com/bruno222/whatsapp-web-bot)

A good substitute till WhatsApp releases their API  to the public.
However this code is not perfect for production it has a few bugs.


# Table of Contents
1. [How to use it](#toc1)
2. [Bot Logic](#toc2)
3. [FAQ](#toc3)
4. [Examples](#toc4)
5. [Todo](#toc5)
6. [Known Issues](#known-issues)


<a name="toc1"></a>
# How to use it?

 - Clone the repo. 
 -  Install the latest npm and nodeJS for your platform. 
 - Then in repo folder run the following commands 
 
     ```npm install```   
   then run   
   ```npm start```
      
 - Signin using QR code and see the bot run your logic, stored in
   **logic.js**

## Default logic
Have a friend text you this commands:
**@help** or **hi bot**

<a name="toc2"></a>
# Bot Logic
 All code goes into the logic.js file
 WhatsApee has two function that you can use
 
 ```Javascript 
 WhatsApee.start( receiver callback); 
 ```   
 sets the callback for the message handler.
 It should take three arguments :
 - message : body of message
 - chatElem : chat div element which is used as an identifier
 - title : chat title 
 
  ```Javascript 
 WhatsApee.send(chat Elem is like chat id , message to send goes here);
  ```  
  sends message to the chosen element .It takes two arguments :
 - chatElem : chat div element which is used as an identifier
 - message : body of message
 ## Example implementation
 ``` Javascript
const path = require('path')
const WhatsApee = require(path.join(__dirname, 'WhatsApee.js'))
//WhatsAppe.start( receiver callback)
WhatsApee.start(receiver);

function receiver (message,chatElem,title) {
	  //message to lower case
	var lcMessage = message.toLowerCase();
      if (lcMessage.includes("hi bot")) {                  
                  var welcomeMessage = `Hi , hooman`;   
                  //WhatsApee.send(chat Elem is like chat id , message to send goes here)               
                  WhatsApee.send(chatElem,welcomeMessage);                  
      }  
      
}
```
<a name="toc3"></a>
# FAQ

#### So it's possible to create a Bot in Whatsapp Web?

Yes, it is.

#### Am I going to be banned?

Hum, so you already know that Whatsapp does not allow Bots, right?

Well, you're right: Whatsapp will ban you forever if they discovery you are running a Bot on long-term. For a small test: Don't worry, go forward.



**I can't guarantee that you are not getting banned in a long term using this Bot. I really don't think so, but I can't guarantee.**

#### BS! I got banned using yowsup!

Hold on mate, there are kids here.

First, [yowsup](https://github.com/tgalal/yowsup) is a great python library! Simply awesome.

But their problem is: They connect to Whatsapp servers directly, without any middlware. So it is not so hard for whatsapp team to create ban-rules you if you are using yowsup.

I got banned many times in past, so I know, soon or later, you will get banned as well. Is just a matter of time.  You can see that I am probably right just looking [here](https://github.com/tgalal/yowsup/issues/1558), 
[here](https://github.com/tgalal/yowsup/issues/1979), 
[here](https://github.com/tgalal/yowsup/issues/1806) and
[here](https://github.com/tgalal/yowsup/issues/1686).

That's why I did this code. Using whatsapp web, it is almost impossible for whatsapp team to know that you are running a Bot.

#### But... What are the limitations?

A lot of limitations!

1. As you are handling DOM direcly, you can't process hundred of messages at once. Yowsup is much better at this subject.

2. You can't start a message with a unknown person. You can only answer them, mainly because you can't add a new fellow on the Contacts list on Whatsapp Web.

2. You have to install Whatsapp on your phone, connect it on Wifi and keep it charging all the time. So you have to have a cellphone exclusively for this Bot. You will need a computer with software running as well. But that's the main objective: In order to avoid being detect as a Bot, so you have to play this boring cat-and-rat game.

#### I think there're some bugs on your code.

Yes, there are.

1. Your friend can't send `@HELP` followed of any other message really fast. This Bot only reads the last message. It's a buggy (that can be fixed)

Feel free to fix and PR it.
<a name="toc3"></a>
# Examples
- [WhatsApeeBot](https://github.com/updatesvc/WhatsApeeBot)
<a name="toc4"></a>
# TODO
- better message detection
- diagflow AI bot
- image upload capabilities
- add support for business accounts

# Known Issues
- Does not work with business accounts

#### if you like it, starr it ⭐ 

"This project is licensed under the terms of the MIT license." [![GitHub](https://img.shields.io/github/license/updatesvc/WhatsApee.svg?style=for-the-badge)](https://github.com/updatesvc/WhatsApee/blob/master/license.md)

Made by [@updatesvc](https://github.com/updatesvc/WhatsApee)


