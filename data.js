

var coordX = [], coordY= [], Xaxis =[], Yaxis=[], maxdepth2=[], pipelevel=[], 
groundlevel=[], data=[],pipecoord=[],groundcoord=[],lenx=[],leny=[];
var arr_valueFirst =[], arr_valueSecond =[], checkvalue1=[],checkvalue2=[],valueFirst=0, valueSecond=0
var pipelength = 0, mark1 = 0, mark2 = 0

const lengthbtn = document.querySelector("#length");
const depthbtn = document.querySelector("#checkX");
const pointbtn = document.querySelector("#Points");
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
function drawcircle(color,a,b)
{
  //draw circle
  var c = document.getElementById("myCanvas")
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(a, b, 4, 0, 2 * Math.PI*2,false);
  ctx.fillStyle =color
  ctx.fill()
  ctx.stroke();
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
//alert when tick the depth point button
depthbtn.addEventListener('change',function(){
  if (depthbtn.checked == true)
  {
    if(maxdepth2.length < 1)
    {
      alert("Click at the maximum depth point on the graph.")
    }
  }

  else
  {
    depthbtn.checked = true
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
    }
  }
  
})

//turn off point button when length button is clicked
lengthbtn.addEventListener('change',function(){
  if (lengthbtn.checked == true)
  {
    alert('click on the nearby pipe length value before and after the current pipe depth point')
    pointbtn.checked = false
  }
})

