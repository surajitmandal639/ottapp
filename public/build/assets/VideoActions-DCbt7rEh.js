import{r as s,j as e,a as f,e as m}from"./app-DWiplGih.js";import{a as p}from"./index.prod-SXC0ELQv.js";import"./jquery-TLgHKWof.js";function y({videoId:t,videoStatus:c,handleDelete:n,handleStatusChange:r}){const[i,o]=s.useState(""),l=async a=>{const d=await m(a,"0123456789abcdef0123456789abcdef");o(d.encryptedData)};return s.useEffect(()=>{t&&l(t)},[t]),e.jsxs("div",{className:"card-body p-3",children:[e.jsx(f,{href:route("admin.videos.create",i),className:"btn btn-icon waves-effect waves-light btn-success m-r-5","data-toggle":"tooltip",title:"Edit",children:e.jsx("i",{className:"fa fa-edit"})}),e.jsx("button",{onClick:()=>n(t),className:"btn btn-icon waves-effect waves-light btn-danger","data-toggle":"tooltip",title:"Remove",children:e.jsx("i",{className:"fa fa-remove"})}),e.jsx("label",{className:"switch-toggle m-0 p-0 fl-right",children:e.jsx(p,{checked:c===1,onChange:a=>r(t,a)})})]})}export{y as default};
