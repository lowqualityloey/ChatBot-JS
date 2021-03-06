let name;
let nameConfirmed;
let tryAgain;
let startOfConversation = true;

const decisionTree = {
  question: "Does it have a characteristics of a Plant?",
  yes: {
    question: "Which part of a Plant? a <b>Leaf</b> or <b>Wood</b>",
    leaf: {
      answer: "You're dealing with Zetsu!",
      img: "zetsu.gif",
    },
    wood: {
      question: "looks <b>Processed</b> or <b>Whittled?</b>",
      processed: {
        answer: "You're dealing with Konan!",
        img: "konan.gif",
      },
      whittled: {
        answer: "You're dealing with Sasori!",
        img: "sasori.gif",
      },
    },
  },
  no: {
    question:
      "Has a <b>Short</b> or <b>Long Hair?</b> or maybe its <b>Covered</b>?",
    covered: {
      answer: "You're dealing with Kakuzu!",
      img: "kakuzu.jpg",
    },
    long: {
      question: "Is he Loud?",
      yes: {
        answer: "You're dealing with Deidara!",
        img: "deidara.gif",
      },
      no: {
        answer: "You're dealing with Itachi!",
        img: "itachi.gif",
      },
    },
    short: {
      question: "Does he act like a Child?",
      yes: {
        question:
          "How's the face? Does it look <b>Normal</b> or <b>Masked</b>?",
        normal: {
          answer: "You're dealing with Hidan!",
          img: "hidan.gif",
        },
        masked: {
          answer: "You're dealing with Tobi!",
          img: "tobi.gif",
        },
      },
      no: {
        question: "<b>Blue</b> or <b>Orange?</b>",
        blue: {
          answer: "You're dealing with Kisame!",
          img: "kisame.gif",
        },
        orange: {
          answer: "You're dealing with Pein!",
          img: "pein.gif",
        },
      },
    },
  },
};

// array to track the chat messages
const chatLogs = [];

let currentDecision = decisionTree;

const yesReplies = [
  "yup",
  "yes",
  "okay",
  "ok",
  "yep",
  "y",
  "yeah",
  "yea",
  "okay",
];
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
};

//Function Answer-Following Question
const answerDecision = (lcMessage) => {
  if (currentDecision.question) {
    console.log(currentDecision.question);
    return currentDecision.question;
  } else console.log(currentDecision.answer);

  startOfConversation = true;
  tryAgain = true;
  return `${currentDecision.answer} ${imgDisplay(currentDecision.img)}
  <b>Do you want to start another identification?</b>
  `;
};

//BOT REPLIES
const getBotReply = (msg) => {
  const lcMessage = msg.toLowerCase();

  //Special commands
  if (lcMessage.includes("light") || lcMessage.includes("white")) {
    document.body.style.backgroundColor = "#f6f6f6";
    startOfConversation = true;
    name = null;
    nameConfirmed = null;
    return "Back to default light!";
  }
  if (lcMessage.includes("dim")) {
    document.body.style.backgroundColor = "#14202B";
    startOfConversation = true;
    name = null;
    nameConfirmed = null;
    return "Dim!";
  } else if (lcMessage.includes("dark") || lcMessage.includes("lights out")) {
    document.body.style.backgroundColor = "#000000";
    startOfConversation = true;
    name = null;
    nameConfirmed = null;
    return "Lights Out!";
  } else if (lcMessage.includes("akatsuki?")) {
    startOfConversation = true;
    name = null;
    nameConfirmed = null;
    return `  <p><b>Akatsuki</b> is a criminal organization of S-Class Criminals and Missing-nin and is the most wanted group in all of Shinobi world.</p> <p>Their main goal is to collect all of the Tailed Beasts for their plan of world domination.</p>
 
`;
  }

  //Start of conversation
  else if (startOfConversation === true) {
    if (tryAgain === true) {
      switch (true) {
        case noReplies.includes(lcMessage):
          tryAgain = false;
          return `See ya later, <b>${name}!</b>`;
        case yesReplies.includes(lcMessage):
          tryAgain = false;
          startOfConversation = false;
          currentDecision = decisionTree;
          return `<p>Tell me this another characteristics of this villain.</p>    
        <p><b>${currentDecision.question}</b></p>`;
      }
    } else name = undefined;
    nameConfirmed = null;
    startOfConversation = false;
    return `Hey Ninja, What's your name?`;
  }
  //Name validation section
  else if (name === undefined) {
    return getName(msg);
  } else if (nameConfirmed === false) {
    if (yesReplies.includes(lcMessage)) {
      nameConfirmed = true;
      currentDecision = decisionTree;
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
    return "You're not making any sense.. <p>Try again responding hinted choices!<p>";
  }

  //conditional questions
  else {
    console.log(lcMessage);
    switch (true) {
      //YES REPLIES
      case yesReplies.includes(lcMessage):
        currentDecision = currentDecision.yes;
        return answerDecision(lcMessage);

      //NO REPLIES
      case noReplies.includes(lcMessage):
        currentDecision = currentDecision.no;
        return answerDecision(lcMessage);

      //MISC REPLIES
      //PLANT CHARACTERS
      case lcMessage === "leaf":
        currentDecision = currentDecision.leaf;
        return answerDecision(lcMessage);

      case lcMessage === "wood":
        currentDecision = currentDecision.wood;
        console.log(currentDecision);
        return answerDecision(lcMessage);

      case lcMessage === "processed":
        currentDecision = currentDecision.processed;
        return answerDecision(lcMessage);
      case lcMessage === "whittled":
        currentDecision = currentDecision.whittled;
        return answerDecision(lcMessage);

      //NON-PLANT CHARACTERS
      case lcMessage === "covered" || lcMessage === "its covered":
        currentDecision = currentDecision.covered;
        return answerDecision(lcMessage);
      case lcMessage === "long" || lcMessage === "long hair":
        currentDecision = currentDecision.long;
        return answerDecision(lcMessage);
      case lcMessage === "short" || lcMessage === "short hair":
        currentDecision = currentDecision.short;
        return answerDecision(lcMessage);

      case lcMessage === "blue":
        currentDecision = currentDecision.blue;
        return answerDecision();
      case lcMessage === "orange":
        currentDecision = currentDecision.orange;
        return answerDecision(lcMessage);

      case lcMessage === "normal" || lcMessage === "looks normal":
        currentDecision = currentDecision.normal;
        return answerDecision(lcMessage);
      case lcMessage === "masked":
        currentDecision = currentDecision.masked;
        return answerDecision(lcMessage);
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

  // create a chat item div element

  for (let message of recentMessages) {
    let markup = `
    <div class="chat-item chat-item-bot">

    <div id="bot-img">
    ${imgDisplay("robot.jpg")}
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
