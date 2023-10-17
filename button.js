const zoomInButton = document.querySelector('#zoom-in');
const zoomOutButton = document.querySelector('#zoom-out');
const canvas = document.getElementById('myCanvas');
const opnbtn = document.querySelector("#open")
var scale = 1

//change open button
function changeImage() {
    var image = document.getElementById("myImage");
    if (image.src.match("img/left.png")) {
      image.src = "img/right.png";
      image.alt = "Image 2";
    } else {
      image.src = "img/left.png";
      image.alt = "Image 1";
    }
  }

  //open and off button
var opn = 1, l = 0, p = 0
opnbtn.addEventListener("click", function(){
  const navbar = document.getElementById("navbar")
  if (opn == 0)
  {
    navbar.style.display="block"
    opn = 1
  }

  else
  {
    navbar.style.display="none";
    opn = 0
  }
  
})

//shortcut for all the buttons keypress for undo button
function key_press()
{
  var isShiftDown = false;

 document.addEventListener("keydown", function(event) {
  // Check for "Shift" key and "Ctrl" key
  if (event.keyCode === 16 || event.keyCode === 17) {
    isShiftDown = true;
  }

  // Check for key combination 90 for Z, 222 for ' or "
  if (event.keyCode === 8) {
    undobtn.click();
  }

  //O
  if (event.keyCode === 79 && isShiftDown)
  {
    opnbtn.click()
  }

  //add (A)
  if(event.keyCode === 65 && isShiftDown)
  {
    addbtn.click()
  }

  //edit (E)
  if(event.keyCode === 69 && isShiftDown)
  {
    editbtn.click()
  }

  //Delete (D)
  if(event.keyCode === 68 && isShiftDown)
  {
    delbtn.click()
  }

  //copy gradient from previous gradient
  if(event.key === '?' && isShiftDown || (event.key === '/') )
  {
    copy_gradient()
    actual_place = 0
  }

  //copy previous coord
  if((event.key === '>' && isShiftDown) || (event.key === '.') )
  {
    copy_previous()
    actual_place = 0
  }

  //copy previous coord with same length
  if(((event.key === 's' || event.key === 'S') && isShiftDown)|| (event.key === 's') || (event.key === 'S'))
  {
    copy_previous_spot()
    actual_place = 0
  }

  //readjust depth value
  if (pipecoord.length > 0  || groundcoord.length > 0)
  {
    if((event.key === "ArrowUp" && isShiftDown))
    {
      change_depth('increase')
    }

    if((event.key === "ArrowDown" && isShiftDown))
    {
      change_depth('decrease')
    }
  }

  //find the rotated angle
  if((event.key === "r" || event.key === "R" ) && isShiftDown )
  {
    if(arr_valueSecond.length > 0)
    {
      pointbtn.checked = false
      actual_place = 1
    }

    else
    {
      
      if(maxdepth2.length>1)
      {
        alert("Required length")
        lengthbtn.checked = true
        pointbtn.checked = false
      }

      else{
        alert("please fill depth point first")
      }
    }

   // Get the image data
  //  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //  const img_data = imageData.data;

   // Define the target color (e.g., red: RGB 255, 0, 0)
  //  const targetColor = [0, 0, 255];

  //  // Initialize an array to store the coordinates of matching pixels
  // matchingCoordinates = [];

  // for (let y = 0; y < canvas.height; y++) 
  // {
  //   for (let x = 0; x < canvas.width; x++) 
  //   {
  //     const index = (y * canvas.width + x) * 4;
  //     const red = img_data[index];
  //     const green = img_data[index + 1];
  //     const blue = img_data[index + 2];
  //     // Compare RGB values with the target color
  //     if (red === targetColor[0] && green === targetColor[1] && blue === targetColor[2]) 
  //     {
  //       // This pixel matches the target color, store its coordinates
  //       matchingCoordinates.push([x,y]);
  //     }
  //   }
  // }
  //   console.log('matchingCoordinates',matchingCoordinates);
    
  //   for (i =0; i<matchingCoordinates.length;i++)
  //   {
  //     drawcircle('red', matchingCoordinates[0], matchingCoordinates[1], 1)
  //   }
    
  }

  //zoom in and out button 187 is "+" , 189 is "-"
  if( (event.key === 'z'|| event.key === 'Z') || (event.key === 'z' && isShiftDown))
  {
    if((event.key === 'z' || event.key === 'Z') && !isShiftDown)
    {
      zoomInButton.click()
      console.log("zom in")
    }

    else
    {
      zoomOutButton.click()
      console.log("zom out")
    }
  }

  //change all length value in data based on new inserted length when press button
  if((event.key === "h" || event.key === "H" ) && isShiftDown )
  {
    if(arr_valueSecond.length < 0)
    {
      alert('Please insert Length first')
    }

    else if (mark1 != mark2 && (arr_valueSecond.length > 0))
    {
      alert('Please Insert Ground depth first in order to use this function')
    }

    else
    {
      valueSecond =Number(prompt("Enter new length value"))
      save_length=[],save_values=[]
      save_length.push([arr_valueFirst[0], arr_valueSecond[0]])
      save_values.push([valueFirst, valueSecond])
      for (var i = 0; i<mark1;i++)
      {
        new_inserted = pipecoord[i][0]
        new_d = recalculate_calc_length(save_length[len][0], save_length[len][1], save_values[len][0],save_values[len][1], new_inserted)
        data[i][2] = new_d
      }

      redraw()
    }
  }

  //can tick point and length btn when depth button is complete
  if(maxdepth2.length >= 2)
  {
     //point (P)
    if((event.keyCode === 80 && isShiftDown) || event.key === "p" || event.key === "P" )
    {
      if(pointbtn.checked == false)
      {
        p=0
      }

      if(pointbtn.checked == true)
      {
        p=1
      }

      if(p == 0)
      {
        pointbtn.checked = true
        lengthbtn.checked = false
      }

      if (p == 1)
      {
        pointbtn.checked = false
      }

      pointbtn.checked = true
    }

    // calc length (L)
    if((event.keyCode === 76 && isShiftDown) || event.key === "l" || event.key === "L")
    {
      if(lengthbtn.checked == false)
      {
        p=0
      }

      if(lengthbtn.checked == true)
      {
        p=1
      }

      if(l == 0)
      {
        lengthbtn.checked = true
        pointbtn.checked = false
      }

      else if (l == 1)
      {
        lengthbtn.checked = false
      }
    }
    
    
  }

  })

  document.addEventListener("keyup", function(event) {
    // Check for "Shift" key
    if (event.keyCode === 16 || event.keyCode === 17) {
      isShiftDown = false;
    }
  })
}

