import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "../components/util/reveal";




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='donate'][0]{"slug":slug.current,title,color,donations}`)
    console.log(data)
  return (
    <div className="w-full py-[--sm] grid items-center grid-cols-1 h-[100dvh]">
          <div className="flex col-span-full flex-wrap-none items-start">
            {data.donations.map((item:any,i:number)=>{
              return(
                <Reveal styleSet="w-[33vw] p-[--sm] " count={i} key={`donate-${i}`}>
                  <h1>{item.title}</h1>
                  <div className="richText">
                    <PortableText value={item.text}/>
                  </div>
                </Reveal>
              )
            })}
          </div>
                      
     
    </div>
  );
}
