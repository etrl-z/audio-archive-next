import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { db, storage } from "../firebaseConfig"
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";
import Card from '@/components/Card';

export default function Home(props) {

  return (
    <>
      <Head>
        <title>Audio Archive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {props.data.map((file) => {
          return (
            <Card title={file.title} url={file.url} />
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
    var res = await getDownloadURL(ref(storage, `audio/${result.items[i].name}`))
    var _url = res
    data[i] = {
      title: result.items[i].name.replace(".opus", ""),
      url: _url
    }
  }

  return {
    props: {
      data
    }
  };
}
