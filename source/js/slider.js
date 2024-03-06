let slides = document.querySelectorAll('.slider__item');
let leftButton = document.querySelector('.slider__button--prev');
let rightButton = document.querySelector('.slider__button--next');
let sliderContainer = document.querySelector('.slider__list');
let sliderToggles = [...document.querySelectorAll('.slider__toggle')];

let shift = 0;
let move = 0;
let isDrag = false;
let startX = 0;

const setActiveToggle = (index) => {
  sliderToggles.forEach((it, i) => {
    if(cycle(-index, sliderToggles.length) == i) {
      it.classList.add('slider__toggle--active');
    }
    else {
      it.classList.remove('slider__toggle--active');
    }
  })
}

const handleResize = () => {
  const heights = [...slides].map((slide) => slide.getBoundingClientRect().height);
  sliderContainer.style.height = Math.max(...heights) + 'px';
}

handleResize();

window.addEventListener('resize', handleResize);

function cycleArr(a,am){
  return a>=0?am[a%am.length]:am[am.length-(1+ -(a+1)%(am.length))]
}

function cycle(a,am){
  return a>=0?a%am:am-(1+ -(a+1)%am)
}

const handleMove = (evt)=>{
  if (isDrag){
    if (evt.touches){
      if (evt.touches[0]) {
        move = -(evt.touches[0].pageX-startX);
      }
  } else {
    move = -(evt.pageX-startX);
  }
   
    let width = slides[0].getBoundingClientRect().width;
    let slideShift = -move/width;
    slideHandler(slideShift, false, true);
  }
}

const handleDown = (evt)=>{
  isDrag = true;  
  startX = evt.pageX ?? evt.touches[0]?.pageX;
}

const handleUp = (ev)=>{
  if (isDrag){
    isDrag = false; 
      let width = slides[0].getBoundingClientRect().width;
      let slideShift = -move/width;
      move = 0;
      slideHandler(slideShift, true);
  } 
}

sliderContainer.addEventListener('mousedown', handleDown);
sliderContainer.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', handleUp);

document.addEventListener('touchstart', handleDown);
document.addEventListener('touchmove', handleMove);
document.addEventListener('touchend', handleUp);
document.addEventListener('touchcancel', handleUp);

sliderContainer.ondragstart = (evt) => evt.preventDefault();


function slideHandler(shiftValue, animate, unfixed){
  slideShift = unfixed?shiftValue:Math.round(shiftValue);
  slides.forEach((it, i)=>{
    let pos = cycle(shift+slideShift+i+1, slides.length);
    let duration = Math.abs(it.pos-pos)>1? 0 :400;
    it.style = `
      transition-duration: ${animate?duration:0}ms; 
      transform: translate(calc(${(pos-1)*100}% - ${0}px));
      `
    it.pos = pos;
  });

  if (!unfixed){
    shift+=slideShift;
    setActiveToggle(shift);
  }
}

leftButton.onclick = ()=>{slideHandler(1, true)}
rightButton.onclick = ()=>{slideHandler(-1, true)};

slideHandler(0, false, true);
sync(()=>{slideHandler(0, true, true)});

function sync(callback){
  requestAnimationFrame(()=>requestAnimationFrame(()=>callback()));
}