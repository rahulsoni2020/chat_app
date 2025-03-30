
import useChatStore from "../../../store/useChatStore";
import ChatBox from "../../molecules/ChatBox/ChatBox";
import EmptyMeassage from "../../molecules/EmptyMeassage/EmptyMeassage";
import Siderbar from "../../molecules/Siderbar/Siderbar";
import "./Dashboard.css";


const Dashboard = () => {
  const {selectedUser} = useChatStore();

  return (
    <div className="container">
      <div className="dashboard-container">
        <Siderbar/>
        {!selectedUser? <EmptyMeassage/>: <ChatBox/>}
      </div>
    </div>
  );
};

export default Dashboard;
