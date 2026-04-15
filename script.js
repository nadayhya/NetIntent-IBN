const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatDisplay = document.getElementById('chatDisplay');

// دالة إضافة الرسالة (لليوزر أو للبوت)
function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', className);
    msgDiv.innerText = text;
    chatDisplay.appendChild(msgDiv);
    scrollToBottom();
    return msgDiv; // بنرجع العنصر عشان لو حبنا نعدله (زي ما هنعمل في الرد)
}

// دالة إظهار النقط "داخل" فقاعة رسالة
function showTypingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'bot-message', 'typing-bubble');
    loadingDiv.innerHTML = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    `;
    chatDisplay.appendChild(loadingDiv);
    scrollToBottom();
    return loadingDiv; // بنرجعه عشان نمسحه لما الرد يجهز
}

function scrollToBottom() {
    chatDisplay.scrollTo({ top: chatDisplay.scrollHeight, behavior: 'smooth' });
}

function sendMessage() {
    const text = userInput.value.trim();
    if (text !== "") {
        // 1. إظهار رسالة اليوزر
        appendMessage(text, 'user-message');
        userInput.value = "";
        
        // 2. إظهار فقاعة النقط مكان الرد القادم
        const typingBubble = showTypingIndicator();

        // 3. محاكاة وصول الرد بعد 2 ثانية
        setTimeout(() => {
            // إزالة فقاعة النقط
            typingBubble.remove();
            
            // إضافة الرد الفعلي في نفس المكان
            appendMessage("Intent processed successfully.", "bot-message");
        }, 2000);
    }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });