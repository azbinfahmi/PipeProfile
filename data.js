var u=[],s=[],t=[],f=[],c=[],m=[],d=[],v=[],p=[],b=[],r=[],o=[],g=[],h=[];
//for undo button
var j=[];var y,w,x;var _=[],C=[],k=0,N=0;var M=0,I=0,B=0,F=0;var l,a;const e=document.querySelector("#undo");const P=document.querySelector("#length");const X=document.querySelector("#checkX");const A=document.querySelector("#Points");const n=document.querySelector("#H_helper");const q=document.querySelector("#L_helper");const E=document.getElementById("myCanvas");const i=E.getContext('2d');
//Load and display the image into canvas
function z(){let e=document.getElementById('imageInput');e.addEventListener('change',function(t){if(t.target.files){a=Number(prompt("Add a scale to the image","1"));if(a==0){scale=1}let e=t.target.files[0];//here we get the image file
var n=new FileReader;n.readAsDataURL(e);n.onloadend=function(e){l=new Image;// Creates image object
l.src=e.target.result;// Assigns converted image to image object
l.onload=function(){var e=document.getElementById("myCanvas");// Creates a canvas object
var t=e.getContext("2d");// Creates a contect object
e.width=l.width*a;// Assigns image's width to canvas
e.height=l.height*a;// Assigns image's height to canvas
t.drawImage(l,0,0,l.width*a,l.height*a);// Draws the image on canvas
}}}})}
//get coordinate when click
function D(e,t){let n=e.getBoundingClientRect();let l=t.clientX-n.left;let a=t.clientY-n.top;console.log("Coordinate x: "+l,"Coordinate y: "+a);u.push(l);s.push(a);r.push(l);o.push(a)}
//draw circle function
function T(e,t,n,l,a){numb=p.length;
//draw circle
var r=document.getElementById("myCanvas");var o=r.getContext("2d");o.beginPath();o.arc(t,n,4,0,2*Math.PI*2);o.fillStyle=e;o.fill();o.fillStyle="black";o.font="11px Arial";o.textAlign="center";if(l!=0){if(l==.5){}else{var i="p"+Number(l);o.fillText(i,t-22,n-10)}}else if(l==0){if(c.length==1){i=c[0][0]}else{i=c[0][0]-a}o.fillText(i,t-30,n+3)}o.stroke()}
//draw constant circle
function G(e){let t=E.getBoundingClientRect();
// Get mouse position
var n=e.clientX-t.left;var l=e.clientY-t.top;if(I==B&&c.length==2&&A.checked==true){color="yellow"}else if(I>B&&c.length==2&&A.checked==true){color="blue"}else{color="black"}
// Draw circle at mouse position
radius=4;i.beginPath();i.fillStyle=color;i.arc(n,l,radius,0,2*Math.PI);i.fill()}
//draw line
function H(e,t,n,l){var a=document.getElementById("myCanvas");if(a.getContext){var r=a.getContext("2d");
// Begin the path
r.beginPath();r.lineCap="round";
// Starting point
r.moveTo(e,t);
// End point
r.lineTo(n,l);
// Stroke will make the line visible
r.stroke()}}
//draw horrizontal line
function J(e){
// Draw the line
i.beginPath();i.moveTo(e,0);i.lineTo(e,E.height);i.stroke()}
//draw point to next point
function K(e){let t=E.getBoundingClientRect();var n=e.clientX-t.left;var l=e.clientY-t.top;leng1=p.length-1;leng2=b.length-1;if(B>0){if(I==B){i.beginPath();i.moveTo(p[leng1][0],p[leng1][1]);i.lineTo(n,l);i.stroke()}else{i.beginPath();i.moveTo(b[leng2][0],b[leng2][1]);i.lineTo(n,l);i.stroke()}}}
//levelling
function L(e){y=c[0][0]-c[1][0];w=c[1][2]-c[0][2];x=w/y;var t=e-c[0][2];var n=c[0][0]-t/x;return n}
//undo button for depth point
function O(){if(p.length==0&&b.length==0){A.checked=false;P.checked=false;
//delete last point of the array
c.pop();if(c.length==1){T("black",c[0][1],c[0][2],0)}}else{H(c[0][1],c[0][2],c[1][1],c[1][2]);for(var e=0;e<y+1;e++){T("black",c[0][1],c[0][2]+x*e,0,e)}}}
//undo for point
function Q(){if(I>B){
//undo untuk pipe depth
m=[];p.pop();I=I-1}else if(I==B&&p.length>0){
//undo untuk ground depth
b.pop();B=B-1;v.pop();const n=document.getElementById("myTableBody");table_data=v;while(n.firstChild){n.removeChild(n.firstChild)}if(v.length>0){for(let t=0;t<table_data.length;t++){const l=n.insertRow();const a=l.insertCell(0);a.innerHTML=t+1;for(let e=0;e<table_data[t].length;e++){const r=l.insertCell(e+1);num=Math.round(table_data[t][e]*100)/100;r.innerHTML=num.toFixed(2)}}}}for(var e=0;e<b.length;e++){T("blue",b[e][0],b[e][1],e+1);if(e!=b.length-1){H(b[e+1][0],b[e+1][1],b[e][0],b[e][1])}}for(var e=0;e<p.length;e++){T("yellow",p[e][0],p[e][1],e+1);
//draw horizontal line
if(e!=p.length-1){H(p[e+1][0],p[e+1][1],p[e][0],p[e][1])}H(p[e][0],0,p[e][0],E.height)}
//check if point can be calculated
if(h.length>0&&p.length>0){if(p[p.length-1][0]>g[g.length-1][0]&&p[p.length-1][0]<g[g.length-1][1]){if(I!=B){T("green",p[p.length-1][0],p[p.length-1][1],I)}
//this variable is used in calculate length
F=1}}}function R(e,t,n,l){var a=t-e;// 120 - 100 = 20
var r=l-n;//50 - 20 = 30
var o=t-p[I-1][0];// 120 - 108 = 12
var i=r/a*o;// 30/20 = 1.5 * 12 = 18
var f=l-i;return f}
//redraw everything
function S(){
//draw the inserted image
if(a>0){i.drawImage(l,0,0,l.width*a,l.height*a)}
//draw depth point scale
if(c.length>0){if(c.length==1){T("black",c[0][1],c[0][2],0)}else{H(c[0][1],c[0][2],c[1][1],c[1][2]);for(var e=0;e<y+1;e++){T("black",c[0][1],c[0][2]+x*e,0,e)}}}for(var e=0;e<b.length;e++){T("blue",b[e][0],b[e][1],e+1);if(e!=b.length-1){H(b[e+1][0],b[e+1][1],b[e][0],b[e][1])}}for(var e=0;e<p.length;e++){T("yellow",p[e][0],p[e][1],e+1);
//draw horizontal line
if(e!=p.length-1){H(p[e+1][0],p[e+1][1],p[e][0],p[e][1])}H(p[e][0],0,p[e][0],E.height)}
//check if point can be calculated
if(h.length>0&&p.length>0){if(p[p.length-1][0]>g[g.length-1][0]&&p[p.length-1][0]<g[g.length-1][1]){if(I!=B){T("green",p[p.length-1][0],p[p.length-1][1],I)}
//this variable is used in calculate length
F=1}}}
//alert when tick the depth point button
X.addEventListener('change',function(){if(A.checked==true||P.checked==true){X.checked=true}else if(c.length==2){X.checked=true}else if(X.checked==true){
// if (maxdepth2.length == 0)
// {
//   alert("Click at the maximum depth point on the graph.")
// }
// else
// {
//   alert("Click at the minimum depth point on the graph.")
// }
}});
//alert when tick the point button
A.addEventListener('change',function(){if(A.checked==true){P.checked=false;if(c.length!=2){alert("Find the depth point first");A.checked=false;X.checked=true}}});
//turn off point button when length button is clicked
P.addEventListener('change',function(){if(P.checked==true){if(c.length!=2){alert("Find the depth point first");P.checked=false;X.checked=true}else{A.checked=false}}});
//undo button
e.addEventListener("click",function(){var e=document.getElementById('myCanvas');var t=e.getContext('2d');
// clear the specific arc
t.clearRect(0,0,e.width,e.height);
// redraw Image
if(l!=null){t.drawImage(l,0,0,l.width*a,l.height*a)}
//undo the depth
if(c.length==0){alert("Nothing to undo")}O();
//undo point
Q()});
//make vertical line
E.addEventListener('mousemove',function(e){
//horrizontal line
const t=e.offsetX;i.clearRect(0,0,E.width,E.height);S();if(X.checked==true){G(e)}
//horinzontal assist
if(n.checked==true){i.beginPath();i.moveTo(t,0);i.lineTo(t,E.height);i.stroke()}if(q.checked==true&&A.checked==true){K(e)}});
// get coordinate of x,y when click in the canvas, and what ever happen in the canvas. will be run in here
E.addEventListener("mousedown",function(e){D(E,e);
//find the depth point
if(c.length<2){if(X.checked==true){var t=[];let e=confirm('Confirm or deny');if(e==true){lastx=u.length-1;lasty=s.length-1;if(c.length==0){var n=prompt("Enter max depth value");t.push(Number(n),u[lastx],s[lasty]);c.push(t);T("black",u[lastx],s[lasty],0);firstX=lastx;
// alert("Click at the minimum depth point on the graph.")
}else{var n=prompt("Enter min depth value");t.push(Number(n),u[firstX],s[lasty]);c.push(t);
//calculate high of the depth point
y=c[0][0]-c[1][0];w=c[1][2]-c[0][2];x=w/y;
// console.log(maxdepth2)
for(var l=0;l<y+1;l++){T("black",c[0][1],c[0][2]+x*l,0,l)}H(c[0][1],c[0][2],c[1][1],c[1][2])}}}}
//find the pipelevel, groundlevel and length
if(A.checked==true){lastx=u.length-1;lasty=s.length-1;if(I==B){let e=confirm('Confirm or deny');if(e==true){I=I+1;p.push([u[lastx],s[lasty]]);T("yellow",u[lastx],s[lasty],I);
// console.log('pipelevel',pipelevel)
if(p.length>1){H(p[I-2][0],p[I-2][1],p[I-1][0],p[I-1][1])}
//draw horizontal line
H(p[I-1][0],0,p[I-1][0],E.height)}if(h.length>0){if(p[p.length-1][0]>g[g.length-1][0]&&p[p.length-1][0]<g[g.length-1][1]){if(I!=B){T("green",p[p.length-1][0],p[p.length-1][1],.5);len=h.length-1;M=R(g[len][0],g[len][1],h[len][0],h[len][1]);
// alert('pipe length value for current point is '+ pipelength.toFixed(2))
F=1}
//this variable is used in calculate length
}}}else{let e=confirm('Confirm or deny');if(e==true){
//check wheter the ground point is true or not
if(u[lastx]>p[I-1][0]+3||u[lastx]<p[I-1][0]-3){alert("Please pinpoint ground level first")}else{B=B+1;d=[];a=[];b.push([u[lastx],s[lasty]]);T("blue",u[lastx],s[lasty],B);T("yellow",p[p.length-1][0],p[p.length-1][1],.5);d.push(L(s[lasty]));if(M==0&&F==0){M=prompt("Insert pipe length value")}else{len=h.length-1;M=R(g[len][0],g[len][1],h[len][0],h[len][1]);F=0}m.push(L(p[I-1][1]));
//console.log('pipelevel',pipelevel)
var a=m.concat(d);v.push([a[0],a[1],Number(M)]);
// console.log('data:',data)
//draw line for each point
if(b.length>1){H(b[I-2][0],b[I-2][1],b[I-1][0],b[I-1][1])}
//create table and insert data
const r=document.getElementById("myTableBody");table_data=v;
// Start removing from the last row to the first one
while(r.firstChild){r.removeChild(r.firstChild)}for(let t=0;t<table_data.length;t++){const o=r.insertRow();const i=o.insertCell(0);i.innerHTML=t+1;for(let e=0;e<table_data[t].length;e++){const f=o.insertCell(e+1);num=Math.round(table_data[t][e]*100)/100;f.innerHTML=num.toFixed(2)}}M=0,m=[]}}}}
//find length based on last point
if(P.checked==true){getcoord=u.length-1;
//calculate pipe length value automatically
if(s[getcoord]>0){let e=confirm('Confirm or deny');if(e==true){if(_.length==0){_.push(u[getcoord],s[getcoord]);k=Number(prompt("1st pipelength value"))}else{C.push(u[getcoord],_[1]);while(N==0){N=Number(prompt("2nd pipelength value"));if(N==0){alert("Please insert pipelength value")}}if(p.length>0){M=R(_[0],C[0],k,N)}
//store x coordinate for length and its value
g.push([_[0],C[0]]);h.push([k,N]);_=[],C=[],N=0;P.checked=false,A.checked=true}}}}});
//generate report
let saveFile =()=>{var e=[],t=[],n=[];
//convert array to \t
for(var l=0;l<v.length;l++){t=[];for(var a=0;a<v[l].length;a++){num=Math.round(v[l][a]*100)/100;if(a==0){t.push('\n'+num.toFixed(2))}else if(a==1){t.push(num.toFixed(2))}else if(l==v.length-1&&a==v[l].length-1){t.push(num.toFixed(2)+':,')}else{t.push(num.toFixed(2)+':')}}n.push(t)}
//convert to 1d array
for(var l=0;l<v.length;l++){e=e.concat(n[l])}
// console.log('newArr',newArr)
var r=e.toString().replaceAll(",","\t");var r=r.toString().replaceAll(":\t","");
// console.log('savedata1:\n',savedata1)
let o='p_level\t'+'g_level\t'+'length';const i=new Blob([o,r],{type:'text/plain'});const f=prompt("Insert file name?");alert(v.length+" points have been exported");let u=document.createElement("a");u.download=f;if(window.webkitURL!=null){u.href=window.webkitURL.createObjectURL(i)}else{u.href=window.URL.createObjectURL(i);u.style.display="none";document.body.appendChild(u)}u.click()};z();