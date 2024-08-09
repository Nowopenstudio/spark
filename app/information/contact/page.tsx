import { getData } from "../../lib/sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='contact'][0]`)
    console.log(data)
  return (
    <main className="w-full py-10">
          
                          <div className="intro w-3/4 text-2xl mx-auto mb-5" >
                            <div className="secHead"><h1>{data.header}</h1></div>
                          <PortableText value={data.text}/>
                        </div>
                   
     
    </main>
  );
}
