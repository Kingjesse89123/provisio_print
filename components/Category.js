export default function Category(props){
    return(
            <div className='p-6 bg-bpb m-12 rounded-xl' key={props.id}>
                <h1 className='text-3xl text-left text-white font-default'>{props.name}</h1>
            </div>
    )
}