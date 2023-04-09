import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { db, storage } from "../firebaseConfig"
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Card from '@/components/Card';

export default function Home(props) {

  return (
    <>
      <Head>
        <title>Audio Archive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <input type="range" min="0" max="100" class="slider" id="volume-slider" />
        {props.data.map((file) => {
          return (
            <Card key={uuidv4()} title={file.title} url={file.url} />
          )
        })}
      </main>
    </>
  )
}

export async function getServerSideProps(context) {

  const storage = getStorage();
  const listRef = ref(storage, 'audio');

  const result = await list(listRef, { maxResults: 100 });

  const data = [];
  for (let i = 0; i < result.items.length; i++) {
    data[i] = {
      title: result.items[i].name,
    }
  }

  for (let i = 0; i < data.length; i++) {
    var url = await getDownloadURL(ref(storage, `audio/${data[i].title}`))
    data[i].url = url
  }

  return {
    props: {
      data
    }
  };
}
