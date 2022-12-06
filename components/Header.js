import Link from 'next/link'

export default function Header(){
    return(
        <div className="bg-white text-black p-6 shadow-xl w-full flex gap-6 content-center justify-start">
            <Link href='/'><a className='text-3xl font-default flex-full'>Restaurant Logo</a></Link>
            <Link href='/info'><a className='text-xl font-default ml-auto'>Restaurant Info</a></Link>
            <Link href='checkout'><a className='text-xl font-default'>Checkout</a></Link>
            <Link href='/support'><a className='text-xl font-default'>Support</a></Link>
        </div>
    )
}