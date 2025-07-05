import { getData } from "../../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "@/app/components/util/reveal";
import { SwitchContent } from "@/app/components/util/contentSwitch";
import { getDate } from "@/app/components/util/sanity";
import Gallery from "@/app/donate/gallery";




export default async function Home({ params }: { params: { slug: string } }) {
  const { data } = await getData(`*[_type=='articles' && slug.current == '${params.slug}'][0]{title,_createdAt,"author":author->{firstName},"color":category->color.rgb,slug,'imageUrl': cover.asset->url, intro, content[]{content,desc,right,columns,caption,embed,"image":image.asset->url, "vid":vid.asset->playbackId, "ratio":vid.asset->data.aspect_ratio,gallery[]{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}},cover{"image":image.asset->url, "vid":video.asset->playbackId, "ratio":video.asset->data.aspect_ratio}}`)

  return (
    <Reveal styleSet="w-[100vw] min-h-[100dvh] ">
      <div className="w-full  min-h-[100dvh]  grid grid-cols-12 articleStage relative text-[white] p-[--sm]" style={{ backgroundColor: `rgba(20,20,20,.75)` }}>

        {data.cover ? (
          <div className="w-full px-[--sm] lg:px-0 col-span-full  lg:min-h-[50vh]">
            {data.cover ? (<SwitchContent work={data.cover} title={`header`} ratio={data.cover.ratio} cover />) : ''}

          </div>
        ) : ("")}
        <div className={`${data.cover ? '' : 'pt-[--xl]'} col-span-6 col-start-4 py-[--sm] uppercase flex`}>
          <div className="aspect-square h-full rounded-sm" style={{ backgroundColor: `rgb(${data.color.r},${data.color.g},${data.color.b})` }}></div>
          <div className="pl-[--xs]">
            <h1 className="mb-[--2xs]">{data.title}</h1>
            <h2>BY {data.author.firstName} - {getDate(data._createdAt)}</h2>
          </div>
        </div>

        <div className="col-span-full grid grid-cols-12  gap-4 p-4 contentBlock">
          {data.content ? (
            data.content.map((item: any, i: number) => {
              return (
                <Reveal key={`content-${i}`} styleSet={`col-span-full grid grid-cols-12 `}>
                  {item.content == 'image' ? (
                    <div className="col-span-full gridBox  relative"><div className="w-full relative p-[--xs]"><Image alt={`work image of ${data.title}`} height={0} width={0} sizes="100vw" src={item.image} className="w-full  z-0" /></div></div>
                  ) : ('')}

                  {item.content == 'text' ? (
                    <div className="w-full col-span-full lg:col-span-6 lg:col-start-4">
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
                </Reveal>
              )
            })
          ) : ('')}

        </div>
      </div>

    </Reveal>
  );
}
