let name;
let nameConfirmed;
let startOfConversation = true;


const decisionTree = { 
 
  question: "Does it have a characteristics of a Plant?",
  yes: {
    question: "Which part of a Plant? a <b>Leaf</b> or <b>Wood</b>",
    leaf: {
      answer: "You're dealing with Zetsu!",
      img: "zetsu.gif"
    },
    wood: {
      question: "looks <b>Processed</b> or <b>Whittled?</b>",
      processed: {
        answer: "You're dealing with Konan!",
        img: "konan.gif"
      },
      whittled: {
        answer: "You're dealing with Sasori!",
        img: "sasori.gif"
      },
    },
  },
  no: {
    question: "Has a <b>Short</b> or <b>Long Hair?</b> or maybe its <b>Covered</b>?",
    covered: {
      answer: "You're dealing with Kakuzu!",
      img: "kakuzu.jpg"
    },
    long: {
      question: "Is he Loud?",
      yes: {
        answer: "You're dealing with Deidara!",
        img: "deidara.gif"
      },
      no: {
        answer: "You're dealing with Itachi!",
        img: "itachi.gif"
      },
    },
    short: {
      question: "Does he act like a Child?",
      yes: {
        question: "How's the face? Does it look <b>Normal</b> or <b>Masked</b>?",
        normal: {
          answer: "You're dealing with Hidan!",
          img: "hidan.gif"
        },
        masked: {
          answer: "You're dealing with Tobi!",
          img: "tobi.gif"
        },
      },
      no: {
        question: "<b>Blue</b> or <b>Orange?</b>",
        blue: {
          answer: "You're dealing with Kisame!",
          img: "kisame.gif"
        },
        orange: {
          answer: "You're dealing with Pein!",
          img: "pein.gif"
        },
      },
    },
  },
};

// array to track the chat messages
const chatLogs = [];

let currentDecision = decisionTree;

const yesReplies = ["yup", "yes", "okay", "ok", "yep", "y", "yeah", "yea","okay"];
const noReplies = ["nah", "no", "n", "i don't think so", "its not"];
const miscReplies = [
  "leaf",
  "wood",
  "processed",
  "looks processed",
  "whittled",
  "covered",
  "its covered",
  "long",
  "long hair",
  "short",
  "short hair",
  "blue",
  "orange",
  "looks normal",
  "normal",
  "masked",
];
//Name Function
const getName = (msg) => {
  name = msg;
  if (name === "") {
    name = undefined;
    return "Please enter your name.";
  }
  if (nameConfirmed) {
    return "You're name has been updated";
  } else {
    nameConfirmed = false;
    return `So your Name is <b>${name}</b>, is that correct?`;
  }
};

//image display
const imgDisplay = (img) => {
  return `<img src="static/img/${img}">`;
}

//Function Answer-Following Question
const answerDecision = () => {
  if (currentDecision.question) {
    console.log(currentDecision.question);
    return currentDecision.question;
  } else console.log(currentDecision.answer);
  return (currentDecision.answer+" "+ imgDisplay(currentDecision.img));
};



