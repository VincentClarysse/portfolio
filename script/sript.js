let gallery = document.getElementById("gallery");
let lilnav = document.querySelector(".lil-nav");
let projectsection = document.querySelector(".projectsection");
let projectdivs = document.getElementsByClassName("projectdiv");
let lilnavs = document.getElementsByClassName("lil-nav-link");

window.onload = (event) => {
    let image1_height = document.getElementById("image-1").offsetHeight;
    gallery.style.height= image1_height + "px";
    lilnav.style.height= image1_height + "px";
    for(i=0 ; i<projectdivs.length; i++){
        projectdivs[i].style.height= image1_height +"px";
    }
    projectsection.style.height= image1_height + "px";

    console.log(image1_height);
};

window.addEventListener("resize", (event) => {
    let image1_height = document.getElementById("image-1").clientHeight;
    gallery.style.height= image1_height + "px";
    lilnav.style.height= image1_height + "px";
    for(i=0 ; i<projectdivs.length; i++){
        projectdivs[i].style.height= image1_height +"px";
    }
    projectsection.style.height= image1_height + "px";

    let galleryarray = document.getElementsByClassName("gallery__img");
    for(i=0 ; i<galleryarray.length; i++){
        galleryarray[i].style.maxHeight= "none";
    }
});

for(let i=0; i<lilnavs.length; i++) {
    lilnavs[i].addEventListener("click",()=>{
        let image1_height = document.getElementById("image-1").clientHeight;
        topheight = image1_height * i
        projectsection.scrollTo({
            top: topheight,
            behavior: "smooth",
          });
    })
}