// get coordinate of x,y when click in the canvas, and what ever happen in the canvas. will be run in here
const canvasElem = document.querySelector("canvas"); 
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
        var depth = prompt("Enter the depth value")
        if (maxdepth2 ==0)
        {
          maxdepth.push(Number(depth), coordX[lastx], coordY[lasty],)
          maxdepth2.push(maxdepth)
          drawcircle("black", coordX[lastx], coordY[lasty])
          firstX = lastx
          alert("Click at the minimum depth point on the graph.")
        }
        else
        {
          maxdepth.push(Number(depth), coordX[firstX], coordY[lasty],)
          maxdepth2.push(maxdepth)
          drawcircle("black", coordX[firstX], coordY[lasty])

          //calculate high of the depth point
          var total_depth, total_pixel,calc
          total_depth = maxdepth2[0][0] - maxdepth2[1][0]
          total_pixel = maxdepth2[1][2] - maxdepth2[0][2]
          calc = total_pixel / total_depth
          // console.log(maxdepth2)
          for (var i= 1; i < total_depth ; i++ )
          {
            drawcircle("black", maxdepth2[0][1], maxdepth2[0][2] + (calc * i))
          }
          
          drawline(maxdepth2[0][1], maxdepth2[0][2], maxdepth2[1][1], maxdepth2[1][2])
          
        }
      }     
    }
  }

  //find the pipelevel, groundlevel and length
  if (pointbtn.checked == true)
  {
    lastx = coordX.length - 1
    lasty = coordY.length - 1

    if (mark1 == mark2)
    {
      let bar = confirm('Confirm or deny');
      if (bar == true)
      {
        mark1 =mark1+1
        
        pipe_check=[]
        pipecoord.push([coordX[lastx], coordY[lasty]])
        pipe_check.push([coordX[lastx], coordY[lasty]])
        drawcircle("yellow", coordX[lastx], coordY[lasty])
        pipelevel.push(level(coordY[lasty]))
        // console.log('pipelevel',pipelevel)
        if(pipecoord.length > 1)
        {
          drawline(pipecoord[mark1-2][0], pipecoord[mark1-2][1], pipecoord[mark1-1][0], pipecoord[mark1-1][1])
        }

        //draw horizontal line
        drawline(pipecoord[mark1-1][0], 0, pipecoord[mark1-1][0], 2000 )
      }
    }

    else
    {
      let bar = confirm('Confirm or deny');
      if (bar == true)
      {
        //check wheter the ground point is true or not
        if (coordX[lastx] > pipe_check[0][0] + 3 || coordX[lastx] < pipe_check[0][0] - 3)
        {
          alert("Please pinpoint ground level first")
        }

        else
        {
          mark2 =mark2+1
          groundlevel=[]
          combine=[]
          groundcoord.push([coordX[lastx], coordY[lasty]])
          drawcircle("blue", coordX[lastx], coordY[lasty])
          groundlevel.push(level(coordY[lasty]))
          // console.log('groundlevel :',groundlevel)
          if (pipelength == 0)
          {
            pipelength = prompt("Insert pipe length value")
          }
          var combine =pipelevel.concat(groundlevel)
          data.push([combine[0],combine[1], Number(pipelength)])
          // console.log('data:',data)

          //draw line for each point
          if(groundcoord.length > 1)
          {
            drawline(groundcoord[mark1-2][0], groundcoord[mark1-2][1], groundcoord[mark1-1][0], groundcoord[mark1-1][1])
          }

          //create table and insert data
          const table = document.getElementById("myTable");
          table_data = [data[mark1-1]]
          for (let i = 0; i < table_data.length; i++) {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            cell1.innerHTML = mark1;
            
            for (let j = 0; j < table_data[i].length; j++) {
              const cell2 = row.insertCell(j+1);
              num = Math.round(table_data[i][j] * 100) / 100
              cell2.innerHTML = num.toFixed(2);
            }
          }
          table_data = [],pipelevel=[],pipelength = 0
        }
      }
    }
  }

  //find length based on last point
  if (lengthbtn.checked == true)
  {
    getcoord = coordX.length -1
    //calculate pipe length value automatically
    if(pipelevel.length == 0)
    {
      alert('please insert pipe depth first')
    }

    else
    {
      if (coordY[getcoord] > pipecoord[pipecoord.length - 1][1])
      {
        let bar = confirm('Confirm or deny');
        if (bar == true)
        {
          if (arr_valueFirst.length == 0)
          {
            arr_valueFirst.push(coordX[getcoord], coordY[getcoord]);
            valueFirst = Number(prompt("1st pipelength value"));
			checkvalue1 = arr_valueFirst;
          }

          else
          {
            arr_valueSecond.push(coordX[getcoord], arr_valueFirst[1]);
			checkvalue2 = arr_valueSecond;
            valueSecond = Number(prompt("2nd pipelength value"));
            var pix_diff = arr_valueSecond[0] - arr_valueFirst[0];// 120 - 100 = 20
            var val_diff =  valueSecond - valueFirst;//50 - 20 = 30
            var pipedepth_to_pipelength = arr_valueSecond[0] - pipecoord[mark1-1][0]; // 120 - 108 = 12
            var value_total = (val_diff / pix_diff) * pipedepth_to_pipelength; // 30/20 = 1.5 * 12 = 18
            var final_ans = valueSecond - value_total;
            pipelength = final_ans;
            alert('pipe length value for that point is'+ pipelength.toFixed(2))
            arr_valueFirst = [], arr_valueSecond=[]
            lengthbtn.checked= false, pointbtn.checked=true
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

//Load and display the image into canvas
let imgInput = document.getElementById('imageInput');
  imgInput.addEventListener('change', function(e) {
    if(e.target.files) {
      let imageFile = e.target.files[0]; //here we get the image file
      var reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
        var myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object
        myImage.onload = function(ev) {
          var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object
          var myContext = myCanvas.getContext("2d"); // Creates a contect object
          myCanvas.width = myImage.width*2 ; // Assigns image's width to canvas
          myCanvas.height = myImage.height*2; // Assigns image's height to canvas
          myContext.drawImage(myImage,0,0, myImage.width *2, myImage.height *2); // Draws the image on canvas
          let imgData = myCanvas.toDataURL("image/jpeg",2); // Assigns image base64 string in jpeg format to a variable
        }
      }
    }
  });