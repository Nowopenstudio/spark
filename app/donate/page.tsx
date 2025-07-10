import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "../components/util/reveal";
import { SwitchContent } from "../components/util/contentSwitch";
import Donations from "./donations";
import Donate from "../components/donateModule";
import { openConnect } from "../components/util/sanity";
import Scroller from "../components/scroller";




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='donate'][0]{title,subhead,cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio},"slug":slug.current,copy,donations[]{title,openSlug,summary,"color":color.hex,content[]{content,text,"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio,gallery[]{'image':asset->url}}}}`)

  return (
    <div className="w-full pb-[--med] min-h-[100dvh] articleStage relative" style={{backgroundColor: `rgba(0,0,0,.7)`}}>
      
           {data.cover?(
                                  <div className="w-full  lg:min-h-[100vh] relative">
                                  {data.cover?( <SwitchContent work={data.cover} title={`header`}/>):''}
                                  <div className={`absolute xy-center z-[20] w-full text-center`}>
                                   <Scroller text={data.title} time={20} />
                                  </div>
                                
                                 </div>
                             ):("")}

            <Donate data={data}/>
        
            <Donations data={data}/>

    </div>
  );
}
