export default function Alert(props){
    return(
        <div className='p-8 bg-red-600 font-default text-white rounded-2xl'>
            <h1 className='text-3xl'>{props.title}</h1>
            <p className='text-2xl mt-4'>{props.text}</p>
            <p className='font-default mt-8'>{props.action}</p>
        </div>
    )
}