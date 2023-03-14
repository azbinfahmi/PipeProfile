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
var opn = 0, l = 0, p = 0
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

//keypress for undo button
function key_press()
{
  var isShiftDown = false;

 document.addEventListener("keydown", function(event) {
  // Check for "Shift" key
  if (event.keyCode === 16) {
    isShiftDown = true;
  }

  // Check for "Shift + z" key combination 90 for Z, 222 for ' or "
  if ((event.keyCode === 90 || event.keyCode === 222)  && isShiftDown) {
    undobtn.click();
  }

//T
  if (event.keyCode === 79 && isShiftDown)
  {
    opnbtn.click()
  }

  //add (A)
  if(event.keyCode === 65 && isShiftDown)
  {
    console.log("Azim46")
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

  //can tick point and length btn when depth button is complete
  if(maxdepth2.length >= 2)
  {
     //point (P)
    if(event.keyCode === 80 && isShiftDown)
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
    if(event.keyCode === 76 && isShiftDown)
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
    if (event.keyCode === 16) {
      isShiftDown = false;
    }
  });
}
key_press()


// var canvas = document.getElementById('myCanvas');
// // Get a reference to the zoom button
// var zoomButton = document.getElementById('zoomButton');
// var context = canvas.getContext('2d');

// // Set initial zoom level
// var zoomLevel = 1;

// // Add mousedown event listener to the zoom button
// zoomButton.addEventListener('mousedown', function(event) {
//   // Get the starting mouse position
//   var startX = event.clientX;
//   var startY = event.clientY;
  
//   // Add mousemove event listener to the document
//   document.addEventListener('mousemove', handleMouseMove);
  
//   // Add mouseup event listener to the document
//   document.addEventListener('mouseup', handleMouseUp);
  
//   // Prevent default browser behavior
//   event.preventDefault();
  
//   // Define the mousemove event handler function
//   function handleMouseMove(event) {
//     console.log('zoomLevel1',zoomLevel)
//     // Calculate the distance moved by the mouse
//     var deltaX = event.clientX - startX;
//     var deltaY = event.clientY - startY;
    
//     // Adjust the zoom level based on the distance moved
//     if (deltaY < 0) {
//       // Zoom in
//       zoomLevel *= 1.1;
//     } else if (deltaY > 0) {
//       // Zoom out
//       zoomLevel /= 1.1;
//     }
    
//     // Update the CSS transform property of the canvas element to apply the zoom level
//     canvas.style.transform = 'scale(' + zoomLevel + ')';
//     // Update the starting mouse position
//     startX = event.clientX;
//     startY = event.clientY;
//   }
  
//   // Define the mouseup event handler function
//   function handleMouseUp(event) {
//     console.log('zoomLevel2',zoomLevel)
//     // Remove the mousemove event listener from the document
//     document.removeEventListener('mousemove', handleMouseMove);
    
//     // Remove the mouseup event listener from the document
//     document.removeEventListener('mouseup', handleMouseUp);
//   }
// });
