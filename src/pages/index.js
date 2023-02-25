import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Card from '@/components/Card'
import { db } from '../firebaseConfig';
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Home() {

  const testURLS = [];
  for (let index = 0; index < 10; index++) {
    var url = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${index}.mp3`;
    testURLS.push(url);
  }

  const collectionRef = collection(db, "files");

  const [filesCollection] = useCollection(
    query(collectionRef, orderBy("title", "asc"))
  );

  return (
    <>
      <Head>
        <title>Audio Archive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {filesCollection?.docs.map((file, i) => {
          return (
            <Card data={file.data()} url={testURLS[i]} />
          )
        })}
      </main>
    </>
  )
}
