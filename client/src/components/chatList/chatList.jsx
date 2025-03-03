import { BadgeInfo, LayoutDashboard, SquarePen } from "lucide-react";
import "./chatList.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatList">
      <span className="title">DashBoard</span>
      <Link to="/dashboard" className="options">
        <SquarePen /> Create New Chat
      </Link>
      <Link to="/" className="options">
        <LayoutDashboard /> Explore Lama AI
      </Link>
      <Link to="/" className="options">
        <BadgeInfo /> Contact
      </Link>
      <hr />
      <div className="list">
        <span className="title">Recent Chats</span>
        {isLoading
          ? "Loading ..."
          : error
          ? "Something went wrong!"
          : Array.isArray(data) && data.length > 0
          ? data.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))
          : "No chats available."}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="Logo" />
        <div className="texts">
          <span>Upgrade to carnival AI Pro</span>
          <span>Get unlimited access to the All features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
