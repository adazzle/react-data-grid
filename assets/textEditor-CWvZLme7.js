import{j as o}from"./index-P3rv_nSE.js";const r="t7vyx3i",u=`rdg-text-editor ${r}`;function i(t){t?.focus(),t?.select()}function x({row:t,column:e,onRowChange:s,onClose:a}){return o.jsx("input",{className:u,ref:i,value:t[e.key],onChange:n=>s({...t,[e.key]:n.target.value}),onBlur:()=>a(!0,!1)})}export{u as a,x as t};
//# sourceMappingURL=textEditor-CWvZLme7.js.map
