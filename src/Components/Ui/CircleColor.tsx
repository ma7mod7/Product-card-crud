import type { HTMLAttributes } from "react"

interface IProp extends HTMLAttributes<HTMLSpanElement>{
    color:string
}


const CircleColor=({color,...rest}:IProp)=>{
    return (
        <>
        <span className="block w-5 h-5 rounded-full cursor-pointer" style={{backgroundColor:color}}  {...rest}/>
        </>
    )
}

export default CircleColor