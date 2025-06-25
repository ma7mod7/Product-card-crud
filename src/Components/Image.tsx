interface IProp {
    imgUrl:string,
    alt:string,
    className:string
}


const Image = ({ imgUrl,alt,className}: IProp) => {
    return (
        <>
            <img className={className} src={imgUrl} alt={alt}/>
        </>
    )
}

export default Image