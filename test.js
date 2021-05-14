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
    closeBtns = document.querySelectorAll('.close');


  document.body.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.close-menu')) {
      dialogMenu.style.top = '0';
      dialogMenu.style.right = '0';
    }
    if (!target.closest('.popup-dialog')) {
      if (target.closest('.popup-menu')) {
        return;
      } else if (target.closest('.popup')) {
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
      dialogMenu.style.top = '705px';
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
  const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const forms = [...document.getElementsByTagName('form')];

  forms.forEach(item => {
    const checkBox = item.querySelector('.checkbox__input');

    item.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(item),
        body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      if (checkBox.checked === true) {
        postData(body)
          .then(response => {
            if (response.status !== 200) {
              throw new Error('status Network not 200');
            }
          })
          .catch(error => {
            console.error(error);
          });
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
        this.slides[this.options.position].style = 'display: flex';
        //this.slides[this.options.position - 1].style = 'display: flex';
      }

    }

    nextSlider() {
      if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
        ++this.options.position;
        if (this.options.position > this.slides.length - this.slidesToShow) {
          this.options.position = 0;
        }
        this.slides[this.options.position - 1].style = 'display: none !important';
        this.slides[this.options.position].style = 'display: flex';
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
  const runSliderPortfolio = new SliderCarousel2({
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
        breakpoint: 768,
        slidesToShow: 1,
      },
      {
        breakpoint: 576,
        slidesToShow: 2,
      },
      {
        breakpoint: 320,
        slidesToShow: 1,
      }
    ]
  });

  const runSliderPortfolioMini = new SliderCarousel2({
    main: '.portfolio-slider-wrap',
    wrap: '.portfolio-slider-mobile',
    next: '#portfolio-arrow-mobile_right',
    prev: '#portfolio-arrow-mobile_left',
    slidesToShow: 3,
    infinity: false,
    responsive: [
      {
        breakpoint: 576,
        slidesToShow: 2,
      },
      {
        breakpoint: 320,
        slidesToShow: 1,
      }
    ]
  });

  const portfolioSlider = document.querySelector('.portfolio-slider-wrap'),
    portfolioArrowRight = document.getElementById('portfolio-arrow_right'),
    portfolioArrowLeft = document.getElementById('portfolio-arrow_left'),
    portfolioMobileRight = document.querySelector('#portfolio-arrow-mobile_right'),
    portfolioMobileLeft = document.querySelector('#portfolio-arrow-mobile_left'),
    portfolioCounter = document.getElementById('portfolio-counter'),
    portfolioCounterCur = portfolioCounter.querySelector('.slider-counter-content__current'),
    portfolioCounterTot = portfolioCounter.querySelector('.slider-counter-content__total');

  const firstSlider = document.querySelector('.portfolio-slider'),
    secondSlider = document.querySelector('.portfolio-slider-mobile');
  window.addEventListener('resize', () => {
    if (window.innerWidth < 576) {
      secondSlider.style = 'display: flex !important';
      firstSlider.style = 'display: none !important';
      portfolioArrowRight.style = 'display: none';
      portfolioArrowLeft.style = 'display: none';
    } else {
      portfolioArrowRight.style = 'display: flex';
      secondSlider.style = 'display: none !important';
      firstSlider.style = 'display: flex !important';
    }
    console.log(window.innerWidth);
  });

  

  runSliderPortfolioMini.init();
  runSliderPortfolio.init();
  if (window.innerWidth < 576) {
    secondSlider.style = 'display: flex !important';
    firstSlider.style = 'display: none !important';
    portfolioArrowRight.style = 'display: none';
    portfolioArrowLeft.style = 'display: none';
    portfolioCounterCur.textContent = runSliderPortfolioMini.options.position + 1;
    portfolioCounterTot.textContent = runSliderPortfolioMini.slides.length - runSliderPortfolio.slidesToShow + 1;
  } else {
    portfolioArrowRight.style = 'display: flex';
    secondSlider.style = 'display: none !important';
    firstSlider.style = 'display: flex !important';
    portfolioCounterCur.textContent = runSliderPortfolio.options.position + 1;
    portfolioCounterTot.textContent = runSliderPortfolio.slides.length - runSliderPortfolio.slidesToShow + 1;
    portfolioSlider.addEventListener('click', e => {
      console.dir(portfolioSlider.lastElementChild.style);
      if (portfolioSlider.lastElementChild.style !== 'display: none') {
        portfolioCounterCur.textContent = runSliderPortfolio.options.position + 1;
        portfolioCounterTot.textContent = runSliderPortfolio.slides.length - runSliderPortfolio.slidesToShow + 1;
        if (runSliderPortfolio.options.position > 0) {
          console.log(1);
          portfolioArrowLeft.style = 'display: flex';
        }
  
        if (runSliderPortfolio.options.position === runSliderPortfolio.slides.length - runSliderPortfolio.slidesToShow) {
          portfolioArrowRight.style = 'display: none';
        } else {
          portfolioArrowRight.style = 'display: flex';
        }
        if (runSliderPortfolio.options.position === 0) {
          portfolioArrowLeft.style = 'display: none';
        }
      }
    });
  }
  
};

sliderPortfolio();
