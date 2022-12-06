export default function SelectionSelector(props){

    const choices = [
        {
            name: 'Cheddar'
        },
        {
            name: 'Pepper Jack'
        },
        {
            name: 'Provolone'
        },
        {
            name: 'American'
        },
        {
            name: 'None'
        }
    ]

    const renderChoices = choices.map(choice=>{
        return(
            <button onClick={props.handleSelectionChoice} value={choice.name} key={choice.name} className={props.selection === choice.name ? 'border-solid border-2 border-blue-500 rounded m-2 p-2  text-blue-500' : 'border-solid border-2 border-black rounded m-2 p-2'}>{choice.name}</button>
        )
    })

    return(
        <div>
            <h1 className='text-2xl font-bold'>{props.title}</h1>
            <div className='flex'>{renderChoices}</div>
        </div>
    )
}