const getBotReply = (msg) => {
  const lcMessage = msg.toLowerCase();

//Start of conversation
if (startOfConversation === true)
{
  startOfConversation = false;
  return "Hey Ninja, What's your name?";
}
  //Name validation section
  else if (name === undefined) {
    return getName(msg);
  } 
  else if (nameConfirmed === false) {
    if (yesReplies.includes(lcMessage)) {
      nameConfirmed = true;
      return `<p>Cool! Nice to meet you, <b>${name}</b><p>
      <p>Now tell me the characteristics of this villain.</p>
      
      <p><b>${currentDecision.question}</b></p>
      `;
    } else if (noReplies.includes(lcMessage)) {
      name = undefined;
      return `Well tell me your name then.`;
    } else {
      return `I don't get it... Try responding <b>Yes</> or <b>No</>`;
    }

    //ERROR VALIDATION
  } else if (msg === "") {
    
    return "You were speechless, Sorry I don't get it";
  } else if (
    yesReplies.includes(lcMessage) === false &&
    noReplies.includes(lcMessage) === false &&
    miscReplies.includes(lcMessage) === false
  ) {
    return "You're not making any sense.. Try again responding hinted choices!";
  }

  //conditional questions
  else {
    console.log(lcMessage);
    switch (true) {
      //YES REPLIES
      case yesReplies.includes(lcMessage):
        currentDecision = currentDecision.yes;
        return answerDecision();

      //NO REPLIES
      case noReplies.includes(lcMessage):
        currentDecision = currentDecision.no;
        return answerDecision();

      //MISC REPLIES
      //PLANT CHARACTERS
      case lcMessage === "leaf":
        currentDecision = currentDecision.leaf;
        return answerDecision();

      case lcMessage === "wood":
        currentDecision = currentDecision.wood;
        console.log(currentDecision);
        return answerDecision();

      case lcMessage === "processed":
        currentDecision = currentDecision.processed;
        return answerDecision();
      case lcMessage === "whittled":
        currentDecision = currentDecision.whittled;
        return answerDecision();

      //NON-PLANT CHARACTERS
      case lcMessage === "covered"|| lcMessage === "its covered":
        currentDecision = currentDecision.covered;
        return answerDecision();
      case lcMessage === "long" || lcMessage === "long hair":
        currentDecision = currentDecision.long;
        return answerDecision();
      case lcMessage === "short"|| lcMessage === "short hair":
        currentDecision = currentDecision.short;
        return answerDecision();

      case lcMessage === "blue":
        currentDecision = currentDecision.blue;
        return answerDecision();
      case lcMessage === "orange":
        currentDecision = currentDecision.orange;
        return answerDecision();

      case lcMessage === "normal" || lcMessage === "looks normal":
        currentDecision = currentDecision.normal;
        return answerDecision();
      case lcMessage === "masked":
        currentDecision = currentDecision.masked;
        return answerDecision();
    }
  }
};

const renderChatbox = () => {
  // get a reference to the chatbox element
  const chatboxEl = document.getElementById("chatbox");

  

  // copy the latest set of messages, then reverses the new
  // array and takes the first 20 elements
  const recentMessages = [...chatLogs].reverse().slice(0, 20);
  /**
   * this one liner statement would be equivalent to:
   * var recentMessages = chatLog.slice();
   * recentMessages.reverse();
   * var last20RecentMessages = recentMessages.slice(0,20);
   */

  // markup to display
  let chatboxHTML = "";

  //BOT IMAGE
 //${imgDisplay('robot.jpg','bot-img')}

  // create a chat item div element

  for (let message of recentMessages) {
    
    let markup = `
    <div class="chat-item chat-item-bot">

    <div class="bot-img">
    ${imgDisplay('robot.jpg')}
    </div>
    <div class="chat-container">
    ${message.bot.replyMsg}
    </div>
    </div>
    
    <div class="chat-item chat-item-user">
    <div class="chat-container position-right">
    ${message.user.inputMsg}
    </div>
    
    </div>

    `;
    chatboxHTML += markup;
  }

  // set the inner HTML
  chatboxEl.innerHTML = chatboxHTML;
};

// form submit handler
const handleChatSubmit = (event) => {
  // Stop the page from reloading when the form is submitted
  event.preventDefault();

  // get reference to the chat input
  const chatInput = document.getElementById("chat-input");

  // get the chat form input value
  const chatValue = chatInput.value;
  // clear the input ready for the next message
  chatInput.value = "";

  const botReply = getBotReply(chatValue);

  // Create a data model to save the chat log against
  const chatLog = {
    user: {
      inputMsg: chatValue,
    },
    bot: {
      replyMsg: botReply,
    },
    timestamp: new Date(),
  };

  // push the user message to the chat log
  chatLogs.push(chatLog);

  // render the chatbox
  renderChatbox();
};

// attach the submit event handler to the form here ...
const formEl = document.getElementById("chat-form");
formEl.addEventListener("submit", handleChatSubmit);
