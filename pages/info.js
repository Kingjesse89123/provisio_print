export default function RestaurantInfo(){
    return(
        <center>
            <h1 className='text-center mt-6 font-default text-4xl font-bold'>Restaurant Info</h1>
            <div className='flex justify-around flex-nowrap mt-6 m-2'>
                <br />
                <br />
                <div id='hours-block' className='rounded shadow bg-white flex-1 border-solid border-2 p-6 m-2'>
                    <h1 className='font-default font-bold text-3xl'>Hours</h1>
                    <div id='hours-block'>

                    </div>
                </div>
                <br/>
                <div id='directions' className='rounded shadow bg-white flex-1 border-solid border-2 p-6 m-2'>
                    <h1 className='font-default font-bold text-3xl'>Directions</h1>
                </div>
            </div>
        </center>
    )
}