import{m as t}from"./agent.74f4cc35.js";import{a as e,e as i,d as s,s as o,h as n}from"./agent.a944af67.js";let l={oninit(t){let e=this,i=t.attrs;e.class="ba b--light-blue",e.url=i.url||"about:blank",e.setting=i.setting||{id:"info",isLock:!1,left:"0%",top:"0%",width:"100%",height:"100%",game:{width:540,height:540},reference:{left:0,top:0,width:1,height:1}};let s=1;if(o.isMobile&&(s=1),e.exitSetting={id:"infoExit",isLock:!0,left:"95%",top:"0%",width:"5%",height:"5%",game:{width:72*s,height:71*s},absPos:{top:0,right:-72*s},reference:{left:0,top:0,width:1,height:1}},globalThis.Howl){let t=new globalThis.Howl({src:["data/sounds/826bd4c7053a2867.ogg","data/sounds/862fec3e86660bd1.mp3","data/sounds/d9a857328a77400a.wav"]});this.sndClick=t}},oncreate(t){let s=this;s.iframe=t.instance.children[0].dom,e(s.setting),e(s.exitSetting),i(!0)},onbeforeremove(){s(this.setting),s(this.exitSetting)},view(){let e=this,i=e.setting;return t(".",{class:e.class,style:{overflowY:"hidden",overflowX:"hidden",position:"absolute",zIndex:998,left:i.left,top:`${o.currentY}px`,width:i.width,height:i.height,background:"rgba(0,0,0,0)"}},t("iframe",{style:{position:"absolute",left:"0%",top:"0%",width:"100%",height:"100%"},scrolling:"yes",frameborder:0,src:e.url}),t("img",{src:"data/sys/ce4680e11fcf96e0.png",alt:"avatar",style:{position:"absolute",zIndex:999,left:e.exitSetting.left,top:`${o.currentY+e.exitSetting.top}px`,width:e.exitSetting.width,height:e.exitSetting.height},onclick(){e.sndClick&&e.sndClick.play(),n()}}))}};export{l as Component};
