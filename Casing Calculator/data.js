
var data =[], coordX = [], coordY= [], point=[], save_length=[], arr_valueFirst=[], save_values=[], save_length_y=[];
var length = 0, mark = 0, valueFirst=0, valueSecond =0, pipelength = 0, shortcut = 0
var m_length =[], Scale = 1, img_det =[], check = 0
var id =[], length=[], actual_length =[]
const canvasElem = document.getElementById("myCanvas");
const ctx = canvasElem.getContext('2d');
var tableBody = document.getElementById('myTableBody');
const pointbtn = document.querySelector("#Points");
const lengthbtn = document.querySelector("#length");
const undobtn = document.querySelector("#undo");
const textFileInput  = document.getElementById('textInput');

pointbtn.checked = true

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
        img_det.push(mark)
        myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object
        myImage.onload = function() {
          var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object
          var myContext = myCanvas.getContext("2d"); // Creates a contect object
          myCanvas.width = myImage.width*Scale ; // Assigns image's width to canvas
          myCanvas.height = myImage.height*Scale; // Assigns image's height to canvas
          myContext.drawImage(myImage,0,0, myImage.width *Scale, myImage.height *Scale); // Draws the image on canvas
        }
      }
    }
  });
}

function printMousePos(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log("Coordinate x: " + x, "Coordinate y: " + y);
  coordX.push(x)
  coordY.push(y)
}

function drawcircle(color, a, b, no)
{
  //draw circle
  var c = document.getElementById("myCanvas")
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(a, b, 4, 0, 2 * Math.PI*2);
  ctx.fillStyle =color
  ctx.fill()
  

  if (no != 0.5)
  {
    ctx.fillStyle = "black";
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

function drawConstantCircle(event)
{
  let rect = canvasElem.getBoundingClientRect();
  // Get mouse position
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  if( pointbtn.checked == true)
  {
    color = "black"
  }

  if( lengthbtn.checked == true)
  {
    color = "purple"
  }
  
  // Draw circle at mouse position
  radius = 4
  ctx.beginPath();
  ctx.fillStyle = color
  ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function calc_length(arr_valueFirst, arr_valueSecond, valueFirst, valueSecond)
{
  var pix_diff = arr_valueSecond - arr_valueFirst;// 120 - 100 = 20
  var val_diff =  valueSecond - valueFirst;//50 - 20 = 30
  var pipedepth_to_pipelength = arr_valueSecond - point[mark-1][0]; // 120 - 108 = 12
  var value_total = (val_diff / pix_diff) * pipedepth_to_pipelength; // 30/20 = 1.5 * 12 = 18
  var final_ans = valueSecond - value_total;
  return final_ans
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
    ctx.lineWidth = 2
    // Stroke will make the line visible
    context.stroke();

  }
}

function point_undo()
{

  if(img_det.length > 1)
  {
    a = mark - 1
    b = img_det[img_det.length - 1]
    if (a < b)
    {
      bar = confirm("This will delete your previous point in last image")
      if(bar == true)
      {
        mark = mark - 1
        point.pop()
        data.pop()
        m_length.pop()
        length = 0
      }
    }

    else
    {
      mark = mark - 1
      point.pop()
      data.pop()
      m_length.pop()
      length = 0
    }
  }

  else
  {
    mark = mark - 1
    point.pop()
    data.pop()
    m_length.pop()
    length = 0
  }

  if( mark < 0)
  {
    mark = 0
  }  
  

  if(img_det.length <= 1)
  {
    for (var i = 0; i < point.length; i ++)
    {
      drawcircle("black", point[i][0], point[i][1], i +1 )
    }
  }

  else
  {
    if(mark - img_det[img_det.length - 1] < 0)
    {
      img_det[img_det.length - 1] = mark
    }

    o = img_det[img_det.length -1]
    for (var o; o < point.length; o ++)
    {
      drawcircle("black", point[o][0], point[o][1], o +1 )
    }
  }

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
      const cell1 = row.insertCell(-1);
      cell1.innerHTML = i+1;
      
      for (let j = 0; j < table_data[i].length; j++) {
        const cell2 = row.insertCell(j+1);
        cell2.innerHTML = table_data[i][j];
      }
    }
  }
}

function redraw()
{
  
  if (Scale > 0)
  {
    ctx.drawImage(myImage,0,0, myImage.width *Scale, myImage.height *Scale);
  }

  if(img_det.length <= 1)
  {
    for (var i = 0; i < point.length; i ++)
    {
      drawcircle("black", point[i][0], point[i][1], i +1 )
    }
  }

  else
  {
    o = img_det[img_det.length -1]
    for (var o; o < point.length; o ++)
    {
      drawcircle("black", point[o][0], point[o][1], o +1 )
    }
  }

  if(arr_valueFirst.length > 0)
  {
    
    drawcircle("purple", arr_valueFirst[0], arr_valueFirst[1], 0.5)
  }

  if ( save_length.length > 0)
  {
    len = save_length.length - 1
    drawcircle("purple", save_length[len][0],save_length_y[len][0],0.5)
    drawcircle("purple", save_length[len][1],save_length_y[len][1],0.5)

    drawline(save_length[len][0],save_length_y[len][0],save_length[len][1],save_length_y[len][1])
  }
  

  
}

// subbtn.addEventListener("click", function(){

//   data.push([length, input1,input2,input3])

//   console.log('data',data)

//   const tableBody = document.getElementById("myTableBody");
//   table_data = data
  
//     while(tableBody.firstChild)
//     {
//       tableBody.removeChild(tableBody.firstChild);
//     }
//     if(data.length > 0)
//     {
//       for (let i = 0; i < table_data.length; i++) 
//       {
//         const row = tableBody.insertRow();
//         const cell1 = row.insertCell(-1);
//         cell1.innerHTML = i+1;
        
