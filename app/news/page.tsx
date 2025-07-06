import { SwitchContent } from "@/app/components/util/contentSwitch";
import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { Reveal } from "@/app/components/util/reveal";




export default async function Home({params}:{params:{catSlug:string}}) {
    const { data } = await getData(`*[_type=='news']{title,'slug':slug.current,author->{firstName},category->{slug,title},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}`)
    console.log(data)
  return (
    <main className="w-[100vw] grid grid-cols-12 pt-[100px] relative gap-[--xs] px-[--sm] py-[200px] articleStage min-h-[100dvh]" style={{backgroundColor:`rgba(20,20,20,.1)` }}>
      {data.map((item:any,i:number)=>{
          return( 
            <Link href={`/news/${item.slug}`} key={`article-${i}`} className="singleArticle col-span-full md:col-span-6 xl:col-span-4 gridBox relative" >
              <Reveal styleSet="w-full  p-[--2xs]" count={i}>
                <div className="articleStage relative">
                   <div className="linkBut w-[50px] h-[50px] z-10 top-[--2xs] right-[--2xs] absolute rounded-sm" style={{backgroundColor:`rgba(255,255,255,1)`}}><h2 className="xy-center absolute text-black">→</h2></div>
                  <div className="contentHold p-[--2xs]">
                    <div className='coverHold w-full aspect-video noControl mb-[--2xs]'>
                        {item.cover?(
                          <SwitchContent work={item.cover} title={item.title} ratio={item.cover.ratio} cover/>
                        ):('')}
                    </div>
                    <div className={`infoHold p-[--xs] text-[--white] rounded-sm`} style={{backgroundColor:`rgba(255,255,255,.1)` }}>
                      <h2>{item.title}</h2>
                      <h2>{item.author.firstName}</h2>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Link>
          )
      })}
    </main>
  );
}
