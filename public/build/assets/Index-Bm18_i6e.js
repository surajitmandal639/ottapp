import{j as s,Y as o,a as t,e as r,y as m}from"./app-DWiplGih.js";import{b as h,s as u}from"./SweetAlert-_wzJVbyC.js";import{A as x}from"./AuthenticatedLayout-RN_dLH_b.js";import"./jquery-TLgHKWof.js";import"./bootstrap.esm-Bb0rKlaf.js";import"./Loder-D9bdZO9o.js";import"./MyImage-BxCI3zcA.js";const y=({auth:c,title:n,pages:i})=>{const l=async e=>{await h("Are you sure you want to change this status?")&&await m.post(route("pages.status",e),{onSuccess:()=>{u("Page status changed successfully.")}})};return s.jsxs(x,{user:c.user,children:[s.jsx(o,{title:n}),s.jsxs("div",{className:"card-box table-responsive",children:[s.jsx("div",{className:"d-flex justify-content-between mb-4",children:s.jsxs(t,{href:route("admin.pages.create"),className:"btn btn-success",title:"Add Page",children:[s.jsx("i",{className:"fa fa-plus"})," Add Page"]})}),s.jsx("div",{className:"table-responsive",children:s.jsxs("table",{className:"table table-bordered",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Page Title"}),s.jsx("th",{children:"Status"}),s.jsx("th",{children:"Action"})]})}),s.jsx("tbody",{children:i&&i.map((e,a)=>s.jsxs("tr",{id:`card_box_id_${a}`,children:[s.jsx("td",{children:e.title}),s.jsxs("td",{children:[s.jsx("span",{className:`badge badge-${(e==null?void 0:e.status)==1?"success":"danger"}`,children:(e==null?void 0:e.status)==1?"Active":"Inactive"})," "]}),s.jsxs("td",{children:[s.jsxs(t,{target:"_blank",href:route("admin.page",e.slug),className:"btn btn-icon waves-effect waves-light btn-success m-b-5 m-r-5","data-toggle":"tooltip",title:"View",children:[" ",s.jsx("i",{className:"fa fa-eye"})," "]}),s.jsxs(t,{href:route("admin.pages.create",r(e.id)),className:"btn btn-icon waves-effect waves-light btn-success m-b-5 m-r-5","data-toggle":"tooltip",title:"Edit",children:[" ",s.jsx("i",{className:"fa fa-edit"})," "]}),e.status!="0"&&s.jsx(t,{href:"#",className:"btn btn-icon waves-effect waves-light btn-danger m-b-5 data_remove","data-toggle":"tooltip",title:"Remove",onClick:d=>{d.preventDefault(),l(r(e.id))},children:s.jsx("i",{className:"fa fa-remove"})})]})]},a))})]})})]})]})};export{y as default};
