export default function IngredientSelector(props){
    return(
        <div id={props}>
            <h1 className='font-bold'>{props.name}</h1>
            <div id='button-row' className='flex gap-2 bg-blue-500 text-white p-2 px-4 rounded-full shadow-md w-fit font-bold'>
                {props.ingredientSelection !== 0 && <button onClick={() => props.handleIngredientDecrease(props.id)}>-</button>}
                <h1>{props.ingredientChoices[props.ingredientSelection]}</h1>
                {props.ingredientSelection !==3 && <button onClick={() => props.handleIngredientIncrease(props.id)}>+</button>}
            </div>
        </div>
    )
}

