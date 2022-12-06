import {useContext} from "react";
import {CartContext} from "./CartContext";

export default function ProductRow(props){
    const {cartItems, subtotal} = useContext(CartContext)
    console.log(props)
    return (
        <>
            <tr>
                <td className='font-bold'>{props.name}</td>
                <td>${props.price}</td>
                <td><button onClick={props.handleRemoveItem} className='text-white rounded-full p-2 bg-red-500 my-2'>x</button></td>
            </tr>
            <tr>
                {props.selectionChoice && <tr><td>-{props.selectionChoice}</td></tr>}
                <tr>{props.ingredientChoice?.map(ingredientChoice=>{
                    return ingredientChoice.selection !==2 ? <tr className='ml-4' key={ingredientChoice.id}>-{props.ingredientChoices[ingredientChoice.selection]} {ingredientChoice.name}</tr> : null
                })}</tr>
            </tr>
        </>
    )
}