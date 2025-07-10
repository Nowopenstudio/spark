import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "@/app/components/util/reveal";
import { SwitchContent } from "@/app/components/util/contentSwitch";
import Donate from "../../components/donateModule";
import Donations from "./donations";




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='projects' && slug.current == '${params.slug}'][0]{title,subhead,cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio},"slug":slug.current,copy,donations[]{title,openSlug,summary,"color":color.hex,content[]{content,text,"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio,gallery[]{'image':asset->url}}}}`)
   
  return (
      <Reveal styleSet="w-[100vw] min-h-[100dvh]">
                      <div className="w-full pb-[--med] lg:min-h-[100dvh] articleStage relative" style={{backgroundColor: `rgba(0,0,0,.7)`}}>
                           
                                {data.cover?(
                                                       <div className="w-full col-span-full md:col-span-10 md:col-start-2 p-[--xs] gridBox relative">
         <div className="w-full"><div className="p-[--2xs] relative w-full aspect-video overflow-hidden rounded-sm"> {data.cover ? (<SwitchContent work={data.cover} title={`header`} ratio={data.cover.ratio} />) : ''}</div></div></div>

                                                  ):("")}

                     
                                 <Donate data={data}/>
                             
                                 <Donations data={data}/>
                     
                         </div>
       
      </Reveal>
  );
}
