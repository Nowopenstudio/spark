import { getData } from "../../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "@/app/components/util/reveal";
import { SwitchContent } from "@/app/components/util/contentSwitch";
import { getDate } from "@/app/components/util/sanity";
import Gallery from "@/app/components/gallery";




export default async function Home({ params }: { params: { slug: string } }) {
  const { data } = await getData(`*[_type=='articles' && slug.current == '${params.slug}'][0]{title,subTitle,_createdAt,"author":author->{firstName},"color":category->color.rgb,slug,'imageUrl': cover.asset->url, intro, content[]{content,desc,right,columns,caption,ordered,list,embed,"image":image.asset->url, "vid":vid.asset->playbackId, "ratio":vid.asset->data.aspect_ratio,gallery[]{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}`)

  return (
    <Reveal styleSet="w-[100vw] min-h-[100dvh] ">
      <div className="w-full  min-h-[100dvh]  grid grid-cols-12 articleStage relative text-[white] p-0 md:p-[--sm]" style={{ backgroundColor: `rgba(20,20,20,.75)` }}>

        {data.cover ? (
          <div className="w-full  col-span-full  lg:min-h-[50vh]">
            {data.cover ? (<SwitchContent work={data.cover} title={`header`} ratio={data.cover.ratio} cover />) : ''}

          </div>
        ) : ("")}

        <div className={`${data.cover ? 'pt-[--sm] lg:pt-[--med]' : 'pt-[--xl]'} items-start col-span-full lg:col-span-6 lg:col-start-4 py-[--xs] uppercase flex-wrap lg:flex-nowrap flex  px-[--xs] lg:px-0 gap-[--xs] md:px-0`}>
          <div className="lg:pt-[5px]"><div className="aspect-square w-[50px] rounded-sm " style={{ backgroundColor: `rgb(${data.color.r},${data.color.g},${data.color.b})` }}></div></div>
          <div >
            <h1 className="mb-[--xs]">{data.title}</h1>
          </div>
        </div>


        <div className="col-span-full grid grid-cols-12  py-[--xs] lg:py-[--sm] contentBlock">

          {data.subTitle ? (
            <h2 className="w-full col-span-full lg:col-span-6 lg:col-start-4 px-[--xs] lg:px-0 pb-[--sm]" >{data.subTitle}</h2>
          ) : ('')}
          <p className="caption w-full col-span-full lg:col-span-6 lg:col-start-4 px-[--xs] lg:px-0 pb-[--sm]">BY {data.author.firstName} - {getDate(data._createdAt)}</p>
          {data.content ? (
            data.content.map((item: any, i: number) => {
              return (
                <Reveal key={`content-${i}`} styleSet={`col-span-full grid grid-cols-12 mb-[--sm]`}>
                  {item.content == 'image' ? (
                    <div className="col-span-full gridBox  relative"><div className="w-full relative p-[--xs]"><Image alt={`work image of ${data.title}`} height={0} width={0} sizes="100vw" src={item.image} className="w-full  z-0" /></div></div>
                  ) : ('')}

                  {item.content == 'text' ? (
                    <div className="w-full col-span-full lg:col-span-6 lg:col-start-4 px-[--xs] md:px-0">
                      <div className="richText col-span-full lg:col-span-5 xl:col-span-4">
                        <PortableText value={item.desc} />
                      </div>
                    </div>
                  ) : ('')}

                  {item.content == 'video' ? (
                    <div className="col-span-full gridBox  relative"><div className="w-full relative p-[--xs]">
                      <SwitchContent work={item} title={data.title} ratio={item.ratio} /></div></div>
                  ) : ('')}

                  {item.content == "gallery" && item.gallery ? (
                    <div className="col-span-full" style={{ height: `${item.gallery.length * 100}vh` }}> <Gallery data={item.gallery} /></div>

                  ) : ""}
                  {
                    item.embed ? (
                      <div className="col-span-full gridBox  relative"><div className="w-full relative p-[--xs]">
                        <div className="w-full aspect-video" dangerouslySetInnerHTML={{ __html: item.embed }}></div></div></div>
                    ) : ('')
                  }

                  {item.content == 'list' ? (
                    <div className="w-full col-span-full lg:col-span-8 lg:col-start-3 px-0 lg:px-[--sm]">
                      {item.list.text ? (
                        <PortableText value={item.list.text} />
                      ) : ('')}
                      {item.list.items ? (
                        item.list.items.map((single: any, s: number) => {
                          return (
                            <div className="w-full p-[--xs] lg:p-[--sm] gridBox relative" key={`list-${i}-${s}`} >
                              <div className="w-full">
                                <div className="relative bgBlur flex flex-wrap items-start p-[--xs] lg:p-[--sm]" style={{ backgroundColor: `rgba(255, 255, 255, 0.1)` }}>
                                  <div className={`items-start col-span-full lg:col-span-6 lg:col-start-4 flex-wrap lg:flex-nowrap flex px-0 gap- [--xs]`}>
                                    <div ><div className="aspect-square w-[50px] rounded-sm flex-shrink-0 relative" style={{ backgroundColor: `rgb(${data.color.r},${data.color.g},${data.color.b})` }}>
                                      {item.ordered ? (
                                        <h2 className="absolute xy-center ol-number">{s + 1}</h2>
                                      ) : ('')}
                                    </div></div>
                                    <div >
                                      <h2 className="mb-[--xs] flex-shrink-0 pt-[--2xs]">{single.title}</h2>
                                    </div>
                                  </div>
                                  {single.item ? (
                                    <div className="w-full flex-shrink-0 mono  pt-[--xs]"><PortableText value={single.item} /></div>

                                  ) : ('')}
                                </div>
                              </div>

                            </div>
                          )
                        })
                      ) : ('')}
                    </div>
                  ) : ('')}
                </Reveal>
              )
            })
          ) : ('')}

        </div>
      </div>

    </Reveal>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const query = await getData(`{
    'info':*[_type=='info'][0]{meta{title,description,keywords,"image":image.asset->url}},
    'data':*[_type=='articles' && slug.current == '${params.slug}'][0]{title,"summary":pt::text(summary),meta{title,description,keywords,"image":image.asset->url},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}
 }`)
 const {data, info} = query.data  
  return {
    title: data.meta.title ?? data.title,
    keywords: data.meta.keywords ?? info.meta.keywords,
    description:data.meta.description??info.summary,
    openGraph: {
      images: data.meta && data.meta.image?`${data.meta.image}?auto=format&amp;w=500`: (data.cover.image?`${data.cover.image}?auto=format&amp;w=500`:`${info.meta.image}?auto=format&amp;w=500`)
    }
  };
}
