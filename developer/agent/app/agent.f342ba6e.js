import{i as A,s as e,a,b as l,c as o,G as t,o as n,M as s}from"./agent.1daeec9a.js";import"mithril";import"localforage";import"nuts";async function g(){let g,r=o,i=a,h=t,m=globalThis.location.search.substring(1),u=null,c={module:A=>i.module=A,lang:A=>i.langID=A,launch:A=>i.launch=A,res:A=>i.res=A,loading:A=>i.logo=A,agent:A=>{"megahot"===A?i.agent="bg":"jigtp"===A?i.agent="tp":"gatest"===A?i.agent="bg":"aekvnd01"===A?i.agent="ae":"kingco"===A?i.agent="kc":"wnd"===A&&(i.agent="wd")},hostname:A=>r.host=A,key:A=>r.key=A,group:A=>r.group=A,game:A=>r.game=A,room:A=>r.room=A,currency:A=>r.currency=A,mode:A=>r.mode=A,namespace:A=>r.namespace=A,tablekey:A=>r.tablekey=A,menu:A=>i.menu=A,options:A=>u=A,lobbyName:A=>i.lobbyName=A,mobileMode:A=>i.mobileMode=A,ping:()=>i.ping=!0,version:A=>i.version=A};if(g=m.split("&",25),g.forEach((A=>{let e=A.split("=",2),a=c[e[0]];a&&a(e[1])})),i.launch&&i.launch.length>0&&(r.game=i.launch),i.menu&&i.menu.length>0){let A=[];for(let e=0;e<i.menu.length;e+=1)A[e]=parseInt(i.menu[e]);i.menu=A}let b=n;if(u&&u.length>0){i.useOptions=!0;for(let A=0;A<u.length;A+=1)b[A]=parseInt(u[A])}r.host&&0===r.host.length&&(r.host=null),r.host||(r.host=globalThis.location.hostname+":"+globalThis.location.port),l&&(r.key||(r.key="a1")),(!r.mode||r.mode.length<=1)&&(r.mode=h.REAL);let f=r.info;if(f.token=r.key,r.tablekey&&(f.tablekey=r.tablekey),i.langID=A[i.langID],i.langID||(i.langID="en-us"),e(i.langID),i.module)if(0===i.module.length)i.module=null;else{let A=s,e=i.module[A.PROTOCOL];"p"===e?r.protocol="protobuf":"a"===e&&(r.protocol="avro"),e=i.module[A.GAME_FORMAT],r.gameFormat="gti","g"===e?r.gameFormat="gti":"v"===e&&(r.gameFormat="video")}return new Promise((A=>{a.useAvif=!1;let e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",e.onload=()=>{a.useAvif=!0,A()},e.onerror=()=>{A()}}))}async function r(){if(globalThis.BASE_URL)return new Promise((A=>{let e=!1;a.cdnList=[],a.hasCDN=!1,a.selectCDN=!1;let l=[];if(Array.isArray(globalThis.DISABLE_AUTO_CDN))l=globalThis.DISABLE_AUTO_CDN;else if(globalThis.DISABLE_AUTO_CDN)return;let o=globalThis.BASE_URL.indexOf("/",9),t=globalThis.BASE_URL.substring(o+1);function n(A){a.cdnList.push(A),a.hasCDN||(a.hasCDN=!0)}setTimeout((function(){A(),e=!0}),500),function(){let o=[];globalThis.CDN_LIST&&Array.isArray(globalThis.CDN_LIST)&&globalThis.CDN_LIST.forEach((A=>{if(A&&A.url){let e=A.url;e.lastIndexOf(".jpg")<0&&(A.target=`${e}${t}`,A.url=`${e}webedit/it.jpg`),a.isReload?A.target!==globalThis.BASE_URL&&o.push(A):o.push(A)}})),0===o.length&&(o=[]);let s=0,g=0,r=0;o.forEach(((o,t)=>{if(l[t])return;let i=Math.round(performance.now()),h=o.url;s+=1,fetch(h,{credentials:"omit"}).then((A=>A.ok?A.arrayBuffer():null)).then((l=>{if(!e)if(l){if(i=Math.round(performance.now()-i),r>=8)return void A();a.isReload?o.target!==globalThis.BASE_URL&&(n(o),r+=1):(n(o),r+=1),g+=1,g>=s&&A()}else g+=1,g>=s&&A()})).catch((e=>{g+=1,g>=s&&A()}))})),0===s&&A()}()}))}export{r as checkCDN,g as start};