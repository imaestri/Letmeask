import { FormEvent, useState } from "react";

import { useHistory } from "react-router";

import toast, { Toaster } from 'react-hot-toast';

import ilustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import Button from "../../components/Button/index";

import { useAuth } from "../../hooks/useAuth";

import "./style/index.scss";

import { database } from "../../services/firebase";

export default function Home() {
  const history = useHistory();

  const { signInWithGoogle, user } = useAuth();

  const [roomCode, setRoomCode] = useState("");

  async function HandleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("A sala especificada não existe!");
      return;
    }

    if(roomRef.val().endedAt){
      toast.error("A sala especificada está fechada!");
      return; 
    }


    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={ilustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <button onClick={HandleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button onClick={handleJoinRoom} type="submit">Entrar na sala</Button>
            <Toaster />
          </form>
        </div>
      </main>
    </div>
  );
}
