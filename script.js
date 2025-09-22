document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('about-slider');
  if (!slider) return; // nothing to do

  const slidesContainer = slider.querySelector('.slides');
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  let index = 0;
  let sliderWidth = slider.clientWidth;
  let autoTimer = null;

  // set each slide's width to match the visible slider width
  function setSlideWidths() {
    sliderWidth = slider.clientWidth;
    slides.forEach(slide => {
      slide.style.width = sliderWidth + 'px';
    });
    // reposition to current slide (use px translation)
    slidesContainer.style.transform = `translateX(${-index * sliderWidth}px)`;
  }

  function showSlide(i) {
    index = (i + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(${-index * sliderWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    showSlide(index - 1);
  });

  nextBtn.addEventListener('click', () => {
    showSlide(index + 1);
  });

  // auto-play
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
      showSlide(index + 1);
    }, 5000);
  }
  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // handle window resize
  window.addEventListener('resize', () => {
    // small debounce
    clearTimeout(window._sliderResizeTimer);
    window._sliderResizeTimer = setTimeout(setSlideWidths, 120);
  });

  // init
  setSlideWidths();
  startAuto();
});
