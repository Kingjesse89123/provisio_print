import Link from 'next/link'

export default function Header(){
    return(
        <div className="bg-white text-black shadow border-b-2 flex flex-col p-2 gap-2 text-center md:text-left md:flex-row md:p-4">
            <Link href='/'><a className='text-2xl font-default flex-full'>Restaurant Logo</a></Link>
            <Link href='/info'><a className='text-xl font-default md:ml-auto'>Restaurant Info</a></Link>
            <Link href='/support'><a className='text-xl font-default'>Support</a></Link>
            <Link href='checkout'><a className='text-xl font-default'>Checkout</a></Link>
        </div>
    )
}