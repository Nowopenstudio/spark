import Navbar from "./components/navbar";
import { client, getData } from "./lib/utils-sanity";




export default async function Home() {
  return (
    <main className="w-full z-10">
        
     
    </main>
  );
}


export async function generateMetadata() {
  const query = await getData(`{
    'data':*[_type=='info'][0]{meta{title,description,keywords,"image":image.asset->url}}
 }`)
 const {data} = query.data  
  return {
    title: `${data.meta.title}`,
    keywords: `${data.meta.keywords}`,
    description:`${data.meta.description}`,
    openGraph: {
      images: data.meta.image
    }
  };
}

