export default function ProductRow(props){

    return props.id ? (
        <div className='mt-12 text-left w-full'>
            <hr />
            <h1>{props.id}</h1>
            <hr />
        </div>
    ) : <h1 className='mt-12 text-left inline w-full font-default'>Your order is empty</h1>

/*    return(
        <div className='mt-12 text-left inline w-full'>
            <br />
            <hr />
            <h1>{props.cart}</h1>
            <hr />
        </div>
    )*/
}