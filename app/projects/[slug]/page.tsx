import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "@/app/components/util/reveal";
import { SwitchContent } from "@/app/components/util/contentSwitch";
import Donate from "../../components/donateModule";
import Donations from "./donations";
import Scroller from "@/app/components/scroller";




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='projects' && slug.current == '${params.slug}'][0]{title,subhead,cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio},"slug":slug.current,copy,content[]{content,text,"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio,gallery[]{'image':asset->url}},donations[]{title,openSlug,summary,"color":color.hex,content[]{content,text,"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio,gallery[]{'image':asset->url}}}}`)
   
  return (
      <Reveal styleSet="w-[100vw] min-h-[100dvh]">
                      <div className="w-full pt-[--med] md:pt-0 pb-[--med] lg:min-h-[100dvh] articleStage relative" style={{backgroundColor: `rgba(0,0,0,.7)`}}>
                           
                                {data.cover?(
                                                       <div className="w-full  col-span-full md:col-span-10 md:col-start-2 p-[--xs] gridBox relative">
         <div className="w-full"><div className="p-[--2xs] relative w-full aspect-video overflow-hidden rounded-sm"> {data.cover ? (<SwitchContent work={data.cover} title={`header`} ratio={data.cover.ratio} />) : ''}</div></div>
          <div className={`absolute xy-center z-[20] w-full text-center`}>
                                            <Scroller text={data.title} time={20} />
                                           </div>
         </div>

                                                  ):("")}

                     
                                 <Donate data={data}/>
                             
                                 <Donations data={data}/>
                     
                         </div>
       
      </Reveal>
  );
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const query = await getData(`{
    'info':*[_type=='info'][0]{meta{title,description,keywords,"image":image.asset->url}},
    'data':*[_type=='projects' && slug.current == '${params.slug}'][0]{title,"summary":pt::text(summary),meta{title,description,keywords,"image":image.asset->url},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}
 }`)
 const {data, info} = query.data  
  return {
    title: data.meta.title ?? data.title,
    keywords: data.meta.keywords ?? info.meta.keywords,
    description:data.meta.description??info.summary,
    openGraph: {
      images: data.meta.image?`${data.meta.image}?auto=format&amp;w=500`: (data.cover.image?`${data.cover.image}?auto=format&amp;w=500`:`${info.meta.image}?auto=format&amp;w=500`)
    }
  };
}
