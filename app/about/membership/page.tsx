import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "@/app/components/util/reveal";
import { SwitchContent } from "@/app/components/util/contentSwitch";




export default async function Home({params}:{params:{slug:string}}) {
  const { data } = await getData(`*[_type=='membership'][0]{title,slug,'imageUrl': cover.asset->url, intro, content[]{desc,'image':image.asset->url,"ratio":video.asset->data.aspect_ratio,'vid':video.asset->{playbackId}},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}`)
  console.log(data[0])
  return (
       <Reveal styleSet="w-[100vw] min-h-[100lvh] pb-[60px] grid grid-cols-12 articleStage text-white relative" style={{backgroundColor:`rgba(0,0,0,.7)`}}>
                      <div className="w-full col-span-full lg:min-h-[50vh] pb-[60px]">
                       {data.cover?( <SwitchContent work={data.cover} title={`header`}/>):''}
                     
                      </div>
                       {data.content.map((item:any,i:number)=>{
                           return(
                             <div className="contentBlock col-span-full grid grid-cols-12" key={`content-${i}`}>
                               {item.desc?(
                                 <div className="intro col-span-full xl:col-span-6 col-start-1 xl:col-start-4 mb-[20px]">
                                 <div className="secHead"><p>{item.title}</p></div>
                               <PortableText value={item.desc}/>
                             </div>
                               ):(
                                 <div className="contentBlock col-span-full">
                                 <SwitchContent work={item} title={`header`}/>
                                 </div>
                               )}
                             </div>
                             
                           )
                         })}
        
       </Reveal>
  );
}
