import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "../components/util/reveal";
import { SwitchContent } from "../components/util/contentSwitch";




export default async function Donate({data}:any) {
  return (
    
          <div className="w-[100vw] richText text-[--white] p-[--sm] gap-[--sm] z-[100] sticky top-[280px] ">
           <div className="grid grid-cols-12 w-full absolute bottom-[0] justify-end pb-[--lrg] left-0">
              {data.donations.map((item:any,i:number)=>{
                return(
                     <div key={`cta-${i}`} className={` col-span-4 gridBox relative navTitle`}>
                  <div className="w-full p-[--sm]">
                    <div className="w-full h-[40px] mb-[--xs]" style={{backgroundColor:`${item.color}`}}></div>
                    <p className="uppercase ">{item.title}</p>
                    <div className="mb-[--sm] richText"><PortableText value={item.summary} /></div>
                    <div className="w-full h-[40px] bg-[--white] articleStage"></div>
  
                  </div>
                </div>
                )
             
              })}
           </div>
              
          </div>
                      
     

  );
}
 