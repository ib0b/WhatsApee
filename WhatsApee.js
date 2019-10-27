//
// GLOBAL VARS AND CONFIGS
//
var lastMessageOnChat = false
var ignoreLastMsg = {}
var elementConfig = {
  chats: [0, 0, 5, 2, 0, 3, 0, 0, 0],
  chat_icons: [0, 0, 1, 1, 1, 0],
  chat_title: [0, 0, 1, 0, 0, 0, 0],
  chat_lastmsg: [0, 0, 1, 1, 0, 0],
  chat_active: [0, 0],
  selected_title: [0, 0, 5, 3, 0, 1, 1, 0, 0, 0, 0]
}

const jokeList = [
  `
		Husband and Wife had a Fight.
		Wife called Mom : He fought with me again,
		I am coming to you.
		Mom : No beta, he must pay for his mistake,
		I am comming to stay with U!`,

  `
		Husband: Darling, years ago u had a figure like Coke bottle.
		Wife: Yes darling I still do, only difference is earlier it was 300ml now it's 1.5 ltr.`,

  `
		God created the earth, 
		God created the woods, 
		God created you too, 
		But then, even God makes mistakes sometimes!`,

  `
		What is a difference between a Kiss, a Car and a Monkey? 
		A kiss is so dear, a car is too dear and a monkey is U dear.`
]

//
// FUNCTIONS
//

// Get random value between a range
function rand(high, low = 0) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

function getElement(id, parent) {
  if (!elementConfig[id]) {
    return false
  }
  var elem = !parent ? document.body : parent
  var elementArr = elementConfig[id]
  elementArr.forEach(function(pos) {
    if (!elem.childNodes[pos]) {
      return false
    }
    elem = elem.childNodes[pos]
  })
  return elem
}

function getLastMsg() {
  var messages = document.querySelectorAll(".msg")
  var pos = messages.length - 1

  while (
    messages[pos] &&
    (messages[pos].classList.contains("msg-system") ||
      messages[pos].querySelector(".message-in"))
  ) {
    pos--
    if (pos <= -1) {
      return false
    }
  }
  if (messages[pos] && messages[pos].querySelector(".selectable-text")) {
    return messages[pos].querySelector(".selectable-text").innerText.trim()
  } else {
    return false
  }
}

function getUnreadChats() {
  var unreadchats = []
  var chats = getElement("chats")
  if (chats) {
    chats = chats.childNodes
    for (var i in chats) {
      if (!(chats[i] instanceof Element)) {
        continue
      }
      var icons = getElement("chat_icons", chats[i]).childNodes
      if (!icons) {
        continue
      }
      for (var j in icons) {
        if (icons[j] instanceof Element) {
          if (
            !(
              icons[j].childNodes[0].getAttribute("data-icon") == "muted" ||
              icons[j].childNodes[0].getAttribute("data-icon") == "pinned"
            )
          ) {
            unreadchats.push(chats[i])
            break
          }
        }
      }
    }
  }
  return unreadchats
}

function didYouSendLastMsg() {
  var messages = document.querySelectorAll(".msg")
  if (messages.length <= 0) {
    return false
  }
  var pos = messages.length - 1

  while (messages[pos] && messages[pos].classList.contains("msg-system")) {
    pos--
    if (pos <= -1) {
      return -1
    }
  }
  if (messages[pos].querySelector(".message-out")) {
    return true
  }
  return false
}

// Call the main function again
const goAgain = (fn, sec) => {
  // const chat = document.querySelector('div.chat:not(.unread)')
  // selectChat(chat)
  setTimeout(fn, sec * 1000)
}

// Dispath an event (of click, por instance)
const eventFire = (el, etype) => {
  var evt = document.createEvent("MouseEvents")
  evt.initMouseEvent(
    etype,
    true,
    true,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  )
  el.dispatchEvent(evt)
}

// Select a chat to show the main box
const selectChat = (chat, cb) => {
  const title = getElement("chat_title", chat).title

  eventFire(chat.firstChild.firstChild, "mousedown")
  if (!cb) return
  const loopFewTimes = () => {
    setTimeout(() => {
      const titleMain = getElement("selected_title").title
      if (titleMain !== undefined && titleMain != title) {
        //console.log('not yet');
        return loopFewTimes()
      }
      return cb()
    }, 300)
  }

  loopFewTimes()
}

