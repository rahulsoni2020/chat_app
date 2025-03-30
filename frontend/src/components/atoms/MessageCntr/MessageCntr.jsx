import { useAuthStore } from "../../../store/useAuthStore";
import "./MessageCntr.css";

const MessageCntr = ({receiver, message}) => {
  const {authUser} = useAuthStore();
  const getDateFormate = (val)=>{
  let dateStr = '';
  let messageDate = new Date(val);
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  dateStr = `${messageDate.getDay()}/${messageDate.getMonth()+1}/${messageDate.getFullYear()} ${time}`
  return dateStr;
}
  return (
    <div className={`message-cntr ${authUser._id === message.senderId ? 'sender-msg': ''}`} >
      <span>{authUser._id === message.senderId ? authUser?.name: receiver?.name} {getDateFormate(message.updatedAt)}</span>
      {message.attachment && <img src={message.attachment} alt="attachment" />}
      <p>{message.text}</p>
    </div>
  );
};

export default MessageCntr;
