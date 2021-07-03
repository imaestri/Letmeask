import React from "react";

import toast, { Toaster } from 'react-hot-toast';

import copyImg from "../assets/images/copy.svg";

import "../styles/roomCode.scss";

type RoomCodeProps = {
  code: string;
};



export default function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.success('Copiado!')
  }

  return (
    <>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
         <img src={copyImg} alt="copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
      <Toaster />
    </>
  );
}
