import Link from "next/link";
import ProductRow from "./ProductRow";

export default function FloatingCart(props){
    let subtotal_d = Number(props.subtotal.toFixed(2))
    return(
        <div id='floating-cart'
             className={props.expanded ? ' inset-x-0 bottom-4 sticky md:w-2/3 w-11/12 bg-white p-4 rounded-2xl h-1/2 m-auto shadow-2xl border-2' :
                 'inset-x-0 bottom-4 mb-2 mt-2 sticky w-2/3 bg-white p-4 rounded-full h-1/2 m-auto shadow-2xl border-2 w-11/12 md:w-2/3'
             }>
            <div className='flex cursor-pointer' onClick={props.toggleCartExpand}>
                <h1 className='text-md md:text-2xl content-left p-2 flex-auto' style={{fontFamily: props.bodyFont}}>Current Order ({props.count})</h1>
                <Link href='/checkout'>
                    <button
                        className='ml-auto max-h-12 text-white px-4 md:px-8 text-md rounded-full hover:bg-black' style={{backgroundColor: props.primaryColor, fontFamily: props.headerFont}}>
                        Checkout
                    </button>
                </Link>
            </div>
            <div>
                {props.expanded ? <table className='w-full text-left' style={{fontFamily: props.bodyFont}}>
                    {props.cartItems?.length > 0 ?
                        <thead>
                        <tr className='border-b-2 border-b-solid text-lg'>
                            <th>Item</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                        </thead> :
                        <p className='font-default text-center'>Your order is empty</p>}
                    {props.cartItems?.map(cartItem => {
                        return <ProductRow key={cartItem.cartId}
                                           name={cartItem.name}
                                           price={cartItem.price}
                                           qty={cartItem.qty}
                                           handleRemoveItem={props.handleRemoveItem}
                                           cartId={cartItem.cartId}
                                           selectionChoice={cartItem.selectionChoice}
                                           ingredientChoice={cartItem.ingredientChoice}
                                           ingredientChoices={props.ingredientChoices}/>
                    })}

                </table> : null}

                    {props.expanded && <div className='flex justify-end mx-4 mt-2 font-bold'>
                        {props.subtotal > 0 && <h1 className='text-xl' style={{fontFamily: props.bodyFont}}>Subtotal ${subtotal_d}</h1>}
                    </div>}
            </div>
        </div>
    )

}