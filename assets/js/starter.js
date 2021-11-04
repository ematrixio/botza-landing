// section slider interface
const Scroller = new fullpage('#fullpage', {
  //options here
  autoScrolling:true,
  css3: true,
  // scrollHorizontally: true,
  lockAnchors: true,
  lockAnchors: false, // to enable url navigation
  // anchors:['section-1', 'section-2', 'section-3', 'section-4', 'section-5'],
  navigation: true,
  navigationPosition: 'right',
  navigationTooltips: ['Home', 'Botza In Action', 'Panels', 'Power to Slack', 'Journey'],
  fitToSection: true,
  scrollOverflow: true,

  afterLoad: function(origin, destination, direction){
    var loadedSection = this;

    if(destination.index == 4 && direction == 'down') {
      // play timeline animation
      runAnimation();
    }
  }
});

// navbar handler

  // document.querySelector('.navbar').addEventListener('show.bs.collapse', function () {
  //   let el_overlay = document.createElement('span');
  //   el_overlay.className = 'overlay';
  //   document.body.appendChild(el_overlay)
  //   document.body.classList.add('body-overlay');
  // });
  // document.querySelector('.navbar').addEventListener('hide.bs.collapse', function () {
  //   document.body.removeChild(document.querySelector('.overlay'));
  //   document.body.classList.remove('body-overlay');
  // });

// header sliders

const headerSlider = new Swiper('.headerSlider', {
  direction: 'vertical',
  loop: true,
  autoplay: true,
  allowTouchMove: false,
  preventClicks: true,
  // spaceBetween: 10,
});

// header headings slider
const headerSliderHeadings = new Swiper('.headerSliderHeadings .swiper', {

  direction: 'vertical',
  allowTouchMove: false,
  preventClicks: true,
  autoHeight: true,
  autoplay: false,
});

headerSlider.on('slideChangeTransitionStart', function () {
  headerSliderHeadings.slideTo(this.realIndex);
});

// section 3 macbook switcher
const macbookSlider = new Swiper('.macbookSlider', {

  direction: 'vertical',
  loop: true,
  allowTouchMove: false,
  preventClicks: false,
  autoHeight: true,
  autoplay: false,

  pagination: {
    el: '.macbookSlider-pagination',
    // type: 'bullets',
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '"><div class="icon"></div></div>';
    },
  },
});

// section 4 category tabs
let activeTab = "";
const tabs = document.querySelectorAll('.section-4 .nav-pills button[data-bs-toggle="pill"]');
tabs.forEach(tab => {
   tab.addEventListener('show.bs.tab', event => {
        activeTab = event.target;
        setActiveTab(activeTab);

   });
});

function setActiveTab(activeTab)
{
  const top  = activeTab.offsetTop;
  const left = activeTab.offsetLeft - 8;
  document.querySelector('.nav-pill-active-bg').style.transform = `translate(${left}px, ${top}px)`;
}

// section 4 gif carousels

// get total slides
function initialSlide(slider)
{
  const totalSlides = document.querySelectorAll(slider + ' .swiper-slide').length;
  return Math.ceil(totalSlides / 2) - 1;
}

const Crousels = ['.cryptoSlider', '.hrSlider', '.developersSlider', '.seoToolsSlider', '.webmasterSlider'];
const Sliders = {};

Crousels.forEach(Carousel => {
  Sliders[Carousel] = new Swiper(Carousel, {
    // direction: 'horizontal',
    direction: getSliderDirection(),
    // loop: true,
    allowTouchMove: false,
    preventClicks: false,
    autoHeight: true,
    initialSlide: initialSlide(Carousel),
    autoplay: false,
    spaceBetween: 10,

    on: {
      init: function () {
        // console.log(this)
        if (this.currentBreakpoint == "375")
        {
          updateActiveBullet(Carousel);
        }
      },
      snapIndexChange: function () {
        if (this.currentBreakpoint == "375")
        {
          updateActiveBullet(Carousel);
        }
      },
      slideChange: function () {
        if (this.currentBreakpoint == "375")
        {
          updateActiveBullet(Carousel);
        }
      },
    },

    pagination: {
      el: Carousel + '-pagination',
      clickable: true,
      dynamicBullets: true,
      renderBullet: function (index, className) {
        return '<div class="' + className + '">'+ this.slides[index].dataset.title +'</div>';
      },
    },
    breakpoints: {
      375: {
        allowTouchMove: true,
        pagination: {
          dynamicBullets: false,
        }
      },
      576: {
        pagination: {
          dynamicBullets: true,
        }
      },
    }
  });
});

