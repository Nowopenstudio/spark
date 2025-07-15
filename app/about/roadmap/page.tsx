import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "@/app/components/util/reveal";




export default async function Home({ params }: { params: { slug: string } }) {
  const { data } = await getData(`*[_type=='roadmap'] | order(_createdAt desc)[0]{roadmapItem}`)
  console.log(data.roadmapItem)
  return (
    <div className="w-full py-[--sm] grid items-center grid-cols-1 min-h-[100lvh] relative articleStage" style={{ backgroundColor: `rgba(20,20,20,.78)` }}>
      <div className="grid grid-cols-3 col-span-full px-0 md:px-[--sm]">
        {data.roadmapItem.map((item: any, i: number) => {
          return (
            <Reveal styleSet="col-span-3 lg:col-span-1 gridBox relative flex-shrink-0" count={i} key={`roadmap-${i}`}>
              <div className="p-[--xs] lg:p-[--sm] h-full">
                <div className="relative bgBlur flex flex-wrap items-start p-[--xs] lg:p-[--sm] h-full" style={{ backgroundColor: `rgba(255, 255, 255, 0.1)` }}>
                  <div className={`items-start col-span-full lg:col-span-6 lg:col-start-4 flex-wrap lg:flex-nowrap flex px-0 gap-[--xs]`}>
                    <div ><div className="aspect-square w-[50px] rounded-sm flex-shrink-0 relative" style={{ backgroundColor: `#ffffff` }}>
                    
                        <h2 className="absolute xy-center ol-number  text-black">{i + 1}</h2>
                
                    </div></div>
                    <div className = "mb-[--xs]">
                      <h2 className="mb-[--xs] flex-shrink-0 pt-[--2xs]">{item.title}</h2>
                    </div>
                  </div>
                  <div className="w-full flex-shrink-0 mono"><PortableText value={item.text} /></div>
                </div>

              </div>
            </Reveal>
          )
        })}
      </div>


    </div>
  )
}

export async function generateMetadata() {
  const query = await getData(`{
    'info':*[_type=='info'][0]{meta{title,description,keywords,"image":image.asset->url}},
    'data':*[_type=='roadmap'][0]{meta{title,description,keywords,"image":image.asset->url}}
 }`)
 const {data, info} = query.data  
  return {
    title: `${data.meta.title ?? info.meta.title} - ${info.meta.title}`,
    keywords: data.meta.keywords ?? info.meta.keywords,
    description:data.meta.description??info.meta.description,
    openGraph: {
      images: data.meta.image?`${data.meta.image}?auto=format&amp;w=500`: `${info.meta.image}?auto=format&amp;w=500`
    }
  };
}


