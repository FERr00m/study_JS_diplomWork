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

export default burgerMenu;
