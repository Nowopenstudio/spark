import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';
import { Reveal } from "../components/util/reveal";
import { SwitchContent } from "../components/util/contentSwitch";




export default async function Donate({data}:any) {
  return (
    
          <div className="w-[100vw] grid grid-cols-12 richText text-[--white] p-[--sm] gap-[--sm] z-[100] sticky top-[0]">
            {data.donations.map((item:any,i:number)=>{
              return(
                   <div key={`cta-${i}`} className="col-span-4 gridBox relative navTitle">
                <div className="w-full p-[--sm]">
                  <div className="w-full h-[40px] mb-[--xs]" style={{backgroundColor:`${item.color}`}}></div>
                  <p className="uppercase  mb-[--xs]">{item.title}</p>
                  <PortableText value={item.summary} />
                  <div className="w-full h-[40px] bg-[--white] articleStage"></div>

                </div>
              </div>
              )
           
            })}
              
          </div>
                      
     

  );
}
 