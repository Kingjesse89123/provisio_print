export default function Category(props){
    return(
            <div className='p-4 m-4 rounded-xl bg-bpb' key={props.id}>
                <h1 className='text-3xl text-white font-default'>{props.name}</h1>
            </div>
    )
}