export default function Category(props){
    return(
            <div className='p-4 m-4 rounded-xl' key={props.id} style={{backgroundColor: props.primaryColor}}>
                <h1 className='text-3xl text-white' style={{fontFamily: props.headerFont}}>{props.name}</h1>
            </div>
    )
}