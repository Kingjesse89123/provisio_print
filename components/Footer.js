import PoweredBy from '../img/poweredby-vanity.png'
import Image from "next/image";

export default function Footer(){
    return(
        <div className='bg-bpb p-4 text-white font-default'>
            <div className='ml-12'>
                <div className='w-3/12 mb-6 mt-4'><a href='https://www.blueplate.ai'><Image src={PoweredBy} alt='Powered by Blueplate'/></a></div>
                <b className='mt-4'>Blueplate <i>Provisio</i> Alpha v1</b>
                <h1 className='mt-2'>Made with &lt;3 by Blueplate</h1>
                <h1>c. 2022, Blueplate Holdings LLC && Restaurant Name</h1></div>
        </div>
    )
}