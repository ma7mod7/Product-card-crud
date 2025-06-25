import Image from "./Image"
import Buttons from "./Ui/Buttons"
import { sliceText } from "../Util/Functions"
import { type IProduct } from "../Interface"
import CircleColor from "./Ui/CircleColor"
interface IProps {
    product: IProduct,
    cardColor: IProduct,
    setEditProduct:(val:IProduct)=>void;
    openEditModal:()=>void;
    openConfirmModal:()=>void,
    idx:number,
    setIdxEdit:(val:number)=>void
}
const ProductCard = ({ idx,product, cardColor,setEditProduct,openEditModal,setIdxEdit,openConfirmModal }: IProps) => {
    const { title, category, description, price } = product;
    const {colors}=cardColor
    const onEdit=()=>{
        setEditProduct(product);   
        openEditModal();
        setIdxEdit(idx);
    }
    const onRemove=()=>{
        setEditProduct(product);   
        openConfirmModal();
        setIdxEdit(idx);
    }
    return (

        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 my-2  border rounded-md p-2 flex flex-col ">

            <Image imgUrl={category.imageURL} alt={category.name} className={"rounded-md mb-2 h-52 w-full lg:object-cover"} />
            <h3>{title}</h3>
            <p>
                {sliceText(description)}
            </p>

            <div className="flex items-center my-4 space-x-2">
                {colors.map((ele) => <CircleColor key={ele} color={ele} />)}
                
            </div>

            <div className="flex items-center justify-between">
                <span>{price}$</span>
                <Image alt={category.name} className="w-8 h-8 rounded-full object-cover" imgUrl={category.imageURL} />
            </div>

            <div className="flex items-center justify-between space-x-2 mt-5">
                <Buttons className=" bg-slate-800" onClick={onEdit}>Edit</Buttons>
                <Buttons className=" bg-red-600 " onClick={onRemove}>Delete</Buttons>
            </div>
        </div>
    )
}

export default ProductCard