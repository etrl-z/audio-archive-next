import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { auth, db, storage } from "../firebaseConfig"
import { getStorage, ref, listAll } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import Card from '@/components/Card';
import { useRouter } from "next/router";

export default function Home(props) {

  const [user] = useAuthState(auth);

  const router = useRouter();
  const signOut = () => {
    router.push(`/`);
    auth.signOut();
  };

  return (
    <>
      <Head>
        <title>Audio Archive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src={user.photoURL} alt={user.displayName} className="icon"/>
        <button className="button" onClick={signOut}>LOG OUT</button>
        <input type="range" min="0" max="100" class="slider" id="volume-slider" />
        {props.data.map((file) => {
          return (
            <Card key={uuidv4()} title={file.title} />
          )
        })}
      </main>
    </>
  )
}

export async function getServerSideProps(context) {

  const storage = getStorage();
  const listRef = ref(storage, 'audio');

  const result = await listAll(listRef);

  const data = [];
  for (let i = 0; i < result.items.length; i++) {
    data[i] = {
      title: result.items[i].name,
    }
  }

  return {
    props: {
      data
    }
  };
}
