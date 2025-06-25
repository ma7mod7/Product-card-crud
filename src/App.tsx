import './App.css'
import { productList } from './Data'
import { formInputsList } from './Data'
import ProductCard from './Components/ProductCard'
import Modal from './Components/Ui/Modal'
import Buttons from './Components/Ui/Buttons'
import Input from './Components/Ui/Input'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { type IProduct } from './Interface'
import { productValidation } from './validation'
import ErrorMessage from './Components/ErrorMessage'
import { colors } from './Data'
import CircleColor from './Components/Ui/CircleColor'
import { v4 as uuid } from "uuid";
import Select from './Components/Ui/Select'
import { categories } from './Data'
import toast, { Toaster } from "react-hot-toast";

function App() {

  const decleredObject = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  }
  const [products,setProducts]=useState<IProduct[]>(productList)
  const [productForm, setProduct] = useState<IProduct>(decleredObject)
  const [editProduct,setEditProduct]=useState<IProduct>(decleredObject)
  const [idxEdit,setIdxEdit]=useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [tempColor,setTempColor]=useState<string[]>([])
  const [selectedCat, setSelectedCat] = useState(categories[2])
  const [isOpenEditModal,setIsOpenEditModal]=useState(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [error,setErrors]=useState({
      title: "",
    description: "",
    imageURL: "",
    price: "",
  })


  /*Handlers*/
  const closeModal = () => {
    setIsOpen(false)
  }
  const openModal = () => {
    setIsOpen(true)
  }
  const closeEditModal = () => {
    setIsOpenEditModal(false)
  }
  const openEditModal = () => {
    setIsOpenEditModal(true)
  }
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);
  

  const productHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...productForm,
      [name]: value
    })
    setErrors({
      ...error,
      [name]:""
    })
  }

  const editProductHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setEditProduct({
      ...editProduct,
      [name]: value
    })
    setErrors({
      ...error,
      [name]:""
    })
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {title,description,imageURL,price}=productForm;

    const errorsMessage=productValidation({title,description,imageURL,price})
      const hasErrorMsg =
      Object.values(errorsMessage).some(value => value === "") && Object.values(errorsMessage).every(value => value === "");
    if (!hasErrorMsg) {
      setErrors(errorsMessage)
      return;
    }
    setProducts(prev=>[{...productForm,id:uuid(),colors:tempColor,category:selectedCat},...prev])
    setProduct(decleredObject);
    setTempColor([]);
    closeModal()
  }

  const editHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {title,description,imageURL,price}=editProduct;

    const errorsMessage=productValidation({title,description,imageURL,price})
      const hasErrorMsg =
      Object.values(errorsMessage).some(value => value === "") && Object.values(errorsMessage).every(value => value === "");
    if (!hasErrorMsg) {
      setErrors(errorsMessage)
      return;
    }
    const updatedProducts=[...products];
    updatedProducts[idxEdit]={...editProduct,colors:tempColor.concat(editProduct.colors)};
    setProducts(updatedProducts);
    setTempColor([]);
    closeEditModal()
  }


  function cancelHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    setProduct(decleredObject);
    closeModal();
  }

  const removeHandler=()=>{
    const filterd=products.filter((ele)=>ele.id!=editProduct.id);
    setProducts(filterd);
    closeConfirmModal();
    toast("Product has been deleted", {
      icon: '✅',
      style: { color: "black" }
    })
  }
  /* end Handlers*/


  /*rendering component*/

  const renderList = products.map((ele,idx) => 
  <ProductCard idx={idx} setIdxEdit={setIdxEdit} key={ele.id} product={ele} cardColor={ele} setEditProduct={setEditProduct} openEditModal={openEditModal} openConfirmModal={openConfirmModal}/>)

  const renderForm = formInputsList.map((ele) =>

    <div key={ele.id} className='flex flex-col mb-3'>
      <label htmlFor={ele.id}>{ele.label}</label>
      <Input type={ele.type} name={ele.name} id={ele.id} value={productForm[ele.name]} onChange={productHandler} />
      <ErrorMessage msg={error[ele.name]}/>
    </div>
  )

    const renderEditForm = formInputsList.map((ele) =>

    <div key={ele.id} className='flex flex-col mb-3'>
      <label htmlFor={ele.id}>{ele.label}</label>
      <Input type={ele.type} name={ele.name} id={ele.id} value={editProduct[ele.name]} onChange={editProductHandler} />
      <ErrorMessage msg={error[ele.name]}/>
    </div>
  )
  
  console.log(tempColor);
  console.log(editProduct.colors)
  const renderColors=colors.map((ele)=><CircleColor key={ele} color={ele} onClick={()=>{

    if(tempColor.includes(ele)){
      setTempColor((prev)=> 
        prev.filter((item)=>item!=ele))
      return
    }
      if (editProduct.colors.includes(ele)) {
          setTempColor(prev => prev.filter(item => item !== ele));
          return;
        }
    setTempColor(prev=>[...prev,ele]);

  }}/>)


  /* end rendering component*/


  return (
    <main className='container mx-auto'>
      <Buttons className=" bg-indigo-700 hover:bg-indigo-800 mt-5" onClick={openModal}>Add</Buttons>
      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md'>
        {renderList}
      </div>


  {/* add modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title={"Add New Product"}>
        <form onSubmit={submitHandler} className='space-y-5'>
          {renderForm}


            <Select selected={selectedCat} setSelected={setSelectedCat}/>
          <div className='flex space-x-1 flex-wrap'>
          {renderColors}
          </div>
          <div className='flex flex-wrap space-y-1 items-center'>
            {tempColor.map((item)=>{
              return (
                <span className=' text-white p-1 rounded-md mr-1 mt-1 text-xs text-center' style={{backgroundColor:item}} >{item}</span>
              )
            })}
          </div>
          <div className="flex items-center space-x-1">
            <Buttons className=" bg-indigo-700 hover:bg-indigo-800">submit</Buttons>
            <Buttons className=" bg-gray-400 hover:bg-gray-500" onClick={cancelHandler}>cancel</Buttons>
          </div>
        </form>
      </Modal>
    {/*end add modal */}

      {/* edit modal */}
      <Modal isOpen={isOpenEditModal} closeModal={closeEditModal} title={"Edit This Product"}>
        <form onSubmit={editHandler} className='space-y-5'>
          {renderEditForm}
            <Select selected={editProduct.category} setSelected={(value)=>setEditProduct({...editProduct,category:value})}/>
          <div className='flex space-x-1 flex-wrap'>
          {renderColors}
          </div>
          <div className='flex flex-wrap space-y-1 items-center'>
            {tempColor.concat(editProduct.colors).map((item)=>{
              return (
                <span className=' text-white p-1 rounded-md mr-1 mt-1 text-xs text-center' style={{backgroundColor:item}} >{item}</span>
              )
            })}
          </div>
          <div className="flex items-center space-x-1">
            <Buttons className=" bg-indigo-700 hover:bg-indigo-800" >Edit</Buttons>
            <Buttons className=" bg-gray-400 hover:bg-gray-500" onClick={closeEditModal}>cancel</Buttons>
          </div>
        </form>
      </Modal>
    {/*end edit modal */}
      
      {/*remove modal */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Buttons className="bg-[#c2344d] hover:bg-red-800" onClick={removeHandler}>
            Yes, remove
          </Buttons>
          <Buttons type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Buttons>
        </div>
      </Modal>
      <Toaster />

    </main>
  )
}

export default App
