import Link from "next/link";

export default function Support(){
    return(
        <div>
            <h1 className='text-center m-12 text-4xl font-default'>Support and Feedback Center</h1>
            <div className='flex justify-around text-left font-default'>
                <div className='shadow-xl border-2 border-solid p-8 rounded-xl'>
                    <h1 className='text-2xl'>Text</h1>
                    <h1 className='text-4xl font-bold'>805.800.8050</h1>

                </div>
                <div className='shadow-xl border-2 border-solid p-6 rounded-xl'>
                    <h1 className='text-2xl'>Email</h1>
                    <h1 className='text-4xl font-bold'>support@blueplate.ai</h1>
                </div>
                <div className='shadow-xl border-2 border-solid p-6 rounded-xl'>
                    <h1 className='text-2xl'>Livechat</h1>
                    <h1 className='text-4xl font-bold'>Click here</h1>
                    <p>(no work)</p>
                </div>
            </div>
            <div className='flex-col content-center mt-8 font-default gap-4 content-center m-4'>
                <p className='text-lg'>Your relationship with Blueplate and our software is governed by our terms of service and privacy
                policy. By using our software, you consent to the terms of service and privacy policy.</p>
                <Link href='https://blueplate.ai/tos'>
                    <button className='p-2 px-4 bg-bpb rounded-full text-white'>Click to view</button>
                </Link>
            </div>
        </div>
    )
}