// Send a message
const send = (chat, message) => {
  selectChat(chat, () => {
    sendMessage(chat, message.trim())
  })
}
const sendMessage = (chat, message, cb) => {
  //avoid duplicate sending
  var title

  if (chat) {
    title = getElement("chat_title", chat).title
  } else {
    title = getElement("selected_title").title
  }
  ignoreLastMsg[title] = message

  messageBox = document.querySelectorAll("[contenteditable='true']")[0]

  //add text into input field
  messageBox.innerHTML = message.replace(/  /gm, "")

  //Force refresh
  event = document.createEvent("UIEvents")
  event.initUIEvent("input", true, true, window, 1)
  messageBox.dispatchEvent(event)

  //Click at Send Button
  eventFire(document.querySelector('span[data-icon="send"]'), "click")
  if (cb) {
    cb()
  }
}

//
// MAIN LOGIC
//
const start = (_chats, cnt = 0) => {
  // get next unread chat
  const chats = _chats || getUnreadChats()
  const chat = chats[cnt]

  var processLastMsgOnChat = false
  var lastMsg

  if (!lastMessageOnChat) {
    if (false === (lastMessageOnChat = getLastMsg())) {
      lastMessageOnChat = true //to prevent the first "if" to go true everytime
    } else {
      lastMsg = lastMessageOnChat
    }
  } else if (
    lastMessageOnChat != getLastMsg() &&
    getLastMsg() !== false &&
    !didYouSendLastMsg()
  ) {
    lastMessageOnChat = lastMsg = getLastMsg()
    processLastMsgOnChat = true
  }

  if (!processLastMsgOnChat && (chats.length == 0 || !chat)) {
    //console.log(new Date(), 'nothing to do now... (1)', chats.length, chat);
    return goAgain(start, 3)
  }

  // get infos
  var title
  if (!processLastMsgOnChat) {
    title = getElement("chat_title", chat).title + ""
    lastMsg = (
      getElement("chat_lastmsg", chat) || { innerText: "" }
    ).innerText.trim() //.last-msg returns null when some user is typing a message to me
  } else {
    title = getElement("selected_title").title
  }
  // avoid sending duplicate messaegs
  if (ignoreLastMsg[title] && ignoreLastMsg[title] == lastMsg) {
    //console.log(new Date(), 'nothing to do now... (2)', title, lastMsg);
    return goAgain(() => {
      start(chats, cnt + 1)
    }, 0.1)
  }

  // what to answer back?
  let sendText
  // messageHandler(lastMsg);
  // receiver(lastMsg);
  title = getElement("chat_title", chat).innerText
  receiver(lastMsg, chat, title)
  if (lastMsg.toUpperCase().indexOf("@HELP") > -1) {
    sendText = `
				Cool ${title}! Some commands that you can send me:

				1. *@TIME*
				2. *@JOKE*`
  }

  if (lastMsg.toUpperCase().indexOf("@TIME") > -1) {
    sendText = `
				Don't you have a clock, dude?

				*${new Date()}*`
  }

  if (lastMsg.toUpperCase().indexOf("@JOKE") > -1) {
    sendText = jokeList[rand(jokeList.length - 1)]
  }

  // that's sad, there's not to send back...
  if (!sendText) {
    ignoreLastMsg[title] = lastMsg
    console.log(new Date(), "new message ignored -> ", title, lastMsg)
    return goAgain(() => {
      start(chats, cnt + 1)
    }, 0.1)
  }

  //console.log(new Date(), 'new message to process, uhull -> ', title, lastMsg);

  // select chat and send message
  if (!processLastMsgOnChat) {
    selectChat(chat, () => {
      sendMessage(chat, sendText.trim(), () => {
        goAgain(() => {
          start(chats, cnt + 1)
        }, 1)
      })
    })
  } else {
    sendMessage(null, sendText.trim(), () => {
      goAgain(() => {
        start(chats, cnt + 1)
      }, 1)
    })
  }
}
start()

module.exports = {
  send: send,
  getE: getElement,
  start: function(cb) {
    console.log("starting")
    receiver = cb
  }
}

var receiver
