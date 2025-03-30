import { useEffect, useState } from "react";
import { IMAGE_URL } from "../../../Constants/Dashboard.constant";
import useChatStore from "../../../store/useChatStore";
import "./ChatBox.css";
import { useRef } from "react";
import MessageCntr from "../../atoms/MessageCntr/MessageCntr";
import { useAuthStore } from "../../../store/useAuthStore";

const ChatBox = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState('');
  const{selectedUser, setSelectedUser, messages, getUserMessages, sendUserMessage, subscribeToMessages, unsubscribeToMessages} = useChatStore();
  const {authUser} = useAuthStore();
  const fileInputRef = useRef(null);

  useEffect(()=>{
    getUserMessages(selectedUser._id);
    setTimeout(()=>{
      const chatContainer = document.querySelector(".chat-box");
      chatContainer.scrollTop = chatContainer.scrollHeight;
      subscribeToMessages();
      return()=>{
        unsubscribeToMessages();
      }
    }, 100);
  }, [selectedUser._id, getUserMessages, subscribeToMessages, unsubscribeToMessages]);

  const removeFile = ()=>{
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const handleSendMessage = async (e) => {
    if(e && e.key !== 'Enter' ){
      return;
    }
    if (!text.trim() && !imagePreview) return;
    try {
      await sendUserMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      setTimeout(()=>{
        const chatContainer = document.querySelector(".chat-box");
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 10);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const setFileUrl = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user">
          <div className="user-img">
            <img src={selectedUser.imageUrl || IMAGE_URL} alt={selectedUser.name} />
          </div>
          <div className="sub-text">
            {selectedUser.name}<br /><span className="sub-sub-text">online</span>
          </div>
        </div>
        <div className="cross-icon" onClick={()=>{setSelectedUser(null)}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-x-icon lucide-message-circle-x"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </div>
      </div>
      <div className="chat-box">
        {messages.map((message)=>
          <MessageCntr isSender={authUser._id === message.senderId} receiver={selectedUser} message={message}/>
        )}
      </div>
      {imagePreview && (
        <div className="image-preview">
          <svg onClick={removeFile} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          <img src={imagePreview} alt="image"/>
      </div>
      )}
      <div className="input-grp">
        <div className="str-input">
          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Please Enter your text here" onKeyDown={handleSendMessage} />
        </div>
        <div className="attachment">
          <label htmlFor="file-upload" className="file-upload-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paperclip-icon lucide-paperclip"><path d="M13.234 20.252 21 12.3"/><path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486"/></svg>
          </label>
          <input ref={fileInputRef} id="file-upload" onChange={setFileUrl} type="file" className="file-input" />
        </div>
        <div className="send-btn" onClick={handleSendMessage}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
