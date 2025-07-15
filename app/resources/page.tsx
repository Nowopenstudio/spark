import { getRandom } from "../components/util/sanity";
import { getData } from "../lib/utils-sanity";
import Link from "next/link";




export default async function Home() {
    const { data } = await getData(`*[_type=='categories']{title, catSlug}`)
  return (
    <main className="w-full flex justify-center z-99">
       
     
    </main>
  );
}

export async function generateMetadata() {
  const query = await getData(`{
    'info':*[_type=='info'][0]{meta{title,description,keywords,"image":image.asset->url}},
    'data':*[_type=='articles']{cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}
 }`)
 const {data, info} = query.data  
  return {
    title: "Resources - Spark",
    keywords: info.meta.keywords,
    description:info.meta.description,
    openGraph: {
      images: data.length?`${data[getRandom(0,(data.length-1))].cover.image ?? info.meta.image}?auto=format&amp;w=500`: `${info.meta.image}?auto=format&amp;w=500`
    }
  };
}
