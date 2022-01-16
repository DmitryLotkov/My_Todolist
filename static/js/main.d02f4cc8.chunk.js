(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{70:function(t,e,a){t.exports=a(87)},75:function(t,e,a){},76:function(t,e,a){},87:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),o=a(8),r=a.n(o);a(75),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(76);var c=a(34),l=a(122),s=a(59),u=a.n(s),d=a(132);function m(t){var e=Object(n.useState)(""),a=Object(c.a)(e,2),o=a[0],r=a[1],s=Object(n.useState)(),m=Object(c.a)(s,2),f=m[0],D=m[1],E=function(){""!==o.trim()?t.addItem(o):D("Title is required!"),r("")};return i.a.createElement("div",null,i.a.createElement(d.a,{label:"Enter a title...",autoFocus:!0,error:f,onKeyPress:function(t){"Enter"===t.key&&E()},value:o,onChange:function(t){t.currentTarget.value&&D(null),r(t.currentTarget.value)},variant:"outlined",helperText:f&&"Title is required!"}),i.a.createElement(l.a,{onClick:E},i.a.createElement(u.a,{color:"primary"})))}function f(t){var e=Object(n.useState)(!1),a=Object(c.a)(e,2),o=a[0],r=a[1],l=Object(n.useState)(t.title),s=Object(c.a)(l,2),u=s[0],m=s[1],f=function(){r(!1),t.setNewTitle(u)};return o?i.a.createElement(d.a,{className:"editableSpan",value:u,onKeyPress:function(t){"Enter"===t.key&&f()},autoFocus:!0,onBlur:f,onChange:function(t){m(t.currentTarget.value)}}):i.a.createElement("span",{onDoubleClick:function(){r(!0)}},u)}var D=a(125),E=a(123),T=a(124),O=a(133);function I(t){var e=t.tasks.map((function(e){return i.a.createElement("div",{className:"todolist",key:e.id},i.a.createElement("div",{className:"deleteLi"},i.a.createElement(O.a,{color:"primary",onChange:function(a){t.changeStatus(e.id,a.currentTarget.checked,t.todoListID)},checked:e.isDone,className:e.isDone?"completedTask":""}),i.a.createElement(f,{title:e.title,setNewTitle:function(a){t.changeTaskTitle(a,e.id,t.todoListID)}}),i.a.createElement(l.a,{onClick:function(){t.removeTask(e.id,t.todoListID)}},i.a.createElement(E.a,{fontSize:"small",color:"primary"}))))}));return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("h3",{className:"title"},i.a.createElement("div",{className:"whatToLearn"},i.a.createElement(f,{title:t.title,setNewTitle:function(e){t.changeTodoListTitle(e,t.todoListID)}})),i.a.createElement(l.a,{onClick:function(){return t.removeTodoLists(t.todoListID)}},i.a.createElement(T.a,{color:"primary"})))),i.a.createElement(m,{addItem:function(e){t.addItem(e,t.todoListID)}}),e,i.a.createElement("div",{className:"buttons"},i.a.createElement(D.a,{size:"small",variant:"contained",className:"button",color:"all"===t.filter?"secondary":"primary",onClick:function(){t.changeFilter("all",t.todoListID)}},"All"),i.a.createElement(D.a,{size:"small",variant:"contained",className:"button",color:"active"===t.filter?"secondary":"primary",onClick:function(){t.changeFilter("active",t.todoListID)}},"Active"),i.a.createElement(D.a,{size:"small",variant:"contained",className:"button",color:"completed"===t.filter?"secondary":"primary",onClick:function(){t.changeFilter("completed",t.todoListID)}},"Completed"))))}var v=a(128),L=a(126),b=a(127),p=a(129),h=a(130),j=a(131),g=a(89),k=a(44),y=a(26),S=a(10),A=a(134),N={},C=[],w=a(33);function K(){var t=Object(w.b)(),e=Object(w.c)((function(t){return t.tasks})),a=Object(w.c)((function(t){return t.toDoLists})),n=function(e,a,n){var i=function(t,e,a){return{type:"CHANGE-TASK-STATUS",isDone:e,todoListID:a,taskID:t}}(e,a,n);t(i)},o=function(e,a){var n={type:"ADD-TASK",title:e,todoListID:a};t(n)},r=function(e,a,n){var i=function(t,e,a){return{type:"CHANGE-TASK-TITLE",title:e,taskID:t,todoListID:a}}(e,a,n);t(i)},c=function(e,a){var n=function(t,e){return{type:"REMOVE-TASK",todoListID:e,taskID:t}}(e,a);t(n)},s=function(e,a){var n=function(t,e){return{type:"CHANGE-TODOLIST-FILTER",filter:e,todoListID:t}}(a,e);t(n)},u=function(e){var a={type:"REMOVE-TODOLIST",todoListID:e};t(a)},d=function(e,a){var n=function(t,e){return{type:"CHANGE-TODOLIST-TITLE",title:e,todoListID:t}}(e,a);t(n)};return i.a.createElement("div",{className:"App"},i.a.createElement(L.a,{position:"static"},i.a.createElement(b.a,null,i.a.createElement(l.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(v.a,null)),i.a.createElement(p.a,{variant:"h6"},"News"),i.a.createElement(D.a,{color:"inherit"},"Login"))),i.a.createElement(h.a,{fixed:!0},i.a.createElement(j.a,{container:!0,style:{paddingRight:"2rem",paddingTop:"2rem",paddingBottom:"2rem"}},i.a.createElement(m,{addItem:function(e){var a=function(t){return{type:"ADD-TODOLIST",title:t,todoListID:Object(A.a)()}}(e);t(a)}})),i.a.createElement(j.a,{container:!0,spacing:8},a.map((function(t){var a=e[t.id];return"completed"===t.filter&&(a=a.filter((function(t){return t.isDone}))),"active"===t.filter&&(a=a.filter((function(t){return!t.isDone}))),i.a.createElement(j.a,{item:!0,key:t.id},i.a.createElement(g.a,{elevation:2,style:{padding:"1rem"}},i.a.createElement(I,{title:t.title,tasks:a,removeTask:c,addItem:o,changeStatus:n,changeFilter:s,filter:t.filter,todoListID:t.id,removeTodoLists:u,changeTaskTitle:r,changeTodoListTitle:d})))})))))}var F=a(49),G=Object(F.a)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(S.a)(Object(S.a)({},t),{},Object(y.a)({},e.todoListID,t[e.todoListID].filter((function(t){return t.id!==e.taskID}))));case"ADD-TASK":var a={id:Object(A.a)(),title:e.title,isDone:!1};return Object(S.a)(Object(S.a)({},t),{},Object(y.a)({},e.todoListID,[a].concat(Object(k.a)(t[e.todoListID]))));case"CHANGE-TASK-STATUS":return Object(S.a)(Object(S.a)({},t),{},Object(y.a)({},e.todoListID,t[e.todoListID].map((function(t){return t.id===e.taskID?Object(S.a)(Object(S.a)({},t),{},{isDone:e.isDone}):t}))));case"CHANGE-TASK-TITLE":return Object(S.a)(Object(S.a)({},t),{},Object(y.a)({},e.todoListID,t[e.todoListID].map((function(t){return t.id===e.taskID?Object(S.a)(Object(S.a)({},t),{},{title:e.title}):t}))));case"ADD-TODOLIST":return t[e.todoListID]=[],Object(S.a)({},t);case"REMOVE-TODOLIST":return delete t[e.todoListID],Object(S.a)({},t);default:return t}},toDoLists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.todoListID}));case"ADD-TODOLIST":var a={id:e.todoListID,title:e.title,filter:"all"};return[a].concat(Object(k.a)(t));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.todoListID?Object(S.a)(Object(S.a)({},t),{},{filter:e.filter}):t}));case"CHANGE-TODOLIST-TITLE":var n="What to deal";return t.map((function(t){return t.id===e.todoListID?Object(S.a)(Object(S.a)({},t),{},{title:n}):t}));default:return t}}}),H=Object(F.b)(G);window.store=H,r.a.render(i.a.createElement(w.a,{store:H},i.a.createElement(K,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[70,1,2]]]);
//# sourceMappingURL=main.d02f4cc8.chunk.js.map