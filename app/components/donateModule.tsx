
import { PortableText } from "next-sanity";





export default async function Donate({data}:any) {
  return (
    
          <div className="w-[100vw] richText text-[--white] py-[--sm] gap-[--sm] z-[100] sticky top-[0] lg:top-[280px] ">
           <div className="grid grid-cols-12 w-full lg:absolute lg:bottom-[0] justify-end pb-[--lrg] left-0">
              {data.donations.map((item:any,i:number)=>{
                return(
                     <div key={`cta-${i}`} className={` col-span-full lg:col-span-4 gridBox relative navTitle`}>
                  <div className="w-full p-[--sm]">
                    <div className="w-full h-[40px] mb-[--xs]" style={{backgroundColor:`${item.color}`}}></div>
                    <p className="uppercase ">{item.title}</p>
                    <div className={` richText hidden lg:block`}><PortableText value={item.summary} /></div>
                    <div className="w-full h-[40px] bg-[--white] articleStage text-[--dark] flex items-center mt-[--xs]"><div className="w-full text-center">DONTATE</div></div>
  
                  </div>
                </div>
                )
             
              })}
           </div>s
              
          </div>
                      
     

  );
}
 