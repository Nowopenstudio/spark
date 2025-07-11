import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "../components/util/reveal";
import { SwitchContent } from "../components/util/contentSwitch";
import Gallery from "../components/gallery";
import { Single } from "../components/donateModule";




export default async function Donations({data}:any) {
  return (
    
          <div className="col-span-full grid grid-cols-12 richText px-[0] md:px-[--sm] contentBlock pt-[--med]">
            <Reveal styleSet="col-span-12 lg:col-span-6 lg:col-start-4 px-[--xs] md:px-0 ">
                  <div className="w-full mb-[--lrg]">
                   <h1 className="w-full mb-[--sm]">{data.subhead}</h1>
                     <PortableText value={data.copy}/>
                    </div>
                     
                </Reveal>
              {data.donations.map((item:any,i:number)=>{
              return(
                <Reveal styleSet="col-span-12 mb-[--lrg] grid grid-cols-12" count={i} key={`donate-${i}`}>
                  
                  <h1 className="mb-[--sm] w-full col-span-12 lg:col-span-6 lg:col-start-4">{item.title}</h1>
                   <div className="col-span-12 lg:col-span-8 lg:col-start-3 mb-[--sm]"> <Single key={`donate-${i}`} item={item} count={i}/></div>
                  {item.content.map((single:any,i:number)=>{
                    return(
                      <div key={`content-i-${single.content}`} className="col-span-full grid grid-cols-12">
                          {single.content == "text"?(
                            <div className="col-span-12 lg:col-span-6 lg:col-start-4 mb-[--sm] px-[--xs] md:px-0"><PortableText value={single.text}/></div>
                          ):""}

                           {single.content == "image"?(
                            <div className="col-span-10 col-start-2 mb-[--sm] p-[--sm] relative gridBox">
                              <div className="w-full h-full">{single.image?( <Image alt="image" height={0}  width={0} sizes="100vw"  src={single.image}  className="w-full h-auto"/>):''}</div>
                            </div>
                          ):""}

                           {single.content == "gallery" && single.gallery?(
                            (single.gallery.length > 2)?(<Gallery data={single.gallery} />):(
                            single.gallery.map((image:any,m:number)=>{
                              return( <div key={`gallery-i-${single.content}-${m}`} className="col-span-6  mb-[--sm] p-[--sm] relative gridBox">
                              <div className="w-full h-auto">{image.image?( <Image alt="image" height={0}  width={0} sizes="100vw"  src={image.image}  className="w-full h-auto"/>):''}</div>
                            </div>

                              )
                            }))
                          ):""}
                      </div>
                    )
                  })}

                
                </Reveal>
              )
            })}
          </div>
                      
     

  );
}
