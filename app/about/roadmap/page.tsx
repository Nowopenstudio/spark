import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "@/app/components/util/reveal";




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='roadmap'] | order(_createdAt desc)[0]{roadmapItem}`)
    console.log(data.roadmapItem)
  return (
        <div className="w-full py-[--sm] grid items-center grid-cols-1 min-h-[100lvh] relative articleStage" style={{backgroundColor:`rgba(0,0,0,.1)`}}>
        <div className="flex col-span-full flex-wrap-none gap-[--xs] px-[--xs]">
          {data.roadmapItem.map((item:any,i:number)=>{
            return( 
              <Reveal styleSet="w-[33vw] gridBox relative aspect-square" count={i} key={`roadmap-${i}`}>
                <div className="p-[--sm] articleStage min-h-full" style={{backgroundColor:`rgba(30,30,30,.1)`}}>
                  <h2 className="mb-[--sm]">{item.title}</h2>
                  <div className="content-block">
                    <PortableText value={item.text}/>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
                    

        </div>
  )
}

