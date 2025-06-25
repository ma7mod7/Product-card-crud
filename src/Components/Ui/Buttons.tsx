import type { ButtonHTMLAttributes, ReactNode } from "react"
interface IProp extends ButtonHTMLAttributes<HTMLButtonElement>{//means that the custom interface IProp inherits all the built-in props of a <button> element in React.
//extends:This tells TypeScript that your custom interface (IProp) will include all the properties from ButtonHTMLAttributes<HTMLButtonElement> plus any new ones you define.
    className:string,
    children:ReactNode
}


const Buttons=({className,children,...res}:IProp)=>{
    return (
        <>
        <button className={`${className} w-full rounded-md text-white p-2 `} {...res} >{children}</button>
        </>
    )
}

export default Buttons