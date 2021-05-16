const sliderPortfolio = () => {
  class SliderCarousel {
    constructor({
      main,
      wrap,
      next,
      prev,
      infinity = false,
      position = 0,
      slidesToShow = 3,
      responsive = [],

    }) {
      if (!main || !wrap) {
        console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!');
      }
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelector(wrap).children;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.options = {
        position,
        infinity,
        widthSlide: Math.floor(100 / this.slidesToShow),
      };
      this.responsive = responsive;
    }

    init() {
      this.addGloClass();
      this.addStyle();

      if (this.prev && this.next) {
        this.controlSlider();
      } else {
        this.addArrow();
        this.controlSlider();
      }

      if (this.responsive) {
        this.responseInit();
      }
    }

    addGloClass() {
      this.main.classList.add('glo-slider');
      this.wrap.classList.add('glo-slider__wrap');
      for (const item of this.slides) {
        item.classList.add('glo-slider__item');
      }
    }

    addStyle() {
      let style = document.getElementById('sliderCarousel-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'sliderCarousel-style';
      }

      style.textContent = `
        .glo-slider {
          
        }
        .glo-slider__wrap {
          display: flex !important;
          transition: transform 0.5s !important;
          will-change: transform !important;
        }
        .glo-slider__item {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex: 0 0 ${this.options.widthSlide}% !important;
          margin: auto 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    controlSlider() {
      this.prev.addEventListener('click', this.prevSlider.bind(this));
      this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider() {
      if (this.options.infinity || this.options.position > 0) {
        --this.options.position;
        if (this.options.position < 0) {
          this.options.position = this.slides.length - this.slidesToShow;
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      }

    }

    nextSlider() {
      if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
        ++this.options.position;
        if (this.options.position > this.slides.length - this.slidesToShow) {
          this.options.position = 0;
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      }

    }

    addArrow() {
      this.prev = document.createElement('button');
      this.next = document.createElement('button');

      this.prev.className = 'glo-slider__prev';
      this.next.className = 'glo-slider__next';

      this.main.appendChild(this.prev);
      this.main.appendChild(this.next);

      const style = document.createElement('style');
      style.textContent = `
        .glo-slider__prev,
        .glo-slider__next {
          margin: 0 10px;
          border: 20px solid transparent;
          background: transparent;
        }
        .glo-slider__next {
          border-left-color: #19b5fe;
        }
        .glo-slider__prev {
          border-right-color: #19b5fe;
        }
        .glo-slider__prev:hover,
        .glo-slider__next:hover,
        .glo-slider__prev:focus,
        .glo-slider__next:focus {
          background: transparent;
          outline: transparent;
        }
      `;

      document.head.appendChild(style);
    }

    responseInit() {
      const slidesToShowDefault = this.slidesToShow,
        allResponse = this.responsive.map(item => item.breakpoint),
        maxResponse = Math.max(...allResponse);

      const checkResponse = () => {
        const widthWindow = document.documentElement.clientWidth;

        if (widthWindow < maxResponse) {
          for (let i = 0; i < allResponse.length; i++) {
            if (widthWindow < allResponse[i]) {
              this.slidesToShow = this.responsive[i].slidesToShow;
              this.options.widthSlide = Math.floor(100 / this.slidesToShow);
              this.addStyle();
            }
          }
        } else {
          this.slidesToShow = slidesToShowDefault;
          this.options.widthSlide = Math.floor(100 / this.slidesToShow);
          this.addStyle();
        }
      };

      checkResponse();
      window.addEventListener('resize', checkResponse);
    }
  }
  const runSliderPortfolio = new SliderCarousel({
    main: '.portfolio-slider-wrap',
    wrap: '.portfolio-slider.mobile-hide',
    next: '#portfolio-arrow_right',
    prev: '#portfolio-arrow_left',
    slidesToShow: 3,
    infinity: false,
    responsive: [
      {
        breakpoint: 1024,
        slidesToShow: 2,
      },
      {
        breakpoint: 900,
        slidesToShow: 1,
      },
    ]
  });

  const runSliderPortfolioMini = new SliderCarousel({
    main: '.portfolio-slider-wrap',
    wrap: '.portfolio-slider-mobile',
    next: '#portfolio-arrow-mobile_right',
    prev: '#portfolio-arrow-mobile_left',
    slidesToShow: 3,
    infinity: true,
    responsive: [
      {
        breakpoint: 576,
        slidesToShow: 1,
      },
      {
        breakpoint: 320,
        slidesToShow: 1,
      }
    ]
  });


  const portfolioArrowRight = document.getElementById('portfolio-arrow_right'),
    portfolioArrowLeft = document.getElementById('portfolio-arrow_left'),
    portfolioMobileRight = document.querySelector('#portfolio-arrow-mobile_right'),
    portfolioMobileLeft = document.querySelector('#portfolio-arrow-mobile_left'),
    portfolioCounter = document.getElementById('portfolio-counter'),
    portfolioCounterCur = portfolioCounter.querySelector('.slider-counter-content__current'),
    portfolioCounterTot = portfolioCounter.querySelector('.slider-counter-content__total');

  const firstSlider = document.querySelector('.portfolio-slider'),
    secondSlider = document.querySelector('.portfolio-slider-mobile');

  const currentSlideMini = () => {
    portfolioCounterCur.textContent = runSliderPortfolioMini.options.position + 1;
  };

  const currentSlide = () => {
    portfolioCounterCur.textContent = runSliderPortfolio.options.position + 1;
    if (runSliderPortfolio.options.position === +portfolioCounterTot.textContent - 1) {
      portfolioArrowRight.classList.add('non-visible');
      portfolioArrowRight.classList.remove('visibility-visible');
    } else if (runSliderPortfolio.options.position !== +portfolioCounterTot.textContent - 1) {
      portfolioArrowRight.classList.remove('non-visible');
      portfolioArrowRight.classList.add('visibility-visible');
    }
    if (runSliderPortfolio.options.position === 1) {
      portfolioArrowLeft.classList.add('visibility-visible');
      portfolioArrowLeft.classList.remove('non-visible');
    } else if (runSliderPortfolio.options.position === 0) {
      portfolioArrowLeft.classList.remove('visibility-visible');
      portfolioArrowLeft.classList.add('non-visible');
    }
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth < 576) {
      secondSlider.style = 'display: flex !important';
      firstSlider.style = 'display: none !important';
      portfolioArrowRight.style = 'display: none';
      portfolioArrowLeft.style = 'display: none';
      portfolioCounterCur.textContent = runSliderPortfolioMini.options.position + 1;
      portfolioCounterTot.textContent = runSliderPortfolioMini.slides.length;
      portfolioMobileRight.addEventListener('click', currentSlideMini);
      portfolioMobileLeft.addEventListener('click', currentSlideMini);
      portfolioArrowRight.removeEventListener('click', currentSlide);
      portfolioArrowLeft.removeEventListener('click', currentSlide);
    } else {
      portfolioArrowRight.style = 'display: flex';
      secondSlider.style = 'display: none !important';
      firstSlider.style = 'display: flex !important';
      portfolioMobileRight.removeEventListener('click', currentSlideMini);
      portfolioMobileLeft.removeEventListener('click', currentSlideMini);
      portfolioArrowRight.addEventListener('click', currentSlide);
      portfolioArrowLeft.addEventListener('click', currentSlide);
      portfolioCounterTot.textContent = runSliderPortfolio.slides.length - runSliderPortfolio.slidesToShow + 1;
    }
  });



  runSliderPortfolioMini.init();
  runSliderPortfolio.init();


  if (window.innerWidth < 576) {
    secondSlider.parentElement.classList.add('glo-slider2');
    secondSlider.style = 'display: flex !important';
    firstSlider.style = 'display: none !important';
    portfolioArrowRight.style = 'display: none';
    portfolioArrowLeft.style = 'display: none';
    portfolioCounterCur.textContent = runSliderPortfolioMini.options.position + 1;
    portfolioCounterTot.textContent = runSliderPortfolioMini.slides.length;
    portfolioMobileRight.addEventListener('click', currentSlideMini);
    portfolioMobileLeft.addEventListener('click', currentSlideMini);
    portfolioArrowRight.removeEventListener('click', currentSlide);
    portfolioArrowLeft.removeEventListener('click', currentSlide);
  } else {
    firstSlider.parentElement.classList.add('glo-slider2');
    portfolioArrowRight.style = 'display: flex';
    secondSlider.style = 'display: none !important';
    firstSlider.style = 'display: flex !important';
    portfolioCounterCur.textContent = runSliderPortfolio.options.position + 1;
    portfolioCounterTot.textContent = runSliderPortfolio.slides.length - runSliderPortfolio.slidesToShow + 1;
    portfolioMobileRight.removeEventListener('click', currentSlideMini);
    portfolioMobileLeft.removeEventListener('click', currentSlideMini);
    portfolioArrowRight.addEventListener('click', currentSlide);
    portfolioArrowLeft.addEventListener('click', currentSlide);
  }

  class SliderCarousel2 {
    constructor({
      main,
      wrap,
      next,
      prev,
      infinity = false,
      position = 0,
      slidesToShow = 3,
      responsive = [],

    }) {
      if (!main || !wrap) {
        console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!');
      }
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelector(wrap).children;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.options = {
        position,
        infinity,
        widthSlide: Math.floor(100 / this.slidesToShow),
      };
      this.responsive = responsive;
    }

    init() {
      this.addGloClass();
      // this.addStyle();

      if (this.prev && this.next) {
        this.controlSlider();
      } else {
        this.addArrow();
        this.controlSlider();
      }

      if (this.responsive) {
        this.responseInit();
      }
    }

    addGloClass() {
      this.main.classList.add('glo-slider3');
      this.wrap.classList.add('glo-slider__wrap');
      for (const item of this.slides) {
        item.classList.add('glo-slider__item2');
      }
    }


    controlSlider() {
      this.prev.addEventListener('click', this.prevSlider.bind(this));
      this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider() {
      if (this.options.infinity || this.options.position > 0) {
        --this.options.position;
        if (this.options.position < 0) {
          this.options.position = this.slides.length - this.slidesToShow;
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      }

    }

    nextSlider() {
      if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
        ++this.options.position;
        if (this.options.position > this.slides.length - this.slidesToShow) {
          this.options.position = 0;
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
      }

    }

    responseInit() {
      const slidesToShowDefault = this.slidesToShow,
        allResponse = this.responsive.map(item => item.breakpoint),
        maxResponse = Math.max(...allResponse);

      const checkResponse = () => {
        const widthWindow = document.documentElement.clientWidth;

        if (widthWindow < maxResponse) {
          for (let i = 0; i < allResponse.length; i++) {
            if (widthWindow < allResponse[i]) {
              this.slidesToShow = this.responsive[i].slidesToShow;
              this.options.widthSlide = Math.floor(100 / this.slidesToShow);
              // this.addStyle();
            }
          }
        } else {
          this.slidesToShow = slidesToShowDefault;
          this.options.widthSlide = Math.floor(100 / this.slidesToShow);
          // this.addStyle();
        }
      };

      checkResponse();
      window.addEventListener('resize', checkResponse);
    }
  }

  const portfolioSliderWrap = document.querySelector('.portfolio-slider-wrap'),
    popupPortfolio = document.querySelector('.popup-portfolio');




  const slider = new SliderCarousel2({
    main: '.popup-portfolio-slider-wrap',
    wrap: '.popup-portfolio-slider',
    next: '#popup_portfolio_right',
    prev: '#popup_portfolio_left',
    slidesToShow: 1,
    infinity: true,
  });


  const popupPortfolioTexts = document.querySelectorAll('.popup-portfolio-text'),
    popupPortfolioLeft = document.getElementById('popup_portfolio_left'),
    popupPortfolioRight = document.getElementById('popup_portfolio_right'),
    popupPortfolioCounter = document.getElementById('popup-portfolio-counter'),
    popupPortfolioCounterCur = popupPortfolioCounter.querySelector('.slider-counter-content__current'),
    popupPortfolioCounterTot = popupPortfolioCounter.querySelector('.slider-counter-content__total');

  slider.init();
  popupPortfolioCounterTot.textContent = slider.slides.length;

  portfolioSliderWrap.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.portfolio-slider__slide-frame')) {
      popupPortfolio.classList.toggle('visibility-visible');
      slider.options.position = +target.children[0].alt.slice(-1);
      slider.wrap.style.transform = `translateX(-${slider.options.position * slider.options.widthSlide}%)`;
      popupPortfolioCounterCur.textContent = slider.options.position + 1;
    }
  });

  const popupPortfolioText = index => {
    for (let i = 0; i < popupPortfolioTexts.length; i++) {
      if (index === i) {
        popupPortfolioTexts[i].style.display = 'flex';
      } else {
        popupPortfolioTexts[i].style.display = 'none';
      }
    }
  };

  const showText = () => {
    popupPortfolioText(slider.options.position);
    popupPortfolioCounterCur.textContent = slider.options.position + 1;
  };

  popupPortfolioLeft.addEventListener('click', showText);
  popupPortfolioRight.addEventListener('click', showText);

  const slider2 = new SliderCarousel2({
    main: '.transparency-slider-wrap',
    wrap: '.transparency-slider.row',
    next: '#transparency-arrow_right',
    prev: '#transparency-arrow_left',
    slidesToShow: 1,
    infinity: true,
  });

  const transparencyLeft = document.getElementById('transparency_left'),
    transparencyRight = document.getElementById('transparency_right'),
    transparencyPopupCounter = document.getElementById('transparency-popup-counter'),
    transparencyPopupCounterCur = transparencyPopupCounter.querySelector('.slider-counter-content__current'),
    transparencyPopupCounterTot = transparencyPopupCounter.querySelector('.slider-counter-content__total'),
    popupTransparencySliderSliders = document.querySelectorAll('.popup-transparency-slider__slide');

  slider2.init();

  const sliderReviews = new SliderCarousel2({
    main: '.reviews-slider-wrap',
    wrap: '.reviews-slider',
    next: '#reviews-arrow_right',
    prev: '#reviews-arrow_left',
    slidesToShow: 1,
    infinity: true,
  });

  sliderReviews.init();

  const transparency = document.getElementById('transparency'),
    popupTransparency = document.querySelector('.popup-transparency');

  let slideIndex = 1;
  /* Вызываем функцию, которая реализована ниже: */
  showSlides(slideIndex);

  /* Увеличиваем индекс на 1 — показываем следующий слайд: */
  function nextSlide() {
    showSlides(slideIndex += 1);
    transparencyPopupCounterCur.textContent = slideIndex;
  }

  /* Уменьшаем индекс на 1 — показываем предыдущий слайд: */
  function previousSlide() {
    showSlides(slideIndex -= 1);
    transparencyPopupCounterCur.textContent = slideIndex;

  }

  /* Функция перелистывания: */
  function showSlides(n) {

    //repairCounter
    /* Обращаемся к элементам с названием класса "item", то есть к картинкам: */
    const slides = document.querySelectorAll('.popup-transparency-slider__slide');
    /* Проверяем количество слайдов: */
    transparencyPopupCounterTot.textContent = slides.length;
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    /* Проходим по каждому слайду в цикле for: */
    for (const slide of slides) {
      slide.style.display = "none";
    }
    /* Делаем элемент блочным: */
    slides[slideIndex - 1].style.display = "flex";
  }

  transparency.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.transparency-item__img')) {
      popupTransparency.classList.toggle('visibility-visible');
      if (target.parentElement.childNodes[3].innerText === 'Договор') {
        slideIndex = 1;
        transparencyPopupCounterCur.textContent = 1;
        popupTransparencySliderSliders[0].style.display = 'flex';
        popupTransparencySliderSliders[1].style.display = 'none';
        popupTransparencySliderSliders[2].style.display = 'none';
      } else if (target.parentElement.childNodes[3].innerText === 'Смета') {
        slideIndex = 2;
        transparencyPopupCounterCur.textContent = 2;
        popupTransparencySliderSliders[1].style.display = 'flex';
        popupTransparencySliderSliders[0].style.display = 'none';
        popupTransparencySliderSliders[2].style.display = 'none';
      } else if (target.parentElement.childNodes[3].innerText === 'График платежей') {
        slideIndex = 3;
        transparencyPopupCounterCur.textContent = 3;
        popupTransparencySliderSliders[2].style.display = 'flex';
        popupTransparencySliderSliders[1].style.display = 'none';
        popupTransparencySliderSliders[0].style.display = 'none';
      }
    }
  });

  transparencyLeft.addEventListener('click', previousSlide);
  transparencyRight.addEventListener('click', nextSlide);
  transparencyPopupCounterCur.textContent = 1;


};

export default sliderPortfolio;
