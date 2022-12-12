import PoweredBy from '../img/poweredby-vanity.png'
import Image from "next/image";

export default function Footer(){
    return(
        <div className='bg-bpb p-2 text-white font-default'>
            <div className='ml-2'>
                <b>Blueplate <i>Provisio</i> Alpha v1.1.0</b>
                <p>Made with &lt;3 by Blueplate</p>
            </div>
        </div>
    )
}