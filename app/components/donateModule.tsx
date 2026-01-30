
import { PortableText } from "next-sanity";
import { openConnect } from "./util/sanity";





export default async function Donate({data}:any) {

  return (
    data?(
      <div className="hidden md:block w-[100vw] richText text-[--white] py-[--sm] gap-[--sm] z-[100] relative">
      <div className="grid grid-cols-12 w-full lg:absolute lg:bottom-[0] justify-end pb-[--lrg] left-0">
         {data.donations.map((item:any,i:number)=>{
           return(
                <Single key={`donate-${i}`} item={item} count={i}/>
           )
        
         })}
      </div>
         
     </div>
    ):('')
         
                      
     

  );
}


export async function Single({item,count}:any){
      const open = await openConnect(item.openSlug)
      

  return (
    <div className={` col-span-full lg:col-span-4 gridBox donate relative navTitle`}>

      {open && open.project?(
         <div className="w-full p-[--sm]" >
                    <div className="relative bgBlur" style={{backgroundColor:`rgba(255, 255, 255, 0.1)`}}>
                      <div className="y-center absolute z-[10] left-[--xs] caption">${open.project.stats.balance.value/100}</div>
                       <div className="y-center absolute z-[10] right-[--xs] caption opacity-[.3]">${open.project.settings.goals[0].amount/100}</div>
                      <div className="w-full h-[40px] mb-[--xs] growOn" style={{animationDelay:`${count*.75}s`,backgroundColor:`${item.color}`,width:`${(open.project.stats.balance.value/open.project.settings.goals[0].amount)*100}%`}}></div></div>
                    <p className="uppercase ">{open.project.name}</p>
                    <div className={` richText hidden lg:block`}><PortableText value={item.description} /></div>
                    <a href={`https://opencollective.com/sighte-92i/projects/${item.openSlug}`} target={'__blank'} className="w-full h-[40px] bg-[--white] text-[--dark] flex items-center mt-[--xs] donateBut"><div className="w-full text-center">DONATE</div></a>
  
                  </div>
      ):('')}
                 
                </div>
  )
}
 