class Visit {
  constructor(id, patient, doctor, title, description = '', priority) {
    this._id = id;
    this._patient = patient;
    this._doctor = doctor;
    this._title = title;
    this._description = description;
    this._priority = priority;
    this._status = 'активен';
    this._visit = document.createElement('form');

  }

  render(container) {

    this._visit.id = this._id;
    this._visit.className = 'visit';
    const visitFieldset = document.createElement('fieldset');
    visitFieldset.setAttribute('disabled', 'disabled');

    const editVisitWrapper = document.createElement('div');
    editVisitWrapper.className = 'visit-edit-wrapper';

    const editBtn = document.createElement('button');
    editBtn.className = 'visit-edit-btn';
    editBtn.dataset.hidden = 'true';
    editBtn.innerText = 'Редактировать';

    const editMenu = document.createElement('ul');
    editMenu.className = 'visit-edit-menu';
    editMenu.innerHTML = `<ul>
            <li><button id="visit-close">Завершить</button></li>
            <li><button id="visit-edit">Редактировать</button></li>
            <li><button id="visit-delete">Удалить</button></li>
        </ul>`;
    editMenu.hidden = true;

    editBtn.onclick = event => {
      event.preventDefault();
      editMenu.hidden = !editMenu.hidden;
    };


    container.append(this._visit);
    this._visit.append(visitFieldset, editVisitWrapper);
    editVisitWrapper.append(editBtn, editMenu);


    this.createInput(null, 'Пациент', 'text', this._patient, visitFieldset);
    this.createInput(null, 'Доктор', 'text', this._doctor, visitFieldset);
    this.createInput(true, 'Цель визита', 'text', this._title, visitFieldset);
    this.createTextarea(true, 'Комментарий', this._description, visitFieldset);

    const priority = document.createElement('p');
    priority.className = 'visit-field';
    priority.dataset.hidden = 'true';
    priority.innerHTML = `<label>Срочность</label><select>
                <option>${this._priority}</option>
                <option>${this._priority === 'Высокая' ? 'Обычная' : 'Высокая'}</option>
                <option>${this._priority === 'Низкая' ? 'Обычная' : 'Низкая'}</option>
            </select>`;
    const status = document.createElement('p');
    status.className = 'visit-field';
    status.dataset.hidden = 'true';
    status.innerHTML = `<label>Статус</label><select>
                <option>${this._status}</option>
                <option>${this._status === 'открыт' ? 'завершен' : 'открыт'}</option>
            </select>`;
    visitFieldset.append(priority, status);

    return visitFieldset;
  }

  createInput(dataHidden, labelText, type = 'text', content, container) {
    const elem = document.createElement('p');
    elem.className = 'visit-field';
    elem.dataset.hidden = dataHidden;
    elem.innerHTML = `<label>${labelText}</label><input type=${type} value="${content}">`;
    container.append(elem);
  }

  createTextarea(dataHidden, labelText, content, container) {
    const elem = document.createElement('p');
    elem.className = 'visit-field';
    elem.dataset.hidden = dataHidden;
    elem.innerHTML = `<label>${labelText}</label><textarea rows="3">${content}</textarea>`;
    container.append(elem);
  }

  toggleHidden() {
    const hiddenFields = this._visit.querySelectorAll('[data-hidden]');
    hiddenFields.forEach(elem => {
      if (elem.dataset.hidden === 'true') elem.classList.add('visit-field-hide')
    });

    const moreBtn = document.createElement('button');
    moreBtn.className = 'visit-more-btn';
    moreBtn.innerText = 'Показать больше';
    this._visit.append(moreBtn);

    moreBtn.onclick = event => {
      event.preventDefault();
      hiddenFields.forEach(elem => {
        if (elem.dataset.hidden === 'true') {
          elem.dataset.hidden = 'false';
          elem.classList.remove('visit-field-hide');
          moreBtn.innerText = 'Скрыть';
        } else if (elem.dataset.hidden === 'false') {
          elem.dataset.hidden = 'true';
          elem.classList.add('visit-field-hide');
          moreBtn.innerText = 'Показать больше';
        }
      })
    }
  }

}

class VisitCardio extends Visit {
  constructor(pressure, massIndex, diseases, age, ...args) {
    super(...args);
    this._pressure = pressure;
    this._massIndex = massIndex;
    this._diseases = diseases;
    this._age = age;
  }

