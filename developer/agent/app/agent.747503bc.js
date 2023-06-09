import e from"mithril";import a from"localforage";let t={};const i={REAL:"real",DEMO:"demo"},l={OVERVIEW_LOGO:0,OVERVIEW_ANIMATION:1,OVERVIEW_BACKGROUND:2,OVERVIEW_PROGRESS:3,GAME_SCENE_CUSTOM:4,GAME_PERFORMANCE_FPS:5,GAME_DIALOG_CUSTOM:6,GAME_DEBUG_MODE:7},n={PROTOCOL:0,GAME_FORMAT:1},o=45e3;let s=!0,r=!0,g={info:{},isKickOut:!1,group:null,game:null,room:null,host:null,key:null,mode:null,namespace:"develop",currency:null,protocol:null,gameFormat:null,cdn:{errorCounts:0},ping:0},c=[];c[l.OVERVIEW_LOGO]=1,c[l.OVERVIEW_ANIMATION]=1,c[l.OVERVIEW_BACKGROUND]=1,c[l.OVERVIEW_PROGRESS]=0,c[l.GAME_SCENE_CUSTOM]=1,c[l.GAME_PERFORMANCE_FPS]=1,c[l.GAME_DEBUG_MODE]=1,c[l.GAME_DIALOG_CUSTOM]=1;let m={isCheckGameCDN:!1,setting:null,isFinish:!1,loadingEvent:null},u={useAvif:!1,res:null,currentURL:"",isReload:!1,hasCDN:!1,selectCDN:!1,cdnList:[],useCache:!1,hasCache:!1,isCheckGameCDN:!1,disableNet:!1,lobbyName:"",mobileMode:"0",projectURL:"/project/",systemjsURL:"",useOptions:!1,msg:"",ping:!1,isInGame:!1,commandTimeout:15,isManual:!1,launch:null,logo:"",agent:"bg",module:null,langID:"en-us",versionTimestamp:null,version:null},h={URLs:null,isLogin:!1,state:""};var b=Object.freeze({__proto__:null,GAME_MODE:i,MODULE:n,OPTIONS:l,TIME_OUT:45e3,account:h,displayLobby:true,get isDeveloper(){return s},options:c,resource:m,server:g,setting:u,useRelease:function(){s=!1}});let v={client:{eventList:[],errorList:[]}};let E=1;var T={getIP:async function(){try{if(!v.ip){let e=await fetch("//pro.ip-api.com/json?key=5SgCadGS9fH36ub");if(e&&e.ok){let a=await e.json();v.ip=a}}}catch(e){}return v.ip},statistic:v,error:function(e){e&&globalThis.gtag&&gtag("event",e.eventName||"錯誤",{event_category:e.category,event_label:e.label,value:e.value||-1,non_interaction:!0})},report:{name:"",currentURL:""},serviceBegin:function(e){e.time=Math.round(performance.now())},serviceEnd:function(e,a){a||(e.time=Math.round(performance.now())-e.time),globalThis.gtag&&gtag("event","timing_complete",{name:e.name||"後台服務",value:e.time,event_category:e.category,event_label:e.getLabel()});let t={name:e.name||"後台服務",label:e.getLabel(),category:e.category,value:e.time};v.client.eventList.push(t)},loadBegin:function(e){e.time=Math.round(performance.now())},loadEnd:function(e){e.time=Math.round(performance.now())-e.time,globalThis.gtag&&gtag("event","timing_complete",{name:e.name||"加載服務",value:e.time,event_category:e.category,event_label:e.getLabel()});let a={name:e.name||"加載服務",label:e.getLabel(),category:e.category,value:e.time};v.client.eventList.push(a)},log0:function(e){},log:function(e){e&&(globalThis.gtag&&gtag("event",e.eventName||"歷程",{event_category:e.category,event_label:`${e.label}`,value:e.value||-1,non_interaction:!0}),E+=1)}};importShim.getImportMap();globalThis.setLobbyName=e=>{u.lobbyName=e},globalThis.disableNetwork=()=>{u.disableNet=!0},globalThis.setLoadingEvent=e=>{m.loadingEvent=e},globalThis.setBaseURL=e=>{globalThis.BASE_URL=e};let p=!1;async function d(){function e(a){globalThis.setCheckGameEvent?(globalThis.setCheckGameEvent({getIP:T.getIP,setLoadingEvent:globalThis.setLoadingEvent,setBaseURL:globalThis.setBaseURL}),globalThis.parent.isCheckGameCDN&&(globalThis.disableNetwork(),globalThis.CDN_LIST=[]),a()):setTimeout((()=>{e(a)}),100)}if(globalThis.parent!==globalThis)return u.isCheckGameCDN=globalThis.parent.isCheckGameCDN,m.isCheckGameCDN=u.isCheckGameCDN,new Promise((a=>{globalThis.parent.isCheckGameCDN||globalThis.parent.isGameManager?e(a):a()}))}!async function(){let{start:i,checkCDN:l}=await import("./agent.7977501f.js");await i();let n=u;n.res&&("v1"===n.res?n.useAvif=!1:"v2"===n.res&&(n.useAvif=!0));let o="common";T.log({label:o,category:"啟動程式"});let r={category:"初始化 主網址",getLabel:()=>`${o}`};if(T.loadBegin(r),"check"===n.lobbyName)try{await d()}catch(e){}try{await async function(){let e=null;if(u.useCache){if(navigator.serviceWorker&&navigator.serviceWorker.register)return e=await navigator.serviceWorker.register("/lib.sw.js",{scope:"/"}),u.registration=e,u.hasCache=!0,e.addEventListener("updatefound",(function(){e.update();let a=e.installing;a.addEventListener("statechange",(()=>{"installed"===a.state&&globalThis.location.reload()}))})),navigator.serviceWorker.addEventListener("message",(e=>{})),new Promise((a=>{!function(){if(e&&e.active&&navigator.serviceWorker.controller){let e={};e.config={BASE_URL:globalThis.BASE_URL,CDN_LIST:globalThis.CDN_LIST},navigator.serviceWorker.controller.postMessage(e),a()}else a()}()}))}else navigator.serviceWorker&&navigator.serviceWorker.register&&(e=await navigator.serviceWorker.register("/lib.sw.js?v=2.0.0",{scope:"/"}),e&&e.unregister&&await e.unregister())}()}catch(e){}T.log({eventName:n.hasCache?"使用":"不使用",label:o,category:"確認快取功能"});let g=null,c=null;try{await a.setDriver(a.LOCALSTORAGE),c=a.createInstance({name:"mygames",storeName:"agent2"}),c&&(n.isCheckGameCDN||s||(g=await c.getItem("baseURL"))),n.store=c}catch(e){}if(g)globalThis.BASE_URL=g,T.report.currentURL=g,n.selectCDN=!0;else if(!n.hasCache)try{await l()}catch(e){}T.log({eventName:n.hasCDN?"使用":"不使用",label:o,category:"確認服務線路"});try{const{load:a}=await import("./agent.d47b8ed4.js");await a(),globalThis.Howl=t.Howl,globalThis.Howler=t.Howler,globalThis.Howler&&(globalThis.Howler.autoSuspend=!1),globalThis.isMobile=t.IsMobile(globalThis.navigator.userAgent);let i={PIXI:t.PIXI,spine:t.spine,Ticker:createjs.Ticker,Howl:t.Howl,m:e,io:globalThis.io},o=await import("nuts");await o.init(i);let s=o.ui.loading,r=async e=>{let a=await e.get(n.langID);n.images=a.images,a.images&&a.images.loading&&s.setScene(a.images.loading)};if(n.useAvif?import("./agent.cb2c854b.js").then((e=>{r(e)})):await import("./agent.7a4076d6.js").then((e=>{r(e)})),p)return;p=!0;let g=globalThis.createjs.Ticker;g.timingMode=g.TIMEOUT,(await import("./agent.4ec3d233.js").then((function(e){return e.m}))).run({checkCDN:l,element:document.body})}catch(e){}T.loadEnd(r),T.log({label:o,category:"初始化 主網址"})}();export{i as G,n as M,l as O,o as T,g as a,t as b,m as c,h as d,b as e,r as f,s as i,c as o,T as r,u as s};
