import{W as d,j as e,Y as x,a as c}from"./app-DWiplGih.js";import{A as h}from"./AuthenticatedLayout-RN_dLH_b.js";import"./jquery-TLgHKWof.js";import"./SweetAlert-_wzJVbyC.js";import"./bootstrap.esm-Bb0rKlaf.js";import"./Loder-D9bdZO9o.js";import"./MyImage-BxCI3zcA.js";function _({auth:o,page:s}){const{data:a,setData:r,post:i,processing:n,errors:l}=d({page_title:(s==null?void 0:s.title)||"",page_content:(s==null?void 0:s.content)||"",page_order:(s==null?void 0:s.order)||0,status:(s==null?void 0:s.status)||1}),m=t=>{t.preventDefault(),i(route("pages.update",s==null?void 0:s.id))};return e.jsx(e.Fragment,{children:e.jsxs(h,{user:o.user,children:[e.jsx(x,{title:s==null?void 0:s.title}),e.jsxs("div",{className:"card-box",children:[e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-sm-6",children:e.jsx(c,{href:route("admin.pages.index"),children:e.jsxs("h4",{className:"header-title m-t-0 m-b-30 text-primary pull-left",style:{fontSize:"20px"},children:[e.jsx("i",{className:"fa fa-arrow-left"})," Back"]})})}),e.jsx("div",{className:"col-sm-6",children:e.jsx(c,{href:route("admin.pages.show",s==null?void 0:s.slug),target:"_blank",children:e.jsxs("h4",{className:"header-title m-t-0 m-b-30 text-primary pull-right",style:{fontSize:"20px"},children:["Preview ",e.jsx("i",{className:"fa fa-eye"})]})})})]}),e.jsxs("form",{onSubmit:m,acceptCharset:"UTF-8",className:"form-horizontal",role:"form",encType:"multipart/form-data",children:[e.jsxs("div",{className:"form-group row",children:[e.jsx("label",{className:"col-sm-3 col-form-label",children:"Page Title*"}),e.jsxs("div",{className:"col-sm-8",children:[e.jsx("input",{type:"text",name:"page_title",value:a.page_title,onChange:t=>r("page_title",t.target.value),className:"form-control"}),l.page_title&&e.jsx("div",{className:"text-danger",children:l.page_title})]})]}),e.jsxs("div",{className:"form-group row",children:[e.jsx("label",{className:"col-sm-3 col-form-label",children:"Description"}),e.jsxs("div",{className:"col-sm-8",children:[e.jsx("textarea",{className:"form-control",name:"page_content",rows:"10",value:a.page_content,onChange:t=>r("page_content",t.target.value)}),l.page_content&&e.jsx("div",{className:"text-danger",children:l.page_content})]})]}),e.jsxs("div",{className:"form-group row",children:[e.jsx("label",{className:"col-sm-3 col-form-label",children:"Page Order"}),e.jsxs("div",{className:"col-sm-8",children:[e.jsx("input",{type:"number",name:"page_order",value:a.page_order,onChange:t=>r("page_order",t.target.value),className:"form-control",min:"0"}),l.page_order&&e.jsx("div",{className:"text-danger",children:l.page_order})]})]}),e.jsxs("div",{className:"form-group row",children:[e.jsx("label",{className:"col-sm-3 col-form-label",children:"Status"}),e.jsxs("div",{className:"col-sm-8",children:[e.jsxs("select",{className:"form-control",name:"status",value:a.status,onChange:t=>r("status",t.target.value),children:[e.jsx("option",{value:"1",children:"Active"}),e.jsx("option",{value:"0",children:"Inactive"})]}),l.status&&e.jsx("div",{className:"text-danger",children:l.status})]})]}),e.jsx("div",{className:"form-group",children:e.jsx("div",{className:"offset-sm-3 col-sm-9 pl-1",children:e.jsx("button",{type:"submit",className:"btn btn-primary waves-effect waves-light",disabled:n,children:"Save"})})})]})]})]})})}export{_ as default};
