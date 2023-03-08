// Retrieve the array from local storage
const pipecoord = JSON.parse(localStorage.getItem("pipecoord"));
const groundcoord = JSON.parse(localStorage.getItem("groundcoord"));
const trans_pipelength = JSON.parse(localStorage.getItem("trans_pipelength")).map(Number);
const c_width = JSON.parse(localStorage.getItem("c_width"));
const c_height = JSON.parse(localStorage.getItem("c_height"));
const canvasElem = document.getElementById("myCanvas");
const ctx = canvasElem.getContext('2d');
const off_pbtn = document.querySelector("#off_p");
const off_lbtn = document.querySelector("#off_l");

off_pbtn.checked = true
off_lbtn.checked = true
//setup canvas width and height based on last image
var myCanvas = document.getElementById("myCanvas");
if(c_width > 0)
{
    myCanvas.width =  Number(c_width);
    myCanvas.height = Number(c_height);
}

else
{
    myCanvas.width =  1000;
    myCanvas.height = 700;
}


function drawcircle(color, a, b, no)
{
  //draw circle
  var c = document.getElementById("myCanvas")
  var ctx = c.getContext("2d");

  if(off_pbtn.checked == true)
  {
    ctx.beginPath();
    ctx.arc(a, b, 4, 0, 2 * Math.PI*2);
    ctx.fillStyle =color
    ctx.fill()
    // ctx.stroke();
  }
  
  if(off_lbtn.checked == true)
  {
    ctx.fillStyle = "black";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    if( no  != 0)
    {
        if( no == 0.5)
        {
        
        }

        else
        {
        var name = "p" + Number(no)
        ctx.fillText(name, a - 22, b-10 );
        }
    }
  }
}

function drawline(x1,y1,x2,y2, color)
{
  var c = document.getElementById("myCanvas")
  if (c.getContext)
  {
    var context = c.getContext("2d");
    // Begin the path
    context.beginPath();

    context.lineCap = "round";
    // Starting point
    context.moveTo(x1, y1);

    // End point
    context.lineTo(x2, y2);

    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    // Stroke will make the line visible
    context.stroke();

  }
}

function redraw()
{
    //draw pipe depth
    for ( var i = 0; i < pipecoord.length; i++)
    {   
        drawcircle("black", pipecoord[i][0], pipecoord[i][1], i +1)
        //draw horizontal line
        if( i != pipecoord.length - 1)
        {
            drawline(pipecoord[i+1][0], pipecoord[i+1][1], pipecoord[i][0], pipecoord[i][1], "blue")
        }
    }

    //draw ground depth
    for (var i = 0; i < groundcoord.length; i ++)
    {
        drawcircle("black", groundcoord[i][0], groundcoord[i][1], i +1 )
        if (i!= groundcoord.length - 1)
        {
            drawline(groundcoord[i+1][0], groundcoord[i+1][1], groundcoord[i][0], groundcoord[i][1],"red")
        }
    }
}

off_pbtn.addEventListener("change", function(){
    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    redraw()
})

off_lbtn.addEventListener("change", function(){
    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    redraw()
})

redraw()



// canvasElem.addEventListener('mousemove', function(event) {

//     const x = event.offsetX;
//     ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
//     redraw()
// })

// canvasElem.addEventListener("mousedown", function(event) {
//     const x = event.offsetX;
//     ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
//     redraw()
// }) 