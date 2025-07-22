'use client'
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Template({children}:{children:any}){
    const pathname = usePathname()
    return(
        <AnimatePresence mode={'wait'}>
            <motion.div
            key={pathname}
                initial={{opacity:0}}
               animate={{opacity:1}}
               exit={{opacity:0,y:-50}}
                transition={{ease:'easeOut',duration:0.5}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}