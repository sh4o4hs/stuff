import{b as e,s as t,i as o}from"./agent.747503bc.js";import"mithril";import"localforage";let r="filename",i="blob";async function l(e,o){let l=globalThis.BASE_URL,n=null,a=null;if(!t.versionTimestamp){let e=new Date;t.versionTimestamp=e.getTime()}let s=t.versionTimestamp;o&&(o.mode&&(n=o.mode),o.version&&(a=o.version));let c=`${t.projectURL}${e}`;l&&l.length>0&&("/"===l[l.length-1]&&(l=l.substring(0,l.length-1)),c=c.replace(t.projectURL,"/"),c=`${l}${c}`);let p=null;if(p=a?await fetch(`${c}/v${a}.json`):await fetch(`${c}/index.json?v=${s}`),p&&p.ok){let e=await p.json(),t=null;if(t=e.isDebug?e.app:`${c}/${e.app.replace("./","")}`,t){if(n){if(n===r)return{root:l,filename:t,pathname:c};if(n===i){let e=await fetch(t);if(e&&e.ok){let t=await e.text(),o=new Blob([t]);return{root:l,blob:o,blobURL:globalThis.URL.createObjectURL(o),pathname:c}}return Promise.reject(new Error("getProject error"))}}return{root:l,lib:await import(t),pathname:c}}}return Promise.reject(new Error("getProject error"))}async function n(e){return new Promise(((t,o)=>{let r=document.createElement("script");r.type="text/javascript",r.src=e,r.onload=()=>{t()},r.onerror=()=>{o()},document.body.appendChild(r)}))}async function a(){let o,r="/dependence/";t.selectCDN&&(r=`${globalThis.BASE_URL}dependence/`),o=["socket.io/socket.io.min.2.4.0.js","createjs/tweenjs.min.1.0.2.js"];let i=[];for(let e=0;e<o.length;e++){let t=n(r+o[e]);i.push(t)}Promise.all(i);let l=await import("foot"),a=await import("pixi-spine");if(e.PIXI=l.PIXI,e.spine=a,e.Howl=l.Howl,e.Howler=l.Howler,e.IsMobile=l.IsMobile,e.Mustache=l.Mustache,e.decode=l.decode,!globalThis.PIXI){let t={};Object.defineProperty(t,"PIXI",{get:()=>e.PIXI}),globalThis.PIXI=t.PIXI}}export{l as getProject,a as load};
