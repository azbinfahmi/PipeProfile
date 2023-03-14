
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
var opn = 1
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

