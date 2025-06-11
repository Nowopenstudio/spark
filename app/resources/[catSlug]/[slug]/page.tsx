import { getData } from "../../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "@/app/components/util/reveal";
import { SwitchContent } from "@/app/components/util/contentSwitch";
import { getDate } from "@/app/components/util/sanity";




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='articles' && slug.current == '${params.slug}'][0]{title,_createdAt,"author":author->{firstName},"color":category->color.rgb,slug,'imageUrl': cover.asset->url, intro, content[]{desc,'image':image.asset->url,"ratio":video.asset->data.aspect_ratio,'vid':video.asset->playbackId},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}`)
    console.log(data.cover)
  return (
    <Reveal styleSet="w-[100vw] min-h-[100dvh] ">
                   <div className="w-full  min-h-[100dvh]  grid grid-cols-12 articleStage relative text-[white] pb-[--sm]" style={{backgroundColor:`rgba(${data.color.r}, ${data.color.g}, ${data.color.b}, ${data.color.a})`}}>
                
                   {data.cover?(
                        <div className="w-full col-span-full lg:min-h-[50vh]">
                        {data.cover?( <SwitchContent work={data.cover} title={`header`}/>):''}
                      
                       </div>
                   ):("")}
                      <div className={`${data.cover?'':'pt-[--xl]'} col-span-8 col-start-3 py-[--sm] text-center uppercase`}>
                      <h1>{data.title}</h1>
                      <h2>{getDate(data._createdAt)}</h2>
                   </div>
               
                    {data.content.map((item:any,i:number)=>{
                        return(
                          <div className="contentBlock col-span-full grid grid-cols-12" key={`content-${i}`} >
                            {item.desc?(
                              <div className="intro col-span-full xl:col-span-6 col-start-1 xl:col-start-4 px-[--sm] py-[--sm] rich-text">
                              <div className="secHead"><p>{item.title}</p></div>
                            <PortableText value={item.desc}/>
                          </div>
                            ):(
                              <div className="contentBlock col-span-full px-[--sm] mb-[--sm]">
                              <SwitchContent work={item} title={`header`}/>
                              </div>
                            )}
                          </div>
                          
                        )
                      })}
                      </div>
     
    </Reveal>
  );
}
