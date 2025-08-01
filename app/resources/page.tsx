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
    'info':*[_type=='info'][0]{meta{title,description,keywords,"image":image.asset->url},resources{title,description,keywords,"image":image.asset->url}},
    'data':*[_type=='articles']{cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}
 }`)
 const {data, info} = query.data  
 const curr = getRandom(0,(data.length-1))
  return {
    title: `${info.resources.title} - ${info.meta.title}`,
    keywords: info.resources.keyword??info.meta.keywords,
    description:info.resources.description??info.meta.description,
    openGraph: {
      images: info.resources.image??(data[curr].cover && data[curr].cover.image?`${data[curr].cover.image}?auto=format&amp;w=500`: `${info.meta.image}?auto=format&amp;w=500`)
    }
  };
}
