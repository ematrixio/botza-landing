// section slider interface
// const Scroller = new fullpage('#fullpage', {
//   //options here
//   autoScrolling:true,
//   css3: true,
//   // scrollHorizontally: true,
//   lockAnchors: true,
//   lockAnchors: false, // to enable url navigation
//   // anchors:['section-1', 'section-2', 'section-3', 'section-4', 'section-5'],
//   navigation: true,
//   navigationPosition: 'right',
//   navigationTooltips: ['Home', 'Botza In Action', 'Panels', 'Power to Slack', 'Journey'],
//   fitToSection: true,
//   scrollOverflow: true,

//   afterLoad: function(origin, destination, direction){
//     var loadedSection = this;

//     if(destination.index == 4 && direction == 'down') {
//       // play timeline animation
//       if (!hasPlayed)
//         runAnimation();
//       else
//         reSizeAnimation();
//     }
//   }
// });

// header sliders

const headerSlider = new Swiper('.headerSlider', {
  direction: 'vertical',
  loop: true,
  autoplay: true,
  allowTouchMove: false,
  preventClicks: true,
  spaceBetween: 0,
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

// header headings slider
const macbookDisplaySlider = new Swiper('.macbookDisplaySlider', {

  direction: 'vertical',
  allowTouchMove: false,
  preventClicks: true,
  autoHeight: true,
  autoplay: false,
});

macbookSlider.on('slideChangeTransitionStart', function () {
  macbookDisplaySlider.slideTo(this.realIndex);
});

// section 4 category tabs
let activeTab      = null;
let activeSlideNav = null;

function setActiveTab(activeTab)
{
  if (activeTab != null)
  {
    let top  = $(activeTab).position().top;
    let left = $(activeTab).position().left;
    document.querySelector('.section-4 .category-tabs .nav-pill-active-bg').style.transform = `translate(${left}px, ${top}px)`;
  }
}
// section 4 gif carousels

function setInitialGifSlide()
{
  // select the middle nav item
  let allGifs   = document.querySelectorAll('.section-4 .category-content.active button.nav-link');
  let middleGif = Math.ceil(allGifs.length / 2) - 1;
  activeSlideNav = allGifs[middleGif];
  let activeGif = new bootstrap.Tab(activeSlideNav);
  activeGif.show();
  allGifs = null;
}

function setActiveGifSlide()
{
  console.log('function positions');
  // if (activeSlideNav == null)
  //   return false;

  activeSlideNav = $('.section-4 .gifSliders .category-content.active .gifsNav .nav-pills button.nav-link.active')

  let navContainer = activeSlideNav.parent().parent() // .gifsNav_container
  let navPills     = $(navContainer).find('.nav-pills');

    // console.log('getting positions');
    // console.log(activeSlideNav.position().top);
    // console.log(activeSlideNav.outerHeight());
    // console.log(navPills.outerHeight());
    // console.log(navContainer.outerHeight());

  let scrollToT =- activeSlideNav.position().top + navContainer.outerHeight() / 2 - activeSlideNav.outerHeight(true) / 2;
  let scrollToL =- activeSlideNav.position().left + navContainer.outerWidth() / 2 - activeSlideNav.outerWidth(true) / 2;

  console.log('setting positions');
  console.log(scrollToT);
  navPills.css('transform', `translate(${scrollToL}px, ${scrollToT}px)`);

}
/* swiper carousel category tabs *
*
*
*
// get total slides
function initialSlide(slider)
{
  const totalSlides = slider.querySelectorAll('.swiper-slide').length;
  return Math.ceil(totalSlides / 2) - 1;
}

const Crousels = document.querySelectorAll(".gifSliders .swiper");
const Sliders = {};
$('.gifSliders .swiper, .swiperx').height($('.gifSliders').height());
Crousels.forEach(Carousel => {

  let CarouselClass = `.${Carousel.dataset.title}`;

  Sliders[Carousel] = new Swiper(Carousel, {
    // direction: 'horizontal',
    direction: getSliderDirection(),
    loop: true,
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
          updateActiveBullet(CarouselClass);
        }
      },
      snapIndexChange: function () {
        if (this.currentBreakpoint == "375")
        {
          updateActiveBullet(CarouselClass);
        }
      },
      slideChange: function () {
        if (this.currentBreakpoint == "375")
        {
          updateActiveBullet(CarouselClass);
        }
      },
    },

    pagination: {
      el: CarouselClass + '-pagination',
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

*
*/

// preload assets
const assets = [
  '/assets/img/loading-macbook.png',
  '/assets/img/bg vector - header.png',
  '/assets/img/section-2/section-2-bg.png',
  '/assets/img/bg-diffused@2x.png',
  '/assets/img/section-2/Skate.png',
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
  // set the initial selected category tab

  activeTab = $('.category-tabs button.nav-link.active');
  setActiveTab(activeTab);

  // setInitialGifSlide();

  let allGifs;
  let middleGif;
  let activeGif;

  document.querySelectorAll('.section-4 .gifSliders .category-content').forEach (slider => {
    allGifs   = $(slider).find('button.nav-link');
    middleGif = Math.ceil(allGifs.length / 2) - 1;

    if (allGifs[middleGif] == undefined)
      return;

    activeGif = new bootstrap.Tab(allGifs[middleGif]);
    activeGif.show();
    allGifs = null;
  })

  // activeSlideNav = $('.section-4 .gifSliders .category-content.active .gifsNav .nav-pills button.nav-link.active');
  // setActiveGifSlide();

  const tabs = document.querySelectorAll('.section-4 .category-tabs button.nav-link');
  tabs.forEach(tab => {

     tab.addEventListener('shown.bs.tab', event => {
          console.log('switching category tab');
          activeTab = event.target;
          setActiveTab(activeTab);
          setActiveGifSlide();
     });
  });

  // set the initial gifslider active link
  document.querySelectorAll('.section-4 .gifSliders .category-content .gifsNav .nav-pills button.nav-link').forEach(tab => {

     tab.addEventListener('shown.bs.tab', event => {
          console.log('testing');
          activeSlideNav = event.target;
          setActiveGifSlide();

     });
  });

  // pre-loader
  setTimeout(function(){
    // console.log("loaded");
      document.getElementById("loader-wrapper").style.opacity = 0;
      document.getElementById("loader-wrapper").style.zIndex = -9999;
      // document.getElementById("loader-wrapper").remove();

      // run header h1 text animations
      headerTextAnimations();

      runAnimation();
  }, 500);

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

        /*
        *

        // category slider direction update for mobile screens

        Crousels.forEach(Carousel => {
          if (getSliderDirection() != Sliders[Carousel].params.direction)
            Sliders[Carousel].changeDirection(getSliderDirection());
        });

        *
        */

        // set active tab margins again after browser reset
        setActiveTab(activeTab);

        // set active gifslider active marker
        setActiveGifSlide()

        // re-draw timeline arrow according to tablet / mobile screensizes
        reSizeAnimation();
    }
}

// svg arrow path timeline animation

// Arrow Path Animation
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(ScrollTrigger)
let pathAnim = new gsap.timeline();

let tablet    = false;
// let hasPlayed = false;
let cli,
    gui,
    alexa,
    botza,
    path1,
    path2,
    path3,
    cli_text,
    gui_text,
    alexa_text,
    botza_text,
    cli_icon,
    gui_icon,
    alexa_icon,
    botza_icon;

cli        = $(".timeline .cli");
gui        = $(".timeline .gui");
alexa      = $(".timeline .alexa");
botza      = $(".timeline .botza");
path1      = $("svg#arrow-path #path1")[0];
path2      = $("svg#arrow-path #path2")[0];
path3      = $("svg#arrow-path #path3")[0];

cli_text   = $(".timeline .cli p");
gui_text   = $(".timeline .gui p");
alexa_text = $(".timeline .alexa p");
botza_text = $(".timeline .botza p");

cli_icon   = $(".timeline .cli > .icon");
gui_icon   = $(".timeline .gui > .icon");
alexa_icon = $(".timeline .alexa > .icon");
botza_icon = $(".timeline .botza > .icon");



function setPaths() {

  let x1 = (cli_icon.offset().left - $('.section-5 .container').offset().left) + cli_icon.innerWidth() / 2;
  let y1 = (cli_icon.offset().top - $('.section-5 .container').offset().top) + cli_icon.innerHeight() / 2;

  let x2 = (gui_icon.offset().left - $('.section-5 .container').offset().left) + gui_icon.innerWidth() / 2;
  let y2 = (gui_icon.offset().top - $('.section-5 .container').offset().top) + gui_icon.innerHeight() / 2;

  let x3 = (alexa_icon.offset().left - $('.section-5 .container').offset().left) + alexa_icon.innerWidth() / 2;
  let y3 = (alexa_icon.offset().top - $('.section-5 .container').offset().top) + alexa_icon.innerHeight() / 2;

  let x4 = (botza_icon.offset().left - $('.section-5 .container').offset().left) + botza_icon.innerWidth() / 2;
  let y4 = (botza_icon.offset().top - $('.section-5 .container').offset().top) + botza_icon.innerHeight() / 2;



  // console.log($('.section-5 .container').offset().top);
  // console.log(cli_icon.offset().top);
  // console.log(gui_icon.offset().top);
  // console.log(alexa_icon.offset().top);
  // console.log(botza_icon.offset().top);
  // console.log(cli_icon.position().top);
  // console.log(gui_icon.position().top);
  // console.log(alexa_icon.position().top);
  // console.log(botza_icon.position().top);
  // ipad offsets && exclude mobiles
  if (y3 - y2 > 10 && x1 != x2)
  {
    tablet = true;
  }
  else
    tablet = false;

  // console.log ('setting paths');
  // console.log(`path1: M${x1} ${y1} ${x2} ${y2}`);
  // console.log(`path2: M${x2} ${y2} ${x3} ${y3}`);
  // console.log(`path3: M${x3} ${y3} ${x4} ${y4}`);

  path1.setAttribute("d", `M${x1} ${y1} ${x2} ${y2}`);
  if (!tablet)
  {
    path2.setAttribute("d", `M${x2} ${y2} ${x3} ${y3}`);
  }
  else
  {
    // take a u-turn
    if ($(window).width() > 992)
      path2.setAttribute("d", `M${x2} ${y2} ${x2+200} ${y2} ${x3+200} ${y3} ${x3} ${y3}`);
    else
      path2.setAttribute("d", `M${x2} ${y2} ${x2+150} ${y2} ${x3+150} ${y3} ${x3} ${y3}`);
  }

  path3.setAttribute("d", `M${x3} ${y3} ${x4} ${y4}`);
}

function runAnimation()
{
  setPaths();
  // if (hasPlayed)
  // {
  //   reSizeAnimation();
  //   return false;
  // }
  if ($(window).width() < 992)
    pathAnim.set("svg#arrow-path #arrow", {scale: 0.8})

  if ($(window).width() < 576)
    pathAnim.set("svg#arrow-path #arrow", {scale: 0.7})

  pathAnim
  .set("svg#arrow-path .path", {drawSVG: false})
  .set("svg#arrow-path #arrow", {opacity: 0})
  // .set(cli, {opacity: 0, scale: 1.3})
  // .set(gui, {opacity: 0, scale: 1.3})
  // .set(alexa, {opacity: 0, scale: 1.3})
  // .set(botza, {opacity: 0, scale: 1.3})
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
        ease: 'power2',
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

  ScrollTrigger.create({
    animation: pathAnim,
    trigger: ".timeline",
    // markers: true,
    // once: true,
    onUpdate: function () {
      // console.log($(".timeline .cli > .icon").offset().top);
    },
    scrub: true,
    // pin: true,   // pin the trigger element while active
    start: "top 90%", // when the top of the trigger hits the top of the viewport
    end: "bottom 70%", // end after scrolling 500px beyond the start
    // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
  });
}

function reSizeAnimation ()
{
    pathAnim.kill();

    pathAnim = new gsap.timeline();
    runAnimation();
}

function headerTextAnimations() {
  let h1Anim = new gsap.timeline();
  h1Anim
  .fromTo('.h1AnimOne', {opacity: 0}, {
    duration: 0.1,
    opacity: 1,
  }, "+=0.4")
  .fromTo('.h1AnimApp', {opacity: 0}, {
    duration: 0.1,
    opacity: 1,
  }, "+=0.3")
  .fromTo('.h1AnimPossib, svg#infinity', {opacity: 0, y: 10}, {
    duration: 0.3,
    y: 0,
    opacity: 1,
  }, "+=0.5")
  .fromTo('section#header p', {opacity: 0, y: 10}, {
    duration: 0.3,
    y: 0,
    opacity: 1,
  }, "+=0.2")
  .fromTo('.inviteBox2', {opacity: 0, x: -200}, {
    duration: 0.3,
    x: 0,
    opacity: 1,
  }, "<0%")
  // .to('svg#infinity', {
  //   duration: 0.3,
  //   rotation: 180,
  //   ease: 'Power0.easeNone'
  // }, "+=0.3");

$(".scrollTo").click(function(e) {
  e.preventDefault();
  $('#fp-nav a').removeClass('active');
  $(this).addClass('active');
  window.scrollTo({top: $(this.hash).offset().top, behavior: 'smooth'})
});


  // let h1Anims = new gsap.timeline();
  // h1Anims
  // .to('section#header h1', {
  //   skewX: -30,
  // }, 0)
  // .to('section#header h1', {
  //   x: -600,
  // }, "<5%")
  // .to('section#header .headerSlider', {
  //   // skewY: -20,
  //   skewX: -20,
  //   opacity: 0,
  //   x: 800,
  // }, "<20%")
  // .to('section#header .headerSliderHeadings', {
  //   x: 700,
  //   opacity: 0,
  // }, "<40%")
  // .to('section#header p', {
  //   x: -600,
  // }, "<25%")
  // .to('section#header .inviteBox2', {
  //   x: -600,
  //   opacity: 0,
  // }, "<40%")
  // ScrollTrigger.create({
  //   animation: h1Anims,
  //   trigger: 'section#header',
  //   // markers: true,
  //   start: 'bottom 60%',
  //   // end: 'bottom 300px',
  //   scrub: true,
  //   // ease: 'Power0.easeNone'
  // });
}

// invite code
function sendRequest(email, type) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    let formData = new FormData();
    formData.append("email", email);
    $.ajax({
      url: "https://api.botza.net/v1/subscribe/create",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
    }).then((data) => {
      if (data.status == "success") {
        $("#successModal").css("display", "flex");
      } else {
        $(`.error${type}`).text(data.error);
        $(`.error${type}`).css("display", "block");
        setTimeout(() => {
          $(`.error${type}`).css("display", "none");
        }, 3000);
      }
    });
  } else {
    $(`.error${type}`).text("Invalid email!");
    $(`.error${type}`).css("display", "block");
    setTimeout(() => {
      $(`.error${type}`).css("display", "none");
    }, 3000);
  }
}

$("#inviteButton").on("click", (e) => {
  e.preventDefault();
  let userEmail = $("#userEmail").val();
  sendRequest(userEmail, "1");
});

$(".inviteButton2").on("click", (e) => {
  e.preventDefault();
  let userEmail = $(".userEmail2").val();
  sendRequest(userEmail, "2");
});
$(".closeModal").on("click", () => {
  $("#successModal").css("display", "none");
});
