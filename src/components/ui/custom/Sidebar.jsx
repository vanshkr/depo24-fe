import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MessageCircleMore, Users } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { getRoomList } from "@/lib/axios/api";
import Modal from "./Modal";

const Sidebar = ({ socket }) => {
  const { user, setActiveRoomId, logout } = useAuth();
  const navigate = useNavigate();
  const textRef = useRef("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const words = user?.name?.split(" ");
  let initials = "";

  if (user?.name) {
    for (let i = 0; i < words.length; i++) {
      initials += words[i][0].toUpperCase();
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoomList(user?.id);
        return response.data.result;
      } catch (error) {
        return error;
      }
    };

    fetchData().then((res) => {
      const roomIds = res.map((room) => room.roomId);
      setRoomList(() => [...roomIds]);
    });
  }, []);
  const handleSignOut = (e) => {
    e.preventDefault();
    socket.disconnect();
    logout();
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <nav className="flex gap-4 h-screen  flex-col min-w-[280px] max-w-[350px] bg-dark-4 border-r-2 border-gray-500 ">
      {isModalOpen ? (
        <Modal
          textToShow={textRef.current}
          onModalClose={onModalClose}
          socket={socket}
          setRoomList={setRoomList}
          users={[]}
        />
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
      <div className="overflow-y-auto overflow-x-hidden h-screen border-t-4 border-white pt-2">
        <h2 className="text-xl m-2">Conversations</h2>
        {roomList.length ? (
          roomList.map((room, index) => (
            <section
              key={room}
              onClick={() => setActiveRoomId(room)}
              className={`hover:shad-button_primary flex justify-between items-center px-2 py-2 ${
                index % 2 === 0 ? "even:bg-dark-2" : "odd:bg-dark-4"
              } bg-dark-2`}
            >
              <div className="flex p-2 px-4">
                <h2 className="text-2xl font-bold">{room}</h2>
              </div>
            </section>
          ))
        ) : (
          <p className="flex gap-3 h-96 justify-center items-center">
            <MessageCircleMore />
            No conversation to show
          </p>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