// Add click event listeners to the zoom buttons
zoomInButton.addEventListener('click', () => {
 // Increase the scale factor by 0.1
 scale = scale + 0.1;
 // Clamp the scale factor to a reasonable range
 scale = Math.max(0.1, Math.min(scale, 10));
console.log('scale',scale)
 // Apply the new scale factor to the canvas
canvas.width = myImage.width * Scale *scale
canvas.height = myImage.height * Scale *scale
ctx.setTransform(scale, 0, 0, scale, 0, 0);

  // console.log('canvas.width',canvas.width)

 // Redraw the circle at the new position
 const circleX = canvas.width / 2 / scale;
 const circleY = canvas.height / 2 / scale;
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.beginPath();
 ctx.arc(circleX, circleY, 10, 0, Math.PI * 2);
 ctx.fill();
 redraw()
});

zoomOutButton.addEventListener('click', () => {
 // Decrease the scale factor by 0.1
 scale = scale - 0.1;
 console.log('scale',scale)

 // Clamp the scale factor to a reasonable range
 scale = Math.max(0.1, Math.min(scale, 10));

 // Apply the new scale factor to the canvas
 canvas.width = myImage.width * Scale *scale
canvas.height = myImage.height * Scale *scale
 ctx.setTransform(scale, 0, 0, scale, 0, 0);

 // Redraw the circle at the new position
 const circleX = canvas.width / 2 / scale;
 const circleY = canvas.height / 2 / scale;
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.beginPath();
 ctx.arc(circleX, circleY, 10, 0, Math.PI * 2);
 ctx.fill();
 redraw()
});

key_press()