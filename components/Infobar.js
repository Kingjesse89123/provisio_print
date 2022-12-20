export default function Infobar(props){
    return(
    <div id='infobar-container' className='m-2 flex flex-col md:flex-row justify-between md:m-8'>
        <div id='res-info' className='md:text-left text-center'>
            <h1 className='font-default text-2xl md:text-4xl font-bold'>{props.name}</h1>
            <h3 className='font-default text-xl md:text-2xl'>{props.address}</h3>
            <h3 className='font-default text-xl md:text-2xl'>{props.phone}</h3>
        </div>
        <div id='pickup-info' className='text-center md:text-right'>
            <h1 className='font-default text-2xl md:text-4xl font-bold'>Current Pickup Times</h1>
            <h3 className='font-default text-xl md:text-2xl'>Pickup around {props.pickupTime}</h3>
            <h3 className='font-default text-xl md:text-2xl'>System closes at {props.closingTime}</h3>
        </div>
    </div>
    )
}