import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import Script from "next/script";
import {CartContext} from "../components/CartContext";
import ProductRow from "../components/ProductRow";
import TipButton from "../components/TipButton";
import FulfillmentButton from "../components/FulfillmentButton";
import * as clearentapi from './api/clearentapi'
import PaymentFields from "../components/PaymentFields";
import {sendOrder} from "./api/api";
import {useRouter} from "next/router";

export default function Checkout() {
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

    const router = useRouter()

    const [inputValue, setInputValue] = useState("")
    const handleInput = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value)
        setInputValue(formattedPhoneNumber);
        setContactInfo(prevState => {
            return({
                ...prevState,
                phone: formattedPhoneNumber
            })
        })
    };

    const [contactInfo, setContactInfo] = useState({
        f_name: '',
        l_name: '',
        email: '',
        phone: '',
        zip: ''
    })

    const {cartItems, setCartItems, subtotal, pickupTime} = useContext(CartContext)

    const [fulfillmentTimeToggle, setFulfillmentTimeToggle] = useState(false)
    const [tip, setTip] = useState(0.00)
    // Cart Variables
    let tax = subtotal * 0.0875
    let c_fee = (subtotal + tax + tip) * 0.0399
    let total = (subtotal + tax + c_fee + tip)

    let subtotal_d = subtotal.toFixed(2)
    let tax_d = tax.toFixed(2)
    let tip_d = tip.toFixed(2)
    let c_fee_d = c_fee.toFixed(2)
    let total_d = total.toFixed(2)


    const [orderStatus, setOrderStatus] = useState({
        status: 'inprogress',
        message: null,
    })

    function handleAddTip(e) {
        setTip((subtotal*e.target.value)/100)
        toast.success('Tip added. Thanks!', {icon: '🤩'})
    }

    function handleRemoveTip(){
        setTip(prevState => {
            return prevState - prevState
        })
        toast.error('Tip removed :(')
    }

