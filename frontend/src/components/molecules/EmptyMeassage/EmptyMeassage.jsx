import "./EmptyMeassage.css";
import Logo from "../../atoms/Logo/Logo";


const EmptyMeassage = () => {
  return (
    <div className="right-container">
    <div className="welcome-container">
      <Logo width="40" height="40"/>
      <div className="text">Welcome To Dashboard</div>
      <div className="sub-text">Select a conversation from sidebar to start chat</div>
    </div>
  </div>
  );
};

export default EmptyMeassage;
