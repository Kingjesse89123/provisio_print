export default function FulfillmentButton(props){
    return(
        <div>
            <button onClick={props.handleClick} value={props.type} className={props.selection === props.type ? 'transition ease-in-out delay-300 px-12 p-6 border-solid border-4 text-blue-500 border-blue-500 m-2 rounded-xl font-default font-bold text-2xl hover:shadow-md hover:-translate-y-1' : 'transition ease-in-out delay-300 px-12 p-6 border-solid border-4 border-black m-2 rounded-xl font-default font-bold text-2xl hover:shadow-md hover:-translate-y-1'}>{props.type}</button>
        </div>
    )
}