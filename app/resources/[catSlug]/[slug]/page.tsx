import { getData } from "../../../lib/sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='articles' && slug.current == '${params.slug}']{title,_createdAt,author->{firstName},slug,'imageUrl': cover.asset->url, intro, content}`)
    console.log(data)
  return (
    <main className="w-full pb-10">
                   <div className="w-full"> <Image alt="image" src={data[0].imageUrl} width={1920} height={1920} className="object-cover"/></div>
                    <div className="w-3/4 py-5 mx-auto">
                        <h1>{data[0].title}</h1>
                        {data[0]._createdAt}
                    </div>
                    {data[0].content.map((item,i)=>{
                        return(
                          <div className="intro w-3/4 text-2xl mx-auto mb-5" key={`content-${i}`}>
                            <div className="secHead"><p>{item.title}</p></div>
                          <PortableText value={item.content[0]}/>
                        </div>
                        )
                      })}
     
    </main>
  );
}
