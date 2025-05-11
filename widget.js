(function () {
    // Create and inject CSS into Shadow DOM
    const style = document.createElement('style');
    style.textContent = `
      .chat-support-icon {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        border-radius: 50%;
        cursor: pointer;
        z-index: 999;
      }
      .chat-support-icon img {
        display: block;
        margin: auto;
      }
      .chatbot-popup {
        position: fixed;
        bottom: 70px;
        right: 20px;
        width: 300px;
        height: 400px;
        background-color: #fff;
        border: 2px solid #ccc;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        display: none;
        z-index: 1000;
      }
      .chat-header {
        background-color: #4CAF50;
        color: white;
        padding: 10px;
        text-align: center;
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .chat-box {
        padding: 10px;
        height: 270px;
        overflow-y: auto;
        background-color: #f9f9f9;
      }
      .chat-input-container {
        display: flex;
        padding: 10px;
        border-top: 1px solid #ddd;
      }
      .chat-input-container input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .chat-input-container button {
        padding: 8px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .chat-input-container button:hover {
        background-color: #45a049;
      }
      .message {
        margin: 5px 0;
        padding: 8px;
        border-radius: 4px;
      }
      .user-message {
        background-color: #d1e7dd;
        text-align: left;
      }
      .bot-message {
        background-color: #f8d7da;
        text-align: left;
      }
      .close-btn {
        background-color: transparent;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }
      .close-btn:hover {
        color: #f8d7da;
      }
    `;
    
    // Create the shadow root
    const shadowRoot = document.createElement('div');
    shadowRoot.attachShadow({ mode: 'open' });
    document.body.appendChild(shadowRoot);
  
    // Append styles and chat UI to shadow DOM
    shadowRoot.shadowRoot.appendChild(style);
  
    // Chat icon
    const chatIcon = document.createElement('div');
    chatIcon.className = 'chat-support-icon';
    chatIcon.innerHTML = '<img src="https://img.icons8.com/ios/452/chat.png" alt="Chat Icon" width="50" height="50">';
    shadowRoot.shadowRoot.appendChild(chatIcon);
  
    // Chat popup
    const chatPopup = document.createElement('div');
    chatPopup.className = 'chatbot-popup';
    chatPopup.innerHTML = `
      <div class="chat-header">
        <span>Chat Support</span>
        <button id="close-chat" class="close-btn">X</button>
      </div>
      <div class="chat-box" id="chat-box"></div>
      <div class="chat-input-container">
        <input type="text" id="user-input" placeholder="Type your message...">
        <button id="send-btn">Send</button>
      </div>
    `;
    shadowRoot.shadowRoot.appendChild(chatPopup);
  
    const assistantName = 'Assistant';
    const chatBox = chatPopup.querySelector('#chat-box');
    const input = chatPopup.querySelector('#user-input');
    const sendBtn = chatPopup.querySelector('#send-btn');
    const closeBtn = chatPopup.querySelector('#close-chat');
  
    function appendMessage(message, sender) {
      const msg = document.createElement('div');
      msg.classList.add('message', sender);
      msg.innerHTML = sender === 'bot-message' ? `<strong>${assistantName}:</strong> ${message}` : message;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    function botResponse(inputText) {
      let response = '';
      const text = inputText.toLowerCase();
      if (text.includes('hi') || text.includes('hello')) {
        response = 'Hello! How can I assist you today?';
      } else if (text.includes('how are you')) {
        response = 'I am just a bot, but I am doing great! How can I help you?';
      } else {
        response = "Sorry, I didn't understand that. Could you ask something else?";
      }
      appendMessage(response, 'bot-message');
    }
  
    chatIcon.onclick = () => {
      chatPopup.style.display = chatPopup.style.display === 'block' ? 'none' : 'block';
    };
    closeBtn.onclick = () => chatPopup.style.display = 'none';
    sendBtn.onclick = () => {
      const val = input.value.trim();
      if (!val) return;
      appendMessage(val, 'user-message');
      input.value = '';
      botResponse(val);
    };
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendBtn.click();
    });
  })();
  
