import{j as r,c as p,u as m,r as l}from"./index-CNDdAO7K.js";import{C as f}from"./CellExpanderFormatter-B0tnbCwL.js";import{D as x}from"./DataGrid-BJYEfcfS.js";const h="c7yetp1",w="c19u2cv5";function R({tabIndex:i,onDeleteSubRow:n,isDeleteSubRowEnabled:t}){function e(s){s.key==="Enter"&&(s.preventDefault(),n())}return r.jsxs(r.Fragment,{children:[r.jsx("div",{className:h}),t&&r.jsx("div",{className:w,onClick:n,children:r.jsx("span",{tabIndex:i,onKeyDown:e,children:"❌"})})]})}const S=p("/TreeView")({component:k}),g="g1smhpta";function j(){const i=[];for(let n=0;n<100;n++){const t=Math.random()*30,e=`row${n}`,s={id:e,name:`supplier ${n}`,format:`package ${n}`,position:"Run of site",price:t,children:[{id:`${e}-0`,parentId:e,name:`supplier ${n}`,format:"728x90",position:"run of site",price:t/2},{id:`${e}-1`,parentId:e,name:`supplier ${n}`,format:"480x600",position:"run of site",price:t*.25},{id:`${e}-2`,parentId:e,name:`supplier ${n}`,format:"328x70",position:"run of site",price:t*.25}],isExpanded:!1};i.push(s)}return i}function y(i,n){const t=i.findIndex(o=>o.id===n),e=i[t],{children:s}=e;if(!s)return i;const c=[...i];return c[t]={...e,isExpanded:!e.isExpanded},e.isExpanded?c.splice(t+1,s.length):c.splice(t+1,0,...s),c}function C(i,n){const t=i.find(o=>o.id===n);if(t?.parentId===void 0)return i;const e=i.filter(o=>o.id!==n),s=e.findIndex(o=>o.id===t.parentId),{children:c}=e[s];if(c){const o=c.filter(a=>a.id!==n);e[s]={...e[s],children:o}}return e}function D(i,{type:n,id:t}){switch(n){case"toggleSubRow":return y(i,t);case"deleteSubRow":return C(i,t);default:return i}}const E=j();function k(){const i=m(),[n,t]=l.useReducer(D,E),[e,s]=l.useState(!0),c=l.useMemo(()=>[{key:"id",name:"id",frozen:!0},{key:"name",name:"Name"},{key:"format",name:"format",renderCell({row:o,tabIndex:a}){const d=o.children!==void 0,u=d?void 0:{marginInlineStart:30};return r.jsxs("div",{className:"coi612c",children:[d&&r.jsx(f,{tabIndex:a,expanded:o.isExpanded===!0,onCellExpand:()=>t({id:o.id,type:"toggleSubRow"})}),!d&&r.jsx(R,{tabIndex:a,isDeleteSubRowEnabled:e,onDeleteSubRow:()=>t({id:o.id,type:"deleteSubRow"})}),r.jsx("div",{style:u,children:o.format})]})}},{key:"position",name:"position"},{key:"price",name:"price"}],[e]);return r.jsxs(r.Fragment,{children:[r.jsxs("label",{children:["Allow Delete",r.jsx("input",{type:"checkbox",checked:e,onChange:()=>s(!e)})]}),r.jsx(x,{columns:c,rows:n,className:g,direction:i})]})}export{S as Route};
//# sourceMappingURL=TreeView.lazy-BQQuWHbb.js.map