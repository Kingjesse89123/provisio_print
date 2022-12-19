import Link from 'next/link'

export default function Header(){
    return(
        <div className="bg-white text-black p-4 shadow w-full flex gap-6 content-center justify-start border-b-2">
            <Link href='/'><a className='text-2xl font-default flex-full'>Restaurant Logo</a></Link>
            <Link href='/info'><a className='text-xl font-default ml-auto'>Restaurant Info</a></Link>
            <Link href='/support'><a className='text-xl font-default'>Support</a></Link>
            <Link href='checkout'><a className='text-xl font-default'>Checkout</a></Link>
        </div>
    )
}