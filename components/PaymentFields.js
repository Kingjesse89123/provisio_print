'use client';
export default function PaymentFields(props){
    return(
        <div id='payment-block' className='flex flex-col justify-center items-center'>
            <div id="payment-form" className='rounded mt-4 w-full'></div>
            {props.orderStatus.status !== 'inprogress' && <div id='status-block' className={props.orderStatus.status === 'error' ? 'bg-red-500 text-white mx-12 rounded p-4 font-default w-full mt-2' : 'bg-green-500 text-white mx-12 rounded p-4 font-default w-full mt-2'}>
                <h1>{props.orderStatus.message}</h1>
            </div>}
        </div>

    )
}