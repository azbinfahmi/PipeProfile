
//change open button
function changeImage() {
    var image = document.getElementById("myImage");
    if (image.src.match("img/right.png")) {
      image.src = "img/left.png";
      image.alt = "Image 2";
    } else {
      image.src = "img/right.png";
      image.alt = "Image 1";
    }
  }

  //open and off button
  var opn = 1, l = 0, p = 0
const opnbtn = document.querySelector("#open")
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
  // Check for "Shift" key
  if (event.keyCode === 16) {
    isShiftDown = true;
  }

  // Check for "Shift + z" key combination 90 for Z, 222 for ' or "
  if ((event.keyCode === 90 || event.keyCode === 222)  && isShiftDown) {
    undobtn.click();
  }
  //O
  if (event.keyCode === 79 && isShiftDown)
  {
    opnbtn.click()
  }
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
    

  })


  document.addEventListener("keyup", function(event) {
    // Check for "Shift" key
    if (event.keyCode === 16) {
      isShiftDown = false;
    }
  });
}

key_press()