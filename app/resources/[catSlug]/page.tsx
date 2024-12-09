import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";




export default async function Home({params}:{params:{catSlug:string}}) {
    const { data } = await getData(`*[_type=='articles' && '${params.catSlug}' == category->catSlug.current]{title,slug,author->{firstName},category->{slug,title}}`)
  return (
    <main className="w-full flex justify-center">
        {data.map((item:any,i:number)=>{
            return(
                <Link key={`resource-${i}`} href={`/resources/${params.catSlug}/${item.slug.current}`} className="infoCard w-1/4 px-5 py-4 border border-white border-solid m-2 pointer-events-auto" >
                 <div className="border border-white border-solid py-11"></div>
                 <div className="w-full py-4"><p>{item.title}</p><p>{item.category.title}</p></div>
                 
                 </Link>
            )
        })}
     
    </main>
  );
}