// mobile active bullet workaround
function updateActiveBullet(Slider)
{
  let bulletContainer = document.querySelector(`${Slider}-pagination`);
  let activeBullet = document.querySelector(`${Slider}-pagination .swiper-pagination-bullet-active`);

  if (activeBullet != null)
  {
    // console.log(activeBullet);
    // console.log(activeBullet.offsetLeft);
    // console.log(bulletContainer.getBoundingClientRect().width);
    // console.log(activeBullet.getBoundingClientRect().width);

    let scrollTo =- activeBullet.offsetLeft + bulletContainer.getBoundingClientRect().width / 2 - activeBullet.getBoundingClientRect().width / 2;
    bulletContainer.style.transform = `translateX(${scrollTo}px)`;
  }

}

function getSliderDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 576 ? 'horizontal' : 'vertical';

  return direction;
}

// preload assets
const assets = [
  '/assets/img/loading-macbook.png',
  '/assets/img/bg vector - header.svg',
  '/assets/img/bg-diffused.svg',
  '/assets/img/section-2/section-2-bg.png',
  '/assets/img/bg-diffused.svg',
  '/assets/img/section-2/Skate.png',
  '/assets/img/section-3/bg gradient-sec3.svg',
  '/assets/img/section-3/macbook-icons/1o.svg',
  '/assets/img/section-3/macbook-icons/1f.svg',
  '/assets/img/section-3/macbook-icons/2o.svg',
  '/assets/img/section-3/macbook-icons/2f.svg',
  '/assets/img/section-3/macbook-icons/3o.svg',
  '/assets/img/section-3/macbook-icons/3f.svg',
  '/assets/img/section-3/macbook-icons/4o.svg',
  '/assets/img/section-3/macbook-icons/4f.svg',
  '/assets/img/section-5/cli-bg.svg',
  '/assets/img/section-5/botza-bg.svg',
  '/assets/img/section-5/alexa-bg.svg',
  '/assets/img/section-5/gui-bg.svg',
];

assets.forEach((asset, index) => {
  (new Image()).src = assets[index];
});

// set the position for the first active tab
window.onload = function() {
  const initialTab = document.querySelector('.section-4 .nav-pills button[data-bs-toggle="pill"]');
  setActiveTab(initialTab);
  setTimeout(function(){
    // console.log("loaded");
      document.getElementById("loader-wrapper").style.opacity = 0;
      document.getElementById("loader-wrapper").style.zIndex = -9999;
      // document.getElementById("loader-wrapper").remove();
  }, 2000);
};


// add a small delay before firing resize event to make sure
// that the user is done resizing the browser
var rtime;
var timeout = false;
var delta = 200;
window.addEventListener('resize', function() {

    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;

        // category slider direction update for mobile screens

        Crousels.forEach(Carousel => {
          if (getSliderDirection() != Sliders[Carousel].params.direction)
            Sliders[Carousel].changeDirection(getSliderDirection());
        });

        // set active tab margins again after browser reset
        setActiveTab(activeTab);

        // re-play timeline animation for screen size changes
        let currSection = Scroller.getActiveSection().index;
        if (currSection == 4)
          runAnimation();
    }
}

// svg arrow path timeline animation

