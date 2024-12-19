import { getData } from "../../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "@/app/components/util/reveal";
import { SwitchContent } from "@/app/components/util/contentSwitch";




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='articles' && slug.current == '${params.slug}']{title,_createdAt,"author":author->{firstName},slug,'imageUrl': cover.asset->url, intro, content,media[]{desc,"imageUrl":image.asset->url, video{asset->{playbackId}}}}`)
    console.log(data[0])
  return (
    <Reveal styleSet="w-[100vw] min-h-[100dvh] pb-[60px] grid grid-cols-12 articleStage text-white relative">
                   <div className="w-full col-span-full min-h-[50vh] pb-[60px]">
                    {data[0].media?( <SwitchContent work={data[0].media[0]} title={`header`}/>):''}
                  
                   </div>
                    {data[0].content.map((item:any,i:number)=>{
                        return(
                          <div className="intro col-span-6 col-start-4 mb-[20px]" key={`content-${i}`}>
                            <div className="secHead"><p>{item.title}</p></div>
                          <PortableText value={item.content[0]}/>
                        </div>
                        )
                      })}
     
    </Reveal>
  );
}
