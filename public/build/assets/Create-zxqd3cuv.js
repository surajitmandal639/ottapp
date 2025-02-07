import{W as y,j as s,Y as w,a as x,y as C}from"./app-DWiplGih.js";import{s as P}from"./SweetAlert-_wzJVbyC.js";import{A as E}from"./AuthenticatedLayout-RN_dLH_b.js";import{C as q,a as A}from"./ckeditor-By3W5umn.js";import"./jquery-TLgHKWof.js";import"./bootstrap.esm-Bb0rKlaf.js";import"./Loder-D9bdZO9o.js";import"./MyImage-BxCI3zcA.js";import"./index-C5nD6nVr.js";const F=({auth:f,errors:j,page:e})=>{const{errors:b,setError:o,clearErrors:l,data:N,setData:m,reset:v}=y({title:(e==null?void 0:e.title)||"",description:(e==null?void 0:e.description)||"",order:(e==null?void 0:e.order)||"",status:(e==null?void 0:e.status)||1}),a={...j,...b},c={...e,...N},u=async(i,t)=>{let r=!0;try{(await axios.post(route("pages.checkUnique",{field:i,value:t,id:(e==null?void 0:e.id)||null}))).data?(o(i,`${i.charAt(0).toUpperCase()+i.slice(1)} must be unique.`),r=!1):l(i)}catch(n){console.error("Error checking uniqueness",n)}return r},h=async(i,t)=>{let r=!0;switch(i){case"title":!t||typeof t!="string"||t.length>50?(o("title","Page title is required and must be a string with a maximum length of 50 characters."),r=!1):(r=await u("title",t),r&&l("title"));break;case"order":t==""?(l("order"),r=!0):isNaN(t)||parseInt(t)<=0?(o("order","Page order must be a positive number."),r=!1):(r=await u("order",t),r&&l("order"));break;case"status":[1,2].includes(t)?l("status"):(o("status","Status is required and must be either 1 (Active) or 2 (Inactive)."),r=!1);break}return r},d=i=>{const{name:t,value:r}=i.target;m(t,r),h(t,r)},p=async i=>{if(i.preventDefault(),Object.keys(c).every(r=>h(r,c[r]))){const r=e?"Page updated successfully.":"Page created successfully.",n=e?e==null?void 0:e.id:null;await C.post(route("pages.save",n),{...c},{onSuccess:()=>{P(r),e||v()}})}};return console.log(c),s.jsxs(E,{user:f.user,children:[s.jsx(w,{title:e?"Edit Page":"Add Page"}),s.jsxs("div",{className:"card-box table-responsive",children:[s.jsx("nav",{"aria-label":"breadcrumb ",children:s.jsxs("ol",{className:"breadcrumb text-primary",style:{justifyContent:"flex-end"},children:[s.jsx("li",{className:"breadcrumb-item",children:s.jsx(x,{href:route("admin.dashboard"),children:"Dashboard"})}),s.jsx("li",{className:"breadcrumb-item",children:s.jsx(x,{href:route("admin.pages"),children:"Pages"})}),s.jsx("li",{className:"breadcrumb-item active","aria-current":"page",children:"Edit Page"})]})}),s.jsxs("form",{onSubmit:p,encType:"multipart/form-data",autoComplete:"off",children:[s.jsxs("div",{className:"form-group row",children:[s.jsxs("label",{className:"col-sm-3 col-form-label",children:["Page Title ",s.jsx("span",{className:"text-danger",children:"*"})]}),s.jsxs("div",{className:"col-sm-8",children:[s.jsx("input",{className:"form-control",type:"text",name:"title",required:!0,value:c.title,onChange:d}),a&&a.title&&s.jsx("span",{className:"text-danger",children:a.title})]})]}),s.jsxs("div",{className:"form-group row",children:[s.jsx("label",{className:"col-sm-3 col-form-label",children:"Description"}),s.jsxs("div",{className:"col-sm-8",children:[s.jsx(q,{editor:A,data:c.description,onChange:(i,t)=>{const r=t.getData();m("description",r)}}),a&&a.description&&s.jsx("span",{className:"text-danger",children:a.description})]})]}),s.jsxs("div",{className:"form-group row",children:[s.jsx("label",{className:"col-sm-3 col-form-label",children:"Page Order"}),s.jsxs("div",{className:"col-sm-8",children:[s.jsx("input",{className:"form-control",type:"number",name:"order",value:c.order,onChange:d}),a&&a.order&&s.jsx("span",{className:"text-danger",children:a.order})]})]}),s.jsxs("div",{className:"form-group row",children:[s.jsx("label",{className:"col-sm-3 col-form-label",children:"Status"}),s.jsxs("div",{className:"col-sm-8",children:[s.jsxs("select",{className:"form-control",name:"status",value:c.status,onChange:d,children:[s.jsx("option",{value:"1",children:"Active"}),s.jsx("option",{value:"2",children:"Inactive"})]}),a&&a.status&&s.jsx("span",{className:"text-danger",children:a.status})]})]}),s.jsx("div",{className:"form-group row",children:s.jsx("div",{className:"col-sm-12 text-center",children:s.jsx("button",{type:"submit",className:"btn btn-primary",children:e?"Update":"Save"})})})]})]})]})};export{F as default};
