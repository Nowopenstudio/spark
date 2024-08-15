import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='roadmap'] | order(_createdAt desc)[0]{roadmapItem}`)
    console.log(data.roadmapItem)
  return (
    <main className="w-full flex justify-center">
        {data.roadmapItem.map((item,i)=>{
          return(
             <div key={`project-${i}`} className="w-1/4 px-5 py-4 border border-white border-solid m-2 pointer-events-auto" >
             <div className="border border-white border-solid py-11"></div>
             <div className="w-full py-4"><p>{item.title}</p>
              <PortableText value={item.text}/>
             </div>

             
             </div>
          )
        })}
     
    </main>
  );
}
