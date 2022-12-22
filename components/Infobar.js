export default function Infobar(props){
    return(
    <div id='infobar-container' className='m-2 flex flex-col md:flex-row justify-between md:m-8'>
        <div id='res-info' className='md:text-left text-center'>
            <h1 className='text-2xl md:text-4xl font-bold' style={{fontFamily: props.headerFont}}>{props.name}</h1>
            <h3 className='text-xl md:text-2xl' style={{fontFamily: props.bodyFont}}>{props.address}</h3>
            <h3 className='text-xl md:text-2xl' style={{fontFamily: props.bodyFont}}>{props.phone}</h3>
        </div>
        <div id='pickup-info' className='text-center md:text-right'>
            <h1 className='text-2xl md:text-4xl font-bold' style={{fontFamily: props.headerFont}}>Current Pickup Times</h1>
            <h3 className='text-xl md:text-2xl' style={{fontFamily: props.bodyFont}}>Pickup around {props.pickupTime}</h3>
            <h3 className='text-xl md:text-2xl' style={{fontFamily: props.bodyFont}}>System closes at {props.closingTime}</h3>
        </div>
    </div>
    )
}