export default function Product(props){

    return(
        <div id={props.category}
             className='font-default p-4 flex flex-col border-solid border-2 rounded-xl shadow-md m-4 md:w-1/4'>
            <h1 className='text-xl font-bold'>{props.name}</h1>
            <p className={props.stock_status ? 'text-green-600' : 'text-red-600'}>{props.stock_status ? 'In Stock' : 'Out of Stock'}</p>
            <p className='font-light'>{props.desc}</p>
            <h1 className='text-xl mt-2'>${props.price}</h1>
            {props.stock_status && <button
                className='bg-neutral-900 rounded p-2 px-8 text-white mt-1 font-bold hover:bg-black mt-auto'
                onClick={props.handleModalOpen} value={props.id}>Add to Order</button>}
        </div>
    )

}