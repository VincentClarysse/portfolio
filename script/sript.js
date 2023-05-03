let gallery = document.getElementById("gallery");
let lilnav = document.querySelector(".lil-nav");
let projectsection = document.querySelector(".projectsection");
let projectdivs = document.getElementsByClassName("projectdiv");
let lilnavs = document.getElementsByClassName("lil-nav-link");
const section = document.getElementById("section");
const grad_hr = document.getElementById("grad_hr");

const carrousel_section = document.getElementById('carrousel_main')

function setSection(delay){
    if (section.innerHTML!=""){
    setTimeout(()=>{
    let currentleft = (section.offsetLeft);
    let currentwidth = (section.clientWidth);

    grad_hr.style.width= section.offsetLeft-10+"px"
    },delay)
    }
}

// function setSection(delay){
//     if (section.innerHTML!=""){
//     setTimeout(()=>{
//     let currentleft = (section.offsetLeft);
//     let currentwidth = (section.clientWidth);

//     grad_hr.style.background= "linear-gradient(to right, " 
//     + "black "+ (currentleft-11)+"px"
//     + ", " 
//     + "transparent "+ (currentleft-10)+"px"
//     + ", " 
//     + "transparent "+ (currentleft+currentwidth+7)+"px"
//     + ", " 
//     + "black "+ (currentleft+currentwidth+8)+"px"
//     + ")";
//     },delay)
//     }
// }


window.onload = (event) => {
    let image1_height = document.getElementById("image-1").offsetHeight;
    gallery.style.height= image1_height + "px";
    lilnav.style.height= image1_height + "px";
    for(i=0 ; i<projectdivs.length; i++){
        projectdivs[i].style.height= image1_height +"px";
    }
    projectsection.style.height= image1_height + "px";

    setSection(0);
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
    setSection(0);
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
    section.style.transitionDelay="0ms"
    grad_hr.style.transitionDelay="400ms"
    switch (intersect) {
        default:
        section.classList.add("hide");
        grad_hr.style.width= window.innerWidth-185+"PX";
        break;
        // case "landing_main": if(section.innerHTML=="Projects"){
        //     section.classList.add("hide");
        //     grad_hr.style.width= window.innerWidth-185+"PX";
        //     // grad_hr.style.background= "linear-gradient(to right,black, black)";
        // };
    }
}

const changesection = (newTitle) => {
    // setTimeout(() => {
        section.style.transitionDelay="450ms"
        grad_hr.style.transitionDelay="250ms"

        section.innerHTML=newTitle;
        section.classList.remove('hide');
        setSection(0);
    // }, 500);
}

const show = (intersect) => {
    switch (intersect) {
        case "landing_main": changesection("Portfolio");
        break;
        case "carrousel_main": changesection("Projects")
        break;
        case "about_main": changesection("About Me")
        break;
        case "contact_main": changesection("Contact")
        break;
    }
}

const hide_observer = new IntersectionObserver(function (entries, observer) 
{
    for(let i =0; i < entries.length ; i++) {
        if(entries[i].isIntersecting) {
            console.log("hide "+entries[i].target.id)
            hide(entries[i].target.id)
            }
    }
    }
    ,{
        threshold: 0.15
});

const show_observer = new IntersectionObserver(function (entries, observer) 
{
    for(let i =0; i < entries.length ; i++) {
        if(entries[i].isIntersecting) {
            console.log("show "+entries[i].target.id)
            show(entries[i].target.id)
            }
    }
    }
    ,{
        threshold: 0.95
});

const the_animation = document.querySelectorAll('.main');

for (let i = 0; i < the_animation.length; i++) {
    const elements = the_animation[i];

 hide_observer.observe(elements);
 show_observer.observe(elements);
}
