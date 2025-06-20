
import { PortableText } from "next-sanity";
import { openConnect } from "./util/sanity";





export default async function Donate({data}:any) {

  return (
    
          <div className="w-[100vw] richText text-[--white] py-[--sm] gap-[--sm] z-[100] sticky top-[0] lg:top-[280px] ">
           <div className="grid grid-cols-12 w-full lg:absolute lg:bottom-[0] justify-end pb-[--lrg] left-0">
              {data.donations.map((item:any,i:number)=>{
                return(
                     <Single key={`donate-${i}`} item={item} count={i}/>
                )
             
              })}
           </div>
              
          </div>
                      
     

  );
}


export async function Single({item,count}:any){
      const open = await openConnect(item.openSlug)
  
    // project.stats.balance.value
  return (
    <div className={` col-span-full lg:col-span-4 gridBox relative navTitle`}>
                  <div className="w-full p-[--sm]" >
                    <div className="relative bgBlur" style={{backgroundColor:`rgba(255, 255, 255, 0.1)`}}>
                      <div className="y-center absolute z-[10] left-[--xs] caption">${open!.project.stats.balance.value/100}</div>
                      <div className="w-full h-[40px] mb-[--xs] growOn" style={{animationDelay:`${count*.75}s`,backgroundColor:`${item.color}`,width:`${(open!.project.stats.balance.value/open!.project.settings.goals[0].amount)*100}%`}}></div></div>
                    <p className="uppercase ">{open!.project.name}</p>
                    <div className={` richText hidden lg:block`}><PortableText value={item.description} /></div>
                    <a href={`https://opencollective.com/sighte-92i/projects/${item.openSlug}`} target={'__blank'} className="w-full h-[40px] bg-[--white] articleStage text-[--dark] flex items-center mt-[--xs]"><div className="w-full text-center">DONTATE</div></a>
  
                  </div>
                </div>
  )
}
 