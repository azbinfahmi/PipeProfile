var u=[],s=[],o=[],f=[],c=[],m=[],d=[],v=[],p=[],h=[],r=[],i=[],y=[],b=[];
//for undo button
var z=[];var g,x,w;var C=[],k=[],_=0,N=0;var I=0,M=0,B=0,F=0;var a,l;const e=document.querySelector("#undo");const P=document.querySelector("#length");const X=document.querySelector("#checkX");const A=document.querySelector("#Points");const E=document.getElementById("myCanvas");const t=E.getContext('2d');
//Load and display the image into canvas
function n(){let e=document.getElementById('imageInput');e.addEventListener('change',function(t){if(t.target.files){l=Number(prompt("Add a scale to the image","1"));if(l==0){scale=1}let e=t.target.files[0];//here we get the image file
var n=new FileReader;n.readAsDataURL(e);n.onloadend=function(e){a=new Image;// Creates image object
a.src=e.target.result;// Assigns converted image to image object
a.onload=function(){var e=document.getElementById("myCanvas");// Creates a canvas object
var t=e.getContext("2d");// Creates a contect object
e.width=a.width*l;// Assigns image's width to canvas
e.height=a.height*l;// Assigns image's height to canvas
t.drawImage(a,0,0,a.width*l,a.height*l);// Draws the image on canvas
}}}})}
//get coordinate when click
function D(e,t){let n=e.getBoundingClientRect();let a=t.clientX-n.left;let l=t.clientY-n.top;console.log("Coordinate x: "+a,"Coordinate y: "+l);u.push(a);s.push(l);r.push(a);i.push(l)}
//draw circle function
function T(e,t,n,a,l){numb=p.length;
//draw circle
var r=document.getElementById("myCanvas");var i=r.getContext("2d");i.beginPath();i.arc(t,n,4,0,2*Math.PI*2);i.fillStyle=e;i.fill();i.fillStyle="black";i.font="11px Arial";i.textAlign="center";if(a!=0){if(a==.5){}else{var o="p"+Number(a);i.fillText(o,t-22,n-10)}}else if(a==0){if(c.length==1){o=c[0][0]}else{o=c[0][0]-l}i.fillText(o,t-30,n+3)}i.stroke()}
//draw line
function R(e,t,n,a){var l=document.getElementById("myCanvas");if(l.getContext){var r=l.getContext("2d");
// Begin the path
r.beginPath();r.lineCap="round";
// Starting point
r.moveTo(e,t);
// End point
r.lineTo(n,a);
// Stroke will make the line visible
r.stroke()}}
//levelling
function j(e){g=c[0][0]-c[1][0];x=c[1][2]-c[0][2];w=x/g;var t=e-c[0][2];var n=c[0][0]-t/w;return n}
//undo button for depth point
function G(){if(p.length==0&&h.length==0){A.checked=false;P.checked=false;
//delete last point of the array
c.pop();if(c.length==1){T("black",c[0][1],c[0][2],0)}}else{R(c[0][1],c[0][2],c[1][1],c[1][2]);for(var e=0;e<g+1;e++){T("black",c[0][1],c[0][2]+w*e,0,e)}}}
//undo for point
function H(){if(M>B){
//undo untuk pipe depth
m=[];p.pop();M=M-1}else if(M==B&&p.length>0){
//undo untuk ground depth
h.pop();B=B-1;v.pop();const n=document.getElementById("myTableBody");table_data=v;while(n.firstChild){n.removeChild(n.firstChild)}if(v.length>0){for(let t=0;t<table_data.length;t++){const a=n.insertRow();const l=a.insertCell(0);l.innerHTML=t+1;for(let e=0;e<table_data[t].length;e++){const r=a.insertCell(e+1);num=Math.round(table_data[t][e]*100)/100;r.innerHTML=num.toFixed(2)}}}}for(var e=0;e<h.length;e++){T("blue",h[e][0],h[e][1],e+1);if(e!=h.length-1){R(h[e+1][0],h[e+1][1],h[e][0],h[e][1])}}for(var e=0;e<p.length;e++){T("yellow",p[e][0],p[e][1],e+1);
//draw horizontal line
if(e!=p.length-1){R(p[e+1][0],p[e+1][1],p[e][0],p[e][1])}R(p[e][0],0,p[e][0],2e3)}
//check if point can be calculated
if(b.length>0&&p.length>0){if(p[p.length-1][0]>y[y.length-1][0]&&p[p.length-1][0]<y[y.length-1][1]){if(M!=B){T("green",p[p.length-1][0],p[p.length-1][1],M)}
//this variable is used in calculate length
F=1}}}
//calculate pipelength
function q(e,t,n,a){var l=t-e;// 120 - 100 = 20
var r=a-n;//50 - 20 = 30
var i=t-p[M-1][0];// 120 - 108 = 12
var o=r/l*i;// 30/20 = 1.5 * 12 = 18
var f=a-o;return f}
//alert when tick the depth point button
X.addEventListener('change',function(){if(A.checked==true||P.checked==true){X.checked=true}else if(c.length==2){X.checked=true}else if(X.checked==true){if(c.length==0){alert("Click at the maximum depth point on the graph.")}else{alert("Click at the minimum depth point on the graph.")}}});
//alert when tick the point button
A.addEventListener('change',function(){if(A.checked==true){P.checked=false;if(c.length!=2){alert("Find the depth point first");A.checked=false;X.checked=true}}});
//turn off point button when length button is clicked
P.addEventListener('change',function(){if(P.checked==true){if(c.length!=2){alert("Find the depth point first");P.checked=false;X.checked=true}else{A.checked=false}}});
//undo button
e.addEventListener("click",function(){var e=document.getElementById('myCanvas');var t=e.getContext('2d');
// clear the specific arc
t.clearRect(0,0,e.width,e.height);
// redraw Image
if(a!=null){t.drawImage(a,0,0,a.width*l,a.height*l)}
//undo the depth
if(c.length==0){alert("Nothing to undo")}G();
//undo point
H()});function J(e){
// Clear the canvas
// Draw the line
t.beginPath();t.moveTo(e,0);t.lineTo(e,E.height);t.stroke()}
// get coordinate of x,y when click in the canvas, and what ever happen in the canvas. will be run in here
E.addEventListener("mousedown",function(e){D(E,e);
//find the depth point
if(c.length<2){if(X.checked==true){var t=[];let e=confirm('Confirm or deny');if(e==true){lastx=u.length-1;lasty=s.length-1;if(c.length==0){var n=prompt("Enter max depth value");t.push(Number(n),u[lastx],s[lasty]);c.push(t);T("black",u[lastx],s[lasty],0);firstX=lastx;alert("Click at the minimum depth point on the graph.")}else{var n=prompt("Enter min depth value");t.push(Number(n),u[firstX],s[lasty]);c.push(t);
//calculate high of the depth point
g=c[0][0]-c[1][0];x=c[1][2]-c[0][2];w=x/g;
// console.log(maxdepth2)
for(var a=0;a<g+1;a++){T("black",c[0][1],c[0][2]+w*a,0,a)}R(c[0][1],c[0][2],c[1][1],c[1][2])}}}}
//find the pipelevel, groundlevel and length
if(A.checked==true){lastx=u.length-1;lasty=s.length-1;if(M==B){let e=confirm('Confirm or deny');if(e==true){M=M+1;p.push([u[lastx],s[lasty]]);T("yellow",u[lastx],s[lasty],M);
// console.log('pipelevel',pipelevel)
if(p.length>1){R(p[M-2][0],p[M-2][1],p[M-1][0],p[M-1][1])}
//draw horizontal line
R(p[M-1][0],0,p[M-1][0],E.height)}if(b.length>0){if(p[p.length-1][0]>y[y.length-1][0]&&p[p.length-1][0]<y[y.length-1][1]){if(M!=B){T("green",p[p.length-1][0],p[p.length-1][1],.5);len=b.length-1;I=q(y[len][0],y[len][1],b[len][0],b[len][1]);alert('pipe length value for current point is '+I.toFixed(2));F=1}
//this variable is used in calculate length
}}}else{let e=confirm('Confirm or deny');if(e==true){
//check wheter the ground point is true or not
if(u[lastx]>p[M-1][0]+3||u[lastx]<p[M-1][0]-3){alert("Please pinpoint ground level first")}else{B=B+1;d=[];l=[];h.push([u[lastx],s[lasty]]);T("blue",u[lastx],s[lasty],B);T("yellow",p[p.length-1][0],p[p.length-1][1],.5);d.push(j(s[lasty]));if(I==0&&F==0){I=prompt("Insert pipe length value")}else{len=b.length-1;I=q(y[len][0],y[len][1],b[len][0],b[len][1]);F=0}m.push(j(p[M-1][1]));
//console.log('pipelevel',pipelevel)
var l=m.concat(d);v.push([l[0],l[1],Number(I)]);
// console.log('data:',data)
//draw line for each point
if(h.length>1){R(h[M-2][0],h[M-2][1],h[M-1][0],h[M-1][1])}
//create table and insert data
const r=document.getElementById("myTableBody");table_data=v;
// Start removing from the last row to the first one
while(r.firstChild){r.removeChild(r.firstChild)}for(let t=0;t<table_data.length;t++){const i=r.insertRow();const o=i.insertCell(0);o.innerHTML=t+1;for(let e=0;e<table_data[t].length;e++){const f=i.insertCell(e+1);num=Math.round(table_data[t][e]*100)/100;f.innerHTML=num.toFixed(2)}}I=0,m=[]}}}}
//find length based on last point
if(P.checked==true){getcoord=u.length-1;
//calculate pipe length value automatically
if(s[getcoord]>0){let e=confirm('Confirm or deny');if(e==true){if(C.length==0){C.push(u[getcoord],s[getcoord]);_=Number(prompt("1st pipelength value"))}else{k.push(u[getcoord],C[1]);while(N==0){N=Number(prompt("2nd pipelength value"));if(N==0){alert("Please insert pipelength value")}}if(p.length>0){I=q(C[0],k[0],_,N)}
//store x coordinate for length and its value
y.push([C[0],k[0]]);b.push([_,N]);C=[],k=[],N=0;P.checked=false,A.checked=true}}}}});
//generate report
let saveFile=()=>{var e=[],t=[],n=[];
//convert array to \t
for(var a=0;a<v.length;a++){t=[];for(var l=0;l<v[a].length;l++){num=Math.round(v[a][l]*100)/100;if(l==0){t.push('\n'+num.toFixed(2))}else if(l==1){t.push(num.toFixed(2))}else if(a==v.length-1&&l==v[a].length-1){t.push(num.toFixed(2)+':,')}else{t.push(num.toFixed(2)+':')}}n.push(t)}
//convert to 1d array
for(var a=0;a<v.length;a++){e=e.concat(n[a])}
// console.log('newArr',newArr)
var r=e.toString().replaceAll(",","\t");var r=r.toString().replaceAll(":\t","");
// console.log('savedata1:\n',savedata1)
let i='p_level\t'+'g_level\t'+'length';const o=new Blob([i,r],{type:'text/plain'});const f=prompt("Insert file name?");alert(v.length+" points have been exported");let u=document.createElement("a");u.download=f;if(window.webkitURL!=null){u.href=window.webkitURL.createObjectURL(o)}else{u.href=window.URL.createObjectURL(o);u.style.display="none";document.body.appendChild(u)}u.click()};n();