import Link from 'next/link'

export default function Header(){
    return(
        <div className="bg-white text-black p-6 shadow-xl w-full">
            <Link href='/'><a className='text-3xl font-default'>Restaurant Logo</a></Link>
            <Link href='/info'><a className='text-xl font-default float-right mx-2'>Restaurant Info</a></Link>
            <Link href='checkout'><a className='text-xl font-default float-right mx-2'>Checkout</a></Link>
            <Link href='/support'><a className='text-xl font-default float-right mx-2'>Support</a></Link>
        </div>
    )
}