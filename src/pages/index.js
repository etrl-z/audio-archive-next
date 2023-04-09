import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { db, storage } from "../firebaseConfig"
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Card from '@/components/Card';
import getAudioFromUrl from '@/utils/getAudioFromUrl';

export default function Home() {

const props = [{title: "test", url: "test"},{title: "test", url: "test"},{title: "test", url: "test"},{title: "test", url: "test"},{title: "test", url: "test"}]

  return (
    <>
      <Head>
        <title>Audio Archive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <input type="range" min="0" max="100" class="slider" id="volume-slider" />
        {props.map((file) => {
          return (
            <Card title={file.title} audio={getAudioFromUrl(file.url)} />
          )
        })
        }
      </main>
    </>
  )
}

// export async function getServerSideProps(context) {

//   const storage = getStorage();
//   const listRef = ref(storage, 'audio');

//   const result = await list(listRef, { maxResults: 100 });

//   const data = [];
//   for (let i = 0; i < result.items.length; i++) {
//     var res = await getDownloadURL(ref(storage, `audio/${result.items[i].name}`))
//     var _url = res
//     data[i] = {
//       title: result.items[i].name.replace(".opus", ""),
//       url: _url
//     }
//   }

//   return {
//     props: {
//       data
//     }
//   };
// }
