import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import "./dashBoardPage.css";

const DashBoardPage = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, text }),
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      // Invalidate the userChats query so it refetches updated data
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      // Navigate to the new chat page using the returned chatId
      navigate(`/dashboard/chats/${data.chatId}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;
    mutation.mutate(text);
    e.target.reset();
  };

  return (
    <div className="dashBoardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="Carnivas AI Logo" />
          <h1>Carnivas AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="Chat with AI" />
            <span>Create New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="Analyze Image" />
            <span>Analyze Image</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="Help with Code" />
            <span>Help me with the code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Ask me Anything.." name="text" />
          <button type="submit">
            <img src="/arrow.png" alt="Send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashBoardPage;
