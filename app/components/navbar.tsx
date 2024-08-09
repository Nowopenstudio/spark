import Link from "next/link"

export default function Navbar({ info }){
    return(

      <div className="absolute w-lvw h-lvh pointer-events-none">
         <div className="w-full h-full relative">
              <nav className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white absolute flex justify-between">
                 <Link href="/resources" className="px-5 py-2 rounded-full border border-white border-solid m-2 pointer-events-auto" >Resources</Link>
                 <Link href="/projects" className="px-5 py-2 rounded-full border border-white border-solid m-2 pointer-events-auto">Projects</Link>
                 <Link href="/information" className="px-5 py-2 rounded-full border border-white border-solid m-2 pointer-events-auto">Information</Link>
              </nav>
         </div>
      </div>
    );
}