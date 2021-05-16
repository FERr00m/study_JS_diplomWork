'use strict';

const arrowTelephone = () => {
  const arrow = document.querySelector('.header-contacts__arrow'),
    phoneNumberAccord = document.querySelector('.header-contacts__phone-number-accord'),
    phoneNumber = phoneNumberAccord.querySelector('.header-contacts__phone-number');

  arrow.addEventListener('click', () => {
    phoneNumberAccord.classList.toggle('phone-number-accord-top25');
    phoneNumber.classList.toggle('show-phone-number');
    arrow.classList.toggle('rotate-arrow');
  });
};

arrowTelephone();

const burgerMenu = () => {
  const menuIcon = document.querySelector('.menu__icon'),
    dialogMenu = document.querySelector('.popup-dialog-menu'),
    popupRepairTypes = document.querySelector('.popup-repair-types'),
    linkListRepair = document.querySelectorAll('.link-list-repair>a'),
    popupConsultation = document.querySelector('.popup-consultation');


  document.body.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.close-menu')) {
      dialogMenu.style.top = '0';
      dialogMenu.style.right = '0';
      return;
    }
    if (target.classList.contains('close')) {
      target.closest('.popup').classList.toggle('visibility-visible');
      return;
    }
    if (target.classList.contains('button_wide')) {
      popupConsultation.classList.toggle('visibility-visible');
    }
    if (target.closest('.feedback-wrap')) {
      return;
    }
    if (!target.closest('.popup-dialog')) {
      if (target.closest('.popup-menu')) {
        return;
      } else if (target.closest('.popup')) {
        if (target.closest('.popup-dialog-transparency')) {
          return;
        }
        target.closest('.popup').classList.toggle('visibility-visible');
      }
    }
    if (target.matches('.menu__icon')) {
      return;
    } else if (!target.closest('.popup-menu')) {
      dialogMenu.style.top = '0';
      dialogMenu.style.right = '0';
    }
  });

  linkListRepair.forEach(item => {
    item.addEventListener('click', () => {
      popupRepairTypes.classList.toggle('visibility-visible');
    });
  });

  menuIcon.addEventListener('click', () => {
    if (window.screen.width > 1024) {
      dialogMenu.style.right = '639px';
      dialogMenu.style.top = '0';
    } else if (window.screen.width < 1024 && window.screen.width > 576) {
      dialogMenu.style.right = '549px';
      dialogMenu.style.top = '0';
    } else if (window.screen.width < 576) {
      dialogMenu.style.top = '100%';
      dialogMenu.style.right = '0';
    }
  });

  dialogMenu.addEventListener('click', e => {
    const target = e.target;
    if (target.tagName === 'A' || !target.closest('.popup-menu')) {
      dialogMenu.style.top = '0';
      dialogMenu.style.right = '0';
    }
    if (target.matches('.no-overflow')) {
      popupRepairTypes.classList.toggle('visibility-visible');
    }
  });
};

burgerMenu();

const phonesMask = () => {
  function maskPhone(selector, masked = '+7 (___) ___-__-__') {
    const elems = document.querySelectorAll(selector);

    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

      let i = 0,
        newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
      i = newValue.indexOf("_");
      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template.substr(0, this.value.length).replace(/_+/g,
        a => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type === "blur" && this.value.length < 5) {
        this.value = "";
      }
      if (this.value.length !== 18) {
        this.setCustomValidity('Введите номер телефона в формате +7 (***) ***-**-**');
      } else {
        this.setCustomValidity('');
      }
    }

    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    }

  }

  maskPhone('input[name="phone"]');
};

phonesMask();

const sendForms = () => {
  const popupThank = document.querySelector('.popup-thank');

  const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const forms = [...document.getElementsByTagName('form')];

  forms.forEach(item => {
    const checkBox = item.querySelector('.checkbox__input'),
      inputs = item.querySelectorAll('input');

    item.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(item),
        body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });


      if (checkBox.checked && body.phone && (body.name || body.name === undefined)) {

        postData(body)
          .then(response => {
            if (response.status !== 200) {
              throw new Error('status Network not 200');
            }
          })
          .then(() => {
            popupThank.classList.toggle('visibility-visible');
            inputs.forEach(item => {
              item.value = '';
              if (item.checked) {
                item.checked = false;
              }
            });
          })
          .catch(error => {
            alert('При отправки заявки что-то пошло не так, попробуйте ещё раз');
            console.error(error);
          });
      } else {
        alert('Перед отправкой заявки убедитесь, что вы поставили согласие на обработку личных данных и заполнили все поля');

      }
    });
  });

};

