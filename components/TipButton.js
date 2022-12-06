export default function TipButton(props){
    return(<button onClick={props.addTip} className='transition ease-in-out delay-300 px-12 p-6 bg-blue-500 m-2 text-white rounded-xl font-default font-bold text-2xl hover:shadow-md hover:-translate-y-1'>
        {props.tipAmount}%
    </button>)
}