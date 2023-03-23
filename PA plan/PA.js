const canvas = document.getElementById("myCanvas");
const canvasElem = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const submit_XY = document.querySelector("#submit1");
const submit_data = document.querySelector("#submit2");
const generate = document.querySelector("#generate");
const undobtn = document.querySelector("#undo");
const editbtn = document.querySelector("#edit");
const addbtn = document.querySelector("#add");

var distance = 0, degree = 0, minute = 0, second =0 , XY = []
var data =[], point =[], ToDraw=[[5000,5000]]
edit_point = -1

//get coordinate when click
function printMousePos(canvas, event) 
{
    let x = event.offsetX;
    let y = event.offsetY;
  
    console.log("Coordinate x: " + x, "Coordinate y: " + y);
    // coordX.push(x)
    // coordY.push(y)
}

//draw circle
function drawcircle(a, b, no)
{
  //draw circle
  color = "white"
  var c = document.getElementById("myCanvas")
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(a, b, 4, 0, 2 * Math.PI*2);
  ctx.fillStyle = color
  ctx.fill()
  

  if (no != 0.5)
  {
    ctx.fillStyle = "white";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    var name = "p" + Number(no)
    ctx.fillText(name, a - 22, b-10 );
  }

  // else if ( no == 0.5)
  // {
  //   ctx.fillStyle = "black";
  //   ctx.font = "11px Arial";
  //   ctx.textAlign = "center";
  //   ctx.fillText(name, a - 22, b-10 );
  // }

  ctx.stroke();
 
}

function drawline(startX,startY,x,y)
{
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = 'white'
  ctx.stroke();

}

//create table function
function create_table()
{
  //create table and insert data
  const tableBody = document.getElementById("myTableBody");
  table_data = data

  // Start removing from the last row to the first one
  while(tableBody.firstChild)
  {
    tableBody.removeChild(tableBody.firstChild);
  }
  for (let i = 0; i < table_data.length; i++) 
  {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    cell1.innerHTML = i+1;
    
    for (let j = 0; j < table_data[i].length; j++) {
      const cell2 = row.insertCell(j+1);
      num = Math.round(table_data[i][j] * 100) / 100
      cell2.innerHTML = num.toFixed(2);
    }
  }

}

function redraw()
{
    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    drawScene()
    //draw point
    for(var i = 0; i < ToDraw.length; i++)
    {
        drawcircle(ToDraw[i][0], ToDraw[i][1], i)
    }

    //draw line
    if( ToDraw.length > 1)
    {
        for(var i = 0; i < ToDraw.length - 1; i++)
        {
            startX = ToDraw[i][0]
            startY = ToDraw[i][1]
            x = ToDraw[i+1][0]
            y = ToDraw[i+1][1]

            drawline(startX, startY, x, y)     
        }
    }
    
    drawScene()
    create_table()
}

// Draw the scene with the camera at its current position
function drawScene() {
  // The position we want to move the camera to
  len = ToDraw.length - 1
  var targetX = ToDraw[len][0] ,targetY = ToDraw[len][1];
  var container = document.getElementById("canvas-wrapper");
  var containerX = targetX - canvas.offsetLeft - 300;
  var containerY = targetY - canvas.offsetTop - 100;

  container.scrollLeft = containerX;
  container.scrollTop = containerY;

}

undobtn.addEventListener("click",function(){
  if(ToDraw.length > 1)
  {
    data.pop()
    point.pop()
    ToDraw.pop()
    redraw()
  }

  else
  {
    alert("Nothing to Undo")
  }
})

editbtn.addEventListener("click",function(){
  edit_point = prompt("Point no?") - 1

  if(edit_point> point.length || edit_point < 0)
  {
    edit_point = -1
    alert("point does not exist")
  }

  else
  {
    //return value form to ""
    document.getElementById("distance").value = data[edit_point][0];
    document.getElementById("degree").value= data[edit_point][1];
    document.getElementById("minute").value= data[edit_point][2];
    document.getElementById("second").value= data[edit_point][3];

  }
})

addbtn.addEventListener("click",function(){
  
})
  //submit coordinate (X,Y)
submit_XY.addEventListener("click", function(){
  xaxis = parseInt(document.getElementById("X").value);
  yaxis = parseInt(document.getElementById("Y").value);
  XY = [xaxis,yaxis]
  console.log('XY',XY)
})


//submit data
submit_data.addEventListener("click", function(){

    distance = parseInt(document.getElementById("distance").value);
    degree = parseInt(document.getElementById("degree").value);
    minute = parseInt(document.getElementById("minute").value);
    second = parseInt(document.getElementById("second").value);
    
    if(edit_point != -1)
    {
      data[edit_point] = [distance,degree,minute,second]
    }

    else
    {
      data.push([distance,degree,minute,second])
    }
    console.log('data',data)

    // Convert degree, minute, and second to decimal degrees
    const decimalDegree = degree + (minute / 60) + (second / 3600);

    // Convert decimal degrees to radians
    const radians = (decimalDegree - 90 ) * Math.PI /180;
    //create starting point

    if( data.length == 1)
    {
        var x = ToDraw[0][0] + distance * 5 * Math.cos(radians);
        var y = ToDraw[0][1] + distance * Math.sin(radians);
    }

    else
    {
        len = point.length - 1
        var x = point[len][0] + distance * Math.cos(radians);
        var y = point[len][1] + distance * Math.sin(radians);
    }

    // Calculate end point coordinates
    if(edit_point != -1)
    {
      point[edit_point] = [x,y]
      ToDraw[edit_point+1] = [x,y]
      edit_point = -1
    }

    else
    {
      point.push([x,y])
      ToDraw.push([x,y])
    }


    //return value form to ""
    document.getElementById("distance").value = "";
    document.getElementById("degree").value= "";
    document.getElementById("minute").value= "";
    document.getElementById("second").value= "";
    redraw()
    
})

//generate.ahk file
generate.addEventListener("click", function(){

})


canvasElem.addEventListener("mousedown", function(e)
{
  printMousePos(canvasElem, e);
  
})