sendForms();

//privacyPopup
const privacyPopup = () => {
  const privacyLinks = document.querySelectorAll('.link-privacy'),
    popupPrivacy = document.querySelector('.popup-privacy');

  privacyLinks.forEach(item => {
    item.addEventListener('click', () => {
      popupPrivacy.classList.toggle('visibility-visible');
    });
  });

};

privacyPopup();


//formula
const formula = () => {
  const formula = document.getElementById('formula'),
    formulaItems = formula.querySelectorAll('.formula-item');

  formulaItems.forEach(item => {
    const formulaItemPopup = item.querySelector('.formula-item-popup');

    if (!item.classList.contains('formula-slider__slide')) {
      item.addEventListener('mouseover', e => {
        if (e.target.matches('span')) {
          if (e.target.getBoundingClientRect().y < formulaItemPopup.clientHeight) {
            formulaItemPopup.classList.add('formula-item-popup-toggle');
          } else {
            formulaItemPopup.classList.remove('formula-item-popup-toggle');
          }
        }
        if (e.target.matches('span')) {
          item.style = 'z-index: 2';
          item.classList.toggle('active-item');
        }

      });
      item.addEventListener('mouseout', e => {
        if (e.target.matches('span')) {
          item.style = 'z-index: 1';
          item.classList.toggle('active-item');
        }
      });
    }
  });
};

formula();


//sliderFormula
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

      .glo-slider2 {
        overflow: hidden;
        border-radius: 20px;
      }

      .glo-slider3 {
        overflow: hidden;
      
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

const runSliderFormula = () => {
  const formulaSlider = document.querySelector('.formula-slider-wrap'),
    formulaItemsSlides = formulaSlider.querySelectorAll('.formula-slider__slide');

  formulaSlider.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.formula-slider__slide')) {
      target.classList.toggle('active-item');
    } else {
      formulaItemsSlides.forEach(item => {
        item.classList.remove('active-item');
      });
    }

  });

  const sliderFormula = new SliderCarousel({
    main: '.formula-slider-wrap',
    wrap: '.formula-slider',
    next: '#formula-arrow_right',
    prev: '#formula-arrow_left',
    slidesToShow: 3,
    infinity: true,
    responsive: [
      {
        breakpoint: 1024,
        slidesToShow: 3,
      },
      {
        breakpoint: 768,
        slidesToShow: 1,
      },
      {
        breakpoint: 576,
        slidesToShow: 1,
      }
    ]
  });

  sliderFormula.init();

};

runSliderFormula();

