<template>
  <div class="chatbot-container">
    <!-- Chatbot toggle button -->
    <button class="chatbot-toggle" @click="toggleChatbot">
      <i class="fas fa-comment-dots"></i>
      <span class="notification-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
    </button>

    <!-- Chatbot window -->
    <transition name="slide-up">
      <div class="chatbot-window" v-if="isOpen">
        <div class="chatbot-header">
          <h3>Job Assistant</h3>
          <button class="close-btn" @click="toggleChatbot">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="chatbot-messages" ref="messagesContainer">
          <!-- Initial greeting -->
          <div class="message bot-message">
            <div class="avatar">
              <i class="fas fa-robot"></i>
            </div>
            <div class="bubble">
              <p>Hello! I'm here to help with your job search. What would you like to know?</p>
              <div class="quick-questions">
                <button v-for="(question, index) in quickQuestions" :key="index" 
                        @click="sendQuickQuestion(question)"
                        class="quick-question">
                  {{ question }}
                </button>
              </div>
            </div>
          </div>

          <!-- Chat messages -->
          <transition-group name="message-fade">
            <div v-for="(message, index) in messages" :key="index" 
                 :class="['message', message.sender === 'user' ? 'user-message' : 'bot-message']">
              <div class="avatar" v-if="message.sender === 'bot'">
                <i class="fas fa-robot"></i>
              </div>
              <div class="bubble">
                <p>{{ message.text }}</p>
                <div v-if="message.options && message.sender === 'bot'" class="quick-questions">
                  <button v-for="(option, optIndex) in message.options" :key="optIndex" 
                          @click="sendQuickQuestion(option)"
                          class="quick-question">
                    {{ option }}
                  </button>
                </div>
              </div>
              <div class="avatar" v-if="message.sender === 'user'">
                <i class="fas fa-user"></i>
              </div>
            </div>
          </transition-group>

          <!-- Typing indicator -->
          <div class="message bot-message" v-if="isTyping">
            <div class="avatar">
              <i class="fas fa-robot"></i>
            </div>
            <div class="bubble">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input area -->
        <div class="chatbot-input">
          <input type="text" v-model="userInput" 
                 @keyup.enter="sendMessage"
                 placeholder="Type your question here..." />
          <button @click="sendMessage" :disabled="!userInput.trim()">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';

const isOpen = ref(false);
const userInput = ref('');
const messages = ref([]);
const isTyping = ref(false);
const unreadCount = ref(0);
const messagesContainer = ref(null);

// Common questions and answers
const knowledgeBase = {
  "application status": {
    answer: "You can check your application status in the 'My Applications' section of your dashboard. Typically, statuses include: Submitted, Under Review, Interview Scheduled, Offer Extended, or Not Selected.",
    options: ["How long does review take?", "Can I edit my application?"]
  },
  "how long does review take": {
    answer: "The review process usually takes 1-2 weeks, but it can vary by company. Some employers respond within a few days, while others may take a month or more.",
    options: ["What if I don't hear back?", "Should I follow up?"]
  },
  "follow up": {
    answer: "It's appropriate to follow up after 1-2 weeks if you haven't heard back. Send a polite email expressing your continued interest and asking for an update on the hiring timeline."
  },
  "interview tips": {
    answer: "Here are key interview tips:\n1. Research the company thoroughly\n2. Prepare examples using the STAR method\n3. Dress professionally\n4. Have questions ready for the interviewer\n5. Practice common questions",
    options: ["What is the STAR method?", "What questions should I ask?"]
  },
  "STAR method": {
    answer: "STAR stands for Situation, Task, Action, Result. When answering behavioral questions, describe the Situation you faced, the Task you needed to accomplish, the Actions you took, and the Results you achieved."
  },
  "resume help": {
    answer: "For strong resumes:\n1. Keep it to 1-2 pages max\n2. Use bullet points, not paragraphs\n3. Focus on achievements, not just duties\n4. Include relevant keywords\n5. Proofread carefully",
    options: ["How to format resume?", "What keywords to use?"]
  },
  "salary expectations": {
    answer: "When asked about salary:\n1. Research typical salaries for the role\n2. Give a range based on your experience\n3. You can say 'I'm open based on the total compensation package'\n4. Try to let them name a number first"
  },
  "career advice": {
    answer: "For career growth:\n1. Continuously learn new skills\n2. Build your professional network\n3. Seek mentors\n4. Set clear career goals\n5. Don't be afraid to take calculated risks",
    options: ["How to find a mentor?", "Best skills to learn?"]
  },
  "job search tips": {
    answer: "Effective job search strategies:\n1. Customize applications for each job\n2. Leverage your network\n3. Use LinkedIn effectively\n4. Attend industry events\n5. Consider temporary or contract roles",
    options: ["How to use LinkedIn?", "Best job search websites?"]
  },
  "default": {
    answer: "I'm sorry, I don't have information about that. Could you try asking in a different way or choose from these common questions?",
    options: ["Application status", "Interview tips", "Resume help", "Salary expectations"]
  }
};

