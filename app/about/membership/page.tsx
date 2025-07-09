import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "@/app/components/util/reveal";
import { SwitchContent } from "@/app/components/util/contentSwitch";
import Gallery from "@/app/donate/gallery";
import ListFaqs from "@/app/components/util/listFaq";




export default async function Home({ params }: { params: { slug: string } }) {
  const { data } = await getData(`*[_type=='membership'][0]{title,slug,'imageUrl': cover.asset->url, intro, content[]{content,desc,ordered,list,right,columns,caption,embed,"image":image.asset->url, "vid":vid.asset->playbackId, "ratio":vid.asset->data.aspect_ratio,gallery[]{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}`)
  console.log(data[0])
  return (
    <Reveal styleSet="w-100vw min-h-[100lvh]">
      <div className="w-full pb-[60px] grid grid-cols-12 articleStage text-white relative" style={{ backgroundColor: `rgba(20,20,20,.75)` }}>
        <div className="w-full col-span-full lg:min-h-[50vh] pb-[60px]">
          {data.cover ? (<SwitchContent work={data.cover} title={`header`} ratio={data.cover.ratio} cover />) : ''}

        </div>
        <div className="col-span-full grid grid-cols-12 mt-[--lrg] gap-4 p-4 contentBlock">
          {data.content ? (
            data.content.map((item: any, i: number) => {
              return (
                <Reveal key={`content-${i}`} styleSet={`col-span-full grid grid-cols-12 `}>
                  {item.content == 'image' ? (
                    <div className="col-span-full gridBox  relative"><div className="w-full relative p-[--xs]"><Image alt={`work image of ${data.title}`} height={0} width={0} sizes="100vw" src={item.image} className="w-full  z-0" /></div></div>
                  ) : ('')}

                  {item.content == 'text' ? (
                    <div className="w-full col-span-6 col-start-4">
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

                  {item.content == 'list' ? (
                    <div className="w-full col-span-full lg:col-span-8 lg:col-start-3 px-0 lg:px-[--sm]">
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
                              <div className="w-full p-[--xs] lg:p-[--sm] gridBox relative" key={`list-${i}-${s}`}  >
                                <div>
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
                  {
                    item.embed ? (
                      <div className="col-span-full gridBox  relative"><div className="w-full relative p-[--xs]">
                        <div className="w-full aspect-video" dangerouslySetInnerHTML={{ __html: item.embed }}></div></div></div>
                    ) : ('')
                  }
                </Reveal>
              )
            })
          ) : ('')}

        </div>

      </div>
    </Reveal>
  );
}