//sliders
const sliders = () => {
  const repairTypes = document.getElementById('repair-types'),
    repairTypesSlider = repairTypes.querySelectorAll('.repair-types-slider>div'),
    navListRepairBtns = repairTypes.querySelectorAll('.nav-list-repair>button'),
    repairCounterCurrent = document.querySelector('.slider-counter-content__current'),
    repairCounterTotal = document.querySelector('.slider-counter-content__total'),
    navListRepair = document.querySelector('.nav-list-repair');

  let x = 0;

  let slideIndex = 1;
  /* Вызываем функцию, которая реализована ниже: */
  showSlides(slideIndex);

  /* Увеличиваем индекс на 1 — показываем следующий слайд: */
  function nextSlide() {
    showSlides(slideIndex += 1);
    repairCounterCurrent.textContent = slideIndex;
  }

  /* Уменьшаем индекс на 1 — показываем предыдущий слайд: */
  function previousSlide() {
    showSlides(slideIndex -= 1);
    repairCounterCurrent.textContent = slideIndex;

  }

  /* Функция перелистывания: */
  function showSlides(n) {

    //repairCounter
    /* Обращаемся к элементам с названием класса "item", то есть к картинкам: */
    const slides = document.querySelectorAll('.active>.repair-types-slider__slide');
    /* Проверяем количество слайдов: */
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
  repairCounterTotal.textContent = repairTypesSlider[0].childElementCount;
  repairTypes.addEventListener('click', e => {
    const togglenavListRepairBtns = index => {
      for (let i = 0; i < navListRepairBtns.length; i++) {
        if (index === i) {
          navListRepairBtns[i].classList.add('active');
          repairTypesSlider[i].style.display = 'block';
          repairTypesSlider[i].classList.add('active');
          slideIndex = 1;
          repairCounterCurrent.textContent = slideIndex;
          repairCounterTotal.textContent = repairTypesSlider[i].childElementCount;

        } else {
          navListRepairBtns[i].classList.remove('active');
          repairTypesSlider[i].style.display = 'none';
          repairTypesSlider[i].classList.remove('active');
          repairTypesSlider[i].childNodes.forEach(item => {
            if (item.tagName === 'DIV') {

              item.style.display = 'none';
            }
          });
          repairTypesSlider[i].firstElementChild.style.display = 'flex';
        }
      }
    };

    const target = e.target;
    if (target.closest('.button_o')) {
      navListRepairBtns.forEach((item, i) => {
        if (item === target) {
          togglenavListRepairBtns(i);
        }
      });
    }

    if (target.closest('#repair-types-arrow_right')) {
      repairTypesSlider.forEach(item => {
        if (item.classList.contains('active')) {
          nextSlide();
        }
      });

    } else if (target.closest('#repair-types-arrow_left')) {
      repairTypesSlider.forEach(item => {
        if (item.classList.contains('active')) {
          previousSlide();
        }
      });
    }

    if (target.closest('#nav-arrow-repair-right_base')) {
      if (x !== -700) {
        x -= 100;
        navListRepair.style = `transform: translateX(${x}px);`;
      }
    } else if (target.closest('#nav-arrow-repair-left_base')) {
      if (x !== 0) {
        x += 100;
        navListRepair.style = `transform: translateX(${x}px);`;
      }
    }

  });
};

sliders();

//sliderPortfolio
const sliderPortfolio = () => {
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

sliderPortfolio();



//accordion
const accordion = () => {
  const accordionUl = document.querySelector('.accordion>ul');

  accordionUl.addEventListener('click', e => {
    if (e.target.matches('.title_block')) {
      e.target.classList.toggle('msg-active');
    }
  });

};

accordion();


//worksList
const worksList = () => {
  const getData = () => fetch('../crm-backend/db.json'),
    popupRepairTypes = document.querySelector('.popup-repair-types'),
    btns = popupRepairTypes.querySelectorAll('.popup-repair-types-nav__item'),
    switchInner = document.getElementById('switch-inner'),
    popupTableList = document.querySelector('.popup-repair-types-content-table__list'),
    navListPopupRepair = document.querySelector('.nav-list-popup-repair');


  const render = item => {

    const { name, cost } = item,
      tbody = document.createElement('tbody'),
      el = document.createElement('tr');

    el.classList.add('mobile-row');
    el.innerHTML = `
        <td class="repair-types-name">${name}</td>
        <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
        <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
        <td class="repair-types-value">м<sup>2</sup></td>
        <td class="repair-types-value">${cost}</td>
      `;
    tbody.insertAdjacentElement('beforeend', el);

    popupTableList.appendChild(tbody);

  };

  popupRepairTypes.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.popup-repair-types-nav__item')) {
      popupTableList.innerHTML = '';
      for (const btn of btns) {
        btn.classList.remove('active');
      }
      target.classList.add('active');
      switchInner.textContent = target.textContent;
      getData()
        .then(response => {
          if (response.status !== 200) {
            throw new Error('status Network NOT 200');
          }
          return (response.json());
        })
        .then(data => {
          data.forEach(item => {
            if (item.type === target.textContent) {
              render(item);
            } else {
              return;
            }
          });
        })
        .catch(error => console.error(error));
    }
  });

  const sliderMini = new SliderCarousel({
    main: '.nav-wrap-repair',
    wrap: '.nav-list-popup-repair',
    next: '#nav-arrow-popup-repair_right',
    prev: '#nav-arrow-popup-repair_left',
    slidesToShow: 3,
    infinity: true,
    responsive: [
      {
        breakpoint: 1024,
        slidesToShow: 2,
      },
      {
        breakpoint: 576,
        slidesToShow: 1,
      },

    ]
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      btns.forEach(item => {
        item.classList.remove('glo-slider__item');
      });
      navListPopupRepair.classList.remove('glo-slider__wrap');
      navListPopupRepair.style = 'transform: translateX(0);';
    } else {
      btns.forEach(item => {
        item.classList.add('glo-slider__item');
      });
      navListPopupRepair.classList.add('glo-slider__wrap');
    }
  });

  if (window.innerWidth < 1024) {
    sliderMini.init();
  }
};

worksList();
