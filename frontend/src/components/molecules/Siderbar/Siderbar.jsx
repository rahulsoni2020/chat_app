import "./Siderbar.css";
import { IMAGE_URL } from "../../../Constants/Dashboard.constant";
import { useEffect, useState } from "react";
import useChatStore from "../../../store/useChatStore";
import { useAuthStore } from "../../../store/useAuthStore";
const Siderbar = () => {
  const {users, getUsers, setSelectedUser} = useChatStore();
  const {onlineUsers} = useAuthStore();
  const [isOnlineOnly, setIsOnlineOnly ] = useState(false); 
  
  const getStatus = (id)=>{
    return onlineUsers.includes(id)? 'Online': 'offline';
  }

  const userList = isOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)): users;
  
  useEffect(()=>{
    getUsers();
  },[getUsers]);

  return (
    <div className="left-container">
    <div className="heading">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-contact-icon lucide-contact"><path d="M16 2v2"/><path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M8 2v2"/><circle cx="12" cy="11" r="3"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>
      <span className="sub-text">Contacts</span>
    </div>
    <div className="show-online">
      <input id="checkbox" checked={isOnlineOnly} onChange={(e)=>setIsOnlineOnly(e.target.checked)} type="checkbox" />
      <span className="sub-sub-text">Show Online only</span>
    </div>
    <div className="contact-list">
        {
          userList.map((user) => (
            <div className="user" onClick={()=>setSelectedUser(user)}>
              <div className="user-img">
                <img src={user.imageUrl || IMAGE_URL} alt={user.name} />
              </div>
              <div className="sub-text">
                {user.name}<br /><span className={`sub-sub-text ${getStatus(user._id).toLowerCase()}`}>{getStatus(user._id)}</span>
              </div>
            </div>
          ))
        }
    </div>
  </div>
  );
};

export default Siderbar;