function runAnimation()
{
  let cli  = document.querySelector(".timeline .cli");
  let gui = document.querySelector(".timeline .gui");
  let alexa  = document.querySelector(".timeline .alexa");
  let botza = document.querySelector(".timeline .botza");
  let path1  = document.querySelector("svg#arrow-path #path1");
  let path2  = document.querySelector("svg#arrow-path #path2");
  let path3  = document.querySelector("svg#arrow-path #path3");

  let cli_icon  = document.querySelector(".timeline .cli > .icon");
  let gui_icon = document.querySelector(".timeline .gui > .icon");
  let alexa_icon  = document.querySelector(".timeline .alexa > .icon");
  let botza_icon = document.querySelector(".timeline .botza > .icon");

  let cli_text  = document.querySelector(".timeline .cli p");
  let gui_text = document.querySelector(".timeline .gui p");
  let alexa_text  = document.querySelector(".timeline .alexa p");
  let botza_text = document.querySelector(".timeline .botza p");

  let tablet = false;

  let x1 = cli_icon.offsetLeft + cli_icon.getBoundingClientRect().width / 2;
  let y1 = cli_icon.offsetTop + cli_icon.getBoundingClientRect().height / 2;

  let x2 = gui_icon.offsetLeft + gui_icon.getBoundingClientRect().width / 2;
  let y2 = gui_icon.offsetTop + gui_icon.getBoundingClientRect().height / 2;

  let x3 = alexa_icon.offsetLeft + alexa_icon.getBoundingClientRect().width / 2;
  let y3 = alexa_icon.offsetTop + alexa_icon.getBoundingClientRect().height / 2;

  let x4 = botza_icon.offsetLeft + botza_icon.getBoundingClientRect().width / 2;
  let y4 = botza_icon.offsetTop + botza_icon.getBoundingClientRect().height / 2;

  // ipad offsets && exclude mobiles
  if (y3 - y2 > 10 && x1 != x2)
  {
    tablet = true;
  }

  path1.setAttribute("d", `M${x1} ${y1} ${x2} ${y2}`);
  if (!tablet)
  {
    path2.setAttribute("d", `M${x2} ${y2} ${x3} ${y3}`);
  }
  else
  {
    // take a u-turn
    path2.setAttribute("d", `M${x2} ${y2} ${x2+200} ${y2} ${x3+200} ${y3} ${x3} ${y3}`);
  }

  path3.setAttribute("d", `M${x3} ${y3} ${x4} ${y4}`);
  gsap.registerPlugin(MotionPathPlugin);
  gsap.registerPlugin(DrawSVGPlugin);
  let pathAnim = new TimelineMax({
        // repeat: -1,
        // repeatDelay: 1
        // delay: 1
    })
  .set("svg#arrow-path .path", {xPercent:0, yPercent:0, transformOrigin:"center center", drawSVG: false})
  .set("svg#arrow-path #arrow", {xPercent:0, yPercent:0, transformOrigin:"center center", opacity: 0})
  .set(cli, {opacity: 0, scale: 1.3})
  .set(gui, {opacity: 0, scale: 1.3})
  .set(alexa, {opacity: 0, scale: 1.3})
  .set(botza, {opacity: 0, scale: 1.3})
  .set(cli_text, {fontWeight: "600", color: "#767676"})
  .set(gui_text, {fontWeight: "600", color: "#767676"})
  .set(alexa_text, {fontWeight: "600", color: "#767676"})
  .set(botza_text, {fontWeight: "600", color: "#767676"})
  .to(cli, {
      scale: 1,
      opacity: 1,
      duration: 0.3
    },
  )
  .to(path1,
    {
      duration: 0.6,
      ease: 'power2',
      drawSVG: true
    },
    "+=0.5"
  )
  .to("#arrow", {
    duration: 0.6,
    ease: 'power2',
    motionPath: {
        path: path1,
        align: path1,
        autoRotate: true,
        alignOrigin: [1, 0.5]
      }
    }, "<0%"
  )
  .to("#arrow", {
      opacity: 1
    }, "<0%"
  )
  .to(cli_text, {
      duration: 0.3,
      fontWeight: "400",
      fontSize: "18px",
      color: "#979EA8",
    }, "<0%"
  )
  .to(gui, {
      scale: 1,
      opacity: 1,
      duration: 0.3
    },
    "<20%"
  )
  .to(alexa, {
      scale: 1,
      opacity: 1,
      duration: 0.3
    },
    "+=0.5"
  );
   pathAnim.to(gui_text, {
      duration: 0.3,
      fontWeight: "400",
      fontSize: "18px",
      color: "#979EA8",
    }, "<0%"
  )
  if (tablet)
  {
    pathAnim.to(path2,
      {
        duration: 1,
        ease: 'power2',
        drawSVG: true
      },
      "<100%"
    )
    .to("#arrow", {
      duration: 1,
      ease: 'power2',
      motionPath: {
        path: path2,
        align: path2,
        autoRotate: true,
        alignOrigin: [1, 0.5]
      }
    }, "<0%")
  }
  else
  {
    pathAnim.to(path2,
      {
        duration: 0.6,
        ease: 'power',
        drawSVG: true
      },
      "<0%"
    )
    .to("#arrow", {
        duration: 0.6,
        ease: 'power2',
        motionPath: {
          path: path2,
          align: path2,
          autoRotate: true,
          alignOrigin: [1, 0.5]
        }
      }, "<0%"
    )
  }


  pathAnim.to(botza, {
      scale: 1,
      opacity: 1,
      duration: 0.3
    },
    "+=0.5"
  )
  .to(alexa_text, {
      duration: 0.3,
      fontWeight: "400",
      fontSize: "18px",
      color: "#979EA8",
    }, "<0%"
  )
  .to(path3,
    {
      duration: 0.6,
      ease: 'power2',
      drawSVG: true
    },
    "<0%"
  )
  .to("#arrow", {
      duration: 0.6,
      ease: 'power2',
      motionPath: {
        path: path3,
        align: path3,
        autoRotate: true,
        alignOrigin: [1, 0.5]
      }
    }, "<0%"
  )
}

