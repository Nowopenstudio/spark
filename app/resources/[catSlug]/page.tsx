import { SwitchContent } from "@/app/components/util/contentSwitch";
import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { Reveal } from "@/app/components/util/reveal";
import Scroller from "@/app/components/scroller";
import { getRandom } from "@/app/components/util/sanity";




export default async function Home({params}:any) {
  const {catSlug} = await params
    const { data } = await getData(`*[_type=='articles' && '${catSlug}' == category->slug.current]{title,'slug':slug.current,author->{firstName},"color":category->color.rgb,"hex":category->color.hex,category->{slug,title},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}`)
  return (
    <main className="w-[100vw] grid grid-cols-12 pt-[100px] relative gap-[--xs]  py-[200px] articleStage min-h-[100dvh]" style={{backgroundColor:`rgba(20,20,20,.1)` }}>
      {data.length?(
       data.map((item:any,i:number)=>{
          return( 
            <Link href={`/resources/${catSlug}/${item.slug}`} key={`article-${i}`} className="col-span-full md:col-span-6 xl:col-span-4 gridBox relative singleArticle" >
              <Reveal styleSet="w-full  p-[--2xs] relative h-full" count={i}>
                
                <div className="articleStage relative">
                  <div className="linkBut w-[50px] h-[50px] z-10 top-[--2xs] right-[--2xs] absolute rounded-sm" style={{backgroundColor:`rgba(${item.color.r},${item.color.g},${item.color.b},1)`}}><h1 className="xy-center absolute">→</h1></div>
                  <div className="contentHold p-[--2xs]">
                    <div className='coverHold w-full aspect-video noControl mb-[--2xs]'>
                        {item.cover?(
                          <SwitchContent work={item.cover} title={item.title} ratio={item.cover.ratio} cover/>
                        ):('')}
                    </div>
                    <div className={`infoHold p-[--xs] text-[--white] rounded-sm h-[100px]`} style={{backgroundColor:`rgba(255,255,255,.1)` }}>
                      <h2 className="cardTitles mb-2">{item.title}</h2>
                      <p className="caption">{item.author?item.author.firstName:''}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Link>
          )
      })
      ):(
   <div className={`absolute xy-center z-[20] w-full text-center`}>
   <Scroller text={'COMING SOON'} time={20} />
  </div>
      )}

   
    </main>
  );
}


export async function generateMetadata({params}:any) {
  const {catSlug} = await params
  const query = await getData(`{
    'info':*[_type=='info'][0]{meta{title,description,keywords,"image":image.asset->url}},
    'cat':*[_type=="categories" && slug.current=='${catSlug}'][0]{slug,title},
    'data':*[_type=='articles' && '${catSlug}' == category->slug.current]{title,category->{slug,title},"summary":pt::text(summary),meta{title,description,keywords,"image":image.asset->url},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}
 }`)
 const {data, info,cat} = query.data  
 const curr = getRandom(0,(data.length-1))
  return {
    title: `${cat.title} - ${info.meta.title}`,
    keywords: info.meta.keywords,
    description:info.summary,
    openGraph: {
       images: data.length && data[curr].cover?`${data[curr].cover.image}?auto=format&amp;w=500`: `${info.meta.image}?auto=format&amp;w=500`
    }
  };
}
