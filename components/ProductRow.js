import {MdCancel} from "react-icons/md";

export default function ProductRow(props){
    return (
        <>
            <tr>
                <td className='font-bold'>{props.name}</td>
                <td>${props.price}</td>
                {props.handleRemoveItem && <td>
                    <button onClick={() => props.handleRemoveItem(props.cartId)} value={props.cartId}><MdCancel
                        className='text-red-500 text-3xl'/></button>
                </td>}
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