import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { getRoomDetails } from "@/lib/axios/api";
import { useAuth } from "@/lib/context/AuthContext";
import { useOutletContext } from "react-router-dom";
import { Contact } from "lucide-react";
import Modal from "@/components/ui/custom/Modal";
const Home = () => {
  const inputRef = useRef(null);
  const socket = useOutletContext();
  const { user, activeRoomId } = useAuth();
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data, "data");
      setMessagesReceived((prevState) => [
        ...prevState,
        {
          content: data.content,
          username: data.username,
          senderId: data?.senderId,
          timestamp: data.timestamp,
        },
      ]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("join", activeRoomId);
    const fetchData = async () => {
      try {
        const response = await getRoomDetails(activeRoomId, user?.id);
        return response.data.result;
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchData().then((res) => {
      const messages = res?.messages;
      const users = res?.participants;
      console.log(res, "res");
      if (messages) {
        setMessagesReceived([...messages]);
        setParticipants([...users]);
      } else {
        setMessagesReceived([]);
      }
    });
    return () => {
      socket.emit("leave", activeRoomId);
    };
  }, [activeRoomId]);
  const onModalClose = () => {
    setIsModalOpen(false);
  };
  const handleSendMessage = () => {
    const message = inputRef.current.value;
    if (message !== "") {
      socket.emit("send_message", {
        username: user?.name,
        room: activeRoomId,
        content: message,
        senderId: user?.id,
      });
    }

    inputRef.current.value = "";
  };
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  console.log(messagesReceived);
  return (
    <>
      {activeRoomId ? (
        <div className="flex w-full flex-col h-screen justify-between bg-dark-4">
          {isModalOpen ? (
            <Modal users={participants} onModalClose={onModalClose} />
          ) : undefined}
          <section className="flex justify-between items-center px-2 py-2 bg-dark-2 h-16">
            <div className="flex p-2 px-4">
              <h2 className="text-2xl font-bold">{activeRoomId}</h2>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Contact />
            </Button>
          </section>
          <div className="flex h-screen flex-col gap-4 px-2 overflow-y-auto">
            {messagesReceived?.map((msgObj, index) =>
              msgObj.senderId ? (
                <div
                  className={`flex ${
                    msgObj?.senderId === user?.id
                      ? "justify-end"
                      : "justify-start"
                  } mb-4 text-white`}
                  key={index}
                >
                  <div
                    className={` flex ${
                      msgObj?.senderId === user?.id
                        ? "bg-green-500"
                        : "bg-dark-2"
                    } mb-4  rounded-lg px-4 py-2 max-w-md`}
                  >
                    <p className="pr-3">{msgObj.content}</p>
                    <p className="text-light-4 text-xs self-end">
                      {formatTimestamp(msgObj.timestamp)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`flex justify-center mb-4`} key={index}>
                  <div className="bg-purple-200 rounded-lg px-4 py-2 max-w-md">
                    <p className="text-purple-800">{msgObj.content}</p>
                  </div>
                </div>
              )
            )}
          </div>
          <div>
            {" "}
            <div className="flex items-center border-t border-gray-300 px-4 py-3">
              <input
                type="text"
                placeholder="Type a message"
                ref={inputRef}
                className="flex-grow px-3 py-2 bg-gray-200 focus:outline-none border rounded-md mr-4 text-black"
              />
              <Button
                onClick={handleSendMessage}
                className="shad-button_primary"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      ) : undefined}
    </>
  );
};

export default Home;
