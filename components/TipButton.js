import {CartContext} from "./CartContext";
import {useContext} from "react";

export default function TipButton(props){
    const {subtotal} = useContext(CartContext)
    return(<button onClick={props.addTip} value={Number(props.tipAmount)} className='transition ease-in-out delay-300 px-12 p-6 bg-blue-500 m-2 text-white rounded-xl font-default font-bold text-2xl hover:shadow-md hover:-translate-y-1'>
        {props.tipAmount}%
        <h1 className='font-light text-sm'>${((subtotal*props.tipAmount)/100).toFixed(2)}</h1>
    </button>)
}