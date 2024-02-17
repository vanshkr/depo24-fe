import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getRoomDetails } from "@/lib/axios/api";
import { useAuth } from "@/lib/context/AuthContext";
import { useOutletContext } from "react-router-dom";
const Home = () => {
  const inputRef = useRef(null);
  const socket = useOutletContext();
  const { user, activeRoomId } = useAuth();
  const [messagesReceived, setMessagesReceived] = useState([]);

  useEffect(() => {
    console.log("chalo");
    socket.on("receive_message", (data) => {
      console.log(activeRoomId, data, "isi");
      if (activeRoomId === data.room) {
        setMessagesReceived((prevState) => [
          ...prevState,
          {
            content: data.content,
            username: data.username,
            senderId: data?.senderId,
            createdTime: data.createdTime,
          },
        ]);
      }
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
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
      if (messages) {
        setMessagesReceived([...messages]);
      } else {
        setMessagesReceived([]);
      }
    });
  }, [activeRoomId]);

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
  console.log(socket, messagesReceived);
  return (
    <>
      {activeRoomId ? (
        <div className="flex w-full flex-col h-screen justify-between bg-dark-4">
          <section className="flex justify-between items-center px-2 py-2 bg-dark-2 h-16">
            <div className="flex">
              <Avatar className="border-2 border-white"></Avatar>

              <div className="px-3 ">
                <h2>{activeRoomId}</h2>
                <p className="text-light-3 max-w-[200px] text-xs truncate">
                  Lasadsffff
                </p>
              </div>
            </div>
            <div className="self-start text-sm pr-2">time</div>
          </section>
          <div className="flex flex-col gap-4 px-2 overflow-y-auto">
            {messagesReceived?.map((msgObj, index) =>
              msgObj.senderId ? (
                <div
                  className={`flex ${
                    msgObj?.senderId === user?.id
                      ? "justify-end"
                      : "justify-start"
                  } mb-4`}
                  key={index}
                >
                  <div className="bg-purple-200 rounded-lg px-4 py-2 max-w-md">
                    <p className="text-purple-800">{msgObj.content}</p>
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
