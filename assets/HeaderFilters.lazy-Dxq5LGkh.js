import{c as f,r as d,u as w,j as e,f as k}from"./index-P3rv_nSE.js";import{D as A}from"./DataGrid-Ds4rVw-T.js";const R=f("/HeaderFilters")({component:T}),b="rckh0cr",M="t1lcad4q",c="filter-cell",N="f1xzrdid",u="fa8n3ec",v=d.createContext(void 0);function m(o){["ArrowLeft","ArrowRight"].includes(o.key)&&o.stopPropagation()}function h(o){["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(o.key)&&o.stopPropagation()}function T(){const o=w(),[s]=d.useState(F),[l,i]=d.useState(()=>({task:"",priority:"Critical",issueType:"All",developer:"",complete:void 0,enabled:!0})),y=d.useMemo(()=>Array.from(new Set(s.map(r=>r.developer))).map(r=>({label:r,value:r})),[s]),C=d.useMemo(()=>[{key:"id",name:"ID",width:50},{key:"task",name:"Title",headerCellClass:c,renderHeaderCell:r=>e.jsx(p,{...r,children:({filters:t,...a})=>e.jsx("input",{...a,className:u,value:t.task,onChange:n=>i({...t,task:n.target.value}),onKeyDown:m})})},{key:"priority",name:"Priority",headerCellClass:c,renderHeaderCell:r=>e.jsx(p,{...r,children:({filters:t,...a})=>e.jsxs("select",{...a,className:u,value:t.priority,onChange:n=>i({...t,priority:n.target.value}),onKeyDown:h,children:[e.jsx("option",{value:"All",children:"All"}),e.jsx("option",{value:"Critical",children:"Critical"}),e.jsx("option",{value:"High",children:"High"}),e.jsx("option",{value:"Medium",children:"Medium"}),e.jsx("option",{value:"Low",children:"Low"})]})})},{key:"issueType",name:"Issue Type",headerCellClass:c,renderHeaderCell:r=>e.jsx(p,{...r,children:({filters:t,...a})=>e.jsxs("select",{...a,className:u,value:t.issueType,onChange:n=>i({...t,issueType:n.target.value}),onKeyDown:h,children:[e.jsx("option",{value:"All",children:"All"}),e.jsx("option",{value:"Bug",children:"Bug"}),e.jsx("option",{value:"Improvement",children:"Improvement"}),e.jsx("option",{value:"Epic",children:"Epic"}),e.jsx("option",{value:"Story",children:"Story"})]})})},{key:"developer",name:"Developer",headerCellClass:c,renderHeaderCell:r=>e.jsx(p,{...r,children:({filters:t,...a})=>e.jsx("input",{...a,className:u,value:t.developer,onChange:n=>i({...t,developer:n.target.value}),onKeyDown:m,list:"developers"})})},{key:"complete",name:"% Complete",headerCellClass:c,renderHeaderCell:r=>e.jsx(p,{...r,children:({filters:t,...a})=>e.jsx("input",{...a,type:"number",className:u,value:t.complete,onChange:n=>i({...t,complete:Number.isFinite(n.target.valueAsNumber)?n.target.valueAsNumber:void 0}),onKeyDown:m})})}],[]),x=d.useMemo(()=>s.filter(r=>(l.task?r.task.includes(l.task):!0)&&(l.priority!=="All"?r.priority===l.priority:!0)&&(l.issueType!=="All"?r.issueType===l.issueType:!0)&&(l.developer?r.developer.toLowerCase().startsWith(l.developer.toLowerCase()):!0)&&(l.complete!==void 0?r.complete>=l.complete:!0)),[s,l]);function j(){i({task:"",priority:"All",issueType:"All",developer:"",complete:void 0,enabled:!0})}function g(){i(r=>({...r,enabled:!r.enabled}))}return e.jsxs("div",{className:b,children:[e.jsxs("div",{className:M,children:[e.jsx("button",{type:"button",onClick:g,children:"Toggle Filters"})," ",e.jsx("button",{type:"button",onClick:j,children:"Clear Filters"})]}),e.jsx(v.Provider,{value:l,children:e.jsx(A,{className:l.enabled?N:void 0,columns:C,rows:x,headerRowHeight:l.enabled?70:void 0,direction:o})}),e.jsx("datalist",{id:"developers",children:y.map(({label:r,value:t})=>e.jsx("option",{value:t,children:r},t))})]})}function p({tabIndex:o,column:s,children:l}){const i=d.useContext(v);return e.jsxs(e.Fragment,{children:[e.jsx("div",{children:s.name}),i.enabled&&e.jsx("div",{children:l({tabIndex:o,filters:i})})]})}function F(){const o=[];for(let s=1;s<500;s++)o.push({id:s,task:`Task ${s}`,complete:Math.min(100,Math.round(Math.random()*110)),priority:["Critical","High","Medium","Low"][Math.floor(Math.random()*4)],issueType:["Bug","Improvement","Epic","Story"][Math.floor(Math.random()*4)],developer:k.person.fullName()});return o}export{R as Route};
//# sourceMappingURL=HeaderFilters.lazy-Dxq5LGkh.js.map
