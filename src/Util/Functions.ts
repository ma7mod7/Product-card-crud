
/**
 * 
 * @param {string}text take the all text
 * @param {number}[max=50] the max number 
 * @returns string value after sliced
 */
export const  sliceText =(text:string,max:number=60)=>{
    if(text.length>=50)
        return `${text.slice(0,max)}...`
    else 
    return text
}