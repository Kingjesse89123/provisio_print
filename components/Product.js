export default function Product(props){

    return(
        <div id={props.category}
             className='p-4 flex flex-col border-solid border-2 rounded-xl shadow-md m-4 w-1/4'>
            <h1 className='text-xl font-bold' style={{fontFamily: props.headerFont}}>{props.name}</h1>
            <p className={props.stock_status ? 'text-green-600' : 'text-red-600'} style={{fontFamily: props.bodyFont}}>{props.stock_status ? 'In Stock' : 'Out of Stock'}</p>
            <p className='font-light' style={{fontFamily: props.bodyFont}}>{props.desc}</p>
            <h1 className='text-xl mt-2' style={{fontFamily: props.bodyFont}}>${props.price}</h1>
            {props.stock_status && <button
                className='bg-neutral-900 rounded p-2 px-8 text-white mt-1 font-bold hover:bg-black mt-auto'
                onClick={props.handleModalOpen} value={props.id} style={{fontFamily: props.bodyFont}}>Add to Order</button>}
        </div>
    )

}