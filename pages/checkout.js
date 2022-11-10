import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import ClearentSDK from "https://gateway-sb.clearent.net/js-sdk/js/clearent-host.js"
import Script from "next/script";

export default function Checkout(){

    function formatPhoneNumber(value) {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 10)}`;
    }

    const [inputValue, setInputValue] = useState("")
    const handleInput = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value)
        setInputValue(formattedPhoneNumber);
    };

    const [name, setName] = useState('')

    function handleAddTip(){
        event.preventDefault()
        toast.success('Tip added. Thanks!', {icon:'🤩'})
    }

    function handleAddCoupon(){
        event.preventDefault()
        toast.success('Coupon added successfully.')
    }

const [cartState, setCartState] = useState('Your cart is currently empty')

    useEffect(()=>{
        if (localStorage){
            setCartState(localStorage.getItem('cart'))
        }
    },[])

    // When you get a successful token response and
    // use this to make a sale/auth on your backend
    function ClearentTokenSuccess(raw, json) {
        console.log("ClearentTokenSuccess");
        console.log(raw);
        console.log(json);

        // now you can send the token to your server
        // to complete the transaction via mobile-gateway

    }

    function ClearentTokenError(raw, json) {
        console.log("ClearentTokenError");
        console.log(raw);
        console.log(json);

    }

    ClearentSDK.init({
        "baseUrl": "https://gateway-sb.clearent.net",
        "pk": "YOUR PUBLIC KEY GOES HERE"
    });

    return(
        <div className='text-center'>
        <h1 className='mt-8 text-5xl font-default font-bold'>Checkout</h1>
            <Script src="https://gateway-sb.clearent.net/js-sdk/js/clearent-host.js"></Script>
            <div>
                <div id='tip-block'>
                <h1 className='mt-16 text-3xl font-default font-bold'>Leave a tip</h1>
                <p className='mt-2 text-xl font-default'>It would be much appreciated, and every bit counts.</p>
                    <form>
                        <button onClick={handleAddTip} className='transition ease-in-out delay-150 px-12 p-6 bg-blue-500 m-2 text-white rounded-xl font-default font-bold text-2xl hover:shadow-md hover:-translate-y-1'>15%</button>
                        <button onClick={handleAddTip} className='transition ease-in-out delay-150 px-12 p-6 bg-blue-500 m-2 text-white rounded-xl font-default font-bold text-2xl hover:shadow-md hover:-translate-y-1'>20%</button>
                        <button onClick={handleAddTip} className='transition ease-in-out delay-150 px-12 p-6 bg-blue-500 m-2 text-white rounded-xl font-default font-bold text-2xl hover:shadow-md hover:-translate-y-1'>25%</button>
                    </form>
                </div>
            </div>
            <div id='contact-info-block'>
                <form className='mt-16'>
                    <h1 className='mt-6 text-3xl font-default font-bold'>Contact Information</h1>
                    <input className='rounded w-1/3 border-2 border-grey-500 p-4 font-default m-2' placeholder='First Name'
                           required='true' onChange={(e)=>{setName(e.target.value)}}/>
                    <input className='rounded w-1/3 border-2 border-grey-500 p-4 font-default m-2' placeholder='Last Name'/>
                    <input className='rounded w-1/3 border-2 border-grey-500 p-4 font-default m-2' placeholder='Email'
                           type='email'/>
                    <input className='rounded w-1/3 border-2 border-grey-500 p-4 font-default m-2' onChange={(e) => {
                        handleInput(e)
                    }} value={inputValue} placeholder='Phone Number' type='phone'/>
                </form>
            </div>
            <div id='cart-block mt-8'>
                <h1 className='mt-16 text-3xl font-default font-bold'>Your Order</h1>
                <p className='mt-2 text-xl font-default'>Alright, {name ? name+', ' : null} here is your order! Look it over to make sure everything looks right. You can make edits straight from this page.</p>

                <div id='cart-table' className='mt-6 font-default text-xl'>
                    <h1>{cartState}</h1>
                </div>

            </div>
            <div id='cart-block mt-8'>
                <h1 className='mt-16 text-3xl font-default font-bold'>Payment</h1>
                <div id='coupon-block'>
                    <form onSubmit={handleAddCoupon}>
                        <p className='font-default'>Have a coupon? Enter it below.</p>
                        <input className='rounded w-1/3 border-2 border-grey-500 p-4 font-default m-2'/>
                        <button className='px-4 p-4 bg-blue-500 m-2 text-white rounded font-default font-bold text-md'>Add Coupon</button>
                    </form>
                </div>
                <div id='payment-block'>
                    <div id="payment-form"></div>
                </div>
            </div>
        </div>
    )
}