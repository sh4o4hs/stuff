import{r as e,s as t,e as a,m as n,M as o,o as r,u as s,O as i}from"./agent.c382c2f8.js";import{b as c,f as l,g as d,i as p,C as g,j as u}from"./agent.e0a6f4e5.js";import{C as m,n as f,c as y,a as v}from"./agent.2b73e7db.js";import{getGameEvent as b}from"./agent.be5a506f.js";import"./agent.2704ee2b.js";var h=0;function w(e,t){var a=t.data;if(Array.isArray(a)&&!(a.length<2)){var n=a[0],o=a[1],r=a[2],s=e._callbacks[n];s&&(delete e._callbacks[n],s(o,r))}}function O(e){var t=this;t._worker=e,t._callbacks={},e.addEventListener("message",(function(e){w(t,e)}))}O.prototype.postMessage=function(e){var t=this,a=h++,n=[a,e];return new Promise((function(e,o){if(t._callbacks[a]=function(t,a){if(t)return o(new Error(t.message));e(a)},void 0!==t._worker.controller){var r=new MessageChannel;r.port1.onmessage=function(e){w(t,e)},t._worker.controller.postMessage(n,[r.port2])}else t._worker.postMessage(n)}))};var T=O;let L=null,R="init",A="connect",E="login",M="ingame",N="togame",k="register",C="onrefresh",B="onmessage",S="onerror",_="onbroadcast",j="onclose",G="ontogame",I={},D={async connect(e,t){L&&(t&&(I=t),await L.postMessage({type:A,config:e}))},async login(e){if(L){const t=(await import("./agent.d3ba0177.js").then((function(e){return e.f}))).default;let a=(await t.getPromise({excludes:{webglVendorAndRenderer:!0,language:!0,canvas:!0,hasLiedOs:!0,hasLiedBrowser:!0,availableScreenResolution:!0,webdriver:!0,deviceMemory:!0,hardwareConcurrency:!0,timezoneOffset:!0,timezone:!0,sessionStorage:!0,localStorage:!0,indexedDb:!0,addBehavior:!0,openDatabase:!0,cpuClass:!0,platform:!0,doNotTrack:!0,plugins:!0,adBlock:!0,hasLiedLanguages:!0,hasLiedResolution:!0,fonts:!0,fontsFlash:!0,audio:!0,enumerateDevices:!0}})).map((function(e){return e.value})),n=t.x64hash128(a.join(""),31);return e.fingerprint=n,await L.postMessage({type:E,info:e})}},async ingame(e){if(L){return await L.postMessage({type:M,info:e})}},async togame(e){if(L){return await L.postMessage({type:N,info:e})}},async register(e){if(L){return await L.postMessage({type:k,config:e})}}};function P(e){if(!Array.isArray(e.data)){let t=e.data;switch(t.type){case C:return void t.offsetTime;case j:return void(I.onclose&&I.onclose());case S:return void(I.onerror&&I.onerror(t.data));case B:return void(I.onmessage&&I.onmessage(t.data));case _:return void(I.onbroadcast&&I.onbroadcast(t.data));case G:return void(I.ontogame&&I.ontogame(t.data))}}}var U={nested:{Game:{nested:{Share:{nested:{ActionType:{values:{NULL:0}},CheckAction:{fields:{actionType:{type:"ActionType",id:1}},reserved:[[2,2]]},Jackpot:{nested:{ActionType:{values:{NORMAL:0}},BaseResponse:{fields:{actionType:{type:"ActionType",id:1},mJpOutIdx:{type:"uint32",id:3},mJpOutValue:{type:"uint64",id:4},mJpValue:{rule:"repeated",type:"uint64",id:5},resultCode:{type:"uint32",id:6}},reserved:[[2,2]]}}},Setting:{nested:{ActionType:{values:{NORMAL:0}},BaseResponse:{fields:{actionType:{type:"ActionType",id:1},betForm:{rule:"repeated",type:"uint32",id:3},betFormIndex:{type:"uint32",id:4},decimalPosition:{type:"uint32",id:5},enableJP:{type:"bool",id:6},isDemo:{type:"bool",id:7},lastBet:{type:"uint32",id:8},lineAmount:{type:"uint32",id:9}},reserved:[[2,2]]}}},Info:{nested:{ActionType:{values:{NORMAL:0}},BaseResponse:{fields:{actionType:{type:"ActionType",id:1},aPIVersion:{type:"string",id:3},chanceVersion:{type:"string",id:4},libVersion:{type:"string",id:5},packageVersion:{type:"string",id:6},slotServerVersion:{type:"string",id:7}},reserved:[[2,2]]}}}}}}}}};const V={ERROR:0,OK:1},J={SEND_LOCK:-3,CONNECT_TIMEOUT:-2,BUFFER_FULL:-1,ERROR:0,OK:1,LOGIN:3,ROOM:4,CONNECT:2};let x=!1,F=!0;function K(){if(a.state="未連線",t.isInGame&&globalThis.scene){Object.getOwnPropertyNames(globalThis.scene).forEach((e=>{let t=globalThis.scene[e];t&&t.game&&t.game.disconnect&&t.game.disconnect()}))}if(x)return;r[i.GAME_DIALOG_CUSTOM]&&(a.isError||s.setTimeout((()=>{a.isError||c({title:"errorLow",msg:"disconnect"})}),2))}function z(e){if(x)return;r[i.GAME_DIALOG_CUSTOM]&&s.setTimeout((()=>{a.isError||c({title:"errorLow",msg:`[agent onerror] ${e}`})}),.5)}function W(e){}function $(e,t){let a=J.OK;return e?(e.resultCode!==V.OK?(a=J.ERROR,t&&t.error&&t.error(e)):t&&t.handle&&t.handle(e),a):(a=J.ERROR,a)}function q(e){if(F&&(F=!1),e&&e.gid){let t=b()[e.gid];t&&t.recvGameData&&t.recvGameData(e.packet)}}function H(e){v.handle(e);let t=b();Object.getOwnPropertyNames(t).forEach((a=>{let n=t[a];if(n&&n.recvBroadcast){let t=JSON.stringify(e);n.recvBroadcast(t)}}))}let Q=null;async function X(e){await async function(e){let t=!1;const{getProject:a}=await import("./agent.69bdfbbf.js");let n=await a("lib/abcd",{mode:"blob"}),o=new Worker(n.blobURL);o.addEventListener("message",P),L=new T(o),e.root=n.root,e.pathname=n.pathname;try{await L.postMessage({type:R,config:e}),t=!0}catch(e){}return t}(e),Q=D}async function Y(e){let t={ontogame:q,onclose:K,onerror:z,onbroadcast:H,onmessage:W},n=a;n.state="連線中",await Q.connect(e,t),n.state="已連線"}async function Z(o){try{e.serviceBegin(m.report);let r=t,s=a;s.state="登入中";let i=await Q.login(o);return $(i)?(s.isLogin=!0,s.state="登入成功",globalThis.lobby.currentUser=i.userInfo,f&&y(),l&&d(),n.redraw(),e.serviceEnd(m.report),e.log({label:"net",category:"登入"}),r.isManual||p(),i):(s.state="登入失敗",void c({title:"errorLow",msg:"disconnect"}))}catch(e){}}async function ee(n){let r=u();try{e.serviceBegin(g.report);let s=a;s.state="進入遊戲";let i=await Q.ingame(n);if(!$(i))return s.state="進入遊戲失敗",void c({title:"errorLow",msg:"disconnect"});s.state="遊戲中",d(),y(),e.serviceEnd(g.report),e.log({label:"net",category:"進入遊戲"});let l=t;if(l.module){let e=o;if("p"===l.module[e.PROTOCOL]){let e={gid:i.gid,schema:U,checkName:"Game.Share.CheckAction",fields:[{name:"info",rootName:"Game.Share.Info",typeName:"ActionType",cmdList:["BaseResponse"]},{name:"jackpot",rootName:"Game.Share.Jackpot",typeName:"ActionType",cmdList:["BaseResponse"]},{name:"setting",rootName:"Game.Share.Setting",typeName:"ActionType",cmdList:["BaseResponse"]}]};await Q.register(e)}}let p={id:i.gid},u=r.scene[p.id];u&&u.localEvent&&(u.localEvent.enter(p),x=!0)}catch(e){}}async function te(e){try{let t=await Q.togame(e);return F&&(F=!1),t&&t.packet}catch(e){}}async function ae(e){return await Q.register(e)}export{V as RESULT,J as STATE,Y as connect,ee as ingame,X as init,Z as login,ae as register,te as togame};