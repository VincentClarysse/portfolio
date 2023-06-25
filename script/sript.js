const gallery = document.getElementById("gallery");
const lilnav = document.querySelector(".lil-nav");
const projectsection = document.querySelector(".projectsection");
const projectdivs = document.getElementsByClassName("projectdiv");
const lilnavs = document.getElementsByClassName("lil-nav-link");
const section = document.getElementById("section");
const grad_hr = document.getElementById("grad_hr");
const right_hr = document.getElementById("right_hr");
const navElements = document.querySelectorAll(".nav_item");
const elements = document.querySelectorAll(".main");

let navpush = false;

function setSection(delay) {
  if (section.innerHTML !== "") {
    setTimeout(() => {
      let currentleft = section.offsetLeft;
      let currentwidth = section.clientWidth;
      grad_hr.style.width = currentleft - 10 + "px";

      right_hr.style.width =
        window.innerWidth -
        section.offsetLeft -
        section.clientWidth -
        10 +
        "px";
    }, delay);
  }
}

window.onload = (event) => {
  let image1_height = document.getElementById("image-1").offsetHeight;
  gallery.style.height = image1_height + "px";
  lilnav.style.height = image1_height + "px";

  if (window.innerWidth > 960) {
    projectsection.style.height = image1_height + "px";
    for (i = 0; i < projectdivs.length; i++) {
      projectdivs[i].style.height = image1_height + "px";
    }
  }
  setSection(50);
};

window.addEventListener("resize", (event) => {
  let image1_height = document.getElementById("image-1").clientHeight;
  gallery.style.height = image1_height + "px";
  lilnav.style.height = image1_height + "px";

  if (window.innerWidth > 960) {
    projectsection.style.height = image1_height + "px";
    for (i = 0; i < projectdivs.length; i++) {
      projectdivs[i].style.height = image1_height + "px";
    }
  }
  let galleryarray = document.getElementsByClassName("gallery__img");
  for (i = 0; i < galleryarray.length; i++) {
    galleryarray[i].style.maxHeight = "none";
    // galleryarray[i].style.maxHeight= galleryarray[i].style.height;
  }
  setSection(500);
});

for (let i = 0; i < lilnavs.length; i++) {
  lilnavs[i].addEventListener("click", () => {
    let image1_height = document.getElementById("image-1").clientHeight;
    topheight = image1_height * i;
    projectsection.scrollTo({
      top: topheight,
      behavior: "smooth",
    });

    gallery.scrollTo({
      top: topheight + 10 * i,
      behavior: "smooth",
    });
  });
}

const hide = (intersect) => {
  if (window.scrollY === 0) {
    return;
  } else {
    section.style.transitionDelay = "0ms";

    if (navpush === true) {
      grad_hr.style.transitionDelay = "1200ms";
      right_hr.style.transitionDelay = "1200ms";
      setTimeout(() => {
        navpush = false;
      }, 1200);
    } else {
      grad_hr.style.transitionDelay = "200ms";
      right_hr.style.transitionDelay = "200ms";
    }

    section.classList.add("hide");
    grad_hr.style.width = window.innerWidth - 180 + "PX";
    if (window.innerWidth < 960) {
      grad_hr.style.width = window.innerWidth / 2 + 1 + "PX";
      right_hr.style.width = window.innerWidth / 2 + "PX";
    }
    showstop();
  }
};

const changesection = (newTitle) => {
  section.style.transitionDelay = "300ms";
  grad_hr.style.transitionDelay = "0ms";
  right_hr.style.transitionDelay = "0ms";

  section.innerHTML = newTitle;
  grad_hr.style.width = section.offsetLeft - 10 + "px";
  right_hr.style.width =
    window.innerWidth - section.offsetLeft - section.clientWidth - 10 + "px";

  section.classList.remove("hide");
};

const setnav = (i, main) => {
  navElements[2].style.borderRight = "";
  navElements.forEach((element) => {
    element.classList.remove("active");
  });

  switch (main) {
    case "landing_main":
      navElements[0].classList.add("active");
      break;
    case "carrousel_main":
      navElements[1].classList.add("active");
      break;
    case "about_main":
      navElements[2].classList.add("active");
      navElements[2].style.borderRight = "solid 1px black";
      break;
    case "contact_main":
      navElements[3].classList.add("active");
      navElements[3].style.borderRight = "solid 1px black";
      break;
  }
};

const show = (intersect) => {
  switch (intersect) {
    case "landing_main":
      changesection("Portfolio");
      break;
    case "carrousel_main":
      changesection("My Work");
      break;
    case "about_main":
      changesection("About Me");
      break;
    case "contact_main":
      changesection("Contact");
      break;
  }
};

for (let i = 0; i < navElements.length; i++) {
  //nav scrolls
  navElements[i].addEventListener("click", () => {
    navpush = true;

    if (i !== 3) {
      navElements.forEach((element) => element.classList.remove("active"));
      navElements[2].style.borderRight = "";
      navElements[i].classList.add("active");

      for (let i = 0; i < elements.length; i++) {
        nav_observer.unobserve(elements[i]);
        setTimeout(() => {
          nav_observer.observe(elements[i]);
        }, 1000);
      }
    }
    if (i == 2) {
      navElements[i].style.borderRight = "solid 1px black";
    }
  });
}

const hide_observer = new IntersectionObserver(
  function (entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        hide(entries[i].target.id);
      }
    }
  },
  {
    threshold: 0.15,
  }
);

const show_observer = new IntersectionObserver(
  function (entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        show(entries[i].target.id);
      }
    }
  },
  {
    threshold: 0.95,
  }
);

const nav_observer = new IntersectionObserver(
  function (entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        setnav(i, entries[i].target.id);
      }
    }
  },
  {
    threshold: 0.6,
  }
);

for (let i = 0; i < elements.length; i++) {
  hide_observer.observe(elements[i]);
  show_observer.observe(elements[i]);
  nav_observer.observe(elements[i]);
}

const showstop = () => {
  for (let i = 0; i < elements.length; i++) {
    show_observer.unobserve(elements[i]);
    setTimeout(() => {
      show_observer.observe(elements[i]);
      //    console.log("done")
    }, 600);
  }
};

window.addEventListener("scroll", () => {
  for (let i = 0; i < elements.length; i++) {
    show_observer.unobserve(elements[i]);
  }
});

const onScrollStop = (callback) => {
  let isScrolling;
  window.addEventListener(
    "scroll",
    (e) => {
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

if (window.innerWidth < 960) {
  projectsection.addEventListener("scroll", (e) => {
    let scroll_ratio = projectsection.scrollTop / projectsection.scrollHeight;
    gallery.scrollTo({
      top: scroll_ratio * gallery.scrollHeight,
      behavior: "smooth",
    });
  });
}
