const accordion = () => {
  const accordionUl = document.querySelector('.accordion>ul');

  accordionUl.addEventListener('click', e => {
    if (e.target.matches('.title_block')) {
      e.target.classList.toggle('msg-active');
    }
  });

};

export default accordion;
