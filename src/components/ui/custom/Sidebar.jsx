import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, MessageCircleMore, Users } from "lucide-react";
import { useState, useRef } from "react";
import Modal from "./Modal";
const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const textRef = useRef("");
  const words = user?.name.split(" ");
  let initials = "";

  if (user?.name) {
    for (let i = 0; i < words.length; i++) {
      initials += words[i][0].toUpperCase();
    }
  }

  const handleSignOut = (e) => {
    e.preventDefault();
    // signOut();
    // setIsAuthenticated(false);
    // setUser(INITIAL_USER);
    navigate("/signIn");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <nav className="hidden md:flex gap-4  flex-col min-w-[280px] max-w-[350px] bg-dark-4 border-r-2 border-gray-500 ">
      {isModalOpen ? (
        <Modal textToShow={textRef.current} onModalClose={onModalClose} />
      ) : undefined}
      <section className="flex justify-center items-center px-2 py-2 bg-dark-2 h-16">
        <img src="/assets/images/logo.png" alt="logo" width={140} />
      </section>
      <section className="flex items-center gap-x-3 px-2 ">
        <Avatar className="border-2 border-white">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <p className="flex flex-1">{user.name}</p>
        <Button onClick={handleSignOut}>
          <img src="/assets/icons/logout.svg" alt="logout" />
        </Button>
      </section>

      <div className="flex gap-3 px-1">
        <Button
          className="bg-primary-500 hover:bg-primary-500 text-light-1 flex gap-1 text-sm"
          onClick={() => {
            textRef.current = "Create Room";
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4" /> Create Room
        </Button>
        <Button
          className="bg-primary-500 hover:bg-primary-500 text-light-1 flex gap-1"
          onClick={() => {
            textRef.current = "Join Room";
            setIsModalOpen(true);
          }}
        >
          <Users className="w-4 h-4" /> Join Room
        </Button>
      </div>
      <div className="overflow-y-auto overflow-x-hidden border-t-4 border-white pt-2">
        <h2 className="text-xl m-2">Conversations</h2>
        {true ? (
          <div>
            <section className="flex justify-between items-center px-2 py-2 bg-dark-2">
              <div className="flex">
                <Avatar className="border-2 border-white">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>

                <div className="px-3 ">
                  <h2>Room Name</h2>
                  <p className="text-light-3 max-w-[200px] text-xs truncate">
                    Lasadsffff
                  </p>
                </div>
              </div>
              <div className="self-start text-sm pr-2">time</div>
            </section>
          </div>
        ) : (
          <p className="flex gap-3 h-full justify-center items-center">
            <MessageCircleMore />
            No conversation to show
          </p>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
