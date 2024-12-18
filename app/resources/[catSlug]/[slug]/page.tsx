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
    <Reveal styleSet="w-3/4 min-h-[100dvh] pb-[60px] grid grid-cols-8 articleStage text-white relative">
                   <div className="w-full col-span-full">
                    {data[0].media?( <SwitchContent work={data[0].media[0]} title={`header`}/>):''}
                  
                   </div>
                    <div className="col-span-6 col-start-2 my-[60px] ">
                        <p className="fake">{data[0].title}</p>
                        <p className="mb-[20px]">{`By ${data[0].author.firstName}`}</p>
                        <p className="fakeSub">{data[0]._createdAt}</p>
                    </div>
                    {data[0].content.map((item:any,i:number)=>{
                        return(
                          <div className="intro col-span-6 col-start-2 mb-[20px]" key={`content-${i}`}>
                            <div className="secHead"><p>{item.title}</p></div>
                          <PortableText value={item.content[0]}/>
                        </div>
                        )
                      })}
     
    </Reveal>
  );
}