  render(container) {
    const visitFieldset = super.render(container);
    this.createInput(true, 'Давление', 'text', this._pressure, visitFieldset);
    this.createInput(true, 'Индекс массы тела', 'number', this._massIndex, visitFieldset);
    this.createTextarea(true, 'Заболевания', this._diseases, visitFieldset);
    this.createInput(true, 'Возраст', 'number', this._age, visitFieldset);
    this.toggleHidden();
  }
}

class VisitDentist extends Visit {
  constructor(lastVisit, ...args) {
    super(...args);
    this._lastVisit = lastVisit;
  }

  render(container) {
    const visitFieldset = super.render(container);
    this.createInput(true, 'Последний визит', 'date', this._lastVisit, visitFieldset);
    this.toggleHidden();
  }
}

class VisitTherapist extends Visit {
  constructor(age, ...args) {
    super(...args);
    this._age = age;

  }

  render(container) {
    const visitFieldset = super.render(container);
    this.createInput(true, 'Возраст', 'number', this._age, visitFieldset);
    this.toggleHidden();
  }
}

/*----- only for example-----*/
// const cardioTest = new VisitCardio(pressure = 12, massIndex = 35, diseases = 'не болел', age = 45, id = 66, patient = 'Афанасий Сигизмундович Скоробогатько', doctor = 'кардиолог', title = 'аритмия', description = 'постоянная боль в сердце и высокое давление', priority = 'Низкая', status = 'открыт');
// const cardsContainer = document.getElementById('cards-container');
// cardioTest.render(cardsContainer);

/*--------------------------*/


class Form {
  constructor(id = '') {
    this._id = id;
  }

  render(container) {
    const form = document.createElement("form");
    form.id = this._id;
    container.append(form);
  }
}

class Input {
  constructor(type = 'text', placeholder = '', name = '', value = '', required, id = '', ...classArr) {
    this._type = type;
    this._placeholder = placeholder;
    this._name = name;
    this._value = value;
    this._required = required;
    this._id = id;
    this._classArr = classArr;
  }

  render(container) {
    const input = document.createElement("input");
    input.id = this._id;
    input.className = this._classArr.join(" ");
    input.placeholder = this._placeholder;
    input.type = this._type;
    input.name = this._name;
    input.value = this._value;
    input.required = this._required;
    container.append(input);
  }
}


class registrationForm extends Form {
  constructor(id) {
    super(id);
  }

  render() {
    const emailInput = new Input('email', 'Введите адрес почты*', "email", "", 'true', 'email-input', 'input');
    const passwordInput = new Input('password', 'Введите пароль*', "password", "", 'true', 'password-input', 'input');
    const submitBtn = new Input('submit', '', "", "Подтвердить", '', 'register-btn', 'submit-btn');

    const registrationForm = document.getElementById('registration-form');
    emailInput.render(registrationForm);
    passwordInput.render(registrationForm);
    submitBtn.render(registrationForm);
  }
}

class Select {
  constructor(id = '', ...classArr) {
    this._id = id;
    this._classArr = classArr;
  }

  render(container) {
    const select = document.createElement("select");
    select.id = this._id;
    select.className = this._classArr.join(" ");
    container.append(select);
  }
}

class Option {
  constructor(text, value = '', selected, disabled, id = '', ...classArr) {
    this._innerText = text;
    this._value = value;
    this._selected = selected;
    this._disabled = disabled;
    this._id = id;
    this._classArr = classArr;

  }

  render(container) {
    const option = document.createElement("option");
    option.text = this._innerText;
    option.id = this._id;
    option.className = this._classArr.join(" ");
    option.value = this._value;
    option.selected = this._selected;
    option.disabled = this._disabled;
    container.append(option);
  }
}


class SelectStatus extends Select {
  constructor(id, ...classArr) {
    super(id, ...classArr);
  }

  render() {
    const selectStatus = new Option('Выберите стaтус', 'Status', 'true', 'true', '');
    const allVisits = new Option('Все визиты', 'allVisits', "", '', '');
    const doneVisit = new Option('Визит прошел', 'doneVisit', "", '', '');
    const openVisit = new Option('Визит не прошел', 'openVisit', "", '', '');

    const visitStatus = document.getElementById('visit-status');
    selectStatus.render(visitStatus);
    allVisits.render(visitStatus);
    doneVisit.render(visitStatus);
    openVisit.render(visitStatus);

  }
}


