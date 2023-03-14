
const canvasElem = document.getElementById("myCanvas");
const ctx = canvasElem.getContext('2d');
const off_pbtn = document.querySelector("#off_p");
const off_lbtn = document.querySelector("#off_l");
const textFileInput  = document.getElementById('textInput');
var ground = [],pipe = [], chainage =[], newI=[], data =[];

var pipe_pixel =[], ground_pixel=[], d = 0, asb = 0
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
  //to find where the new asbuilt has been inserted
  var r =0 , k =0
  // Start removing from the last row to the first one
  while(tableBody.firstChild)
  {
    tableBody.removeChild(tableBody.firstChild);
  }
  for (let i = 0; i < table_data.length; i++) 
  {
    r = r+1
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    if ( i == newI[k])
    {
      r = 0
      k = k + 1
    }

    if ( r != 0)
    {
      cell1.innerHTML = r;
      for (let j = 0; j < table_data[i].length; j++) {
        const cell2 = row.insertCell(j+1);
        num = Math.round(table_data[i][j] * 100) / 100
        cell2.innerHTML = num.toFixed(2);
      }
    }

    else if (r == 0)
    {
      drw = k + 1
      cell1.innerHTML = "Drawing "+ drw;
    }
    
  }
}

function drawcircle(color, a, b, no , i)
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

  if( no == 0.1)
  {
    ctx.fillStyle = "black";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    var name = i
    ctx.fillText(name, a - 15, b );
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

//draw vertical line
function drawLine(x, ch) {
  // Draw the line
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, canvasElem.height);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.fillStyle = "black"; // Set the fill color of the label
  ctx.font = "15px Arial"; // Set the font size and style of the label
  ctx.fillText("CH"+ch, x, 100); // Draw the label at the desired position
  ctx.stroke();
}

//find maximumm number of depth point
function higher(a,b)
{
  max1 = Math.max(...a.filter(value => !isNaN(value)))
  max2 = Math.max(...b.filter(value => !isNaN(value)))

  if (max1 > max2)
  {
    return max1
  }

  else
  {
    return max2
  }
}

//draw vertical line for each 300m of chainage
function draw_vertical()
{
  var m = 0
  for ( var i =0; i < pipe.length; i++)
  {
    if(isNaN(pipe[i]) == true)
    {
      asb = Math.floor(chainage[i - 1]) 
      drawLine(pipe_pixel[i - 1 - m][0], asb )
      m = m + 1
      
    }
  } 
}

function redraw()
{

  var max_chainage = Math.max(...chainage.filter(value => !isNaN(value))) - Math.min(...chainage.filter(value => !isNaN(value)))
  max_height = higher(pipe, ground)
  value_ycoord = 35
  var Y = 35
  maxcanvas_height = (max_height * value_ycoord) + Y

  myCanvas.width = (max_chainage * 5 ) + 200
  myCanvas.height = (maxcanvas_height + 100)
  reverse_level()
  draw_vertical()
}

function reverse_level()
{
  min_chainage = Math.min(...chainage.filter(value => !isNaN(value)))
  for(var i = 0; i< chainage.length; i++)
  {
    chainage[i] = Number((chainage[i] - min_chainage).toFixed(2))
  }
  pipe_pixel= pixel(pipe, chainage)
  ground_pixel= pixel(ground, chainage)

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
  min_height = Math.min(...pipe.filter(value => !isNaN(value)))
  if (min_height > 0)
  {
    min_height = 0
  }

  else
  {
    min_height = min_height * 35
  }

  for( var i = 0; i< a.length; i++)
  {
    if( isNaN(a[i]) == true || isNaN(b[i]) == true)
    {
      
    }
    else
    {
      valuex = (b[i] * value_xcoord) + X
      valuey = (a[i] * value_ycoord) + Y
      NewY = (myCanvas.height+ (min_height)) - valuey
      newboi.push([valuex,NewY])
    }     
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

    var r = 0, k = 0, latestI = 0
  for ( var i = 0; i < newboi.length; i++)
    {
      r = r + 1
      if( i == Math.abs( newI[k] - k))
      {
        latestI = newI[k] //41
        k = k + 1
        r = 1
      }   
      drawcircle("black", newboi[i][0], newboi[i][1], r)
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
    var totalasb =1
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

    for( var i = 0; i < pipe.length; i++)
    {
      if(isNaN(pipe[i]) == true)
      {
        newI.push(i)
        totalasb = totalasb + 1
        pipe[i] = 'a'
        ground[i] = 'a'
        chainage[i] = 'a'
      }
    }


    // console.log('pipe',pipe)
    // console.log('ground',ground)
    // console.log('chainage',chainage)
    drawTable()
    redraw()
    console.log('newI',newI)
    console.log('pipe.length',pipe.length)
    alert( pipe_pixel.length +" points have been inserted.\n" + totalasb +' Drawing' )
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


// canvasElem.addEventListener("mousedown", function(event) {
//     printMousePos(canvasElem,event)
//     redraw()
// }) 