'use strict';

document.cookie = `admin=false; expires=Tue, 12 May 2022 00:00:00 GMT`;

const login = 'admin',
  password = 'admin';

const name = document.getElementById('name'),
  type = document.getElementById('type'),
  form = document.querySelector('form');
  //btn = document.querySelector('.button-ui_firm');

name.onfocus = () => {
  name.nextElementSibling.classList.add('non-visible');
  type.nextElementSibling.classList.add('non-visible');
};

type.onfocus = () => {
  name.nextElementSibling.classList.add('non-visible');
  type.nextElementSibling.classList.add('non-visible');
};

form.addEventListener('submit', e => {
  e.preventDefault();
  //const target = e.target;

  if (name.value !== login || type.value !== password) {
    name.nextElementSibling.classList.remove('non-visible');
    type.nextElementSibling.classList.remove('non-visible');
    name.value = '';
    type.value = '';
  } else {
    document.cookie = `admin=true; expires=Tue, 12 May 2022 00:00:00 GMT`;
    document.location.href = "http://127.0.0.1:5500/admin/table.html";
  }

});