class SelectPriority extends Select {
  constructor(id, ...classArr) {
    super(id, ...classArr);
  }

  render() {
    const selectPriority = new Option('Выберите срочность', 'Status', 'true', 'true', '');
    const allVisits = new Option('Все визиты', 'allVisits', "", '', '');
    const highPriority = new Option('Срочные визиты', 'highPriority', "", '', '');
    const middlePriority = new Option('Обычные визиты', 'middlePriority', "", '', '');
    const lowPriority = new Option('Не срочные визиты', 'lowPriority', "", '', '');

    const visitPriority = document.getElementById('visit-priority');
    selectPriority.render(visitPriority);
    allVisits.render(visitPriority);
    highPriority.render(visitPriority);
    middlePriority.render(visitPriority);
    lowPriority.render(visitPriority);


  }
}


class SelectDoctor extends Select {
  constructor(id, ...classArr) {
    super(id, ...classArr);
  }

  render() {
    const selectDoctor = new Option('Выберите врача', 'doctor', 'true', 'true', '');
    const cardiolog = new Option('Кардиолог', 'cardiolog', "", '', '');
    const dentist = new Option('Стоматолог', 'dentist', "", '', '');
    const terapist = new Option('Терапевт', 'terapist', "", '', '');

    const doctorSelection = document.getElementById('doctor-select');
    selectDoctor.render(doctorSelection);
    cardiolog.render(doctorSelection);
    dentist.render(doctorSelection);
    terapist.render(doctorSelection);


  }
}


class Modal {
  constructor(id, header, content) {
    this._modal = null;
    this._wrapper = null;
    this._title = null;
    this._id = id;
    this._header = header;
    this._content = content;
  }

  render() {
    this._modal = document.createElement("div");
    this._wrapper = document.createElement("div");
    this._title = document.createElement("div");
    this._wrapper.id = this._id;
    this._wrapper.classList.add('modal-container');
    this._modal.classList.add('entry-modal-bg');
    this._wrapper.innerHTML = this._content;
    this._title.innerHTML = this._header;
    // this._modal.id = this._id;
    const body = document.querySelector('body');
    body.append(this._modal);
    this._modal.append(this._wrapper);
    this._wrapper.prepend(this._title);
    this._modal.addEventListener('click', function (event) {
      if (event.target.classList.contains('modal-close')) {
        event.target.parentElement.parentElement.parentElement.remove();
      }
      if (event.target.classList.contains('entry-modal-bg')) {
        event.target.remove();
      }
    });
    console.log(this._modal);
  };
}

