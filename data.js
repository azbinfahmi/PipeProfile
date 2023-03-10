var coordX = [], coordY= [], Xaxis =[], Yaxis=[], maxdepth2=[], pipelevel=[], 
groundlevel=[], data=[],pipecoord=[],groundcoord=[],lenx=[],leny=[], save_length=[], save_values=[];
//for undo button
var undoDepth =[]
var total_depth, total_pixel,calc, trans_pipecoord =[], trans_groundcoord =[], trans_pipelength =[];
var arr_valueFirst =[], arr_valueSecond =[], valueFirst=0, valueSecond=0, checking = 0
var pipelength = 0, mark1 = 0, mark2 = 0, markclone1 =0, markclone2 = 0,  shortcut = 0;
var myImage, Scale
var edit_row = -1, del = -1,c_width=0, c_height =0, edit_what = 0
const undobtn = document.querySelector("#undo");
const lengthbtn = document.querySelector("#length");
const depthbtn = document.querySelector("#checkX");
const pointbtn = document.querySelector("#Points");
const HHbtn = document.querySelector("#H_helper")
const LHbtn = document.querySelector("#L_helper")
const opnbtn = document.querySelector("#open")
const editbtn = document.querySelector("#edit")
const delbtn = document.querySelector("#delete")
const addbtn = document.querySelector("#add")

const canvasElem = document.getElementById("myCanvas");
const ctx = canvasElem.getContext('2d');

depthbtn.checked = true;


//Load and display the image into canvas
function Load_Image()
{
  let imgInput = document.getElementById('imageInput');
  imgInput.addEventListener('change', function(e) {
    const reader = new FileReader();
    if(e.target.files )
    {
      Scale = Number(prompt("Add a scale to the image","1"))
      if (Scale == 0)
      {
        Scale = 1
      }
      let imageFile = e.target.files[0]; //here we get the image file
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) 
      {
        myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object
        myImage.onload = function() {
          var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object
          var myContext = myCanvas.getContext("2d"); // Creates a contect object
          myCanvas.width = myImage.width*Scale ; // Assigns image's width to canvas
          myCanvas.height = myImage.height*Scale; // Assigns image's height to canvas
          myContext.drawImage(myImage,0,0, myImage.width *Scale, myImage.height *Scale); // Draws the image on canvas
          c_height = myCanvas.height
          c_width = myCanvas.width
        }
      }

      //use for retrieve
      c_height = myCanvas.height
      c_width = myCanvas.width
    }
  });
}

//get coordinate when click
function printMousePos(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log("Coordinate x: " + x, "Coordinate y: " + y);
  coordX.push(x)
  coordY.push(y)
  lenx.push(x)
  leny.push(y)
  }

//draw circle function
function drawcircle(color, a, b, no , i)
{
  //draw circle
  var c = document.getElementById("myCanvas")
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(a, b, 4, 0, 2 * Math.PI*2);
  ctx.fillStyle =color
  ctx.fill()
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

  else if ( no == 0)
  {
    if(maxdepth2.length == 1)
    {
      name = maxdepth2[0][0]
    }

    else
    {
      name = maxdepth2[0][0] - i
    }
   
    ctx.fillText(name, a - 30, b + 3 );
  }
  
  ctx.stroke();
}

//draw constant circle
function drawConstantCircle(event)
{
  let rect = canvasElem.getBoundingClientRect();
  // Get mouse position
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  if ( mark1 == mark2 && maxdepth2.length == 2 && pointbtn.checked == true)
  {
    color= "yellow";

    if(edit_row >= 0)
    {
      if(markclone1 > markclone2 && maxdepth2.length == 2 && pointbtn.checked == true)
      {
        color="blue"
      }
    }
    
  }

  else if ( (mark1> mark2 && maxdepth2.length == 2 && pointbtn.checked == true) || (markclone1> markclone2 && maxdepth2.length == 2 && pointbtn.checked == true))
  {
    color= "blue";

    if(edit_row >= 0)
    {
      if(markclone1 == markclone2 && maxdepth2.length == 2 && pointbtn.checked == true)
      {
        color="yellow"
      }
    }
  }

  else
  {
    color = "black"
  }
  // Draw circle at mouse position
  radius = 4
  ctx.beginPath();
  ctx.fillStyle = color
  ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke()
}
//draw line
function drawline(x1,y1,x2,y2)
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

    // Stroke will make the line visible
    context.stroke();

  }
}

