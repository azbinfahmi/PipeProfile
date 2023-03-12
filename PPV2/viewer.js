
const canvasElem = document.getElementById("myCanvas");
const ctx = canvasElem.getContext('2d');
const off_pbtn = document.querySelector("#off_p");
const off_lbtn = document.querySelector("#off_l");
const textFileInput  = document.getElementById('textInput');
var ground = [],pipe = [], chainage =[], data =[];

var pipe_pixel =[], ground_pixel=[], d = 0
off_pbtn.checked = false
off_lbtn.checked = false

//setup canvas width and height based on last image
var myCanvas = document.getElementById("myCanvas");


function printMousePos(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log("Coordinate x: " + x, "Coordinate y: " + y);
}

function drawTable()
{
  data =[]
  //insert data
  for(var i =0; i < pipe.length; i++)
  {
    data.push([pipe[i],ground[i],chainage[i]])
  }
  //insert table data
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
function drawcircle(color, a, b, no)
{
  //draw circle
  var c = document.getElementById("myCanvas")
  var ctx = c.getContext("2d");

  if(off_pbtn.checked == true)
  {
    ctx.beginPath();
    ctx.arc(a, b, 3, 0, 2 * Math.PI*2);
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
    ctx.lineWidth = 3;
    // Stroke will make the line visible
    context.stroke();

  }
}

function redraw()
{

  max_chainage = Math.max(...chainage) - Math.min(...chainage)
  max_height = Math.max(...ground)
  
  if((max_chainage *4) + 100 > myCanvas.width)
  {
      myCanvas.width = (max_chainage * 5 ) + 900
      myCanvas.height = (max_height + 500) * 2
  }
  reverse_level()
}

function reverse_level()
{
  //   total_depth = maxdepth2[0][0] - maxdepth2[1][0]
  // total_pixel = maxdepth2[1][2] - maxdepth2[0][2]
  // calc = total_pixel / total_depth
  // value_y_coord = (maxdepth2[0][0]*calc) + maxdepth2[0][2] - (actual * calc)

  //depth point = 1m = 35pix
  //chainage 25m = 275pix, jadi 1m = 100/25 = 4 (so, 1m ch = 4pix)
  // klaua starting chainage bukan dari 0, semua number dalam length kena tolak number paling min dalam array length

  //cari min number untuk chainage
  min_chainage = Math.min(...chainage)
  for(var i = 0; i< chainage.length; i++)
  {
    chainage[i] = Number((chainage[i] - min_chainage).toFixed(2))
  }
  max_chainage = Math.max(...chainage)
  pipe_pixel= pixel(pipe, chainage)
  ground_pixel= pixel(ground, chainage)

  // ground_pixel= pixel(ground, chainage)
  // console.log('chainage after',chainage)
  // console.log('pipe_pixel',pipe_pixel)
  // console.log('ground_pixel',ground_pixel)

}

 function pixel(a, b)
 {
  var newboi =[]
  value_xcoord = 5
  value_ycoord = 35
  var X = 115
  var Y = 35

  for( var i = 0; i< a.length; i++)
  {
    valuex = (b[i] * value_xcoord) + X
    valuey = (a[i] * value_ycoord) + Y
    NewY = (myCanvas.height/1.5) - valuey

    newboi.push([valuex,NewY])
  }

  if(d == 0)
    {
      color = "blue"
      d=1
    }

    else
    {
      color = "red"
      d =0
    }

  for ( var i = 0; i < newboi.length; i++)
    {   
      drawcircle("black", newboi[i][0], newboi[i][1], i +1)
      //draw horizontal line
      if( i != newboi.length - 1)
      {
          drawline(newboi[i+1][0], newboi[i+1][1], newboi[i][0], newboi[i][1], color)
      }
    }
  return newboi

 }

 textFileInput.addEventListener('change', () => {
  ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
  const file = textFileInput.files[0];
  const reader = new FileReader();

  reader.readAsText(file);

  reader.onload = () => {
    pipe=[], ground =[], chainage =[]
    const fileContents = reader.result;
    const lines = fileContents.split('\n');

    for (let i = 1; i < lines.length; i++) { // start at i = 1 to skip header row
      const columns = lines[i].split('\t');

      if (columns.length === 3) {
        pipe.push(Number(columns[0]));
        ground.push(Number(columns[1]));
        chainage.push(Number(columns[2]));
      }
    }
    
    alert( pipe.length +" points have been inserted." )
    drawTable()
    redraw()
  };
});


off_pbtn.addEventListener("change", function(){
    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    redraw()
})

off_lbtn.addEventListener("change", function(){
    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    redraw()
})


canvasElem.addEventListener("mousedown", function(event) {
    printMousePos(canvasElem,event)
    redraw()
}) 