const navbar = document.querySelector('.navbar');
navbar.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.id === 'login-btn') {

    const entryModal = new Modal("modal-wrapper", `<h2 class="modal-title">Авторизация</h2><div class="modal-close">X</div>`, '');
    entryModal.render();
    const registerForm = new Form('registration-form');
    const modal = document.getElementById('modal-wrapper');  /*МОДАЛЬНЕ ВІКНО*/
    registerForm.render(modal);

    const registration = new registrationForm();
    registration.render();
    const registerFormSubmit = document.getElementById('registration-form');

    registerFormSubmit.addEventListener('submit', function (eventSubmit) {
      eventSubmit.preventDefault();

      const email = document.getElementById('email-input').value;
      const password = document.getElementById('password-input').value;

      const data = {
        email: email,
        password: password
      };

      const authOptions = {
        method: 'POST',
        url: 'http://cards.danit.com.ua/login',
        data: JSON.stringify(data),
      };

      axios(authOptions)
        .then(function (response) {
          console.log(response);
          console.log(response.data);

          if (response.data.status === "Success") {

            if (localStorage.getItem('Success') === null) {
              localStorage.setItem('Success', 'authorization done')
            } else {
              localStorage.removeItem('Success')
            }

            const loginBtn = document.getElementById('login-btn');
            loginBtn.style.display = 'none';
            const navbar = document.getElementById('navbar');
            const createBtn = new Input('button', '', "", "Создать", '', 'create-btn', 'login-btn');
            createBtn.render(navbar);

            const wrapper = document.getElementById('wrapper');
            const cardsContainer = document.getElementById('cards-container');
            wrapper.style.display = 'flex';
            cardsContainer.style.display = 'flex';

            const modalBg = document.getElementsByClassName('entry-modal-bg');
            modalBg[0].remove();

            const filter = document.querySelector('.filter-form');
            filter.style.display = 'flex';

            const selectVisit = new Select('visit-status', 'select');
            const statusContainer = document.getElementById('status-container');
            selectVisit.render(statusContainer);

            const selectStatus = new SelectStatus();
            selectStatus.render();


            const visitPriority = new Select('visit-priority', 'select');
            const priorityContainer = document.getElementById('priority-container');
            visitPriority.render(priorityContainer);

            const selectPriority = new SelectPriority();
            selectPriority.render();

          }

          if (response.data.status === "Error") {
            alert('Логин или пароль неправильные!')
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    });

  }


  if (event.target.id === 'create-btn') {
    const entryModal = new Modal("modal-create-visit", `<h2 class="modal-title">Создать визит к врачу</h2><div class="modal-close">X</div>`, '');
    entryModal.render();
    const chosenDoctor = new Select('doctor-select', 'select');
    const modalCreateVisit = document.getElementById('modal-create-visit');
    chosenDoctor.render(modalCreateVisit);

    const selectDoctor = new SelectDoctor();
    selectDoctor.render();
    const doctorSelect = document.getElementById('doctor-select');

    console.log(doctorSelect);

    doctorSelect.onchange = function () {
      const visitationForm = new Form('visit-form');
      visitationForm.render(modalCreateVisit);
      const visit = new visitForm();
      visit.render();
      let visitForms = document.getElementById('visit-form');
      console.log(visitForms);

      switch (this.value) {
        case 'cardiolog':
          visitForms.innerHTML = ``;
          const visitCardiolog = new visitFormCardiolog();
          visitCardiolog.render();
          break;
        case 'dentist':
          visitForms.innerHTML = ``;
          const visitDentist = new visitFormDentist();
          visitDentist.render();
          break;
        case 'terapist':
          visitForms.innerHTML = ``;
          const visitTerapevt = new visitFormTerapevt();
          visitTerapevt.render();
          break;
      }
    };
  }

});

// LOCAL STORAGE ON LOAD
window.addEventListener('load', () => {
  if (localStorage.getItem('Success') !== null) {

    const loginBtn = document.getElementById('login-btn');
    loginBtn.remove();
    const navbar = document.getElementById('navbar');
    const createBtn = new Input('button', '', "", "Создать", '', 'create-btn', 'login-btn');
    createBtn.render(navbar);

    const wrapper = document.getElementById('wrapper');
    const cardsContainer = document.getElementById('cards-container');
    wrapper.style.display = 'flex';
    cardsContainer.style.display = 'flex';

    const filter = document.querySelector('.filter-form');
    filter.style.display = 'flex';

    const selectVisit = new Select('visit-status', 'select');
    const statusContainer = document.getElementById('status-container');
    selectVisit.render(statusContainer);

    const selectStatus = new SelectStatus();
    selectStatus.render();


    const visitPriority = new Select('visit-priority', 'select');
    const priorityContainer = document.getElementById('priority-container');
    visitPriority.render(priorityContainer);

    const selectPriority = new SelectPriority();
    selectPriority.render();
  }
});


class visitForm extends Form {
  constructor(...args) {
    super(...args);

  }

  render() {
    this._titleInput = new Input('text', 'Цель визита*', "purpose", "", 'true', 'title-input', 'input');
    this._descriptionInput = new Input('text', 'Краткое описание визита', "description", "", '', 'description-input', 'input');
    this._fullNameInput = new Input('text', 'ФИО*', "fullName", "", 'true', 'name-input', 'input');

    this._formVisitPriority = new Select('form-visit-priority', 'input', 'form-select');
    this._Priority = new Option('Выберете срочность', 'Срочность не выбрана', "true", 'true', '');
    this._highPriority = new Option('Высокая', 'Высокая', "", '', '');
    this._middlePriority = new Option('Обычная', 'Обычная', "", '', '');
    this._lowPriority = new Option('Низкая', 'Низкая', "", '', '');


    const visitForm = document.getElementById('visit-form');
    this._titleInput.render(visitForm);
    this._descriptionInput.render(visitForm);

    this._formVisitPriority.render(visitForm);
    const formVisitPriority = document.getElementById('form-visit-priority');
    this._Priority.render(formVisitPriority);
    this._highPriority.render(formVisitPriority);
    this._middlePriority.render(formVisitPriority);
    this._lowPriority.render(formVisitPriority);

    this._fullNameInput.render(visitForm);
  }
}


class visitFormDentist extends visitForm {
  constructor(id) {
    super(id);
  }

  render() {
    super.render();
    const dateInput = new Input('date', 'Дата последнего посещения*', "date", "", 'true', 'date-input', 'input');
    const submitBtn = new Input('submit', '', "", "Подтвердить", '', '', 'submit-btn');

    const visitForms = document.getElementById('visit-form');
    dateInput.render(visitForms);
    submitBtn.render(visitForms);

    const nameInput = document.getElementById('name-input');
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const priorityInput = document.getElementById('form-visit-priority');
    const dateInputs = document.getElementById('date-input');

    let name = nameInput.value;
    let title = titleInput.value;
    let description = descriptionInput.value;
    let priority = priorityInput.value;
    let date = dateInputs.value;

    visitForms.addEventListener('submit', function (event) {
      event.preventDefault();

      const content = {
        name: name,
        title: title,
        description: description,
        priority: priority,
        date: date
      };

      const token = `5747ac45350e`;

      const authorization = {
        Authorization: `Bearer ${token}`
      };

      const authOptions = {
        method: 'POST',
        url: 'http://cards.danit.com.ua/cards',
        data: JSON.stringify(content),
        headers: authorization
      };

      axios(authOptions)
        .then(function (response) {

          console.log(response);
          console.log(response.data);

          if (response.status === 200) {
            const dataId = response.data.id;
            console.log(dataId);

            const modalBg = document.getElementsByClassName('entry-modal-bg');
            modalBg[0].remove();


            const visitDentist = new VisitDentist(date, dataId, name, "Стоматолог", title, description, priority, 'Активен');
            const cardsContainer = document.getElementById('cards-container');
            visitDentist.render(cardsContainer);
          }
        });
    });


  }
}


class visitFormTerapevt extends visitForm {
  constructor(...args) {
    super(...args);

  }

  render() {
    super.render();
    const ageInput = new Input('number', 'Возраст*', "age", "", 'true', 'age-input', 'input');
    const submitBtn = new Input('submit', '', "", "Подтвердить", '', 'terapevt-create-btn', 'submit-btn');

    const visitForms = document.getElementById('visit-form');
    ageInput.render(visitForms);
    submitBtn.render(visitForms);

    const nameInput = document.getElementById('name-input');
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const priorityInput = document.getElementById('form-visit-priority');
    const ageInputs = document.getElementById('age-input');


    visitForms.addEventListener('submit', function (event) {
      event.preventDefault();

      let name = nameInput.value;
      let title = titleInput.value;
      let description = descriptionInput.value;
      let priority = priorityInput.value;
      let age = ageInputs.value;

      const content = {
        name: name,
        title: title,
        description: description,
        priority: priority,
        age: age
      };

      const token = `5747ac45350e`;

      const authorization = {
        Authorization: `Bearer ${token}`
      };

      const authOptions = {
        method: 'POST',
        url: 'http://cards.danit.com.ua/cards',
        data: JSON.stringify(content),
        headers: authorization
      };

      axios(authOptions)
        .then(function (response) {

          console.log(response);
          console.log(response.data);

          if (response.status === 200) {
            const dataId = response.data.id;
            console.log(dataId);

            const modalBg = document.getElementsByClassName('entry-modal-bg');
            modalBg[0].remove();


            const visitTherapist = new VisitTherapist(age, dataId, name, "Терапевт", title, description, priority, 'Активен');
            const cardsContainer = document.getElementById('cards-container');
            visitTherapist.render(cardsContainer);
          }
        });
    });
  }
}


class visitFormCardiolog extends visitForm {
  constructor(...args) {
    super(...args);
  }

  render() {
    super.render();
    const pressureInput = new Input('text', 'Обычное давление*', "pressure", "", 'true', 'pressure-input', 'input');
    const weightIndexInput = new Input('text', 'Индекс массы тела*', "weightIndex", "", 'true', 'weight-index-input', 'input');
    const diseaseInput = new Input('text', 'Перенесенные заболевания сердечно-сосудистой системы*', "diseaseIndex", "", 'true', 'disease-input', 'input');
    const ageInput = new Input('number', 'Возраст*', "age", "", 'true', 'age-input', 'input');
    const submitBtn = new Input('submit', '', "", "Подтвердить", '', 'cardiolog-create-btn', 'submit-btn');

    const visitForms = document.getElementById('visit-form');
    pressureInput.render(visitForms);
    weightIndexInput.render(visitForms);
    diseaseInput.render(visitForms);
    ageInput.render(visitForms);
    submitBtn.render(visitForms);

    const nameInput = document.getElementById('name-input');
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const priorityInput = document.getElementById('form-visit-priority');
    const pressureInputs = document.getElementById('pressure-input');
    const weightIndexInputs = document.getElementById('weight-index-input');
    const diseaseInputs = document.getElementById('disease-input');
    const ageInputs = document.getElementById('age-input');


    let name = nameInput.value;
    let title = titleInput.value;
    let description = descriptionInput.value;
    let priority = priorityInput.value;
    let pressure = pressureInputs.value;
    let weightIndex = weightIndexInputs.value;
    let disease = diseaseInputs.value;
    let age = ageInputs.value;

    visitForms.addEventListener('submit', function (event) {
      event.preventDefault();


      const content = {
        name: name,
        title: title,
        description: description,
        priority: priority,
        age: age,
        pressure: pressure,
        weightIndex: weightIndex,
        disease: disease,
      };

      const token = `5747ac45350e`;

      const authorization = {
        Authorization: `Bearer ${token}`
      };

      const authOptions = {
        method: 'POST',
        url: 'http://cards.danit.com.ua/cards',
        data: JSON.stringify(content),
        headers: authorization
      };

      axios(authOptions)
        .then(function (response) {

          console.log(response);
          console.log(response.data);

          if (response.status === 200) {
            const dataId = response.data.id;
            console.log(dataId);

            const modalBg = document.getElementsByClassName('entry-modal-bg');
            modalBg[0].remove();


            const visitCardiolog = new VisitCardio(pressure, weightIndex, disease, age, dataId, name, "Кардиолог", title, description, priority, 'Активен');
            const cardsContainer = document.getElementById('cards-container');
            visitCardiolog.render(cardsContainer);
          }
        });
    });
  }
}



// AXIOS GET REQUEST CARDS



// const token = `5747ac45350e`;
//
// const autorization = {
//   Authorization: `Bearer ${token}`
// };
//
// const authOptions = {
//   method: 'GET',
//   url: 'http://cards.danit.com.ua/cards',
//   // data: JSON.stringify(),
//   headers: autorization
// };
//
// axios(authOptions)
//   .then(function (response) {
//     console.log(response);
//     console.log(response.data);
//
//     if (response.data.status === "Success") {
//
//     }
//     });




// AXIOS DELETE REQUEST CARDS



//
// const token = `5747ac45350e`;
//
// const autorization = {
//   Authorization: `Bearer ${token}`
// };
//
// const authOptions = {
//   method: 'DELETE',
//   url: 'http://cards.danit.com.ua/cards/1360',
//   // data: JSON.stringify(),
//   headers: autorization
// };
//
// axios(authOptions)
//   .then(function (response) {
//
//
//     if (response.data.status === "Success") {
//       // visitTherapist.render(cardsContainer);
//       console.log(response);
//       console.log(response.data);
//     }
//
// });



// AXIOS PUT REQUEST CARDS



// const token = `5747ac45350e`;
//
// const autorization = {
//   Authorization: `Bearer ${token}`
// };
//
// const authOptions = {
//   method: 'DELETE',
//   url: 'http://cards.danit.com.ua/cards/1360',
//   // data: JSON.stringify(),
//   headers: autorization
// };
//
// axios(authOptions)
//   .then(function (response) {
//
//
//     if (response.data.status === "Success") {
//       // visitTherapist.render(cardsContainer);
//       console.log(response);
//       console.log(response.data);
//     }
//
// });