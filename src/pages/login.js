import Head from "next/head";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

export default function login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <center style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="login" className="icon" />
          <button className="button" onClick={signIn} >
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </center >
    </>
  );
}
