export default function Category(props){
    return(
            <div className='p-6 m-12 rounded-xl bg-bpb' key={props.id}>
                <h1 className='text-3xl text-white font-default'>{props.name}</h1>
            </div>
    )
}