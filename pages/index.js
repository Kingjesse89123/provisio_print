import {useContext, useEffect, useState} from "react";
import {getCategories, getProducts, getInfo, getImg} from './api/api'
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
import {DateTime} from "luxon";

export default function Index() {

    const categories = useQuery(['categories'], getCategories)

    const products = useQuery(['products'], getProducts)

    const info = useQuery(['info'], getInfo)

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

        const {subtotal, setSubtotal, closingTime, setClosingTime} = useContext(CartContext)

            setClosingTime(info.data?.data[0].closingtime)

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

                            let cartIds = []

                            let cartQty = []

                            for(let i=0; i<cartItems.length; i++){
                                cartIds.push(cartItems[i].id)
                            }

                            let cartIds2 = []
                            let count
                            for(let i=0; i<cartIds.length; i++){
                                if(cartIds2.indexOf(cartIds[i]) === -1){
                                    cartIds2.push(cartIds[i])
                                    cartQty.splice(i, 0, 1)
                                    console.log('Unique!')
                                    console.log(cartQty)
                                } else {
                                    count = cartQty[cartIds2.indexOf(cartIds[i])]
                                    count++
                                    console.log(count)
                                    cartQty.splice(cartIds2.indexOf(cartIds[i]), 1, count)
                                    console.log('Already exists')
                                    console.log(cartQty)
                                    console.log(cartIds2)
                                }
                            }

                            let currentItem = {
                                id: modalProduct.id,
                                name: modalProduct.Name,
                                price: modalProduct.price,
                                qty: 1,
                                ingredientChoice: ingredientChoice,
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
                        {pickupTime > info.data?.data[0].closingtime ? <Alert title="Closed." text="Right now, this restaurant is closed. Check back later!" action='Feel free to browse the menu in the meantime.'/> : null}
                    </div>
                </center>
                {!products.isLoading && <Infobar
                    name={info.data?.data[0].Name}
                    address={info.data?.data[0].Address}
                    phone={info.data?.data[0].phone_number}
                    pickupTime={pickupTime}
                    closingTime={info.data?.data[0].closingtime}
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
