import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "../components/util/reveal";
import { SwitchContent } from "../components/util/contentSwitch";




export default async function Donations({data}:any) {
  return (
    
          <div className="flex col-span-full grid grid-cols-12 richText">
              {data.donations.map((item:any,i:number)=>{
              return(
                <Reveal styleSet="col-span-12 mb-[--lrg] grid grid-cols-12" count={i} key={`donate-${i}`}>
                  <h1 className="mb-[--sm] w-full col-span-6 col-start-4">{item.title}</h1>
                  {item.content.map((single:any,i:number)=>{
                    return(
                      <div key={`content-i-${single.content}`} className="col-span-full grid grid-cols-12">
                          {single.content == "text"?(
                            <div className="col-span-6 col-start-4 mb-[--sm]"><PortableText value={single.text}/></div>
                          ):""}

                           {single.content == "image"?(
                            <div className="col-span-10 col-start-2 mb-[--sm] p-[--sm] relative gridBox">
                              <div className="w-full h-full">{single.image?( <Image alt="image" height={0}  width={0} sizes="100vw"  src={single.image}  className="w-full h-auto"/>):''}</div>
                            </div>
                          ):""}

                           {single.content == "gallery" && single.gallery?(
                            single.gallery.map((image:any,m:number)=>{
                              return( <div key={`gallery-i-${single.content}-${m}`} className="col-span-6  mb-[--sm] p-[--sm] relative gridBox">
                              <div className="w-full h-auto">{image.image?( <Image alt="image" height={0}  width={0} sizes="100vw"  src={image.image}  className="w-full h-auto"/>):''}</div>
                            </div>

                              )
                            })
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
