import{a as t,e,d as i,m as s,s as o,h as n}from"./agent.10298341.js";import"./agent.d2841822.js";import"./agent.ba1e6c3f.js";let l={oninit(t){let e=this,i=t.attrs;e.class="ba b--light-blue",e.url=i.url||"about:blank",e.setting=i.setting||{id:"info",isLock:!1,left:"0%",top:"0%",width:"100%",height:"100%",game:{width:540,height:540},reference:{left:0,top:0,width:1,height:1}};let s=1;if(o.isMobile&&(s=1),e.exitSetting={id:"infoExit",isLock:!0,left:"95%",top:"0%",width:"5%",height:"5%",game:{width:72*s,height:71*s},absPos:{top:0,right:-72*s},reference:{left:0,top:0,width:1,height:1}},globalThis.Howl){let t=new globalThis.Howl({src:["data/sounds/826bd4c7053a2867.ogg","data/sounds/862fec3e86660bd1.mp3","data/sounds/d9a857328a77400a.wav"]});this.sndClick=t}},oncreate(i){let s=this;s.iframe=i.instance.children[0].dom,t(s.setting),t(s.exitSetting),e(!0)},onbeforeremove(){i(this.setting),i(this.exitSetting)},view(){let t=this,e=t.setting;return s(".",{class:t.class,style:{overflowY:"hidden",overflowX:"hidden",position:"absolute",zIndex:998,left:e.left,top:`${o.currentY}px`,width:e.width,height:e.height,background:"rgba(0,0,0,0)"}},s("iframe",{style:{position:"absolute",left:"0%",top:"0%",width:"100%",height:"100%"},scrolling:"yes",frameborder:0,src:t.url}),s("img",{src:"data/sys/ce4680e11fcf96e0.png",alt:"avatar",style:{position:"absolute",zIndex:999,left:t.exitSetting.left,top:`${o.currentY+t.exitSetting.top}px`,width:t.exitSetting.width,height:t.exitSetting.height},onclick(){t.sndClick&&t.sndClick.play(),n()}}))}};export{l as Component};