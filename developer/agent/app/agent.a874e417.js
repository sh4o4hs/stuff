import{r as e,u as a}from"./agent.76117ec0.js";async function t(a,t){let l=a;if(!Array.isArray(l))return Promise.reject("channels is not array");let n=l.length;for(let a=0;a<n;a+=1){let n=l[a];if(!n||!n.id||!Array.isArray(n.tables))continue;let o=n.tables,s=[];n.results=s;for(let a=0;a<o.length;a+=1){let l=o[a];s[a]={value:0,delay:9999};let c=`${t.getLabel()}`,i=`${t.name} 頻道:${n.id} 桌號:${a+1} ${l}`,y=await r(l,c,i,t.category);s[a]=y,e.log0({eventName:i,label:c,value:y.value,category:`${t.category} 容量`},!0),e.log0({eventName:i,label:c,value:y.delay,category:`${t.category} 延時`},!0)}}return a}async function r(t,r,l,n){return new Promise((o=>{let s=!1,c={value:0,delay:9999},i=!1,y={name:l,category:n,getLabel:()=>r};e.serviceBegin(y);let g=new WebSocket(t);g.binaryType="arraybuffer",g.onopen=()=>{a.setTimeout((()=>{s||(s=!0,g.close(),o(c))}),5)},g.onclose=()=>{s=!0},g.onerror=()=>{s=!0,o(c)},g.onmessage=t=>{const r=new Uint8Array(t.data);c.value+=r.length,i||(i=!0,y.category=`${n} 延時`,e.serviceEnd(y),c.delay=y.time,a.setTimeout((()=>{s||(s=!0,g.close(),y.category=`${n} 容量`,y.time=c.value,e.serviceEnd(y,!0),o(c))}),.2))}}))}export{t as scan,r as test};