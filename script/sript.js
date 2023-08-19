const gallery = document.getElementById("gallery");
const lilnav = document.querySelector(".lil-nav");
const projectsection = document.querySelector(".projectsection");
const projectdivs = document.getElementsByClassName("projectdiv");
const lilnavs = document.getElementsByClassName("lil-nav-link");
const section = document.getElementById("section");
const grad_hr = document.getElementById("grad_hr");
const right_hr = document.getElementById("right_hr");
const navElements = document.querySelectorAll(".nav_item");
const main_sections = document.querySelectorAll(".main");
const galleryarray = document.getElementsByClassName("gallery__img");

let navpush = false;

function scrollFunction() {
  const carr = document.getElementById("carrousel_main");
  window.scrollTo({ top: carr.offsetTop, behavior: "smooth" });
}

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
  phone_carr();
  observe_phone_carr();
  lazyload();
};

const lazyload = () => {
  const imgs = document.querySelectorAll("img");
  for (i = 0; i < imgs.length; i++) {
    imgs[i].src = imgs[i].dataset.src;
  }
  observe_phone_carr();
};

window.addEventListener("resize", (event) => {
  let image1_height = document.getElementById("image-1").clientHeight;
  gallery.style.height = image1_height + "px";
  lilnav.style.height = image1_height + "px";

  // if (window.innerWidth > 960) {
  //   projectsection.style.height = image1_height + "px";
  //   for (i = 0; i < projectdivs.length; i++) {
  //     projectdivs[i].style.height = image1_height + "px";
  //   }
  // }
  let galleryarray = document.getElementsByClassName("gallery__img");
  for (i = 0; i < galleryarray.length; i++) {
    galleryarray[i].style.maxHeight = "none";
    // galleryarray[i].style.maxHeight= galleryarray[i].style.height;
  }
  phone_carr();
  observe_phone_carr();
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
    // if (window.innerWidth < 960) {
    //   grad_hr.style.width = window.innerWidth / 2 + 1 + "PX";
    //   right_hr.style.width = window.innerWidth / 2 + "PX";
    // }
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

      for (let i = 0; i < main_sections.length; i++) {
        nav_observer.unobserve(main_sections[i]);
        setTimeout(() => {
          nav_observer.observe(main_sections[i]);
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

for (let i = 0; i < main_sections.length; i++) {
  hide_observer.observe(main_sections[i]);
  show_observer.observe(main_sections[i]);
  nav_observer.observe(main_sections[i]);
}

const showstop = () => {
  for (let i = 0; i < main_sections.length; i++) {
    show_observer.unobserve(main_sections[i]);
    setTimeout(() => {
      show_observer.observe(main_sections[i]);
      //    console.log("done")
    }, 600);
  }
};

window.addEventListener("scroll", () => {
  for (let i = 0; i < main_sections.length; i++) {
    show_observer.unobserve(main_sections[i]);
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
  for (let i = 0; i < main_sections.length; i++) {
    show_observer.observe(main_sections[i]);
  }
});

const phone_carr = () => {
  if (window.innerWidth < 960) {
    gallery.addEventListener("scroll", (e) => {
      let scroll_ratio = gallery.scrollTop / gallery.scrollHeight;
      projectsection.scrollTo({
        top: scroll_ratio * projectsection.scrollHeight,
        behavior: "smooth",
      });
    });
  }
};

const phone_carr_observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      let index = entry.target.img_index;
      if (entry.isIntersecting) {
        set_phone_carr(entry.target, index);
      }
    });
  },
  {
    root: gallery,
    threshold: 0.35,
  }
);

const set_phone_carr = (gall_img, index) => {
  let topheight = index * gall_img.clientHeight + index * 10;
  console.log(gallery.offsetHeight);
  console.log(topheight);

  gallery.scrollTo({ top: topheight, behavior: "smooth" });
};

const observe_phone_carr = () => {
  if (window.innerWidth < 960) {
    let galleryarray = document.querySelectorAll(".gallery__img");
    galleryarray.forEach((img, index) => {
      img.img_index = index;
      phone_carr_observer.observe(img);
    });
  }
};
