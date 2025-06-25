



const Input = ({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <>
            <input
            className='border border-slate-400 rounded-md p-2 focus:border-indigo-500 focus:outline-indigo-500 shadow-sm  text-md' {...rest} />
        </>
    )
}

export default Input