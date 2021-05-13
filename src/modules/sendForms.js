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
      if (checkBox.checked === true) {
        postData()
          .then(response => {
            if (response.status !== 200) {
              throw new Error('status Network not 200');
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
      console.dir(checkBox);
    });
  });

};

export default sendForms;