/*    function renderPickupTimes(){
        console.log(pickupTime)
        console.log(closingTime)
        let pickup_i = DateTime.fromISO(pickupTime)
        let closing_i = DateTime.fromISO(closingTime)
        let diff = closing_i.diff(pickup_i, 'minutes')
        let diffInMinutes = diff.values.minutes
        console.log(diffInMinutes%20)
    }*/

    function handleChangePickupTime(){
        event.preventDefault()
        setFulfillmentTimeToggle(prevState => {
            return !prevState
        })
    }

    function handleAddCoupon() {
        event.preventDefault()
        toast.success('Coupon added successfully.')
    }

    function initClearentSDK() {
        try {
            if (ClearentSDK?.initialized) {
                ClearentSDK.reset();
            }

            ClearentSDK.init({
                "baseUrl": "https://gateway-sb.clearent.net",
                "pk": "307a301406072a8648ce3d020106092b240303020801010c0362000476f0a34bd52f10510c0945b952aaa1d54411d2a2826d236c4c81cbcff0e0cbe48f26396fee633d2cfea5f0bdfe00955a1521b732cda480fde7ae64c0fc99eef20b16ae775700d414711d1e9f5edcbd80da9f2ea2d35d8cb6b03b2c159f2bfb6e",
            });
        } catch (error) {
            // doing this to ignore undefined error
        }
    }

    function handleOrderPlaced(){
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

        let products = []

        for(let i=0; i<cartIds2.length; i++){
            products.push(
                {
                    products_id: cartIds2[i],
                    qty: cartQty[i]
                }
            )
        }

        ClearentSDK.getPaymentToken().then(
            (result) => {
                // this function is called if getting a payment token was successful
                clearentapi.sendJWT(result.payload['mobile-jwt'].jwt,
                    {
                    type: 'SALE',
                    amount: subtotal_d,
                    "sales-tax-amount": tax_d,
                    "sales-tax-type":"LOCAL_SALES_TAX",
                    "software-type":"Blueplate",
                    "software-type-version":"Provisio a1.4.0",
                    'service-fee': c_fee_d,
                    'tip-amount': tip_d,
                    'email-address': contactInfo.email,
                    'email-receipt': "true",
                    'billing-is-shipping':'true',
                        "billing": {
                            "zip": contactInfo.zip,
                        },
                    }
                )
                    .then(res=>setOrderStatus({
                        status: 'processing',
                        message: 'Transaction Approved! Submitting your order.'
                    })+sendOrder(total_d, products)+setCartItems([])+router.push('/confirmed'))
                    .catch(error=>setOrderStatus(
                        {status: 'error', message: error?.response.data.payload.transaction['display-message']}
                    ))
            },
            (error) => {
                // this function is called if getting a payment token failed
                setOrderStatus({
                    status: 'error',
                    message: error.payload.error['error-message']
                })
            }
        );
    }
    function ClearentTokenSuccess(raw, json) {
    }
    function ClearentTokenError(raw, json) {
        console.log("ClearentTokenError");
        console.log(raw);
        console.log(json);
    }

    const [fulfillmentType, setFulfillmentType] = useState('Pickup')

    function handleChangeFulfillmentType(e){
        event.preventDefault()
        setFulfillmentType(e.target.value)
    }

    useEffect(()=> initClearentSDK(), []);

    let ingredientChoices = ['None','Light','Normal','Extra']

    if(cartItems.length===0){
        return (<div className='font-default'>
                <p className='text-xl text-center mt-6 p-1'>It looks like your order is empty. No worries!</p>
                <center>
                    <div className='w-2/3'>
                        <button onClick={() => (router.push('/'))} className='mt-6 border-2 border-blue-500 p-2 px-12 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white'>Start your order</button>
                    </div>
                </center>
                </div>
        )

    }
    return(
        <div className=''>
        <h1 className='mt-8 text-5xl font-default font-bold text-center'>Checkout</h1>
            <Script src="https://gateway-sb.clearent.net/js-sdk/js/clearent-host.js" onLoad={initClearentSDK}></Script>
            <div>
                {!tip && <div id='tip-block' className='text-center'>
                    <h1 className='mt-16 text-3xl font-default font-light'>Leave a tip</h1>
                    <TipButton
                        tipAmount={15}
                        addTip={handleAddTip}
                    />
                    <TipButton
                        tipAmount={18}
                        addTip={handleAddTip}
                    />
                    <TipButton
                        tipAmount={20}
                        addTip={handleAddTip}
                    />
                    <p className='mt-2 text-xl font-default'>It would be much appreciated, and every bit counts.</p>
                </div>}
                {tip!==0 && <div className='font-default'>
                    <center>
                        <div className='w-2/3'>
                            <button onClick={handleRemoveTip} className='mt-6 border-2 border-red-500 p-2 px-12 text-red-500 rounded-full hover:bg-red-500 hover:text-white'>Remove Tip</button>
                        </div>
                    </center>
                </div>}
                    </div>

                <div id='fulfillment-block'>
                    <h1 className='mt-16 text-3xl font-default font-light text-center'>Fulfillment</h1>
                    <div className='flex-col justify-center'>
                            <FulfillmentButton
                            type='Pickup'
                            handleClick={handleChangeFulfillmentType}
                            selection={fulfillmentType}
                            />
                            <FulfillmentButton
                                type='Delivery'
                                handleClick={handleChangeFulfillmentType}
                                selection={fulfillmentType}
                            />
                    </div>
                    <div className='flex flex-col justify-center'><h1
                        className='text-center text-xl font-default mt-2'>Estimated {fulfillmentType} Time</h1>
                        <h1 className='text-center text-2xl font-bold font-default mt-2'>{pickupTime}</h1>
{/*                        <div className='flex justify-center'>
                            <button onClick={handleChangePickupTime} className='text-white font-default bg-black p-2 px-8 rounded mt-2'>{fulfillmentType} at a later time
                            </button>
                        </div>*/}
                    </div>
                </div>

            <div id='contact-info-block' className='flex flex-col items-center gap-2'>
                <h1 className='mt-6 text-2xl font-default font-light'>Contact Information</h1>
                <div className='flex-col gap-2 justify-between'>
                    <input className='rounded border-2 p-4 font-default' placeholder='First Name' required='true' onChange={(e) => {setContactInfo(prevState => {
                        return({
                            ...prevState,
                            f_name: e.target.value
                        })
                    })}}/>
                    <input className='rounded border-2 p-4 font-default' placeholder='Last Name' onChange={(e) => {setContactInfo(prevState => {
                        return({
                            ...prevState,
                            l_name: e.target.value
                        })
                    })}}/>
                </div>
                <div className='flex-col gap-2 justify-between'>
                    <input className='rounded border-2 p-4 font-default' placeholder='Email' type='email' onChange={(e)=>{setContactInfo(prevState => {
                        return(
                            {
                                ...prevState,
                                email: e.target.value,
                            }
                        )
                    })}}/>
                    <input className='rounded border-2 p-4 font-default' onChange={(e) => {handleInput(e)}} value={inputValue} placeholder='Phone Number' type='phone'/>
                </div>
                {fulfillmentType === 'Delivery' && <div className='flex gap-4 justify-between'>
                    <input className='rounded border-2 p-4 font-default' placeholder='Street Number'/>
                    <input className='rounded border-2 p-4 font-default' placeholder='City'/>
                    <input className='rounded border-2 p-4 font-default' placeholder='State'/>
                </div>}
                <input className='rounded border-2 p-4 font-default' placeholder='Zip Code' maxLength='5' onChange={e=>{setContactInfo(prevState => {
                    return(
                        {
                            ...prevState,
                            zip: e.target.value
                        }
                    )
                })}}/>
            </div>

                <div className='text-center mt-8'>
                    <h1 className='text-3xl font-default font-light'>Your Order</h1>
                    <p className='mt-2 text-xl font-default'>Alright, {contactInfo.f_name ? contactInfo.f_name + ', ' : null} here is your order!
                        Look it over to make sure everything looks right.</p>
                </div>
            <div id='cart-block' className='text-center mt-8'>
                <div id='coupon-block' className='flex justify-center mt-8'>
                    <form onSubmit={handleAddCoupon}>
                        <p className='font-default text-center'>Have a coupon? Enter it below.</p>
                        <input className='rounded border-2 border-grey-500 p-4 font-default m-2'/>
                        <button className='px-4 p-4 bg-blue-500 m-2 text-white rounded font-default font-bold text-md'>Add Coupon</button>
                    </form>
                </div>
                <div className='flex justify-center'>
                    <div className='w-11/12 shadow-xl rounded-xl p-4'>
                        <table id='cart-table'
                               className='mt-6 font-default table-fixed w-full text-left'>
                            <thead className='border-b-2 border-b-solid text-lg'>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            {cartItems.map(cartItem => {
                                return (
                                    <ProductRow key={cartItem.cartId}
                                                name={cartItem.name}
                                                price={cartItem.price}
                                                qty={cartItem.qty}
                                                cartId={cartItem.cartId}
                                                selectionChoice={cartItem.selectionChoice}
                                                ingredientChoice={cartItem.ingredientChoice}
                                                ingredientChoices={ingredientChoices}/>
                                )
                            })}
                            <tfoot>
                            <tr>
                                <td className='text-md font-bold'>Subtotal</td>
                                <td>${subtotal_d}</td>
                            </tr>
                            <tr>
                                <td className='text-md font-bold'>Tax</td>
                                <td>${tax_d}</td>
                            </tr>
                            {tip !== 0 && <tr>
                                <td className='text-md font-bold'>Tip</td>
                                <td>${tip_d }</td>
                            </tr>}
                            <tr>
                                <td className='text-md font-bold'>Convenience Fee</td>
                                <td>${c_fee_d}</td>
                            </tr>
                            <tr>
                                <td className='font-bold'>Total</td>
                                <td>${total_d}</td>
                            </tr>
                            </tfoot>
                        </table>
                        <PaymentFields
                        orderStatus={orderStatus}
                        initClearentSDK={initClearentSDK}
                        />
                    </div>
                </div>

            </div>
            <div>
                <div className='flex justify-center content-center mt-2'>
                    <div className='flex-col font-default text-red-500'>
                        {!contactInfo.f_name && <h1>First name is required</h1>}
                        {!contactInfo.l_name && <h1>Last name is required</h1>}
                        {!contactInfo.email && <h1>Email is required</h1>}
                        {!contactInfo.phone && <h1>Phone number is required</h1>}
                        {!contactInfo.zip && <h1>Zip code is required</h1>}
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button
                        className='px-12 p-4 bg-blue-500 text-white rounded font-default font-bold text-md mb-12 mt-4 disabled:bg-slate-300'
                        onClick={handleOrderPlaced} disabled={!(contactInfo.f_name && contactInfo.l_name && contactInfo.email && contactInfo.phone && contactInfo.zip)}>Place Order
                    </button>
                </div>
            </div>
        </div>
    )
}