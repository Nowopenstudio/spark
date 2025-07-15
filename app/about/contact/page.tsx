import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import Form from "./form";




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='contact'][0]`)
    console.log(data)
  return (
    <main className="w-full  grid grid-cols-12 py-[--lrg] relative articleStage min-h-[100lvh]" style={{backgroundColor:`rgba(20,20,20,.7)`}}>
          
                        <div className="intro col-start-1 col-span-12 lg:col-span-6 lg:col-start-4 text-2xl px-[--xs] md:px-[--sm]" >
                            <div className="secHead"><h1 className="mb-[--sm]">{data.header}</h1></div>
                          <div><PortableText value={data.text}/></div>
                          
                        </div>
                        <Form settings={"applications@400000000.co"}/>

                   
     
    </main>
  );
}

export async function generateMetadata() {
  const query = await getData(`{
    'info':*[_type=='info'][0]{meta{title,description,keywords,"image":image.asset->url}},
    'data':*[_type=='contact'][0]{meta{title,description,keywords,"image":image.asset->url}}
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

