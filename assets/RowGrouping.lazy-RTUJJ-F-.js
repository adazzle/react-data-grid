import{j as p,r as g,c as de,u as ce,f as I}from"./index-CNDdAO7K.js";import{u as ue,g as ae,a as fe,S as F,b as pe,c as ge,r as he,d as xe,e as me,f as ye,h as Re,i as Ce,j as J,D as Se,k as ke,l as Ge}from"./DataGrid-BJYEfcfS.js";const be="g1s9ylgp",we=`rdg-group-cell-content ${be}`,ve="cz54e4y",je=`rdg-caret ${ve}`;function De(s){return p.jsx(Ie,{...s})}function Ie({groupKey:s,isExpanded:t,tabIndex:i,toggleGroup:c}){function h({key:x}){x==="Enter"&&c()}const u=t?"M1 1 L 7 7 L 13 1":"M1 7 L 7 1 L 13 7";return p.jsxs("span",{className:we,tabIndex:i,onKeyDown:h,children:[s,p.jsx("svg",{viewBox:"0 0 14 8",width:"14",height:"8",className:je,"aria-hidden":!0,children:p.jsx("path",{d:u})})]})}function Ee({id:s,groupKey:t,childRows:i,isExpanded:c,isCellSelected:h,column:u,row:x,groupColumnIndex:k,isGroupByColumn:G,toggleGroup:d}){const{tabIndex:b,childTabIndex:R,onFocus:w}=ue(h);function m(){d(s)}const j=G&&k===u.idx;return p.jsx("div",{role:"gridcell","aria-colindex":u.idx+1,"aria-selected":h,tabIndex:b,className:ae(u),style:{...fe(u),cursor:j?"pointer":"default"},onClick:j?m:void 0,onFocus:w,children:(!G||j)&&u.renderGroupCell?.({groupKey:t,childRows:i,column:u,row:x,isExpanded:c,tabIndex:R,toggleGroup:m})},u.key)}const Ae=g.memo(Ee),Oe="g1yxluv3",Te=`rdg-group-row ${Oe}`;function ze({className:s,row:t,rowIdx:i,viewportColumns:c,selectedCellIdx:h,isRowSelected:u,selectCell:x,gridRowStart:k,groupBy:G,toggleGroup:d,isRowSelectionDisabled:b,...R}){const w=c[0].key===F?t.level+1:t.level;function m(){x({rowIdx:i,idx:-1})}const j=g.useMemo(()=>({isRowSelectionDisabled:!1,isRowSelected:u}),[u]);return p.jsx(pe,{value:j,children:p.jsx("div",{role:"row","aria-level":t.level+1,"aria-setsize":t.setSize,"aria-posinset":t.posInSet+1,"aria-expanded":t.isExpanded,className:ge(he,Te,`rdg-row-${i%2===0?"even":"odd"}`,h===-1&&xe,s),onClick:m,style:me(k),...R,children:c.map(E=>p.jsx(Ae,{id:t.id,groupKey:t.groupKey,childRows:t.childRows,isExpanded:t.isExpanded,isCellSelected:h===E.idx,column:E,row:t,groupColumnIndex:w,toggleGroup:d,isGroupByColumn:G.includes(E.key)},E.key))})})}const Le=g.memo(ze);function Me({columns:s,rows:t,rowHeight:i,rowKeyGetter:c,onCellKeyDown:h,onRowsChange:u,selectedRows:x,onSelectedRowsChange:k,renderers:G,groupBy:d,rowGrouper:b,expandedGroupIds:R,onExpandedGroupIdsChange:w,...m},j){const E=ye(),X=G?.renderRow??E?.renderRow??Re,U=1+(m.topSummaryRows?.length??0),P=m.direction==="rtl",V=P?"ArrowRight":"ArrowLeft",Z=P?"ArrowLeft":"ArrowRight",H=Ce(q),{columns:K,groupBy:z}=g.useMemo(()=>{const n=[...s].sort(({key:r},{key:o})=>r===F?-1:o===F?1:d.includes(r)?d.includes(o)?d.indexOf(r)-d.indexOf(o):-1:d.includes(o)?1:0),e=[];for(const[r,o]of n.entries())d.includes(o.key)&&(e.push(o.key),n[r]={...o,frozen:!0,renderCell:()=>null,renderGroupCell:o.renderGroupCell??De,editable:!1});return{columns:n,groupBy:e}},[s,d]),[W,ee]=g.useMemo(()=>{if(z.length===0)return[void 0,t.length];const n=(e,[r,...o],l)=>{let f=0;const a={};for(const[S,v]of Object.entries(b(e,r))){const[O,D]=o.length===0?[v,v.length]:n(v,o,l+f+1);a[S]={childRows:v,childGroups:O,startRowIndex:l+f},f+=D+1}return[a,f]};return n(t,z,0)},[z,b,t]),[C,y]=g.useMemo(()=>{const n=new Set;if(!W)return[t,o];const e=[],r=(l,f,a)=>{if(Ne(l)){e.push(...l);return}Object.keys(l).forEach((S,v,O)=>{const D=f!==void 0?`${f}__${S}`:S,M=R.has(D),{childRows:T,childGroups:N,startRowIndex:$}=l[S],A={id:D,parentId:f,groupKey:S,isExpanded:M,childRows:T,level:a,posInSet:v,startRowIndex:$,setSize:O.length};e.push(A),n.add(A),M&&r(N,D,a+1)})};return r(W,void 0,0),[e,o];function o(l){return n.has(l)}},[R,W,t]),ne=g.useMemo(()=>typeof i=="function"?n=>y(n)?i({type:"GROUP",row:n}):i({type:"ROW",row:n}):i,[y,i]),L=g.useCallback(n=>{const e=C.indexOf(n);for(let r=e-1;r>=0;r--){const o=C[r];if(y(o)&&(!y(n)||n.parentId===o.id))return[o,r]}},[y,C]),Y=g.useCallback(n=>{if(y(n))return n.id;if(typeof c=="function")return c(n);const e=L(n);if(e!==void 0){const{startRowIndex:r,childRows:o}=e[0],l=o.indexOf(n);return r+l+1}return C.indexOf(n)},[L,y,c,C]),_=g.useMemo(()=>{if(x==null)return null;J(c);const n=new Set(x);for(const e of C)y(e)&&e.childRows.every(o=>x.has(c(o)))&&n.add(e.id);return n},[y,c,x,C]);function te(n){if(!k)return;J(c);const e=new Set(x);for(const r of C){const o=Y(r);if(_?.has(o)&&!n.has(o))if(y(r))for(const l of r.childRows)e.delete(c(l));else e.delete(o);else if(!_?.has(o)&&n.has(o))if(y(r))for(const l of r.childRows)e.add(c(l));else e.add(o)}k(e)}function oe(n,e){if(h?.(n,e),e.isGridDefaultPrevented()||n.mode==="EDIT")return;const{column:r,rowIdx:o,selectCell:l}=n,f=r?.idx??-1,a=C[o];if(y(a)){if(f===-1&&(e.key===V&&a.isExpanded||e.key===Z&&!a.isExpanded)&&(e.preventDefault(),e.preventGridDefault(),q(a.id)),f===-1&&e.key===V&&!a.isExpanded&&a.level!==0){const S=L(a);S!==void 0&&(e.preventGridDefault(),l({idx:f,rowIdx:S[1]}))}ke(e)&&(e.keyCode===67||e.keyCode===86)&&e.preventGridDefault()}}function se(n,{indexes:e,column:r}){if(!u)return;const o=[...t],l=[];for(const f of e){const a=t.indexOf(C[f]);o[a]=n[f],l.push(a)}u(o,{indexes:l,column:r})}function q(n){const e=new Set(R);e.has(n)?e.delete(n):e.add(n),w(e)}function re(n,{row:e,rowClass:r,onCellClick:o,onCellDoubleClick:l,onCellContextMenu:f,onRowChange:a,lastFrozenColumnIndex:S,copiedCellIdx:v,draggedOverCellIdx:O,setDraggedOverRowIdx:D,selectedCellEditor:M,...T}){if(y(e)){const{startRowIndex:A}=e;return p.jsx(Le,{...T,"aria-rowindex":U+A+1,row:e,groupBy:z,toggleGroup:H},n)}let N=T["aria-rowindex"];const $=L(e);if($!==void 0){const{startRowIndex:A,childRows:ie}=$[0],le=ie.indexOf(e);N=A+U+le+2}return X(n,{...T,"aria-rowindex":N,row:e,rowClass:r,onCellClick:o,onCellDoubleClick:l,onCellContextMenu:f,onRowChange:a,lastFrozenColumnIndex:S,copiedCellIdx:v,draggedOverCellIdx:O,setDraggedOverRowIdx:D,selectedCellEditor:M})}return p.jsx(Se,{...m,role:"treegrid","aria-rowcount":ee+1+(m.topSummaryRows?.length??0)+(m.bottomSummaryRows?.length??0),ref:j,columns:K,rows:C,rowHeight:ne,rowKeyGetter:Y,onRowsChange:se,selectedRows:_,onSelectedRowsChange:te,onCellKeyDown:oe,renderers:{...G,renderRow:re}})}function Ne(s){return Array.isArray(s)}const $e=g.forwardRef(Me),Je=de("/RowGrouping")({component:Pe}),We="gdm23ek",_e="orv6f2f",Q=["Swimming","Gymnastics","Speed Skating","Cross Country Skiing","Short-Track Speed Skating","Diving","Cycling","Biathlon","Alpine Skiing","Ski Jumping","Nordic Combined","Athletics","Table Tennis","Tennis","Synchronized Swimming","Shooting","Rowing","Fencing","Equestrian","Canoeing","Bobsleigh","Badminton","Archery","Wrestling","Weightlifting","Waterpolo","Wrestling","Weightlifting"],Be=[Ge,{key:"country",name:"Country"},{key:"year",name:"Year"},{key:"sport",name:"Sport"},{key:"athlete",name:"Athlete"},{key:"gold",name:"Gold",renderGroupCell({childRows:s}){return s.reduce((t,{gold:i})=>t+i,0)}},{key:"silver",name:"Silver",renderGroupCell({childRows:s}){return s.reduce((t,{silver:i})=>t+i,0)}},{key:"bronze",name:"Bronze",renderGroupCell({childRows:s}){return s.reduce((t,{silver:i})=>t+i,0)}},{key:"total",name:"Total",renderCell({row:s}){return s.gold+s.silver+s.bronze},renderGroupCell({childRows:s}){return s.reduce((t,i)=>t+i.gold+i.silver+i.bronze,0)}}];function Fe(s){return s.id}function Ue(){const s=[];for(let t=1;t<1e4;t++)s.push({id:t,year:2015+I.number.int(3),country:I.location.country(),sport:Q[I.number.int(Q.length-1)],athlete:I.person.fullName(),gold:I.number.int(5),silver:I.number.int(5),bronze:I.number.int(5)});return s.sort((t,i)=>i.country.localeCompare(t.country))}const B=["country","year","sport","athlete"];function Pe(){const s=ce(),[t]=g.useState(Ue),[i,c]=g.useState(()=>new Set),[h,u]=g.useState([B[0],B[1]]),[x,k]=g.useState(()=>new Set(["United States of America","United States of America__2015"]));function G(d,b){const R=h.indexOf(d);b?R===-1&&u(w=>[...w,d]):R!==-1&&u(w=>{const m=[...w];return m.splice(R,1),m}),k(new Set)}return p.jsxs("div",{className:We,children:[p.jsx("b",{children:"Group by columns:"}),p.jsx("div",{className:_e,children:B.map(d=>p.jsxs("label",{children:[p.jsx("input",{type:"checkbox",checked:h.includes(d),onChange:b=>G(d,b.target.checked)})," ",d]},d))}),p.jsx($e,{columns:Be,rows:t,rowKeyGetter:Fe,selectedRows:i,onSelectedRowsChange:c,groupBy:h,rowGrouper:Ve,expandedGroupIds:x,onExpandedGroupIdsChange:k,defaultColumnOptions:{resizable:!0},direction:s})]})}function Ve(s,t){return Object.groupBy(s,i=>i[t])}export{Je as Route};
//# sourceMappingURL=RowGrouping.lazy-RTUJJ-F-.js.map