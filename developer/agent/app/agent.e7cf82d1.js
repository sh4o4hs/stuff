import*as e from"nuts";import{r as a}from"./agent.747503bc.js";import"mithril";import"localforage";async function t(e,t){let l=e;if(!Array.isArray(l))return Promise.reject("channels is not array");let o=l.length;for(let e=0;e<o;e+=1){let o=l[e];if(!o||!o.id||!Array.isArray(o.tables))continue;let n=o.tables,i=[];o.results=i;for(let e=0;e<n.length;e+=1){let l=n[e];i[e]={value:0,delay:9999};let s=`${t.getLabel()}`,c=`${t.name} 頻道:${o.id} 桌號:${e+1} ${l}`,y=await r(l,s,c,t.category);i[e]=y,a.log0({eventName:c,label:s,value:y.value,category:`${t.category} 容量`},!0),a.log0({eventName:c,label:s,value:y.delay,category:`${t.category} 延時`},!0)}}return e}async function r(t,r,l,o){return new Promise((n=>{let i=!1,s={value:0,delay:9999},c=!1,y={name:l,category:o,getLabel:()=>r};a.serviceBegin(y);let g=new WebSocket(t);g.binaryType="arraybuffer",g.onopen=()=>{e.updateManager.setTimeout((()=>{i||(i=!0,g.close(),n(s))}),5)},g.onclose=()=>{i=!0},g.onerror=()=>{i=!0,n(s)},g.onmessage=t=>{const r=new Uint8Array(t.data);s.value+=r.length,c||(c=!0,y.category=`${o} 延時`,a.serviceEnd(y),s.delay=y.time,e.updateManager.setTimeout((()=>{i||(i=!0,g.close(),y.category=`${o} 容量`,y.time=s.value,a.serviceEnd(y,!0),n(s))}),.2))}}))}export{t as scan,r as test};