const quickQuestions = [
  "How do I check my application status?",
  "What are some interview tips?",
  "How should I format my resume?",
  "How to answer salary questions?",
  "Best job search strategies?"
];

// Toggle chatbot visibility
const toggleChatbot = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    unreadCount.value = 0;
    scrollToBottom();
  }
};

// Send a message from the user
const sendMessage = () => {
  if (!userInput.value.trim()) return;
  
  const message = userInput.value.trim();
  messages.value.push({ sender: 'user', text: message });
  userInput.value = '';
  
  if (!isOpen.value) {
    unreadCount.value++;
  }
  
  respondToMessage(message);
  scrollToBottom();
};

// Send a quick question
const sendQuickQuestion = (question) => {
  messages.value.push({ sender: 'user', text: question });
  respondToMessage(question);
  scrollToBottom();
};

// Generate bot response
const respondToMessage = (message) => {
  isTyping.value = true;
  
  // Simulate typing delay
  setTimeout(() => {
    const lowerMessage = message.toLowerCase();
    let response = null;
    
    // Check knowledge base for matching question
    for (const [question, data] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(question)) {
        response = {
          text: data.answer,
          options: data.options || []
        };
        break;
      }
    }
    
    // Use default response if no match found
    if (!response) {
      response = knowledgeBase.default;
    }
    
    messages.value.push({
      sender: 'bot',
      text: response.text,
      options: response.options
    });
    
    isTyping.value = false;
    scrollToBottom();
  }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
};

// Scroll to bottom of messages
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

// Watch for new messages when chat is closed
watch(messages, () => {
  if (!isOpen.value && messages.value.length > 0) {
    const lastMessage = messages.value[messages.value.length - 1];
    if (lastMessage.sender === 'bot') {
      unreadCount.value++;
    }
  }
}, { deep: true });

// Initialize with welcome message
onMounted(() => {
  setTimeout(() => {
    messages.value.push({
      sender: 'bot',
      text: "Welcome to your job search assistant! How can I help you today?",
      options: quickQuestions
    });
  }, 500);
});
</script>

<style scoped>
/* Chatbot container */
.chatbot-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

/* Toggle button */
.chatbot-toggle {
  background: linear-gradient(135deg, #1e88e5, #0d47a1);
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.chatbot-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4081;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

/* Chatbot window */
.chatbot-window {
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 15px;
}

.chatbot-header {
  background: linear-gradient(135deg, #1e88e5, #0d47a1);
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatbot-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

/* Messages area */
.chatbot-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f5f5f5;
}

.message {
  display: flex;
  margin-bottom: 15px;
  animation: fadeIn 0.3s ease;
}

.user-message {
  justify-content: flex-end;
}

.bot-message {
  justify-content: flex-start;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e3f2fd;
  color: #1e88e5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  flex-shrink: 0;
}

.bubble {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  line-height: 1.4;
}

.user-message .bubble {
  background: #1e88e5;
  color: white;
  border-top-right-radius: 4px;
}

.bot-message .bubble {
  background: white;
  color: #333;
  border-top-left-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quick-questions {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-question {
  background: #e3f2fd;
  color: #1e88e5;
  border: none;
  border-radius: 15px;
  padding: 5px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-question:hover {
  background: #bbdefb;
}

/* Typing indicator */
.typing-indicator {
  display: flex;
  padding: 10px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #9e9e9e;
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Input area */
.chatbot-input {
  display: flex;
  padding: 10px;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.chatbot-input input {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 10px 15px;
  outline: none;
  transition: border 0.3s;
}

.chatbot-input input:focus {
  border-color: #1e88e5;
}

.chatbot-input button {
  background: #1e88e5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.chatbot-input button:disabled {
  background: #b0bec5;
  cursor: not-allowed;
}

.chatbot-input button:hover:not(:disabled) {
  background: #1565c0;
}

/* Animations */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.message-fade-enter-active, .message-fade-leave-active {
  transition: all 0.3s ease;
}

.message-fade-enter-from, .message-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
}
</style>