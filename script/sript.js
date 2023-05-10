let gallery = document.getElementById("gallery");
let lilnav = document.querySelector(".lil-nav");
let projectsection = document.querySelector(".projectsection");
let projectdivs = document.getElementsByClassName("projectdiv");
let lilnavs = document.getElementsByClassName("lil-nav-link");
const section = document.getElementById("section");
const grad_hr = document.getElementById("grad_hr");
const navElements = document.querySelectorAll(".nav_item");
const elements = document.querySelectorAll('.main');

function setSection(delay){
    if (section.innerHTML!=""){
    
    setTimeout(()=>{
    let currentleft = (section.offsetLeft);
    let currentwidth = (section.clientWidth);

    grad_hr.style.width= section.offsetLeft-10+"px"
    },delay)
    }
}

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
    setSection(50);
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

    if (window.scrollY===0) {
        return
        }
    else {
        section.style.transitionDelay="0ms"
        grad_hr.style.transitionDelay="200ms"

        section.classList.add("hide");
        grad_hr.style.width= window.innerWidth-190+"PX";        
        showstop();
    }
}

const changesection = (newTitle) => {

        section.style.transitionDelay="200ms"
        grad_hr.style.transitionDelay="0ms"
        
        section.innerHTML=newTitle;
        grad_hr.style.width= section.offsetLeft-10+"px"


        section.classList.remove('hide');
}

const setnav = (i,main) => {

    navElements[3].style.borderRight=""
    navElements.forEach(element => {
    element.classList.remove("active")
        });    

    switch (main) {
        case "landing_main": navElements[0].classList.add("active");
        break;
        case "carrousel_main": navElements[1].classList.add("active");
        break;
        case "about_main": navElements[2].classList.add("active");
        break;
        case "contact_main": navElements[3].classList.add("active")
        navElements[3].style.borderRight="solid 1px black"
        break;
    }
}

const show = (intersect) => {
    switch (intersect) {
        case "landing_main": changesection("Portfolio");
        break;
        case "carrousel_main": changesection("My Work");
        break;
        case "about_main": changesection("About Me");
        break;
        case "contact_main": changesection("Contact");
        break;
    }
}

for (let i = 0; i<navElements.length; i++) { //nav scrolls
    navElements[i].addEventListener("click", ()=>{
   
    navElements.forEach(element => element.classList.remove("active"));
    navElements[3].style.borderRight=""
    navElements[i].classList.add("active");

    if (i==3) {navElements[i].style.borderRight="solid 1px black"}

    for (let i = 0; i < elements.length; i++) {
    
     nav_observer.unobserve(elements[i]);
     setTimeout(() => {
        nav_observer.observe(elements[i]);
     }, 1000);
    }
})
}

const hide_observer = new IntersectionObserver(function (entries, observer) 
{
    for(let i =0; i < entries.length ; i++) {
        if(entries[i].isIntersecting) {
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
            show(entries[i].target.id)
            }
    }
    }
    ,{
        threshold: 0.95
});

const nav_observer = new IntersectionObserver(function (entries, observer) 
{
    for(let i =0; i < entries.length ; i++) {
        if(entries[i].isIntersecting) {
            setnav(i,entries[i].target.id);
            }
    }
    }
    ,{
        threshold: 0.6
});

for (let i = 0; i < elements.length; i++) {
    hide_observer.observe(elements[i]);
    show_observer.observe(elements[i]);
    nav_observer.observe(elements[i]);
}

const showstop=()=>{
    for (let i = 0; i < elements.length; i++) {
    show_observer.unobserve(elements[i]);
    setTimeout(() => {
       show_observer.observe(elements[i]);
    //    console.log("done")
    }, 600);
}
}

window.addEventListener("scroll", ()=>{
for (let i = 0; i < elements.length; i++) {
    show_observer.unobserve(elements[i]);
    }
})

const onScrollStop = callback => {
    let isScrolling;
    window.addEventListener(
      'scroll',
      e => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          callback();
        }, 200);
      },
      false
    );
  };

onScrollStop(() => {

for (let i = 0; i < elements.length; i++) {
    show_observer.observe(elements[i]);
    }
});