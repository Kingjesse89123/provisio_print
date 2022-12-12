import Script from "next/script";

export default function Freshchat(){
    return(
        <Script id='freshchat'>
            {`    
  function initFreshChat() {
    window.fcWidget.init({
      \t token: "b91c32ab-070d-4a1e-8b16-c297db10b4d8",
\t host: "https://blueplate.freshchat.com"
    });
  }
  function initialize(i,t){var e;i.getElementById(t)?
  initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,
  e.src="https://blueplate.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}
  function initiateCall(){initialize(document,"Freshchat-js-sdk")}
  window.addEventListener?window.addEventListener("load",initiateCall,!1):
  window.attachEvent("load",initiateCall,!1);
`}
        </Script>
    )
}