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
  if((event.key === 's' && isShiftDown) || (event.key === 's'))
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
      alert("Required length")
      lengthbtn.checked = true
      pointbtn.checked = false
    }
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