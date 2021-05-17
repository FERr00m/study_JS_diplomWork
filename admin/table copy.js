'use strict';

//проверяем, есть ли нужное cookie, если нет делаем редирект
const checkAdminCookie = () => {
  let flag = false;
  if (document.cookie) {
    const cookies = document.cookie.split('; ');
    cookies.forEach(cookie => {
      const [ key, value ] = cookie.split('=');
      if (key === 'admin' && value === 'true') {
        flag = true;
      }
    });
  }
  return flag;
};

const url = location.origin;

if (!checkAdminCookie()) {
  document.location.href = `http://localhost:3000/admin/index.html`;
} else {
  const typeItemSelect = document.getElementById('typeItem'),
    tbody = document.getElementById('tbody'),
    modal = document.getElementById('modal'),
    formModal = modal.querySelector('form'),
    modalHeader = modal.querySelector('.modal__header'),
    itemId = modal.querySelector('#item-id'),
    inputCost = modal.querySelector('#cost');

  const getRows = () => {
    const rows = document.querySelectorAll('.table__row');

    rows.forEach(item => {
      // for (let td of item.cells) {
      //   console.log(td);
      // }
      let arr = [];
      let obj = {...item.cells};
      console.log(obj);
      arr.push(obj);
      
    })
    console.log(arr);
  }

  //регулярка для ввода цены(только цифры)
  inputCost.addEventListener('input', () => {
    inputCost.value = inputCost.value.replace(/\D/g, "");
  });


  //Блок запросов к API
  const getData = () => fetch(`http://localhost:3000/api/items`);

  const getDataId = id => fetch(`http://localhost:3000/api/items/${id}`);

  const postData = body => fetch(`http://localhost:3000/api/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const patchData = (id, body) => fetch(`http://localhost:3000/api/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const deleteData = id => fetch(`http://localhost:3000/api/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });


  //renderModal рендерим объект в модалке, если нажали кнопку "изменить"
  const renderModal = obj => {
    const { type, name, units, cost, id } = obj;

    formModal[0].value = type;
    formModal[1].value = name;
    formModal[2].value = units;
    formModal[3].value = cost;
    itemId.textContent = id;

  };

  //обработчик событий на весь документ
  document.body.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.btn-addItem')) {
      modalHeader.textContent = 'Добавение новой услуги';
      modal.style.display = 'flex';
    }
    if (target.matches('#modal') || target.closest('.button__close') ||
    target.closest('.cancel-button')) {
      e.preventDefault();
      formModal[0].value = '';
      formModal[1].value = '';
      formModal[2].value = '';
      formModal[3].value = '';
      modal.style.display = 'none';
    }
    if (target.closest('.action-change')) {
      const id = target.closest('.table__row').firstElementChild.textContent;
      modalHeader.textContent = 'Редактировать услугу';

      getDataId(id)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('status Network not 200');
          }
          return (response.json());
        })
        .then(obj => {
          renderModal(obj);
        })
        .catch(error => console.error(error));

      modal.style.display = 'flex';
    }
    if (target.closest('.action-remove')) {
      if (confirm('Вы действительно хотите удалить?')) {
        const id = target.closest('.table__row').firstElementChild.textContent;
        deleteData(id)
          .then(response => {
            if (response.status !== 200) {
              throw new Error('status Network not 200');
            }
          })
          .catch(error => console.error(error));
      }
    }
  });


  //sendForm отправка формы. Два варианта: новый и редактирование
  formModal.addEventListener('submit', e => {
    e.preventDefault();

    if (modalHeader.textContent === 'Добавение новой услуги') {
      const formData = new FormData(formModal),
        body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

      if (body.type && body.name && body.units && body.cost) {
        body.cost = +body.cost;
        postData(body)
          .then(response => {
            if (response.status !== 201) {
              throw new Error('status Network not 201');
            }
          })
          .catch(error => {
            alert('При отправки заявки что-то пошло не так, попробуйте ещё раз');
            console.error(error);
          });
      } else {
        alert('Перед отправкой убедитесь, что вы заполнили все поля');
      }
    } else {
      const formData = new FormData(formModal),
        body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      if (body.type && body.name && body.units && body.cost) {
        body.cost = +body.cost;
        patchData(itemId.textContent, body)
          .then(response => {
            if (response.status !== 200) {
              throw new Error('status Network not 200');
            }
          })
          .catch(error => {
            alert('При отправки заявки что-то пошло не так, попробуйте ещё раз');
            console.error(error);
          });
      } else {
        alert('Перед отправкой убедитесь, что вы заполнили все поля');
      }
    }
  });


  //render рендер услуг
  const render = item => {
    const { type, name, units, cost, id } = item,
      el = document.createElement('tr');

    el.classList.add('table__row');
    el.innerHTML = `
      <td class="table__id table__cell">${id}</td>
      <td class="table-type table__cell">${type}</td>
      <td class="table-name table__cell">
        ${name}
      </td>
      <td class="table-units table__cell">
        ${units}
      </td>
      <td class="table-cost table__cell">
        ${cost} руб
      </td>
      <td>
        <div class="table__actions table__cell">
          <button class="button action-change"><span class="svg_ui"><svg class="action-icon_change"><use xlink:href="./img/sprite.svg#change"></use></svg></span><span>Изменить</span>
          </button>
          <button class="button action-remove"><span class="svg_ui"><svg class="action-icon_remove"><use xlink:href="./img/sprite.svg#remove"></use></svg></span><span>Удалить</span>
          </button>
        </div>
      </td>
      `;
    tbody.insertAdjacentElement('beforeend', el);

  };


  //allServices рендер всех услуг
  const allServices = () => {
    getData()
      .then(response => {
        if (response.status !== 200) {
          throw new Error('status Network not 200');
        }
        return (response.json());
      })
      .then(data => {
        data.forEach(item => {
          render(item);
        });
      })
      .then(getRows)
      .catch(error => console.error(error));
  };

  //allServices();


  //makeOptions создаем список в select из услуг
  const makeOptions = () => {
    getData()
      .then(response => {
        if (response.status !== 200) {
          throw new Error('status Network NOT 200');
        }
        return (response.json());
      })
      .then(data => {
        const options = new Set();

        data.forEach(element => {
          options.add(element.type);
        });
        [...options].sort().forEach(option => {
          typeItemSelect.insertAdjacentHTML('beforeend', `
            <option value="${option}">${option}</option>
            `);
        });
      })
      .catch(error => console.error(error));
  };

  makeOptions();


  //showSelect рендер в зависимости от выбранного типа услуг
  const showSelect = () => {
    typeItemSelect.addEventListener('change', () => {
      getData()
        .then(response => {
          if (response.status !== 200) {
            throw new Error('status Network NOT 200');
          }
          return (response.json());
        })
        .then(data => {
          tbody.innerHTML = '';
          if (typeItemSelect.value === 'Все услуги') {
            data.forEach(item => {
              render(item);
            });
          } else {
            data.forEach(item => {
              if (item.type === typeItemSelect.value) {
                render(item);
              }
            });
          }
        })
        .then(getRows)
        .catch(error => console.error(error));
    });
  };

  showSelect();
  //setTimeout(getRows, 2000);
}
