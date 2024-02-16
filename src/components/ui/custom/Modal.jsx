import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
function Modal({ textToShow, onModalClose }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg p-6 w-60">
        <div className="flex justify-between items-center  mb-4">
          <h2 className="text-lg font-semibold text-dark-2">{textToShow}</h2>
          <Button onClick={onModalClose}>
            <X className="text-black" />
          </Button>
        </div>
        <input
          type="text"
          placeholder="Enter room ID"
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
        />
        <Button className="shad-button_primary w-full">{textToShow}</Button>
      </div>
    </div>
  );
}

export default Modal;
