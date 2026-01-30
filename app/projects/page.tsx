import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { getRandom } from "../components/util/sanity";




export default async function Home() {
    const { data } = await getData(`*[_type=='projects']{title,slug}`)
    console.log(data)
  return (
    <main className="w-full flex justify-center">
        {/* {data.map((item:any,i:number)=>{
          return(
             <Link key={`project-${i}`} href={`/projects/${item.slug.current}`} className="infoCard w-1/4 px-5 py-4 border border-white border-solid m-2 pointer-events-auto" >
             <div className="border border-white border-solid py-11"></div>
             <div className="w-full py-4"><p>{item.title}</p></div>
             
             </Link>
          )
        })}
      */}
    </main>
  );
}

export async function generateMetadata() {
  const query = await getData(`{
    'info':*[_type=='info'][0]{meta{title,description,keywords,"image":image.asset->url},projects{title,description,keywords,"image":image.asset->url}},
    'data':*[_type=='projects']{cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}
 }`)
 const {data, info} = query.data  
  return {
    title: `${info?info.projects.title:''} - ${info?info.meta.title:''}}`,
    keywords: info.projects.keywords ?? info.meta.keywords,
    description: info.projects.description ?? info.meta.description,
    openGraph: {
      images: info.projects.image ?? (data.length?`${data[getRandom(0,(data.length-1))].cover.image ?? info.meta.image}?auto=format&amp;w=500`: `${info.meta.image}?auto=format&amp;w=500`)
    }
  };
}

