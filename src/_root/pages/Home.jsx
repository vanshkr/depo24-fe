import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/lib/context/AuthContext";
import { useOutletContext } from "react-router-dom";
const Home = () => {
  const inputRef = useRef(null);
  const socket = useOutletContext();
  const { user, activeRoomId } = useAuth();
  const [messagesReceived, setMessagesReceived] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((prevState) => [
        ...prevState,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket.on]);

  const handleSendMessage = () => {
    const message = inputRef.current.value;
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", {
        username: user?.name,
        room: activeRoomId,
        message,
        __createdtime__,
      });
    }

    inputRef.current.value = "";
  };
  return (
    <div className="flex w-full flex-col h-screen justify-between bg-dark-4">
      <section className="flex justify-between items-center px-2 py-2 bg-dark-2 h-16">
        <div className="flex">
          <Avatar className="border-2 border-white"></Avatar>

          <div className="px-3 ">
            <h2>Room Name</h2>
            <p className="text-light-3 max-w-[200px] text-xs truncate">
              Lasadsffff
            </p>
          </div>
        </div>
        <div className="self-start text-sm pr-2">time</div>
      </section>
      <div className="flex flex-col gap-4 px-2">
        <div className="flex justify-end">dsfsadfsadfsa</div>
        <div className="flex flex-start">dfsadfdsafsadfa</div>
        {messagesReceived?.map((msgObj, index) => (
          <div className="text-white" key={index}>
            {msgObj.message}
          </div>
        ))}
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
          <Button onClick={handleSendMessage} className="shad-button_primary">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
