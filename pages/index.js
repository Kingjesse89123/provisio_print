import {useContext, useEffect, useState} from "react";
import {getCategories, getProducts, getInfo, getIngredients, getImg} from './api/api'
import toast from "react-hot-toast";
import {useQuery} from "react-query";
import ReactModal from 'react-modal'
import Spinner from "../components/Spinner";
import Alert from "../components/Alerts/Alert";
import Category from "../components/Category";
import Product from "../components/Product";
import Modal from "../components/Modal";
import Infobar from "../components/Infobar";
import FloatingCart from "../components/FloatingCart";
import {CartContext} from "../components/CartContext";
import Image from "next/image";

export default function Index() {
    const info = useQuery(['info'], getInfo)
    const categories = useQuery(['categories'], ()=>getCategories(info.data.data[0].id), {enabled: info.isSuccess})
    const products = useQuery(['products'], ()=>getProducts(info.data.data[0].id), {enabled: info.isSuccess})

    const [ingredients, setIngredients] = useState()
    const queryIngredients = useQuery(['ingredients'], getIngredients,{
        onSuccess: (data) => {
            setIngredients(data.data.map(ingredient=>{
                return(
                    {
                        name: ingredient.name,
                        id: ingredient.id,
                        selection: 2,
                        products: ingredient.products,
                    }
                )
            }))
        }
    })

    // const img = useQuery(['img'], getImg)

    const {cartItems, setCartItems, pickupTime} = useContext(CartContext)

    // Modal area
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [clickedId, setClickedId] = useState('')

    useEffect(()=>{
        let subtotal_i = 0
        for(let i = 0; i<cartItems.length; i++){
            subtotal_i += cartItems[i].price
        }
        setSubtotal(subtotal_i)
        setItemCount(cartItems.length)
    },[cartItems])

    function handleModalOpen(event) {
        setModalIsOpen(true)
        setClickedId(event.target.value)
    }

    function handleModalClose() {
        setModalIsOpen(false)
    }

    // Other Area
    function handleSetMenuView(){
        setMenuView(prevState => {
            return !prevState
        })
    }

    // Cart Area
    // Generates a random 4 digit alphanumeric cart code
    let cartId = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

        const [cartExpanded, setCartExpanded] = useState(false)

        const [itemCount, setItemCount] = useState(cartItems?.length)
        const [menuView, setMenuView] = useState(false)

        const {subtotal, setSubtotal} = useContext(CartContext)

        const [selectionChoice, setSelectionChoice] = useState()

        //Ingredient Choice represents state of the actual customer choice
        //Ingredient Choices represents state of what options are avaliable to the customer
    const ingredientChoices = ['None', 'Light', 'Normal', 'Extra']
        function handleSelectionChoice(e){
            setSelectionChoice(e.target.value)
        }
    const handleIngredientDecrease = (id) => {
        setIngredients(prev => prev.map(item => {
            if(item.id === id){
                return ({
                    ...item,
                    selection: item.selection - 1
                })
            }else{
                return item
            }
        }))
    }

    const handleIngredientIncrease = (id) => {
        setIngredients(prev => prev.map(item => {
            if(item.id === id){
                return ({
                    ...item,
                    selection: item.selection + 1
                })
            }else{
                return item
            }
        }))
    }

        function toggleCartExpand() {
            setCartExpanded(prevState => {
                return !prevState
            })
        }
        function handleRemoveItem(id){
        let indexOfRemovedItem = cartItems.findIndex(item => item.cartId === id)
        const newArray = []
        for(let i = 0; i < cartItems.length; i++){
            if(i!==indexOfRemovedItem){
                newArray.push(cartItems[i])
            }
        }
            setCartItems(newArray)
            toast.error('Item removed')
        }

        const productBlocks = categories.data?.data.map(category => {
            return (
                <div key={category.id}>
                    <Category
                    id={category.id}
                    name={category.name}
                    key={category.id}
                    primaryColor={info.data?.data[0].primarycolor}
                    headerFont={info.data?.data[0].headerfont}
                    />
                    <div className='flex flex-col md:flex-row flex-wrap'>
                        {products.data?.data.map(product => {
                            return (
                                product.category === category.id ?
                                    <Product
                                    id={product.id}
                                    name={product.name}
                                    stock_status={product.instock}
                                    desc={product.description}
                                    price={product.price}
                                    category={category.id}
                                    handleModalOpen={handleModalOpen}
                                    headerFont={info.data?.data[0].headerfont}
                                    bodyFont={info.data?.data[0].bodyfont}
                                    /> : null
                            )
                        })}
                    </div>
                </div>
            )
        })

        return (

            <div className='w-full'>
                <ReactModal isOpen={modalIsOpen} shouldCloseOnEsc={true}>
                    {products.data?.data.map(modalProduct => {
                        function handleAddToCart(){

                            let currentItem = {
                                id: modalProduct.id,
                                name: modalProduct.name,
                                price: modalProduct.price,
                                qty: 1,
                                ingredientChoice: ingredients,
                                selectionChoice: selectionChoice,
                                cartId: cartId(),
                            }
                            setCartItems(prevState=>{
                                return [
                                    ...prevState,
                                        currentItem
                                ]
                            })
                            handleModalClose()
                            toast.success('Item added to order!')
                        }
                        return (
                            modalProduct.id === clickedId ?
                                <Modal
                                closeModal={handleModalClose}
                                addToCart={handleAddToCart}
                                name={modalProduct.name}
                                price={modalProduct.price}
                                id={modalProduct.id}
                                desc={modalProduct.description}
                                handleSelectionChoice={handleSelectionChoice}
                                selection={selectionChoice}
                                handleIngredientDecrease={handleIngredientDecrease}
                                handleIngredientIncrease={handleIngredientIncrease}
                                ingredients={ingredients}
                                ingredientChoices={ingredientChoices}
                                headerFont={info.data?.data[0].headerfont}
                                bodyFont={info.data?.data[0].bodyfont}
                                /> : null
                        )
                    })}
                </ReactModal>
                <center>
                    <div id='alert-area' className='w-11/12 mt-8 text-left'>
                        {pickupTime > info.data?.data[0].closingtime ? <Alert title="Closed." text="Right now, this restaurant is closed. Check back later!" action='Feel free to browse the menu in the meantime.'/> : null}
                    </div>
                </center>
                {!products.isLoading && <Infobar
                    name={info.data?.data[0].name}
                    address={info.data?.data[0].address_line_1}
                    phone={info.data?.data[0].phone_number}
                    pickupTime={pickupTime}
                    closingTime={info.data?.data[0].closingtime}
                    headerFont={info.data?.data[0].headerfont}
                    bodyFont={info.data?.data[0].bodyfont}
                />}

                {!products.isLoading && <div id='menu-view-selection'
                      className='bg-gray-100 font-default text-center rounded-full border-2 ml-12 border-grey border-solid w-fit'>
                    <button onClick={handleSetMenuView}
                            className={!menuView ? 'bg-white p-2 px-4 rounded-full mr-1' : 'p-2 px-4 rounded-full mr-1'}>Ordering
                        View
                    </button>
                    <button onClick={handleSetMenuView}
                            className={menuView ? 'bg-white p-2 px-4 rounded-full ml-1' : 'p-2 px-4 rounded-full ml-1'}>Menu
                        View
                    </button>
                </div>}

                {products.isLoading ? <Spinner/> : productBlocks}
                {products.isError ? <h1>There seems to have been an error loading the products. This is typically because of a misconfiguration in the domain settings.</h1> : null}

                {products.isLoading === false && <FloatingCart
                toggleCartExpand={toggleCartExpand}
                handleRemoveItem={handleRemoveItem}
                expanded={cartExpanded}
                cartItems={cartItems}
                subtotal={subtotal}
                count={itemCount}
                ingredientChoices={ingredientChoices}
                primaryColor={info.data?.data[0].primarycolor}
                headerFont={info.data?.data[0].headerfont}
                bodyFont={info.data?.data[0].bodyfont}
                />}

            </div>

        )
    }
