export default function Product(props){

    return(
        <div id={props.category}
             className='font-default p-4 w-1/4 inline-block ml-12 shadow-xl rounded flex flex-col'>
            <center></center>
            <h1 className='text-2xl font-bold'>{props.name}</h1>
            <p className={props.stock_status ? 'text-green-600' : 'text-red-600'}>{props.stock_status ? 'In Stock' : 'Out of Stock'}</p>
            <p>{props.desc}</p>
            <h1 className='text-xl mt-2'>${props.price}</h1>
            {props.stock_status && <button
                className='bg-black rounded p-2 px-8 text-white mt-2 font-bold hover:bg-gray-500'
                onClick={props.handleModalOpen} value={props.id}>Add to Order</button>}
        </div>
    )

}