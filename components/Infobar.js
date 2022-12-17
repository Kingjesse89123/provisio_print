
export default function Infobar(props){
    return(
    <div id='infobar-container' className='m-12 flex justify-between'>
        <div id='res-info'>
            <h1 className='font-default text-4xl font-bold'>{props.name}</h1>
            <h3 className='font-default text-2xl'>{props.address}</h3>
            <h3 className='font-default text-2xl'>{props.phone}</h3>
        </div>
        <div id='pickup-info'>
            <h1 className='font-default text-4xl font-bold text-right'>Current Pickup Times</h1>
            <h3 className='font-default text-2xl text-right'>Pickup around {props.pickupTime}</h3>
            <h3 className='font-default text-2xl text-right'>System closes at {props.closingTime}</h3>
        </div>
    </div>
    )
}