import{s as A,a as e,G as a,o as l,M as o}from"./agent.095566fb.js";import{i as t,s as n}from"./agent.ba1e6c3f.js";async function s(){let s,g=e,r=A,i=a,h=globalThis.location.search.substring(1),m=null,u={module:A=>r.module=A,lang:A=>r.langID=A,launch:A=>r.launch=A,res:A=>r.res=A,logo:A=>{A.indexOf("//")>=0?r.logo=A:r.logo="data/img/"+A},agent:A=>{"megahot"===A?r.agent="bg":"jigtp"===A?r.agent="tp":"gatest"===A?r.agent="bg":"aekvnd01"===A?r.agent="ae":"kingco"===A?r.agent="kc":"wnd"===A&&(r.agent="wd")},hostname:A=>g.host=A,key:A=>g.key=A,group:A=>g.group=A,game:A=>g.game=A,room:A=>g.room=A,currency:A=>g.currency=A,mode:A=>g.mode=A,namespace:A=>g.namespace=A,tablekey:A=>g.tablekey=A,menu:A=>r.menu=A,options:A=>m=A,lobbyName:A=>r.lobbyName=A,mobileMode:A=>r.mobileMode=A,ping:()=>r.ping=!0,version:A=>r.version=A};if(s=h.split("&",25),s.forEach((A=>{let e=A.split("=",2),a=u[e[0]];a&&a(e[1])})),r.launch&&r.launch.length>0&&(g.game=r.launch),r.menu&&r.menu.length>0){let A=[];for(let e=0;e<r.menu.length;e+=1)A[e]=parseInt(r.menu[e]);r.menu=A}let c=l;if(m&&m.length>0){r.useOptions=!0;for(let A=0;A<m.length;A+=1)c[A]=parseInt(m[A])}g.host&&0===g.host.length&&(g.host=null),g.host||(g.host=globalThis.location.hostname+":"+globalThis.location.port),g.key||(g.key="a1"),(!g.mode||g.mode.length<=1)&&(g.mode=i.REAL);let b=g.info;if(b.token=g.key,g.tablekey&&(b.tablekey=g.tablekey),r.langID=t[r.langID],r.langID||(r.langID="en-us"),n(r.langID),r.module)if(0===r.module.length)r.module=null;else{let A=o,e=r.module[A.PROTOCOL];"p"===e?g.protocol="protobuf":"a"===e&&(g.protocol="avro"),e=r.module[A.GAME_FORMAT],g.gameFormat="gti","g"===e?g.gameFormat="gti":"v"===e&&(g.gameFormat="video")}return new Promise((e=>{A.useAvif=!1;let a=new Image;a.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",a.onload=()=>{A.useAvif=!0,e()},a.onerror=()=>{e()}}))}async function g(){if(globalThis.BASE_URL)return new Promise((e=>{let a=!1;A.cdnList=[],A.hasCDN=!1,A.selectCDN=!1;let l=[];if(Array.isArray(globalThis.DISABLE_AUTO_CDN))l=globalThis.DISABLE_AUTO_CDN;else if(globalThis.DISABLE_AUTO_CDN)return;let o=globalThis.BASE_URL.indexOf("/",9),t=globalThis.BASE_URL.substring(o+1);function n(e){A.cdnList.push(e),A.hasCDN||(A.hasCDN=!0)}setTimeout((function(){e(),a=!0}),500),function(){let o=[];globalThis.CDN_LIST&&Array.isArray(globalThis.CDN_LIST)&&globalThis.CDN_LIST.forEach((e=>{if(e&&e.url){let a=e.url;a.lastIndexOf(".jpg")<0&&(e.target=`${a}${t}`,e.url=`${a}webedit/it.jpg`),A.isReload?e.target!==globalThis.BASE_URL&&o.push(e):o.push(e)}})),0===o.length&&(o=[]);let s=0,g=0,r=0;o.forEach(((o,t)=>{if(l[t])return;let i=Math.round(performance.now()),h=o.url;s+=1,fetch(h,{credentials:"omit"}).then((A=>A.ok?A.arrayBuffer():null)).then((l=>{if(!a)if(l){if(i=Math.round(performance.now()-i),r>=8)return void e();A.isReload?o.target!==globalThis.BASE_URL&&(n(o),r+=1):(n(o),r+=1),g+=1,g>=s&&e()}else g+=1,g>=s&&e()})).catch((A=>{g+=1,g>=s&&e()}))})),0===s&&e()}()}))}export{g as checkCDN,s as start};
