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

  closeBtns.forEach(item => {
    item.addEventListener('click', e => {
      const target = e.target;

      if (target.closest('.popup-menu')) {
        dialogMenu.style.top = '0';
        dialogMenu.style.right = '0';
      } else {
        target.closest('.popup').classList.toggle('visibility-visible');
      }
    });
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

    item.addEventListener('mouseover', e => {

      if (e.target.matches('span')) {

        if (e.clientY - 60 < formulaItemPopup.clientHeight) {
          console.log(1);
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
  });
};

formula();


//sliders

