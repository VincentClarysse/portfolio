let gallery = document.getElementById("gallery");
let lilnav = document.querySelector(".lil-nav");
let projectsection = document.querySelector(".projectsection");
let projectdivs = document.getElementsByClassName("projectdiv");
let lilnavs = document.getElementsByClassName("lil-nav-link");
const section = document.getElementById("section");
const grad_hr = document.getElementById("grad_hr");

const carrousel_section = document.getElementById('carrousel_main')

function setSection(){
    setTimeout(()=>{
    let currentleft = (section.offsetLeft);
    let currentwidth = (section.clientWidth);

    grad_hr.style.background= "linear-gradient(to right, " 
    + "black "+ (currentleft-11)+"px"
    + ", " 
    + "transparent "+ (currentleft-10)+"px"
    + ", " 
    + "transparent "+ (currentleft+currentwidth+7)+"px"
    + ", " 
    + "black "+ (currentleft+currentwidth+8)+"px"
    + ")";
    },50)
}


window.onload = (event) => {
    let image1_height = document.getElementById("image-1").offsetHeight;
    gallery.style.height= image1_height + "px";
    lilnav.style.height= image1_height + "px";
    for(i=0 ; i<projectdivs.length; i++){
        projectdivs[i].style.height= image1_height +"px";
    }
    projectsection.style.height= image1_height + "px";

    // grad_hr.style.background= "linear-gradient(to right, " 
    // + "black "+ (left-11)+"px"
    // + ", " 
    // + "transparent "+ (left-10)+"px"
    // + ", " 
    // + "transparent "+ (left+width+7)+"px"
    // + ", " 
    // + "black "+ (left+width+8)+"px"
    // + ")";

    setSection();
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
        // galleryarray[i].style.maxHeight= galleryarray[i].style.height;
    }

    // let currentleft = (section.offsetLeft);
    // let currentwidth = (section.clientWidth);

    // grad_hr.style.background= "linear-gradient(to right, " 
    // + "black "+ (currentleft-11)+"px"
    // + ", " 
    // + "transparent "+ (currentleft-10)+"px"
    // + ", " 
    // + "transparent "+ (currentleft+currentwidth+7)+"px"
    // + ", " 
    // + "black "+ (currentleft+currentwidth+8)+"px"
    // + ")";
    setSection();
});

for(let i=0; i<lilnavs.length; i++) {
    lilnavs[i].addEventListener("click",()=>{
        let image1_height = document.getElementById("image-1").clientHeight;
        topheight = image1_height * i ;
        projectsection.scrollTo({
            top: topheight,
            behavior: "smooth",
          });

        gallery_topheight = 
        gallery.scrollTo({
        top: topheight + (10*i),
        behavior: "smooth",
        });
    })
}

const hide = (intersect) => {
    switch (intersect) {
        case "carrousel_main": 
        section.classList.add("hide");
        grad_hr.style.background= "linear-gradient(to right,black, black)";
        break;
    }
}

const observer = new IntersectionObserver(function (entries, observer) 
{
    for(let i =0; i < entries.length ; i++) {
        if(entries[i].isIntersecting) {
            console.log(entries[i].target.id)
            hide(entries[i].target.id)
            }
    }
    }
    ,{
        threshold: 0.1
    });

const the_animation = document.querySelectorAll('.main');

for (let i = 0; i < the_animation.length; i++) {
    const elements = the_animation[i];

 observer.observe(elements);


}