//draw horrizontal line
function drawLine(x) {
  // Draw the line
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, canvasElem.height);
  ctx.stroke();
}

//draw point to next point
function drawpoint_to_point(event)
{
  let rect = canvasElem.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  leng1 = pipecoord.length - 1
  leng2 = groundcoord.length - 1

  if ( edit_row >= 0)
  {
    if(edit_row == 0)
    {
      if (markclone1 == markclone2)
      {
        if(edit_row < pipecoord.length)
        {
          ctx.beginPath();
          ctx.moveTo(pipecoord[edit_row +1 ][0], pipecoord[edit_row + 1][1]);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }

      else
      {
        if(edit_row<groundcoord.length)
        {
          ctx.beginPath();
          ctx.moveTo(groundcoord[edit_row +1 ][0], groundcoord[edit_row + 1][1]);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }
    }

    else if (edit_row != 0)
    {
      if(markclone1 == markclone2)
      {
        ctx.beginPath();
        ctx.moveTo(pipecoord[edit_row -1 ][0], pipecoord[edit_row - 1][1]);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();

        if( edit_row +1 < pipecoord.length)
        {
          ctx.beginPath();
          ctx.moveTo(pipecoord[edit_row +1 ][0], pipecoord[edit_row + 1][1]);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
        
      }

      else
      {
        ctx.beginPath();
        ctx.moveTo(groundcoord[edit_row -1 ][0], groundcoord[edit_row - 1][1]);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();

        if(edit_row +1 < groundcoord.length)
        {
          ctx.beginPath();
          ctx.moveTo(groundcoord[edit_row +1 ][0], groundcoord[edit_row + 1][1]);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
        
      }
    }
    
  }

  else if ( mark2 > 0)
  {
    if ( mark1 == mark2)
    {
      ctx.beginPath();
      ctx.moveTo(pipecoord[leng1][0], pipecoord[leng1][1]);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
    }

    else
    {
      ctx.beginPath();
      ctx.moveTo(groundcoord[leng2][0], groundcoord[leng2][1]);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
    }
  }


}
//levelling
function level(y)
{
  total_depth = maxdepth2[0][0] - maxdepth2[1][0]
  total_pixel = maxdepth2[1][2] - maxdepth2[0][2]
  calc = total_pixel / total_depth
  var value = y- maxdepth2[0][2]
  var total = maxdepth2[0][0] - (value / calc)
  return total
}

//used in edit point in table
function reverse_level(x,actual)
{
  total_depth = maxdepth2[0][0] - maxdepth2[1][0]
  total_pixel = maxdepth2[1][2] - maxdepth2[0][2]
  calc = total_pixel / total_depth
  value_y_coord = (maxdepth2[0][0]*calc) + maxdepth2[0][2] - (actual * calc)
  
  return newvalue =[x,value_y_coord]
}

//undo button for depth point
function depth_undo()
{
  if (pipecoord.length == 0 && groundcoord.length == 0)
  {
    pointbtn.checked = false
    lengthbtn.checked = false
    //delete last point of the array
    maxdepth2.pop()
    if (maxdepth2.length == 1)
    {
      drawcircle("black", maxdepth2[0][1], maxdepth2[0][2], 0)
    }
  }

  else 
  {
    drawline(maxdepth2[0][1], maxdepth2[0][2], maxdepth2[1][1], maxdepth2[1][2])
    for (var i= 0; i < total_depth + 1 ; i++ )
    {
      drawcircle("black", maxdepth2[0][1], maxdepth2[0][2] + (calc * i), 0 ,i)
    }
  }
}
//undo for point
function point_undo()
{
  if (edit_row >= 0)
  {
    if (markclone1 > markclone2)
    {
      pipecoord[edit_row] = []
      markclone1 = markclone2
    }
  }

  else
  {
    if (mark1 > mark2)
    {
      //undo untuk pipe depth
      pipelevel = []
      pipecoord.pop()
      mark1 = mark1 - 1   
    }

    else if (mark1 == mark2 && pipecoord.length > 0)
    {
      //undo untuk ground depth
      groundcoord.pop()
      mark2 = mark2 - 1
      data.pop()
      const tableBody = document.getElementById("myTableBody");
      table_data = data

      while(tableBody.firstChild)
      {
        tableBody.removeChild(tableBody.firstChild);
      }
      if(data.length > 0)
      {
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
    }
  }
  
  for (var i = 0; i < groundcoord.length; i ++)
  {
    drawcircle("blue", groundcoord[i][0], groundcoord[i][1], i +1 )
    if (i!= groundcoord.length - 1)
    {
      drawline(groundcoord[i+1][0], groundcoord[i+1][1], groundcoord[i][0], groundcoord[i][1])
    }
  }

  for ( var i = 0; i < pipecoord.length; i++)
  {
    drawcircle("yellow", pipecoord[i][0], pipecoord[i][1], i +1)
    //draw horizontal line
    if( i != pipecoord.length - 1)
    {
      drawline(pipecoord[i+1][0], pipecoord[i+1][1], pipecoord[i][0], pipecoord[i][1])

    }
    drawline(pipecoord[i][0], 0, pipecoord[i][0], canvasElem.height )
  }

  //check if point can be calculated
  if (save_values.length > 0 && pipecoord.length > 0)
  {
    
    if((pipecoord[pipecoord.length-1][0] > save_length[save_length.length-1][0]) && (pipecoord[pipecoord.length-1][0] < save_length[save_length.length-1][1]))
    {
      if(mark1!= mark2)
      {
        drawcircle("green",pipecoord[pipecoord.length-1][0],pipecoord[pipecoord.length-1][1], mark1)
      }
      //this variable is used in calculate length
      shortcut = 1
    }        
  }
}

function calc_length(arr_valueFirst, arr_valueSecond, valueFirst, valueSecond)
{
  var pix_diff = arr_valueSecond - arr_valueFirst;// 120 - 100 = 20
  var val_diff =  valueSecond - valueFirst;//50 - 20 = 30
  var pipedepth_to_pipelength = arr_valueSecond - pipecoord[mark1-1][0]; // 120 - 108 = 12
  var value_total = (val_diff / pix_diff) * pipedepth_to_pipelength; // 30/20 = 1.5 * 12 = 18
  var final_ans = valueSecond - value_total;
  return final_ans
}

//calculate length for edited table
function calc_length_edit(arr_valueFirst, arr_valueSecond, valueFirst, valueSecond)
{
  var pix_diff = arr_valueSecond - arr_valueFirst;// 120 - 100 = 20
  var val_diff =  valueSecond - valueFirst;//50 - 20 = 30
  var pipedepth_to_pipelength = arr_valueSecond - pipecoord[edit_row][0]; // 120 - 108 = 12
  var value_total = (val_diff / pix_diff) * pipedepth_to_pipelength; // 30/20 = 1.5 * 12 = 18
  var final_ans = valueSecond - value_total;
  return final_ans
}

//redraw everything
function redraw()
{
  //draw the inserted image
  if (Scale > 0)
  {
    ctx.drawImage(myImage,0,0, myImage.width *Scale, myImage.height *Scale);
  }
  //draw depth point scale
  if (maxdepth2.length > 0)
  {
    if (maxdepth2.length == 1)
    {
      drawcircle("black", maxdepth2[0][1], maxdepth2[0][2],0)
    }
    else 
    {
      drawline(maxdepth2[0][1], maxdepth2[0][2], maxdepth2[1][1], maxdepth2[1][2])
      for (var i= 0; i < total_depth + 1 ; i++ )
      {
        drawcircle("black", maxdepth2[0][1], maxdepth2[0][2] + (calc * i), 0,i)
      }
    }
  }

  transf()

  //draw pipe depth
  for ( var i = 0; i < pipecoord.length; i++)
  {
    drawcircle("yellow", pipecoord[i][0], pipecoord[i][1], i +1)
    //draw horizontal line
    if( i != pipecoord.length - 1)
    {
      drawline(pipecoord[i+1][0], pipecoord[i+1][1], pipecoord[i][0], pipecoord[i][1])

    }
    drawline(pipecoord[i][0], 0, pipecoord[i][0], canvasElem.height )
  }
  //draw ground depth
  for (var i = 0; i < groundcoord.length; i ++)
  {
    drawcircle("blue", groundcoord[i][0], groundcoord[i][1], i +1 )
    if (i!= groundcoord.length - 1)
    {
      drawline(groundcoord[i+1][0], groundcoord[i+1][1], groundcoord[i][0], groundcoord[i][1])
    }
  }

  //check if point can be calculated
  if (save_values.length > 0 && pipecoord.length > 0)
  {
    if((pipecoord[pipecoord.length-1][0] > save_length[save_length.length-1][0]) && (pipecoord[pipecoord.length-1][0] < save_length[save_length.length-1][1]))
    {
      if(mark1!= mark2)
      {
        drawcircle("green",pipecoord[pipecoord.length-1][0],pipecoord[pipecoord.length-1][1], mark1)
      }
      //this variable is used in calculate length
      shortcut = 1
    }
    
    if(edit_row >= 0)
    {
      if((pipecoord[edit_row][0] > save_length[save_length.length-1][0]) && (pipecoord[edit_row][0] < save_length[save_length.length-1][1]))
      {
        if(markclone1!= markclone2)
        {
          drawcircle("green",pipecoord[edit_row][0],pipecoord[edit_row][1], edit_row +1)
        }
        //this variable is used in calculate length
        shortcut = 1
      }
    }
  }

  //draw calc length
  if(arr_valueFirst.length > 0)
  {
    drawcircle("purple",arr_valueFirst[0],arr_valueFirst[1], 0.5)
    drawcircle("purple",arr_valueSecond[0],arr_valueSecond[1], 0.5)

    drawline(arr_valueFirst[0],arr_valueFirst[1],arr_valueSecond[0],arr_valueSecond[1])
  }

  // Start removing from the last row to the first one
  const tableBody = document.getElementById("myTableBody");
  table_data = data
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

//retrieve data
function transf()
{
  //save pipelength, ground coord and pipe coord to insert into another html
  trans_pipelength =[]
  for(var i = 0; i < data.length; i++)
  {
    trans_pipelength.push(data[i][2])
  }

  localStorage.setItem("trans_pipelength", JSON.stringify(trans_pipelength));
  localStorage.setItem("pipecoord", JSON.stringify(pipecoord));
  localStorage.setItem("groundcoord", JSON.stringify(groundcoord));
  localStorage.setItem("c_height", JSON.stringify(c_height));
  localStorage.setItem("c_width", JSON.stringify(c_width));
}
//alert when tick the depth point button
depthbtn.addEventListener('change',function(){

  if (pointbtn.checked == true || lengthbtn.checked == true)
  {
    depthbtn.checked = true
  }

  else if (maxdepth2.length == 2)
  {
    depthbtn.checked = true
  }

  
  else if(depthbtn.checked == true)
  {
    // if (maxdepth2.length == 0)
    // {
    //   alert("Click at the maximum depth point on the graph.")
    // }

    // else
    // {
    //   alert("Click at the minimum depth point on the graph.")
    // }
  }

})

//alert when tick the point button
pointbtn.addEventListener('change',function(){
  if (pointbtn.checked == true)
  {
    lengthbtn.checked = false
    if(maxdepth2.length != 2)
    {
      alert("Find the depth point first")
      pointbtn.checked = false
      depthbtn.checked = true
    }
  }
})

//turn off point button when length button is clicked
lengthbtn.addEventListener('change',function(){
  if (lengthbtn.checked == true)
  {
    if(maxdepth2.length != 2)
    {
      alert("Find the depth point first")
      lengthbtn.checked = false
      depthbtn.checked = true
    }
    else
    {
      pointbtn.checked = false
    }
  }
})

//undo button
undobtn.addEventListener("click", function(){

  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  // clear the specific arc
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // redraw Image
  if(myImage != null)
  {
    ctx.drawImage(myImage,0,0, myImage.width *Scale, myImage.height *Scale);
  }
  //undo the depth
  if (maxdepth2.length == 0)
  {
    alert("Nothing to undo")
  }

  depth_undo()

  //undo point
  point_undo()

  redraw()
});

//edit point
editbtn.addEventListener("click", function(){
  edit_row = -1
  edit_row = prompt("Edit Point no?") - 1

  if (edit_row >= data.length)
  {
    alert("Point does not exist")
    edit_row = -1
  }

  else if ( edit_row < 0)
  {
    alert("Point does not exist")
    edit_row = -1
  }

  else
  {

    edit_what = 0
    while( edit_what == 0)
    {
      edit_what = Number(prompt("Enter 1 for edit point's value by insert new value or Enter 2 for edit point's value by adjusting points in canvas", 1))

      if(edit_what != 1 && edit_what != 2)
      {
        alert("Please enter 1 or 2")
        edit_what = 0
      }
    }

    //edit table by insert value
    if(edit_what == 1)
    {
      new_pipe = Number(prompt("Pipe depth value", data[edit_row][0].toFixed(2)))
      new_ground = Number(prompt("Ground depth value", data[edit_row][1].toFixed(2) ))
      new_length = data[edit_row][2]

      data[edit_row] = [new_pipe, new_ground, new_length]

      new_pipecoord = reverse_level(pipecoord[edit_row][0], new_pipe+ 0.000001)
      new_groundcoord = reverse_level(groundcoord[edit_row][0], new_ground+ 0.000001)

      pipecoord[edit_row] = new_pipecoord
      groundcoord[edit_row] =new_groundcoord

      edit_row = -1
      ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
      redraw()
    }

    else if (edit_what ==2)
    {
      pipecoord[edit_row] = []
      groundcoord[edit_row] =[]
      data[edit_row] = []
      ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
      redraw()
    }
    
   
  }

})

//delete point
delbtn.addEventListener("click", function(){
  del = -1
  del = prompt("Delete point no?") - 1
  if (del >= data.length)
  {
    alert("Point does not exist")
    del = -1
  }

  else if ( del < 0)
  {
    alert("Point does not exist")
    del = -1
  }

  else
  {
    pipecoord.splice(del,1)
    groundcoord.splice(del,1)
    data.splice(del,1)
    const tableBody = document.getElementById("myTableBody");
    table_data = data
  
    while(tableBody.firstChild)
    {
      tableBody.removeChild(tableBody.firstChild);
    }
    if(data.length > 0)
    {
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
    mark1 = mark1 - 1
    mark2 = mark2 - 1
    redraw()
  }
  
})

addbtn.addEventListener("click", function(){
  edit_row = -1
  edit_row = Number(prompt("Add new point before point no?")) - 1

  if (edit_row >= data.length)
  {
    alert("Point does not exist")
    edit_row = -1
  }

  else if ( edit_row < 0)
  {
    alert("Point does not exist")
    edit_row = -1
  }

  else
  {
    pipebaru = []
    groundbaru = []
    databaru=[]

    for( i = 0; i< pipecoord.length; i++)
    {
      pipebaru[i] = pipecoord[i]
    }

    for( i = 0; i< groundcoord.length; i++)
    {
      groundbaru[i] = groundcoord[i]
    }

    for( i = 0; i< data.length; i++)
    {
      databaru[i] = data[i]
    }

    pipecoord.push([])
    groundcoord.push([])
    data.push([])
    mark1 = mark1 + 1
    mark2 = mark2 + 1
    //add pipecoord length
    function addnew(pipecoord, pipebaru)
    {
      for (var i = 0; i< pipecoord.length; i++)
      {
        if (edit_row == i)
        {
           
          pipecoord[i] = []
        }
  
        else if (i < edit_row )
        {
          pipecoord[i]= pipebaru[i]
        }
  
        else
        {
          pipecoord[i] = pipebaru[i-1]
        }
      }
    }
   
    addnew(pipecoord, pipebaru)
    addnew(groundcoord, groundbaru)
    addnew(data, databaru)

    ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    redraw()
  }

})

//make vertical line
canvasElem.addEventListener('mousemove', function(event) {

  //horrizontal line
  const x = event.offsetX;
  ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
  redraw()
  if (depthbtn.checked == true)
  { 
    drawConstantCircle(event)
  }
  //horinzontal assist
  if (HHbtn.checked == true)
  {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasElem.height);
    ctx.stroke();
  }

  if(LHbtn.checked == true && pointbtn.checked == true)
  {
    drawpoint_to_point(event)
  }

  transf()
});

// get coordinate of x,y when click in the canvas, and what ever happen in the canvas. will be run in here
canvasElem.addEventListener("mousedown", function(e)
{
  printMousePos(canvasElem, e);
  //find the depth point
  if(maxdepth2.length < 2)
  {
    if (depthbtn.checked == true)
    {
      var maxdepth=[]
      let bar = confirm('Confirm or deny');
      if (bar == true)
      {
        lastx = coordX.length - 1
        lasty = coordY.length - 1
        if (maxdepth2.length == 0)
        {
          var depth = prompt("Enter max depth value")
          maxdepth.push(Number(depth), coordX[lastx], coordY[lasty])
          maxdepth2.push(maxdepth)
          drawcircle("black", coordX[lastx], coordY[lasty], 0)
          firstX = lastx
          // alert("Click at the minimum depth point on the graph.")
        }
        else
        {
          var depth = prompt("Enter min depth value")
          maxdepth.push(Number(depth), coordX[firstX], coordY[lasty])
          maxdepth2.push(maxdepth)

          //calculate high of the depth point
          total_depth = maxdepth2[0][0] - maxdepth2[1][0]
          total_pixel = maxdepth2[1][2] - maxdepth2[0][2]
          calc = total_pixel / total_depth
          // console.log(maxdepth2)
          for (var i= 0; i < total_depth + 1 ; i++ )
          {
            drawcircle("black", maxdepth2[0][1], maxdepth2[0][2] + (calc * i), 0, i)
          }
          
          drawline(maxdepth2[0][1], maxdepth2[0][2], maxdepth2[1][1], maxdepth2[1][2])         
        }
      }     
    }
  }

  //find the pipelevel, groundlevel and pipe length
  if (pointbtn.checked == true)
  {
    lastx = coordX.length - 1
    lasty = coordY.length - 1

    // this condition will run if user click on edit button
    if (edit_row >= 0)
    {
      if (markclone1 == markclone2)
      {
        
        let bar = confirm('Confirm or deny');
        if (bar == true)
        {
          markclone1 =markclone1+1
          pipecoord[edit_row] = [coordX[lastx], coordY[lasty]]
          drawcircle("yellow", coordX[lastx], coordY[lasty], edit_row+1)
          // console.log('pipelevel',pipelevel)

          //draw line from previous point to current point 
          if(edit_row > 1)
          {
            drawline(pipecoord[edit_row-1][0], pipecoord[edit_row-1][1], pipecoord[edit_row][0], pipecoord[edit_row][1])
          }

          else if (edit_row < pipecoord.length)
          {
            drawline(pipecoord[edit_row][0], pipecoord[edit_row][1], pipecoord[edit_row+1][0], pipecoord[edit_row+1][1])
          }

          //draw horizontal line
          drawline(pipecoord[edit_row][0], 0, pipecoord[edit_row][0], canvasElem.height )
        }

        if (save_values.length > 0)
        {
          if((pipecoord[edit_row][0] > save_length[save_length.length-1][0]) && (pipecoord[edit_row][0] < save_length[save_length.length-1][1]))
          {
            if(markclone1!= markclone2)
            {
              drawcircle("green",pipecoord[edit_row][0],pipecoord[edit_row][1], 0.5)
              len = save_values.length - 1
              pipelength = calc_length_edit(save_length[len][0], save_length[len][1], 
                save_values[len][0],save_values[len][1])
              // alert('pipe length value for current point is '+ pipelength.toFixed(2))
              shortcut = 1
            }
          }        
        }
      }

      else
      {
        let bar = confirm('Confirm or deny');
        if (bar == true)
        {
          //check wheter the ground point is true or not
          if (coordX[lastx] > pipecoord[edit_row][0] + 3 || coordX[lastx] < pipecoord[edit_row][0] - 3)
          {
            alert("Please pinpoint ground level first")
          }

          else
          {
            markclone2 =markclone2+1
            groundlevel=[]
            combine=[]
            groundcoord[edit_row] = [coordX[lastx], coordY[lasty]]
            drawcircle("blue", coordX[lastx], coordY[lasty], edit_row+1)
            drawcircle("yellow",pipecoord[edit_row][0],pipecoord[edit_row][1], 0.5)
            groundlevel.push(level(coordY[lasty]))
            if (pipelength == 0 && shortcut == 0)
            {
              pipelength = prompt("Insert pipe length value")
            }

            else
            {
              len = save_values.length - 1
              pipelength = calc_length_edit(save_length[len][0], save_length[len][1], 
                save_values[len][0],save_values[len][1])
              shortcut = 0
            }
            pipelevel.push(level(pipecoord[edit_row][1]))
            //console.log('pipelevel',pipelevel)
            var combine =pipelevel.concat(groundlevel)
            data[edit_row] = [combine[0],combine[1], Number(pipelength)]
            // console.log('data:',data)

            //draw line for each point
            if(edit_row > 1)
            {
              drawline(groundcoord[edit_row-1][0], groundcoord[edit_row-1][1], groundcoord[edit_row][0], groundcoord[edit_row][1])
            }

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
            pipelength = 0, pipelevel=[], edit_row = -1
          }
        }
      }

    }

    else
    {
      if (mark1 == mark2)
      {
        let bar = confirm('Confirm or deny');
        if (bar == true)
        {
          shortcut = 0
          mark1 =mark1+1
          pipecoord.push([coordX[lastx], coordY[lasty]])
          drawcircle("yellow", coordX[lastx], coordY[lasty], mark1)
          // console.log('pipelevel',pipelevel)

          //draw line from previous point to current point 
          if(pipecoord.length > 1)
          {
            drawline(pipecoord[mark1-2][0], pipecoord[mark1-2][1], pipecoord[mark1-1][0], pipecoord[mark1-1][1])
          }

          //draw horizontal line
          drawline(pipecoord[mark1-1][0], 0, pipecoord[mark1-1][0], canvasElem.height )
        }

        if (save_values.length > 0)
        {
          if((pipecoord[pipecoord.length-1][0] > save_length[save_length.length-1][0]) && (pipecoord[pipecoord.length-1][0] < save_length[save_length.length-1][1]))
          {
            if(mark1!= mark2)
            {
              drawcircle("green",pipecoord[pipecoord.length-1][0],pipecoord[pipecoord.length-1][1], 0.5)
              len = save_values.length - 1
              pipelength = calc_length(save_length[len][0], save_length[len][1], 
                save_values[len][0],save_values[len][1])
              // alert('pipe length value for current point is '+ pipelength.toFixed(2))
              shortcut = 1
            }            
          }        
        }
      }
      
      else
      {
        let bar = confirm('Confirm or deny');
        if (bar == true)
        {
          //check wheter the ground point is true or not
          if (coordX[lastx] > pipecoord[mark1-1][0] + 3 || coordX[lastx] < pipecoord[mark1-1][0] - 3)
          {
            alert("Please pinpoint ground level first")
          }

          else
          {
            mark2 =mark2+1
            groundlevel=[]
            combine=[]
            groundcoord.push([coordX[lastx], coordY[lasty]])
            drawcircle("blue", coordX[lastx], coordY[lasty], mark2)
            drawcircle("yellow",pipecoord[pipecoord.length-1][0],pipecoord[pipecoord.length-1][1], 0.5)
            groundlevel.push(level(coordY[lasty]))
            
            if (pipelength == 0 && shortcut == 0)
            {
              pipelength = prompt("Insert pipe length value")
            }

            else
            {
              len = save_values.length - 1
              pipelength = calc_length(save_length[len][0], save_length[len][1], 
                save_values[len][0],save_values[len][1])
              shortcut = 0
            }
            pipelevel.push(level(pipecoord[mark1 - 1][1]))
            //console.log('pipelevel',pipelevel)
            var combine =pipelevel.concat(groundlevel)
            data.push([combine[0],combine[1], Number(pipelength)])
            // console.log('data:',data)

            //draw line for each point
            if(groundcoord.length > 1)
            {
              drawline(groundcoord[mark1-2][0], groundcoord[mark1-2][1], groundcoord[mark1-1][0], groundcoord[mark1-1][1])
            }

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
            pipelength = 0, pipelevel=[]
          }
        }
      }
    }
  }

  //find length based on last point
  if (lengthbtn.checked == true)
  {

    getcoord = coordX.length -1
    //calculate pipe length value automatically
    if (coordY[getcoord] > 0)
    {
      let bar = confirm('Confirm or deny');
      if (bar == true)
      {
        if (checking == 0)
        {
          arr_valueFirst = [], arr_valueSecond=[]
          valueFirst = (prompt("1st pipelength value"));
          if(valueFirst != null)
          {
            valueFirst = Number(valueFirst)
            arr_valueFirst.push(coordX[getcoord], coordY[getcoord]);
            checking = 1
          }
          console.log('valueFirst',valueFirst)
        }

        else
        {
          valueSecond = (prompt("2nd pipelength value"));

          if(valueSecond != null)
          {
            arr_valueSecond.push(coordX[getcoord], arr_valueFirst[1]);
            valueSecond = Number(valueSecond)
            checking = 0

            if(pipecoord.length > 0)
            {
              pipelength = calc_length(arr_valueFirst[0], arr_valueSecond[0], valueFirst, valueSecond);
            }
            //store x coordinate for length and its value
            save_length.push([arr_valueFirst[0], arr_valueSecond[0]])
            save_values.push([valueFirst, valueSecond])
            valueSecond = 0, checking = 0
            lengthbtn.checked= false, pointbtn.checked=true

            drawcircle("purple",arr_valueFirst[0],arr_valueFirst[1], 0.5)
            drawcircle("purple",arr_valueSecond[0],arr_valueSecond[1], 0.5)

            drawline(arr_valueFirst[0],arr_valueFirst[1],arr_valueSecond[0],arr_valueSecond[1])
            }  
        }                               
      }
    }  
  }            
});

//generate report
let saveFile = () => 
{
  var newArr=[], new_arr1=[], new_arr2=[]
  //convert array to \t
  for ( var i = 0; i < data.length; i++)
  {
    new_arr1=[]
    for(var j = 0; j < data[i].length; j++)
    {
      num = (Math.round(data[i][j] * 100) / 100)
      if (j == 0)
      {
        new_arr1.push('\n' + num.toFixed(2))
      }
      else if (j == 1)
      {
        new_arr1.push(num.toFixed(2))
      }

      else if ((i == data.length -1) && (j == data[i].length-1 ))
      {
        new_arr1.push(num.toFixed(2) + ':,')
      }

      else
      {
        new_arr1.push(num.toFixed(2) + ':')
      }
    }
    new_arr2.push(new_arr1)
  }
  //convert to 1d array
  for(var i = 0; i < data.length; i++)
  {
      newArr = newArr.concat(new_arr2[i]);
  }
  // console.log('newArr',newArr)
  var savedata1 = newArr.toString().replaceAll(",", "\t")
  var savedata1 = savedata1.toString().replaceAll(":\t", "")
  // console.log('savedata1:\n',savedata1)
  let savedata2 ='p_level\t' + 'g_level\t' + 'length';
  const textToBLOB = new Blob([savedata2,savedata1], {type: 'text/plain'});
  const sFileName = prompt("Insert file name?")
  alert(data.length + " points have been exported")

  let newLink = document.createElement("a");
  newLink.download = sFileName;

  if (window.webkitURL != null) 
  {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  }
  else 
  {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }

  newLink.click(); 
}

Load_Image()