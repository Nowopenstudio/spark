'use client'
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Template({children}:{children:any}){
    const pathname = usePathname()
    console.log(pathname)
    return(
        <AnimatePresence mode={'wait'}>
            <motion.div
            key={pathname}
                initial={{opacity:0,y:0}}
               animate={{opacity:1}}
                transition={{ease:'easeInOut',duration:0.35}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}