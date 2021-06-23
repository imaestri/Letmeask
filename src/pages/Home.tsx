
import { useHistory } from "react-router";


import ilustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import Button from "../components/Button";
import { useAuth } from '../hooks/useAuth';

import "../styles/auth.scss";




export default function Home() {
  
  const history = useHistory();

  const { signInWithGoogle, user } = useAuth()

  async function HandleCreateRoom() {
    if(!user){
      await signInWithGoogle()
    }

    history.push("/rooms/new");
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
          <form action="">
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}