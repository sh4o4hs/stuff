import{m as e,r as t,e as o,s as r}from"./agent.d38c4a69.js";import{g as l,i as a,k as s,b as i}from"./agent.2710fc78.js";let n={handle(s){globalThis.lobby.currentUser=s.userInfo;let i=o,g=r;i.isLogin=!0,i.state="已登入",l(),e.redraw(),t.serviceEnd(n.report),t.log({label:"net",category:"登入"}),g.isManual||a()},report:{time:0,category:"登入",getLabel:()=>"net"},error:s.fatal},g={handle(e){o.isError=!0,globalThis.Howler&&(globalThis.Howler.mute(!0),globalThis.Howler.unload());let t="errorLow";"this account log in elsewhere"===e.text&&(t="elsewhere"),"errorLow"!==t&&i({title:"errorLow",msg:t})}},c={handle(e){o.isError=!0,globalThis.Howler&&(globalThis.Howler.mute(!0),globalThis.Howler.unload());let t="kickOut";"idle too long time"===e.text?t="kickOut":"System kickout"===e.text&&(t="systemKickOut"),i({title:"notice",msg:t})}};const h="kickOut",b="updateBalance",u="disconnectMsg";let d={handle(e){let t=e;if("string"==typeof e&&(t=JSON.parse(e)),t&&t.proto&&t.json){let e=JSON.parse(t.json);switch(t.proto){case b:break;case u:g.handle(e);break;case h:c.handle(e)}}}};export{n as C,d as a};
