let t={EN:"en",JA_JP:"ja-jp",TH_TH:"th-th",VI_VN:"vi-vn",EN_US:"en-us",ZH_TW:"zh-tw",ZH_CN:"zh-cn",IT_IT:"it-it"},e={"en-us":"en-us","en-US":"en-us","ja-jp":"ja-jp","ja-JP":"ja-jp","zh-tw":"zh-tw","zh-TW":"zh-tw","th-th":"th-th","th-TH":"th-th","vi-vn":"vi-vn","vi-VN":"vi-vn","zh-cn":"zh-cn","zh-CN":"zh-cn",it:"it-it","it-IT":"it-it","it-it":"it-it",en:"en-us"},n=null,s=t.EN_US;function a(t){let e;return n&&(e=n.get(t)),e}async function i(a){s=e[a],s||(s=t.EN_US),n=await function(t){switch(t){case"./locales/en-us.js":return import("./agent.37eb1a1a.js");case"./locales/it-it.js":return import("./agent.f2a295ab.js");case"./locales/ja-jp.js":return import("./agent.942754dd.js");case"./locales/th-th.js":return import("./agent.079f2e74.js");case"./locales/vi-vn.js":return import("./agent.55b92804.js");case"./locales/zh-cn.js":return import("./agent.19b6ae44.js");case"./locales/zh-tw.js":return import("./agent.fb12c477.js");default:return new Promise((function(e,n){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+t)))}))}}(`./locales/${s}.js`)}function r(){return s}export{t as I,r as a,a as g,e as i,i as s};
