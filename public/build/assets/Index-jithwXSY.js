import{r,j as e,Y as v,a as h,y as n}from"./app-DWiplGih.js";import{M as x}from"./MyImage-BxCI3zcA.js";import{M as w}from"./MyPagination-qmxJVFS1.js";import{b as y,s as k,a as S}from"./SweetAlert-_wzJVbyC.js";import{A}from"./AuthenticatedLayout-RN_dLH_b.js";import{D as i}from"./Dropdown-ra7s1MVP.js";import"./jquery-TLgHKWof.js";import"./index-C5nD6nVr.js";import"./bootstrap.esm-Bb0rKlaf.js";import"./Loder-D9bdZO9o.js";import"./useWindow-CSbIcmA7.js";import"./extends-CF3RwP-h.js";import"./objectWithoutPropertiesLoose-CAYKN5F1.js";function z({title:g,directors:t}){const[o,p]=r.useState(""),[l,c]=r.useState([]),u=s=>{s.preventDefault(),n.get(route("directors"),{s:o})},d=async()=>{const s=l.length>1,a=l.map(N=>encryptString(N));await y(`Are you sure you want to delete ${s?"these directors":"this director"}?`)&&await n.post(route("admin.directors.delete"),{ids:a},{onSuccess:()=>{k(`Director${s?"s":""} deleted successfully.`),c([])},onError:()=>{S(`Failed to delete the director${s?"s":""}. Please try again.`)}})},f=s=>{n.get(route("admin.directors"),{page:s},{preserveState:!0})},j=s=>{s.target.checked?c(t.data.map(a=>a.id)):c([])},b=s=>{c(a=>a.includes(s)?a.filter(m=>m!==s):[...a,s])};return r.useEffect(()=>{c([])},[t]),e.jsxs(A,{children:[e.jsx(v,{title:g}),e.jsxs("div",{className:"card-box table-responsive",children:[e.jsx("div",{className:"row",children:e.jsx("div",{className:"wall-filter-block",children:e.jsxs("div",{className:"row",style:{alignItems:"center",justifyContent:"space-between"},children:[e.jsx("div",{className:"col-sm-3",children:e.jsxs("form",{onSubmit:u,className:"app-search",id:"search",role:"form",children:[e.jsx("input",{type:"text",name:"s",placeholder:"Search by name",className:"form-control",value:o,onChange:s=>p(s.target.value)}),e.jsx("button",{type:"submit",children:e.jsx("i",{className:"fa fa-search"})})]})}),e.jsx("div",{className:"col-sm-3",children:" "}),e.jsx("div",{className:"col-sm-4",children:e.jsxs("div",{className:"checkbox checkbox-success pull-right",children:[e.jsx("input",{id:"select_all",type:"checkbox",name:"select_all",checked:l.length===t.data.length,onChange:j}),e.jsx("label",{htmlFor:"select_all",children:"Select All"}),"  ",e.jsxs(i,{className:"btn-group",children:[e.jsx(i.Toggle,{className:"btn btn-info dropdown-toggle waves-effect",children:"Action"}),e.jsx(i.Menu,{children:e.jsx(i.Item,{href:"#",onClick:d,disabled:l.length===0,children:"Delete"})})]}),"   ",e.jsxs(h,{href:route("admin.directors.create",null),className:"btn btn-success btn-md waves-effect waves-light pull-right","data-toggle":"tooltip",title:"Add Director",children:[e.jsx("i",{className:"fa fa-plus"})," Add Director"]})]})})]})})}),e.jsx("br",{}),e.jsx("div",{className:"row",children:t.data.map((s,a)=>e.jsx("div",{className:"col-lg-2 col-md-3 col-sm-3 col-xs-6",children:e.jsxs("div",{className:"card m-b-20",children:[e.jsxs("div",{className:"wall-list-item",children:[e.jsxs("div",{className:"checkbox checkbox-success wall_check",children:[e.jsx("input",{type:"checkbox",name:"post_ids[]",id:`checkbox${a}`,value:s.id,className:"post_ids",checked:l.includes(s.id),onChange:()=>b(s.id)}),e.jsx("label",{htmlFor:`checkbox${a}`})]}),e.jsx("p",{className:"wall_sub_text",children:s.name}),s.images.length>0?e.jsx(x,{type:"actors",filename:s.images[0].filename,fallbackImage:"director.jpg",className:"card-img-top thumb-xs img-fluid",altText:`First image for ${s.name}`}):e.jsx(x,{type:"directors",filename:null,fallbackImage:"director.jpg",className:"card-img-top thumb-xs img-fluid",altText:"Default director image"})]}),e.jsxs("div",{className:"card-body p-3",children:[e.jsx(h,{href:route("admin.directors.create",encryptString(s.id)),className:"btn btn-icon waves-effect waves-light btn-success m-r-5","data-toggle":"tooltip",title:"Edit",children:e.jsx("i",{className:"fa fa-edit"})}),e.jsx("button",{onClick:()=>d(s.id),className:"btn btn-icon waves-effect waves-light btn-danger","data-toggle":"tooltip",title:"Remove",children:e.jsx("i",{className:"fa fa-remove"})})]})]})},s.id))}),e.jsx(w,{currentPage:t.current_page,lastPage:t.last_page,onPageChange:f})]})]})}export{z as default};
