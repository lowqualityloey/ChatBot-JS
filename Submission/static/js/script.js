let name;
let nameConfirmed;

const decisionTree = {
  question: "Does it have a characteristics of a Plant?",
  yes: {
    question: "Which part of a Plant? a Leaf or Wood?",
    leaf:{
      answer: "You're dealing with Black Zetsu!"
    }, 
    wood: {
      question: "looks Processed or Whittled?",
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

const yesReplies = ["yup", "yes", "okay", "ok", "yep", "y", "yeah", "yea"];
const noReplies = [
  "nah",
  "no",
  "n",
  "i don't think so",
  "its not",
];
const miscReplies = ["leaf", "wood", "processed", "whittled", "covered","long","short","blue","orange","looks normal","normal","masked"];

    //Function Answer-Following Question
const answerDecision = () => {
      if (currentDecision.question) {
        console.log(currentDecision.question);
        return (currentDecision.question);
      } 
      else
       console.log(currentDecision.answer);
        return (currentDecision.answer);
    };

const getBotReply = (msg) => {
  const lcMessage = msg.toLowerCase();


  //Name validation section
  if (name === undefined) {
    return getName(msg);
  } else if (nameConfirmed === false) {
    if (yesReplies.includes(lcMessage)) {
      nameConfirmed = true;
      return `Now tell me the characteristics of this villain.<br><b><i>${currentDecision.question}</i></b><br><br>
      Cool! Nice to meet you, <b>${name}</b>.
      `;
    } else if(noReplies.includes(lcMessage)){
      name = undefined;
      return `Well tell me your name then.`;
    }else{
      return `You're not making any sense`;
    }

  } 
  
  else if (msg === "") {
    return "You were speechless, Sorry I don't get it";
  }
  else if (
    yesReplies.includes(lcMessage) === false &&
    noReplies.includes(lcMessage) === false &&
    miscReplies.includes(lcMessage) === false
  ) {
    currentDecision = decisionTree;
    return ("You're not making any sense");
  }

//conditional questions
  else {
    console.log(lcMessage);
    switch(true){
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
        case lcMessage === 'leaf':
        currentDecision = currentDecision.leaf;
        return answerDecision();
        case lcMessage === 'wood':
        currentDecision = currentDecision.wood;
        console.log(currentDecision);
        return answerDecision();

        case lcMessage === 'processed':
        currentDecision = currentDecision.processed;
        return answerDecision();
        case lcMessage === 'whittled':
        currentDecision = currentDecision.whittled;
        return answerDecision();

        //NON-PLANT CHARACTERS
        case lcMessage === 'covered':
        currentDecision = currentDecision.covered;
        return answerDecision(); 
        case lcMessage === 'long':
        currentDecision = currentDecision.long;
        return answerDecision(); 
        case lcMessage === 'short':
        currentDecision = currentDecision.short;
        return answerDecision(); 

        case lcMessage === 'blue':
        currentDecision = currentDecision.blue;
        return answerDecision(); 
        case lcMessage === 'orange':
        currentDecision = currentDecision.orange;
        return answerDecision(); 
      
        case lcMessage === 'normal':
        currentDecision = currentDecision.normal;
        return answerDecision(); 
        case lcMessage === 'masked':
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
