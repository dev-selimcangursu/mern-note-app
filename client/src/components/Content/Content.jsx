import React, { useState } from 'react';
import './Content.css';

function Content() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Ahmet', text: 'Proje başladı, herkese başarılar!', time: '09:30' },
    { id: 2, user: 'Zeynep', text: 'Tasarım dokümanını yükledim.', time: '09:45' },
    { id: 3, user: 'Mehmet', text: 'Backend API hazır, test edebilirsiniz.', time: '10:10' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      user: 'Sen', 
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="chat">
      <div className="chat__header">#ERP Chat</div>

      <div className="chat__messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat__message ${msg.user === 'Sen' ? 'chat__message--own' : ''}`}>
            <div className="chat__message-user">{msg.user}</div>
            <div className="chat__message-text">{msg.text}</div>
            <div className="chat__message-time">{msg.time}</div>
          </div>
        ))}
      </div>

      <div className="chat__input-area">
        <input
          type="text"
          className="chat__input"
          placeholder="Mesaj yaz..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="chat__send-button" onClick={handleSend}>Gönder</button>
      </div>
    </div>
  );
}

export default Content;
