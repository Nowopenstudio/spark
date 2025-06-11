
'use client'

import React, { useEffect, useState, useContext, FormEvent } from "react";
import { sendContact } from "@/app/components/util/sanity";
import { PortableText } from "next-sanity";
import { Reveal } from "@/app/components/util/reveal";

export default function Form({form, settings}:any) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const submitForm=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const newEmail:any  = {}

   newEmail.name = formData.get('name')
   newEmail.email = settings
   newEmail.subject = formData.get('subject')
   newEmail.message = formData.get('message')
   newEmail.contact = formData.get('email')

   sendContact(newEmail)
   setSuccess(true)

  }



  return (
   
    

    
  <div className="grid grid-cols-12 w-full items-center h-full col-span-full px-[--sm]">
    {success?(
      <Reveal styleSet="text-center col-start-1 col-span-12 px-[20px] sm:col-start-2 sm:col-span-10 md:col-start-3 md:col-span-8 xl:col-start-4 xl:col-span-6 ">
        <PortableText value={form.contactSuccess}/>
      </Reveal>
    ):(
      <div className="col-start-1 col-span-12 px-[20px] sm:col-start-2 sm:col-span-10 md:col-start-3 md:col-span-8 xl:col-start-4 xl:col-span-6 grid-cols-2 grid">
       <form onSubmit={submitForm} className={`grid grid-cols-2 col-span-full gap-[20px] ${isLoading?"opacity-[.25] pointer-events-none":""}`}>
        <input className="col-span-1 border border-[--black] px-[20px]" type="text" placeholder="Name" name="name" required></input>
        <input className="col-span-1 border border-[--black] px-[20px]" type="text" placeholder="Email" name="email" required></input>
        <input className="col-span-2 border border-[--black] px-[20px]" type="text" placeholder="Subject" name="subject" required></input>
        <textarea className="border border-[--black] col-span-full p-[20px] min-h-[200px] mb-[--sm]" placeholder="Message" name="message" required></textarea>
        <button type="submit" className={`py-[10px] bg-[--dark] text-[--white] uppercase relative col-span-full border border-black  text-center mb-[20px] subBut`}><div>Submit Inquiry</div></button>

       </form>
       </div>
    )}
  
    
 
  </div>
 
    
  

  );
}
