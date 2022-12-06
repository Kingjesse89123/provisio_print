export default function RestaurantInfo(){
    return(
        <center>
            <h1 className='text-center mt-6 font-default text-4xl font-bold'>Restaurant Info</h1>
            <div className='flex gap-4 justify-center flex-wrap mt-6'>
                <br />
                <br />
                <div id='hours-block' className='rounded shadow bg-white p-8'>
                    <h1 className='font-default font-bold text-3xl'>Hours</h1>
                    <div id='hours-block'>
                        <div>
                            <h1>Monday</h1>
                        </div>
                        <div>
                            <h1>Tuesday</h1>
                        </div>
                        <div>
                            <h1>Wednesday</h1>
                        </div>
                        <div>
                            <h1>Thursday</h1>
                        </div>
                        <div>
                            <h1>Friday</h1>
                        </div>
                        <div>
                            <h1>Saturday</h1>
                        </div>
                        <div>
                            <h1>Sunday</h1>
                        </div>
                    </div>
                </div>
                <br/>
                <div id='directions' className='rounded shadow bg-white p-8'>
                    <h1 className='font-default font-bold text-3xl'>Directions</h1>
                </div>
            </div>
            <div id='directions' className='rounded shadow bg-white p-8'>
                <h1 className='font-default font-bold text-3xl'>About</h1>

            </div>
        </center>
    )
}