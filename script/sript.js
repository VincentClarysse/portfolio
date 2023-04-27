let gallery = document.getElementById("gallery");
let lilnav = document.querySelector(".lil-nav");
let projectsection = document.querySelector(".projectsection");
let projectdivs = document.getElementsByClassName("projectdiv");
let lilnavs = document.getElementsByClassName("lil-nav-link");

let image1_height = document.getElementById("image-1").clientHeight;
gallery.style.height= image1_height + "px";
lilnav.style.height= image1_height + "px";
projectsection.style.height= image1_height + "px";
for(i=0 ; i<projectdivs.length; i++){
    projectdivs[i].style.height= image1_height +"px";
}

console.log(projectdivs[0].offsetTop);
console.log(projectdivs[1].offsetTop);
console.log(projectdivs[2].offsetTop);

projectdivs[2].scrollTo({
    top: 0,
    behavior: "smooth",
  });

window.addEventListener("resize", (event) => {
    let image1_height = document.getElementById("image-1").clientHeight;
    gallery.style.height= image1_height + "px";
    lilnav.style.height= image1_height + "px";
    for(i=0 ; i<projectdivs.length; i++){
        projectdivs[i].style.height= image1_height +"px";
    }
    projectsection.style.height= image1_height + "px";
});

for(let i=0; i<lilnavs.length; i++) {
    lilnavs[i].addEventListener("click",()=>{
        let image1_height = document.getElementById("image-1").clientHeight;
        projectsection.scrollTo({
            top: image1_height * i,
            behavior: "smooth",
          });
    })
}



