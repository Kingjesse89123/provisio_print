import Link from 'next/link'
import {QueryClient, useQuery} from "react-query";
import {getInfo} from "../pages/api/api";
import Image from "next/image";
import router from 'next/router'

export default function Header(){
    let directusUrl = 'https://5nn73jb7.directus.app'
    const info = useQuery(['info'], getInfo)
    return(
        <div className="bg-white text-black shadow border-b-2 flex flex-col p-2 gap-2 md:gap-8 text-center md:text-left md:flex-row md:p-4 items-center">
            {info.isSuccess && <img onClick={()=>router.push('/')} className='object-cover object-scale-down h-12 hover:cursor-pointer' alt='test' src={'https://5nn73jb7.directus.app' + '/assets/' + info.data?.data[0].logo}/>}
            <Link href='/info'><a className='text-xl md:ml-auto' style={{fontFamily: info.data?.data[0].headerfont}}>Restaurant Info</a></Link>
            <Link href='/support'><a className='text-xl' style={{fontFamily: info.data?.data[0].headerfont}}>Support</a></Link>
            <Link href='checkout'><a className='text-xl' style={{fontFamily: info.data?.data[0].headerfont}}>Checkout</a></Link>
        </div>
    )
}