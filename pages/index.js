import {useEffect, useState} from "react";
import {getCategories, getProducts} from './api/api'
import toast from "react-hot-toast";
import {useQuery} from "react-query";
import Link from 'next/link'
import ReactModal from 'react-modal'
import Spinner from "../components/Spinner";
import ProductRow from "../components/ProductRow";

export default function Home() {
    const categories = useQuery(['categories'], getCategories)

    const products = useQuery(['products'], getProducts)

    useEffect(()=>{
        localStorage.setItem('products', products)
    })

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

    // Cart Area
    const [cartIds, setCartIds] = useState([])

    function addToOrder(event) {
        setCartIds(prevState => ([
            ...prevState,
            event.target.value
        ]))
        toast.success('Added to order!')
        console.log(cartIds)
        handleModalClose()
    }

    useEffect(() => {
        localStorage.setItem('cart', cartIds.toString())
    }, [cartIds])

    const [cartExpanded, setCartExpanded] = useState(false)

    function toggleCartExpand() {
        setCartExpanded(prevState => {
            return !prevState
        })
        return {cartState: cartIds}
    }

    const RenderProductRows = cartIds.map(Item =>{
        return(
                <ProductRow
                    id={Item}
                    key={Item}
                />
        )
    })


    const productBlocks = categories.data?.map(category => {
        return (

            <div key={category.id}>
                <div className='p-8 bg-bpb m-12 rounded-xl' key={category.id}>
                    <h1 className='text-3xl text-left text-white font-default'>{category.name}</h1>
                </div>
                <div>
                    {products.data?.map(product => {
                        return (
                            product.categories[0].id === category.id ?
                                <div className='font-default p-4 w-1/4 inline-block ml-12 shadow-xl rounded'>
                                    <center><img src={product.images[0].src}
                                                 className='h-60 w-full object-cover rounded'/></center>
                                    <h1 className='text-2xl font-bold'>{product.name}</h1>
                                    <p className={product.stock_status === 'instock' ? 'text-green-600' : 'text-red-600'}>{product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}</p>
                                    <h1 className='text-xl mt-2'>${product.price}</h1>
                                    {product.stock_status === 'instock' && <button
                                        className='bg-black rounded p-2 px-8 text-white mt-2 font-bold hover:bg-gray-500'
                                        onClick={handleModalOpen} value={product.id}>Add to Order</button>}
                                </div> : null
                        )
                    })}
                </div>
            </div>
        )
    })


    return (

        <div className='w-full'>
            <ReactModal isOpen={modalIsOpen}>
                {products.data?.map(modalProduct => {
                    return (
                        modalProduct.id.toString() === clickedId.toString() ?
                            <div>
                                <button onClick={handleModalClose} className='text-3xl float-right'>x</button>
                                <h1 className='text-5xl font-bold font-default text-center mb-12'>{modalProduct.name}</h1>
                                <img className='h-80 w-1/3 object-cover rounded' src={modalProduct.images[0].src}
                                     alt='Food Image'/>
                                <div id='variations-block' className='font-default float-right float-top'>
                                    <p>Variations will go somewhere around here</p>
                                </div>
                                <br/>
                                <br/>
                                <h1 className='text-3xl font-default text-right'>${modalProduct.price}</h1>
                                <button
                                    className='bg-black rounded p-4 px-8 text-white mt-2 font-bold font-default float-right'
                                    value={modalProduct.id} onClick={addToOrder}>Add to order
                                </button>
                            </div> : null
                    )
                })}
            </ReactModal>
            <center>
                <div id='alert-area' className='w-11/12 mt-8 text-left'>
                </div>
            </center>
            <div id='restaurant-info' className='content-center m-20 font-default'>
                <div id='restaurant-name-block' className='text-left float-left'>
                    <h1 className='text-5xl mb-4 font-bold'>Blueplate Demo</h1>
                    <h1 className='text-3xl'>333 Main St, Morro Bay, CA</h1>
                    <h1 className='text-3xl'>805.800.8050</h1>
                </div>
                <div id='wait-block' className='text-right float-right'>
                    <h1 className='text-5xl mb-4 font-bold'>Current Wait Times Are</h1>
                    <h1 className='text-3xl'>Pickup around {pickupTime}</h1>
                    <h1 className='text-3xl'>System disables at 6:45pm</h1>
                </div>
            </div>
            {/* --Figure this out-- */}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            {categories.isLoading ? <Spinner/> : productBlocks}

            {products.isLoading === false && <div onClick={toggleCartExpand} id='floating-cart'
                                                  className={cartExpanded ? 'cursor-pointer inset-x-0 bottom-4 sticky w-8/12 bg-white p-4 shadow-2xl rounded-2xl flex h-1/2 m-auto' :
                                                      'inset-x-0 bottom-4 sticky w-8/12 bg-white p-4 shadow-2xl rounded-full flex h-1/2 content-center m-auto cursor-pointer'
                                                  }>
                <h1 className='font-default text-xl content-left p-2 w-full'>Current Order</h1>
                {cartExpanded ? <div>{RenderProductRows}</div> : null}
                <Link href='/checkout'>
                    <button
                        className='ml-auto font-default max-h-12 bg-bpb text-white px-8 text-md rounded-full hover:bg-blue-900'>Checkout
                    </button>
                </Link>
            </div>}

            {

            }

        </div>


    )
}
