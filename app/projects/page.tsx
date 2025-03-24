import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";




export default async function Home() {
    const { data } = await getData(`*[_type=='projects']{title,slug}`)
    console.log(data)
  return (
    <main className="w-full flex justify-center">
        {/* {data.map((item:any,i:number)=>{
          return(
             <Link key={`project-${i}`} href={`/projects/${item.slug.current}`} className="infoCard w-1/4 px-5 py-4 border border-white border-solid m-2 pointer-events-auto" >
             <div className="border border-white border-solid py-11"></div>
             <div className="w-full py-4"><p>{item.title}</p></div>
             
             </Link>
          )
        })}
      */}
    </main>
  );
}
