// script.js
document.getElementById('sendBtn').addEventListener('click', function () {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim()) {
        addMessage(userInput, 'user');
        document.getElementById('userInput').value = '';
        getResponse(userInput)
    }
});

function addMessage(text, sender) {
    const messageContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerHTML = `<p>${text}</p>`;
    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to bottom
}
const localAPI = "http://localhost:11434/api/generate"
async function getResponse(text) {
    fetch(localAPI, {
        method: "POST",
        body: JSON.stringify({
            "model": "llama3.2",
            "prompt": text,
            "stream": false
        }),
        mode: 'no-cors',
    }).then((res) => {
        return res.json();
    }).then((data) => {
        addMessage(data.response, 'bot')
    })
}