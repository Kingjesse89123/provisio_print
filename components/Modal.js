import IngredientSelector from "./IngredientSelector";
import SelectionSelector from "./SelectionSelector";
import {MdCancel} from "react-icons/md";

export default function Modal(props) {
    const renderIngredients = props.ingredients.map(ingredient=>{
        for (let i=0; i<ingredient.products.length; i++){
            if(ingredient.products[i].products_id === props.id){
                return(
                    <IngredientSelector
                        key={ingredient.name}
                        id={ingredient.id}
                        name={ingredient.name}
                        ingredientSelection={ingredient.selection}
                        handleIngredientDecrease={props.handleIngredientDecrease}
                        handleIngredientIncrease={props.handleIngredientIncrease}
                        ingredientChoices={props.ingredientChoices}
                    />
                )
            }
        }
    })


    return (
        <div>
            <div id='top-row' className='flex justify-between mb-6'>
                <h1 className='text-4xl font-bold font-default'>{props.name}</h1>
                <button onClick={props.closeModal} className='text-4xl'><MdCancel className='text-red-500'/></button>
            </div>
            <div id='center-block' className='flex justify-start gap-4'><img className='h-80 w-1/3 object-cover rounded' alt='Food Image'/>
                <div id='variations-block' className='font-default'>
                    <SelectionSelector title='Cheese Choice' handleSelectionChoice={props.handleSelectionChoice} selection={props.selection}/>
                    <h1 className='text-2xl font-bold mt-2'>Ingredients</h1>
                    {renderIngredients}
                </div>
            </div>
            <div id='lower-block' className='flex justify-between mt-6'>
                <h1 className='font-default'>{props.desc}</h1>
                <h1 className='text-3xl font-default text-right'>${props.price.toFixed(2)}</h1>
            </div>
            <div id='button-block' className='flex w-full flex-col'>
                <button
                    className='bg-black rounded p-4 px-8 text-white mt-2 font-bold font-default float-right hover:bg-gray-500'
                    value={props.id} onClick={props.addToCart}>Add to order
                </button>
            </div>
        </div>
    )

}