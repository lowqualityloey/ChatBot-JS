const decisionTree = {
  question: "Does it have a characteristics of a Plant?",
  yes: {
    question: "Which part of a Plant? a Leaf or Wood?",
    leaf:{
      answer: "You're dealing with Black Zetsu!"
    }, 
    wood: {
      question: "looks Processed of Whittled?",
      processed:{
        answer: "You're dealing with Konan!"
      }, 
      whittled: {
        answer: "You're dealing with Sasori!"
      }, 
    },
  },
  no: {
    question: "Has a Short or Long Hair? or maybe its Covered?",
    covered: {
      answer: "You're dealing with Kakuzu!"
    }, 
    long: {
      question: "Is he Loud?",
      yes: {
        answer: "You're dealing with Deidara!"
      }, 
      no: {
        answer: "You're dealing with Itachi!"
      }, 
    },
    short: {
      question: "Does he act like a Child?",
      yes: {
        question: "How's the face? looks Normal or Masked?",
        normal:{
          answer: "You're dealing with Hidan!"
        }, 
        masked:{
          answer: "You're dealing with Tobi!"
        }, 
      },
      no: {
        question: "Blue or Orange?",
        blue:{
          answer: "You're dealing with Kisame!"
        }, 
        orange:{
          answer: "You're dealing with Pein!"
        }, 
      },
    },
  },
};

// array to track the chat messages
const chatLogs = [];

/**
 *
 * FINISH THIS FUNCTION!
 */

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
    return `So your name is <b>${name}</b>, is this correct?`;
  }
};

let currentDecision = decisionTree;

let name;
let nameConfirmed;

const yesReplies = ["yup", "yes", "okay", "ok", "yep", "y"];
const noReplies = [
  "nah",
  "no",
  "n",
  "i don't think so",
  "i dont think so",
  "its not",
];
const miscReplies = ["leaf", "wood", "processed", "whittled", ""];

const getBotReply = (msg) => {
  // return "Error unknown...";
  const lcMessage = msg.toLowerCase();

  //validation section
  if (name === undefined) {
    return getName(msg);
  } else if (nameConfirmed === false) {
    if (yesReplies.includes(lcMessage)) {
      nameConfirmed = true;
      return `Now tell me the characteristics of this villain.<br><b><i>${currentDecision.question}</i></b><br><br>
      Cool! Nice to meet you, <b>${name}</b>.
      `;
    } else {
      name = undefined;
      return `Well tell me your name then.`;
    }
  } else if (msg === "") {
    return "You were speechless, Sorry I don't get it";
  }

//conditional questions
  else {
    switch(true){
        case yesReplies.includes(lcMessage):

          if(currentDecision){
            currentDecision = currentDecision.yes;
            if(currentDecision.question){
              return (currentDecision.question);
            }
             return(currentDecision.answer);
          }

          break;

        case miscReplies.includes('leaf'):
          currentDecision = currentDecision.leaf;
            return(currentDecision.answer);
  
        default:
          return("I don't understand");
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
    <div class="chat-item chat-item-bot">${message.bot.replyMsg}</div>
    <div class="chat-item chat-item-user">${message.user.inputMsg}</div>
     
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
