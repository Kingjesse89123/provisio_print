import {useQuery} from "react-query";
import {getCategories, getProducts} from "./api/api";

export default function Index(){

    const categories = useQuery(['categories'], getCategories)

    console.log(categories.data?.data)

    const products = useQuery(['products'], getProducts)
    const categoryTabs = categories.data?.data.map(category=>{
        return (
            <div key={category} className='w-10/12 bg-blue-500 p-4 mt-4'>
                <h1>{category.Name}</h1>
            </div>
        )
    })

    return(
        <div>
            <h1>{categoryTabs}</h1>
        </div>
    )
}