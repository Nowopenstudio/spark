import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "../components/util/reveal";
import { SwitchContent } from "../components/util/contentSwitch";
import Donations from "./donations";
import Donate from "./donateModule";




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='donate'][0]{title,subhead,cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio},"slug":slug.current,copy,donations[]{title,id,summary,"color":color.hex,content[]{content,text,"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio,gallery[]{'image':asset->url}}}}`)
    console.log(data.donations[0].content[2].gallery)
  return (
    <div className="w-full py-[--sm] min-h-[100dvh] articleStage bg-[--dark] relative">
      
           {data.cover?(
                                  <div className="w-full  min-h-[100vh] relative">
                                  {data.cover?( <SwitchContent work={data.cover} title={`header`}/>):''}
                                  <div className={`absolute xy-center z-[20] w-full p-[--sm] text-center`}>
                                    <h1>{data.title}</h1>
                                  </div>
                                
                                 </div>
                             ):("")}

            <Donate data={data}/>
        
            <Donations data={data}/>

    </div>
  );
}
