import { SwitchContent } from "@/app/components/util/contentSwitch";
import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/app/components/util/reveal";
import { getDate } from "../components/util/sanity";
import Gallery from "../components/gallery";
import ListFaqs from "../components/util/listFaq";




export default async function Home() {
  const { data } = await getData(`*[_type=='guide'][0]{title,subTitle,'imageUrl': cover.asset->url, intro, content[]{content,list,ordered,text,right,columns,caption,embed,"image":image.asset->url, "vid":vid.asset->playbackId, "ratio":vid.asset->data.aspect_ratio,gallery[]{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}`)
  console.log(data)
  return (
    <Reveal styleSet="w-[100vw] min-h-[100dvh]">
      <div className="w-full  min-h-[100dvh]  grid grid-cols-12 articleStage relative text-[white] py-4" style={{ backgroundColor: `rgba(20,20,20,.75)` }}>

        {data.cover ? (
          <div className="w-full  col-span-full  lg:min-h-[50vh] ">
            {data.cover ? (<SwitchContent work={data.cover} title={`header`} ratio={data.cover.ratio} cover />) : ''}

          </div>
        ) : ("")}
        <div className={`${data.cover ? 'pt-[--sm] lg:pt-[--med]' : 'pt-[--xl]'} items-start col-span-full lg:col-span-6 lg:col-start-4 py-[--xs] uppercase flex-wrap lg:flex-nowrap flex  px-[--xs] lg:px-0 gap-[--xs]`}>
          <div className="lg:pt-[5px]"><div className="aspect-square w-[50px] rounded-sm " style={{ backgroundColor: `#ffffff` }}></div></div>
          <div >
            <h1 className="mb-[--xs]">{data.title}</h1>
          </div>

        </div>


        <div className="col-span-full grid grid-cols-12  pb-[--xs] lg:pb-[--sm] contentBlock">
          {data.subTitle ? (
            <h2 className="w-full col-span-full lg:col-span-6 lg:col-start-4 px-[--xs] lg:px-0 pb-[--sm]" >{data.subTitle}</h2>
          ) : ('')}
          {data.content ? (
            data.content.map((item: any, i: number) => {
              return (
                <Reveal key={`content-${i}`} styleSet={`col-span-full grid grid-cols-12 mb-[--sm]`}>
                  {item.content == 'image' ? (
                    <div className="col-span-full gridBox  relative "><div className="w-full relative p-[--xs]"><Image alt={`work image of ${data.title}`} height={0} width={0} sizes="100vw" src={item.image} className="w-full  z-0" /></div></div>
                  ) : ('')}

                  {item.content == 'text' ? (
                    <div className="w-full col-span-full lg:col-span-6 lg:col-start-4 px-[--xs] lg:px-0">
                      <div className="richText col-span-full lg:col-span-5 xl:col-span-4">
                        <PortableText value={item.text} />
                      </div>
                    </div>
                  ) : ('')}

                  {item.content == 'video' ? (
                    <div className="col-span-full gridBox  relative"><div className="w-full relative p-[--xs]">
                      <SwitchContent work={item} title={data.title} ratio={item.ratio} /></div></div>
                  ) : ('')}

                  {item.content == "gallery" && item.gallery ? (
                     <Gallery data={item.gallery} />

                  ) : ""}
                  {
                    item.embed ? (
                      <div className="col-span-full gridBox  relative"><div className="w-full relative p-[--xs]">
                        <div className="w-full aspect-video" dangerouslySetInnerHTML={{ __html: item.embed }}></div></div></div>
                    ) : ('')
                  }
                  {item.content == 'list' ? (
                    <div className="w-full col-span-full lg:col-span-8 lg:col-start-3 px-[--xs] lg:px-[--sm]">
                      {item.list.text ? (
                        <PortableText value={item.list.text} />
                      ) : ('')}
                      {item.list.items ? (
                        item.list.faqs ? (
                          item.list.items.map((single: any, s: number) => {
                            return (
                              <ListFaqs key={`faqs-${i}-${s}`} data={single} ordered={item.ordered} count={s} />

                            )
                          })
                        ) : (
                          item.list.items.map((single: any, s: number) => {
                            return (
                              <div className="w-full  p-[--sm] lg:p-[--sm] gridBox relative" key={`list-${i}-s`} >
                                <div >
                                  <div className="relative bgBlur flex flex-wrap items-start p-[--xs] lg:p-[--sm]" style={{ backgroundColor: `rgba(255, 255, 255, 0.1)` }}>
                                    <div className={`items-start col-span-full lg:col-span-6 lg:col-start-4 flex-wrap lg:flex-nowrap flex px-0 gap-[--xs]`}>
                                      <div ><div className="aspect-square w-[50px] rounded-sm flex-shrink-0 relative" style={{ backgroundColor: `#ffffff` }}>
                                        {item.ordered ? (
                                          <h2 className="absolute xy-center ol-number text-black">{s + 1}</h2>
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
                        )
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
