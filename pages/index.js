import {useContext, useEffect, useState} from "react";
import {getCategories, getProducts, getInfo, getImg} from './api/api'
import toast from "react-hot-toast";
import {useQuery} from "react-query";
import Link from 'next/link'
import ReactModal from 'react-modal'
import Spinner from "../components/Spinner";
import ProductRow from "../components/ProductRow";
import Closed from "../components/Alerts/Closed";
import Alert from "../components/Alerts/Alert";
import InfoAlert from "../components/Alerts/InfoAlert";
import {useCart} from "react-use-cart";
import {add} from "react-modal/lib/helpers/classList";
import Category from "../components/Category";
import Product from "../components/Product";
import Modal from "../components/Modal";
import Infobar from "../components/Infobar";
import FloatingCart from "../components/FloatingCart";
import {CartContext} from "../components/CartContext";
import ingredients from '../components/Modal'
import IngredientSelector from "../components/IngredientSelector";

export default function Home() {
    const categories = useQuery(['categories'], getCategories)

    const products = useQuery(['products'], getProducts)

    const info = useQuery(['info'], getInfo)

    // const img = useQuery(['img'], getImg)

    // Pickup Time Area
    let date = new Date()
    let currentTime = date.getHours() + ':' + date.getMinutes()
    const [pickupTime, setPickupTime] = useState(currentTime)

    // Modal area
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [clickedId, setClickedId] = useState('')


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

        const [cartExpanded, setCartExpanded] = useState(false)

        const {cartItems, setCartItems} = useContext(CartContext)

        const {subtotal, setSubtotal} = useContext(CartContext)

        const [selectionChoice, setSelectionChoice] = useState()

        //Ingredient Choice represents state of the actual customer choice
        //Ingredient Choices represents state of what options are avaliable to the customer
    const ingredientChoices = ['None', 'Light', 'Normal', 'Extra']

    const ingredients = [
        {
            name: 'Tomato',
            id: 1,
            selection: 2,
        },
        {
            name: 'Lettuce',
            id: 2,
            selection: 2,
        },
        {
            name: 'Onion',
            id: 3,
            selection: 2,
        },
        {
            name: 'Pickle',
            id: 4,
            selection: 2,
        },
        {
            name: 'Thousand Island',
            id: 5,
            selection: 2,
        }
    ]

        function handleSelectionChoice(e){
            setSelectionChoice(e.target.value)
        }

        const [ingredientChoice, setIngredientChoice] = useState(ingredients)

    const handleIngredientDecrease = (id) => {
        setIngredientChoice(prev => prev.map(item => {
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
        setIngredientChoice(prev => prev.map(item => {
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



        const [itemCount, setItemCount] = useState(cartItems.length)

        const [menuView, setMenuView] = useState(false)

        function toggleCartExpand() {
            setCartExpanded(prevState => {
                return !prevState
            })
        }

        function handleRemoveItem(e){
            console.log(Number(e.target.value))
            setCartItems(cartItems.splice(e.target.value, 1))
            setItemCount(prevState => {
                return prevState -1
            })
            console.log(cartItems)
        }

        const productBlocks = categories.data?.data.map(category => {
            return (

                <div key={category.id}>
                    <Category
                    id={category.id}
                    name={category.Name}
                    />
                    <div className='flex'>
                        {products.data?.data.map(product => {
                            return (
                                product.Catagory === category.id ?
                                    <Product
                                    id={product.id}
                                    name={product.Name}
                                    stock_status={product.Stock_Status}
                                    desc={product.Description}
                                    price={product.price}
                                    category={category.id}
                                    handleModalOpen={handleModalOpen}
                                    /> : null
                            )
                        })}
                    </div>
                </div>
            )
        })


        return (

            <div className='w-full'>
                <ReactModal isOpen={modalIsOpen}>
                    {products.data?.data.map(modalProduct => {
                        function handleAddToCart(){
                            let currentItem = {
                                id: modalProduct.id,
                                name: modalProduct.Name,
                                price: modalProduct.price,
                                qty: 1,
                                cartId: itemCount,
                                ingredientChoice: ingredientChoice,
                                selectionChoice: selectionChoice,
                            }
                            setCartItems(prevState=>{
                                return [
                                    ...prevState,
                                        currentItem
                                ]
                            })
                            setItemCount(prevState => {
                                return prevState+1
                            })
                            setSubtotal(prevState => {
                                return prevState+currentItem.price
                            })
                            handleModalClose()
                            toast.success('Item added to order!')
                        }
                        return (
                            modalProduct.id === clickedId ?
                                <Modal
                                closeModal={handleModalClose}
                                addToCart={handleAddToCart}
                                name={modalProduct.Name}
                                price={modalProduct.price}
                                id={modalProduct.id}
                                desc={modalProduct.Description}
                                handleSelectionChoice={handleSelectionChoice}
                                selection={selectionChoice}
                                handleIngredientDecrease={handleIngredientDecrease}
                                handleIngredientIncrease={handleIngredientIncrease}
                                ingredientSelectionState={ingredientChoice}
                                ingredientChoices={ingredientChoices}
                                /> : null
                        )
                    })}
                </ReactModal>
                <center>
                    <div id='alert-area' className='w-11/12 mt-8 text-left'>
                    </div>
                </center>
                <Infobar
                name={info.data?.data[0].Name}
                address={info.data?.data[0].Address}
                phone={info.data?.data[0].phone_number}
                pickupTime={pickupTime}
                closingTime={info.data?.data[0].closingtime}
                />

                <div id='menu-view-selection' className='bg-gray-100 font-default text-center rounded-full border-2 ml-12 border-grey border-solid w-fit'>
                    <button onClick={handleSetMenuView} className={!menuView ? 'bg-white p-2 px-4 rounded-full mr-1' : 'p-2 px-4 rounded-full mr-1'}>Ordering View</button>
                    <button onClick={handleSetMenuView} className={menuView ? 'bg-white p-2 px-4 rounded-full ml-1' : 'p-2 px-4 rounded-full ml-1'}>Menu View</button>
                </div>

                {categories.isLoading ? <Spinner/> : productBlocks}

                {products.isLoading === false && <FloatingCart
                toggleCartExpand={toggleCartExpand}
                handleRemoveItem={handleRemoveItem}
                expanded={cartExpanded}
                cartItems={cartItems}
                subtotal={subtotal}
                count={itemCount}
                ingredientChoices={ingredientChoices}
                />}

            </div>


        )
    }
