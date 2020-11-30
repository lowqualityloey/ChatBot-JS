const decisionTree = {
  question: "Does it have a characteristics of a Plant?",
  yes: {
    question: "Which part of a Plant? a Leaf or Wood?",
    leaf: "Black Zetsu",
    wood: {
      question: "looks Processed of Whittled?",
      processed: "Konan",
      whittled: "Sasori",
    }
  },
  no: {
    question: "Has a Short or Long Hair? or maybe its Covered?",
    covered: "Kakuzu",
    long: {
      question: "Is he Loud?",
      yes: "Deidara",
      no: "Itachi"
    },
    short: {
      question: "Does he act like a Child?",
      yes:{
        question: "How's the face? looks Normal or Masked?",
        normal: "Hidan",
        masked: "Tobi"
      },
      no:{
        question: "Blue or Orange?",
        blue: "Kisame",
        orange: "Pein"
      }
    }
  }
}

// array to track the chat messages
const chatLogs = [];

/**
 *
 * FINISH THIS FUNCTION!
 */
const getBotReply = (msg) => {
  return "Error unknown...";
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
