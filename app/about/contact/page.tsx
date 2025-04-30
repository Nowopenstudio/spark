import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import Form from "./form";




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='contact'][0]`)
    console.log(data)
  return (
    <main className="w-full py-10 grid grid-cols-12 py-[--lrg]">
          
                        <div className="intro col-start-1 col-span-12 lg:col-span-6 lg:col-start-4 text-2xl px-[--sm]" >
                            <div className="secHead"><h1 className="mb-[--sm]">{data.header}</h1></div>
                          <div><PortableText value={data.text}/></div>
                          
                        </div>
                        <Form settings={"applications@400000000.co"}/>

                   
     
    </main>
  );
}
