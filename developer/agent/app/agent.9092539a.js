import{s as A,a as e,G as a,o as l,M as o}from"./agent.95d98b24.js";import{i as t,s as n}from"./agent.88ba4f34.js";import"mithril";async function s(){let s,g=e,i=A,r=a,m=globalThis.location.search.substring(1),h=null,u={module:A=>i.module=A,lang:A=>i.langID=A,launch:A=>i.launch=A,res:A=>i.res=A,logo:A=>{A.indexOf("//")>=0?i.logo=A:i.logo="data/img/"+A},agent:A=>{"megahot"===A?i.agent="bg":"jigtp"===A?i.agent="tp":"gatest"===A?i.agent="bg":"aekvnd01"===A?i.agent="ae":"kingco"===A?i.agent="kc":"wnd"===A&&(i.agent="wd")},hostname:A=>g.host=A,key:A=>g.key=A,group:A=>g.group=A,game:A=>g.game=A,room:A=>g.room=A,currency:A=>g.currency=A,mode:A=>g.mode=A,namespace:A=>g.namespace=A,tablekey:A=>g.tablekey=A,menu:A=>i.menu=A,options:A=>h=A,lobbyName:A=>i.lobbyName=A,mobileMode:A=>i.mobileMode=A,ping:()=>i.ping=!0,version:A=>i.version=A};if(s=m.split("&",25),s.forEach((A=>{let e=A.split("=",2),a=u[e[0]];a&&a(e[1])})),i.launch&&i.launch.length>0&&(g.game=i.launch),i.menu&&i.menu.length>0){let A=[];for(let e=0;e<i.menu.length;e+=1)A[e]=parseInt(i.menu[e]);i.menu=A}let c=l;if(h&&h.length>0){i.useOptions=!0;for(let A=0;A<h.length;A+=1)c[A]=parseInt(h[A])}g.host&&0===g.host.length&&(g.host=null),g.host||(g.host=globalThis.location.hostname+":"+globalThis.location.port),g.key||(g.key="a1"),(!g.mode||g.mode.length<=1)&&(g.mode=r.REAL);let b=g.info;if(b.token=g.key,g.tablekey&&(b.tablekey=g.tablekey),i.langID=t[i.langID],i.langID||(i.langID="en-us"),n(i.langID),i.module)if(0===i.module.length)i.module=null;else{let A=o,e=i.module[A.PROTOCOL];"p"===e?g.protocol="protobuf":"a"===e&&(g.protocol="avro"),e=i.module[A.GAME_FORMAT],g.gameFormat="gti","g"===e?g.gameFormat="gti":"v"===e&&(g.gameFormat="video")}return new Promise((e=>{A.useAvif=!1;let a=new Image;a.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",a.onload=()=>{A.useAvif=!0,e()},a.onerror=()=>{e()}}))}async function g(){if(globalThis.BASE_URL)return new Promise((e=>{let a=!1;A.cdnList=[],A.hasCDN=!1,A.selectCDN=!1;let l=[];if(Array.isArray(globalThis.DISABLE_AUTO_CDN))l=globalThis.DISABLE_AUTO_CDN;else if(globalThis.DISABLE_AUTO_CDN)return;let o=globalThis.BASE_URL.indexOf("/",9),t=globalThis.BASE_URL.substring(o+1);function n(e){A.cdnList.push(e),A.hasCDN||(A.hasCDN=!0)}setTimeout((function(){e(),a=!0}),500),function(){let o=[];globalThis.CDN_LIST&&Array.isArray(globalThis.CDN_LIST)&&globalThis.CDN_LIST.forEach((e=>{if(e&&e.url){let a=e.url;a.lastIndexOf(".jpg")<0&&(e.target=`${a}${t}`,e.url=`${a}webedit/it.jpg`),A.isReload?e.target!==globalThis.BASE_URL&&o.push(e):o.push(e)}})),0===o.length&&(o=[]);let s=0,g=0,i=0;o.forEach(((o,t)=>{if(l[t])return;let r=Math.round(performance.now()),m=o.url;s+=1,fetch(m,{credentials:"omit"}).then((A=>A.ok?A.arrayBuffer():null)).then((l=>{if(!a)if(l){if(r=Math.round(performance.now()-r),i>=8)return void e();A.isReload?o.target!==globalThis.BASE_URL&&(n(o),i+=1):(n(o),i+=1),g+=1,g>=s&&e()}else g+=1,g>=s&&e()})).catch((A=>{g+=1,g>=s&&e()}))})),0===s&&e()}()}))}export{g as checkCDN,s as start};
