let t=null,n={mpeg1:null,h264:null};async function e(){if(!t){const{getProject:n}=await import("./agent.9b975543.js").then((function(t){return t.m}));let e=await n("video/player",{version:"2.0.0"});t=e.lib}n.mpeg1||(n.mpeg1=t.mpeg1),n.h264||(n.h264=t.h264)}async function i(t){n.mpeg1&&await n.mpeg1.init(t),n.h264&&await n.h264.init(t)}export{e as getLib,i as init,n as player};
