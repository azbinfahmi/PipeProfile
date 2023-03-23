const opnbtn = document.querySelector("#open")
const zoomInButton = document.querySelector('#zoom-in');
const zoomOutButton = document.querySelector('#zoom-out');


var opn = 0, scale = 1
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

// Add click event listeners to the zoom buttons
zoomInButton.addEventListener('click', () => {
  // Increase the scale factor by 0.1
  scale = scale + 0.1;
  // Clamp the scale factor to a reasonable range
  scale = Math.max(0.1, Math.min(scale, 10));
 console.log('scale',scale)
  // Apply the new scale factor to the canvas
 canvas.width = canvas.width *scale
 canvas.height = canvas.height *scale
 ctx.setTransform(scale, 0, 0, scale, 0, 0);
 
   // console.log('canvas.width',canvas.width)
  redraw()
 });
 
 zoomOutButton.addEventListener('click', () => {
  // Decrease the scale factor by 0.1
  scale = scale - 0.1;
  console.log('scale',scale)
 
  // Clamp the scale factor to a reasonable range
  scale = Math.max(0.1, Math.min(scale, 10));
 
  // Apply the new scale factor to the canvas
  canvas.width = myImage.width *scale
 canvas.height = myImage.height *scale
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
 