//         for (let j = 0; j < table_data[i].length; j++) {
//           const cell2 = row.insertCell(j+1);
//           cell2.innerHTML = table_data[i][j];
//         }
//       }
//     }
  
//   document.getElementById("a").value = "";
//   document.getElementById("b").value = "";
//   document.getElementById("c").value = "";
// })

pointbtn.addEventListener('change',function(){
  if (pointbtn.checked == true)
  {
    lengthbtn.checked = false
  } 
})

lengthbtn.addEventListener('change',function(){
  if (lengthbtn.checked == true)
  {
    pointbtn.checked = false
  } 
})

undobtn.addEventListener('click',function(){
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  // clear the specific arc
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(myImage != null)
  {
    ctx.drawImage(myImage,0,0, myImage.width *Scale, myImage.height *Scale);
  }
  point_undo()
})

textFileInput.addEventListener('change', () => {
  ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
  const file = textFileInput.files[0];
  const reader = new FileReader();

  reader.readAsText(file);

  reader.onload = () => {
    id =[], length=[], actual_length =[], data =[]
    const fileContents = reader.result;
    const lines = fileContents.split('\n');

    for (let i = 1; i < lines.length; i++) { // start at i = 1 to skip header row
      const columns = lines[i].split('\t');

      if (columns.length === 3) {
        // id.push(Number(columns[0]));
        length.push(Number(columns[1]));
        actual_length.push(Number(columns[2]));
      }
    }
    
    for( var i = 0; i < actual_length.length; i++)
    {
      data.push([length[i], actual_length[i]])
    }
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
        const cell1 = row.insertCell(-1);
        cell1.innerHTML = i+1;
        
        for (let j = 0; j < table_data[i].length; j++) {
          const cell2 = row.insertCell(j+1);
          cell2.innerHTML = table_data[i][j];
        }
      }
    }

    alert( actual_length.length +" points have been inserted." )
    redraw()
  };
});


canvasElem.addEventListener('mousemove', function(event) {
  const x = event.offsetX;
  ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
  redraw()
  drawConstantCircle(event)

})

canvasElem.addEventListener("mousedown", function(e)
{
  printMousePos(canvasElem, e);

  if(pointbtn.checked == true)
  {
    let bar = confirm("Confirm or deny")
    if (bar == true)
    {
      mark = mark + 1
      lastx = coordX.length - 1
      lasty = coordY.length - 1
      drawcircle("black", coordX[lastx], coordY[lasty], mark)
      point.push([coordX[lastx], coordY[lasty]])

      if (save_values.length > 0)
      {
        if((point[point.length-1][0] > save_length[save_length.length-1][0]) && (point[point.length-1][0] < save_length[save_length.length-1][1]))
        {
          len = save_values.length - 1
          pipelength = calc_length(save_length[len][0], save_length[len][1], 
            save_values[len][0],save_values[len][1])
          // alert('pipe length value for current point is '+ pipelength.toFixed(2))
          shortcut = 1     
        }        
      }

      if (pipelength == 0 && shortcut == 0)
      {
        pipelength = Number(prompt("Insert pipe length value"))
      }

      else
      {
        len = save_values.length - 1
        pipelength = calc_length(save_length[len][0], save_length[len][1], 
          save_values[len][0],save_values[len][1])
        shortcut = 0
      }

      
      length = pipelength.toFixed(2)

      m_length.push(length)
      k = m_length.length - 1

      if(data.length == 0)
      {
        data.push([length, length])
      }

      else
      {
        len = data.length - 1
        minus = m_length[k] - data[len][0]
        data.push([length, minus.toFixed(2)])
      }
     
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
          const cell1 = row.insertCell(-1);
          cell1.innerHTML = i+1;
          
          for (let j = 0; j < table_data[i].length; j++) {
            const cell2 = row.insertCell(j+1);
            cell2.innerHTML = table_data[i][j];
          }
        }
      }
    }
    pipelength = 0
  }

  if(lengthbtn.checked == true)
  {
    getcoord = coordX.length -1
     //calculate pipe length value automatically
     if (coordY[getcoord] > 0)
     {
       let bar = confirm('Confirm or deny');
       if (bar == true)
       {
         if (arr_valueFirst.length == 0)
         {
           arr_valueFirst = [], arr_valueSecond=[]
           arr_valueFirst.push(coordX[getcoord], coordY[getcoord]);
           drawcircle("purple",coordX[getcoord],coordY[getcoord],0.5)
           valueFirst = Number(prompt("1st pipelength value"));
         }
 
         else
         {
           arr_valueSecond.push(coordX[getcoord], arr_valueFirst[1]);
           while(valueSecond == 0)
           {
             valueSecond = Number(prompt("2nd pipelength value"));
             if (valueSecond == 0)
             {
               alert("Please insert pipelength value")
             }
           }

           if(point.length > 0)
          {
            pipelength = calc_length(arr_valueFirst[0], arr_valueSecond[0], valueFirst, valueSecond);
          }
           //store x coordinate for length and its value
          save_length.push([arr_valueFirst[0], arr_valueSecond[0]])
          save_length_y.push([arr_valueFirst[1], arr_valueSecond[1]])
          save_values.push([valueFirst, valueSecond])
          valueSecond = 0, arr_valueFirst=[]
          lengthbtn.checked= false, pointbtn.checked=true
          len = save_length.length - 1

          drawcircle("purple", save_length[len][0],save_length_y[len][0],0.5)
          drawcircle("purple", save_length[len][1],save_length_y[len][1],0.5)  

          drawline(save_length[len][0],save_length_y[len][0],save_length[len][1],save_length_y[len][1])
        }
      }
    }
  }
  
  
});

Load_Image()
