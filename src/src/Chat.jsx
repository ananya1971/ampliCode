import { fetchChatResponse } from './functions/api';
import { useState, useEffect } from 'react';
import './App.css';
import Markdown from "react-markdown"

const ChatUI = (props) => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How may I help you today?', sender: 'bot' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [results, setResults] = useState('');
  const [sending, setSending] = useState(false)

  useEffect(() => {
    props.results.map((item) => {
        const result = item.subject + ': ' + item.rating + ', '
        setResults(prevState => prevState + result)
    })
  }, [])

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const userMsg = newMessage
    setSending(true)
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('')
    fetchChatResponse(userMsg, results).then((res) => {
        setMessages(prevState => [...prevState, { text: res.text, sender: 'bot' }]);
        setSending(false)
    })
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <Markdown>{msg.text}</Markdown>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} disabled={sending}>Send</button>
      </div>
    </div>
  );
};

export default ChatUI;
