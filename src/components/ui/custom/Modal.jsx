import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "../use-toast";
import { useAuth } from "@/lib/context/AuthContext";

function Modal({ textToShow, onModalClose, socket }) {
  const { checkAuthUser, user, setActiveRoomId } = useAuth();
  const inputRef = useRef(null);
  const { toast } = useToast();
  const handleJoinRoom = () => {
    const room = inputRef.current.value;
    if (!room) {
      toast({ title: "Room ID is empty." });
      return;
    }

    const boolUser = checkAuthUser();
    if (!boolUser) {
      toast({ title: "User is not authenticated." });
      return;
    }
    if (textToShow == "Join Room") {
      socket.emit("join_room", { username: user?.name, room, userId: user.id });
    } else if (textToShow == "Create Room") {
      socket.emit("create_room", {
        username: user?.name,
        room,
        userId: user.id,
      });
    } else {
      toast({ title: "Options did not match. " });
      return;
    }

    setActiveRoomId(room);
    onModalClose();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg p-6 w-60">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-dark-2">{textToShow}</h2>
          <Button onClick={onModalClose}>
            <X className="text-black" />
          </Button>
        </div>
        <input
          type="text"
          placeholder="Enter room ID"
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4 text-black"
          ref={inputRef}
        />
        <Button
          className="shad-button_primary w-full"
          onClick={() => handleJoinRoom(textToShow)}
        >
          {textToShow}
        </Button>
      </div>
    </div>
  );
}

export default Modal;
