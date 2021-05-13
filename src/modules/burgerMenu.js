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

export default burgerMenu;
