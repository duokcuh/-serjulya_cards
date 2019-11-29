/*************Class Visit and subclasses**************/
class Visit {
    constructor(id, patient, doctor, title, description = '', priority) {
        this._id = id;
        this._patient = patient;
        this._doctor = doctor;
        this._title = title;
        this._description = description;
        this._priority = priority;
        this._status = 'В процессе';
        this._visit = null;
        this._editBtn = null;
    }

    render(container) {
        this._visit = document.createElement('form');
        this._visit.id = this._id;
        this._visit.className = 'visit';
        container.append(this._visit);
        const visitFieldset = document.createElement('fieldset');
        visitFieldset.setAttribute('disabled', 'disabled');
        this._visit.append(visitFieldset);

        this.createInput(null, 'Пациент', 'text', this._patient, visitFieldset);
        this.createInput(null, 'Доктор', 'text', this._doctor, visitFieldset);
        const title = this.createInput(true, 'Цель визита', 'text', this._title, visitFieldset);
        const description = this.createTextarea(true, 'Комментарий', this._description, visitFieldset);
        const priority = this.createInput(true, 'Срочность', 'text', this._priority, visitFieldset);
        const status = this.createInput(true, 'Статус', 'text', this._status, visitFieldset);

        /*Set classes for filter*/
        title.querySelector('input').className = 'visit-field-search';
        description.querySelector('textarea').className = 'visit-field-search';
        status.querySelector('input').className = 'card-status';
        priority.querySelector('input').className = 'card-priority';

        this._editBtn = this.editMenu();

        return visitFieldset;
    }

    createInput(dataHidden, labelText, type = 'text', content, container) {
        const elem = document.createElement('p');
        elem.className = 'visit-field';
        elem.dataset.hidden = dataHidden;
        elem.innerHTML = `<label>${labelText}</label><input type=${type} value="${content}">`;
        container.append(elem);
        return elem;
    }

    createTextarea(dataHidden, labelText, content, container) {
        const elem = document.createElement('p');
        elem.className = 'visit-field';
        elem.dataset.hidden = dataHidden;
        elem.innerHTML = `<label>${labelText}</label><textarea rows="3">${content}</textarea>`;
        container.append(elem);
        return elem;
    }

    // show/hide button
    toggleHidden() {
        const hiddenFields = this._visit.querySelectorAll('[data-hidden]');
        hiddenFields.forEach(elem => {
            if (elem.dataset.hidden === 'true') elem.classList.add('visit-field-hide')
        });

        const moreBtn = document.createElement('button');
        moreBtn.className = 'visit-more-btn';
        moreBtn.innerText = 'Показать больше';
        this._visit.append(moreBtn);

        // toggle button handler
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
                    if (this._editBtn.innerText === 'Свернуть меню') this._editBtn.click();
                    moreBtn.innerText = 'Показать больше';
                }
            })
        }
    }

    editMenu() {
        const editVisitWrapper = document.createElement('div');
        editVisitWrapper.className = 'visit-edit-wrapper';
        const editBtn = document.createElement('button');
        editBtn.className = 'visit-edit-btn';
        editBtn.dataset.hidden = 'true';
        editBtn.innerText = 'Редактировать';
        const editMenu = document.createElement('ul');
        editMenu.className = 'visit-edit-menu';
        editMenu.innerHTML = `<ul>
            <li><a class="visit-edit-menu-item">Завершить</a></li>
            <li><a class="visit-edit-menu-item">Редактировать</a></li>
            <li><a class="visit-edit-menu-item">Удалить</a></li>
        </ul>`;
        editMenu.hidden = true;

        editBtn.onclick = event => {
            event.preventDefault();
            editMenu.hidden = !editMenu.hidden;
            if (editBtn.innerText === 'Редактировать') {
                document.querySelectorAll('.visit-edit-btn').forEach(elem => {
                    if (elem.innerText === 'Свернуть меню') elem.click()
                });
                editBtn.innerText = 'Свернуть меню';
            } else editBtn.innerText = 'Редактировать';
        };

        // edit menu handler
        editMenu.addEventListener('click', event => {

            if (event.target.innerText === 'Завершить') {
                // this.editStatus();
                this._status = 'Визит завершен';
                event.target.innerText = 'Открыть';
                this._visit.querySelector('.card-status').value = this._status;
            } else if (event.target.innerText === 'Открыть') {
                // this.editStatus();
                this._status = 'В процессе';
                event.target.innerText = 'Завершить';
                this._visit.querySelector('.card-status').value = this._status;

            } else if (event.target.innerText === 'Редактировать') {
                //обработчик редактирования
                this.editCard();

            } else if (event.target.innerText === 'Удалить') {
                //обработчик удаления
                if (!confirm('Вы уверены, что эту запись нужно удалить?')) return;
                const options = {
                    method: 'DELETE',
                    url: `http://cards.danit.com.ua/cards/${this._id}`,
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                };
                axios(options).then(response => {
                    if (response.data.status === "Success") this._visit.remove();
                    else console.log('Something wrong. Try later.')
                }).catch(err => console.log(err));
            }
        });

        this._visit.append(editVisitWrapper);
        editVisitWrapper.append(editBtn, editMenu);

        return editBtn;
    }

    //save changed status request

    /*editStatus () {
        let status = this._status;
        status === 'В процессе' ? status = 'Визит завершен' : status = 'В процессе';
        const options = {
            method: 'PUT',
            url: `http://cards.danit.com.ua/cards/${this._id}`,
            data: {
            ...
            status: status,
            ...
            },
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        };

        axios(options).then(response => {
                if (response.data.status === "Success") {
                    this._status = status;
                    this._visit.querySelector('.card-status').value = this._status;
                }
            }).catch(err => console.log(err));
    }*/

    editCard(formDefault) {
        new Modal("modal-create-visit", `Редактировать`).render();
        const modalCreateVisit = document.getElementById('modal-create-visit');
        new Select('doctor-select', 'select').render(modalCreateVisit);
        new SelectDoctor().render();
        const doctorSelect = document.getElementById('doctor-select');
        doctorSelect.disabled = true;
        for (let item of doctorSelect.options) {
            item.selected = item.innerText === this._doctor;
        }

        new Form('visit-form').render(modalCreateVisit);
        new formDefault(this._id).render();

        document.getElementById('title-input').value = this._title;
        document.getElementById('description-input').value = this._description;
        document.getElementById('name-input').value = this._patient;
        document.getElementById('form-visit-priority').value = this._priority;
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
        this.createInput(true, 'Индекс массы', 'number', this._massIndex, visitFieldset);
        this.createTextarea(true, 'Заболевания', this._diseases, visitFieldset);
        this.createInput(true, 'Возраст', 'number', this._age, visitFieldset);
        super.toggleHidden();
    }

    editCard() {
        super.editCard(visitFormCardiolog);
        document.getElementById('pressure-input').value = this._pressure;
        document.getElementById('weight-index-input').value = this._massIndex;
        document.getElementById('disease-input').value = this._diseases;
        document.getElementById('age-input').value = this._age;
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
        super.toggleHidden();
    }

    editCard() {
        super.editCard(visitFormDentist);
        document.getElementById('date-input').value = this._lastVisit;
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
        super.toggleHidden();
    }

    editCard() {
        super.editCard(visitFormTerapevt);
        document.getElementById('age-input').value = this._age;
    }
}

/****************class Visit END*************************/


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
        const doneVisit = new Option('Визит завершен', 'doneVisit', "", '', '');
        const openVisit = new Option('В процессе', 'openVisit', "", '', '');

        const visitStatus = document.getElementById('visit-status');
        selectStatus.render(visitStatus);
        allVisits.render(visitStatus);
        doneVisit.render(visitStatus);
        openVisit.render(visitStatus);

        /*Status filter*/
        visitStatus.onchange = function () {
            const allCards = document.querySelectorAll('.visit');
            const filterValue = this.options[this.selectedIndex].innerText;
            allCards.forEach(item => {
                const cardValue = item.querySelector('.card-status').value;
                item.hidden = filterValue !== 'Все визиты' && filterValue !== cardValue;
            });
        };
    }
}

class SelectPriority extends Select {
    constructor(id, ...classArr) {
        super(id, ...classArr);
    }

    render() {
        const selectPriority = new Option('Выберите срочность', 'Status', 'true', 'true', '');
        const allVisits = new Option('Все визиты', 'allVisits', "", '', '');
        const highPriority = new Option('Обычная', 'middlePriority', "", '', '');
        const middlePriority = new Option('Высокая', 'highPriority', "", '', '');
        const lowPriority = new Option('Низкая', 'lowPriority', "", '', '');

        const visitPriority = document.getElementById('visit-priority');
        selectPriority.render(visitPriority);
        allVisits.render(visitPriority);
        highPriority.render(visitPriority);
        middlePriority.render(visitPriority);
        lowPriority.render(visitPriority);

        /*Priority filter*/
        visitPriority.onchange = function () {
            const allCards = document.querySelectorAll('.visit');
            const filterValue = this.options[this.selectedIndex].innerText;
            allCards.forEach(item => {
                const cardValue = item.querySelector('.card-priority').value;
                item.hidden = filterValue !== 'Все визиты' && filterValue !== cardValue;
            });
        };
    }
}

/*Input field search and filter*/
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const allCards = document.querySelectorAll('.visit');
    const filterValue = document.getElementById('search-filter').value.toLowerCase();
    allCards.forEach(item => {
        let visitValue = '';
        item.querySelectorAll('.visit-field-search').forEach(elem => {
            visitValue += elem.value.toLowerCase();
        });
        item.hidden = visitValue.indexOf(filterValue) === -1;
    });
});

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
    constructor(id, header) {
        this._modal = null;
        this._wrapper = null;
        this._title = null;
        this._id = id;
        this._header = header;
    }

    render() {
        this._modal = document.createElement("div");
        this._wrapper = document.createElement("div");
        this._title = document.createElement("div");
        this._wrapper.id = this._id;
        this._wrapper.classList.add('modal-container');
        this._modal.classList.add('entry-modal-bg');
        this._title.innerHTML = `<h2 class="modal-title">${this._header}</h2><div class="modal-close">X</div>`;
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
    };
}

const navbar = document.querySelector('.navbar');
navbar.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.id === 'login-btn') {

        const entryModal = new Modal("modal-wrapper", `Авторизация`);
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

                    if (response.data.status === "Success") {
                        localStorage.setItem('token', `${response.data.token}`);
                        const token = localStorage.getItem('token');
                        const authorization = {
                            Authorization: `Bearer ${token}`
                        };
                        const authOptions = {
                            method: 'GET',
                            url: 'http://cards.danit.com.ua/cards',
                            headers: authorization
                        };

                        axios(authOptions)
                            .then(function (response) {
                                const dataArr = response.data;

                                if (response.status >= 200 && response.status < 300) {
                                    if (dataArr.length > 0) {
                                        dataArr.forEach(function (item) {
                                            if (item.doctor === 'dentist') {

                                                const nameD = item.name;
                                                const titleD = item.title;
                                                const descriptionD = item.description;
                                                const priorityD = item.priority;
                                                const dateD = item.date;
                                                const idD = item.id;

                                                const visitDentist = new VisitDentist(dateD, idD, nameD, "Стоматолог", titleD, descriptionD, priorityD, 'Активен');
                                                visitDentist.render(cardsContainer);

                                            }


                                            if (item.doctor === 'cardiologist') {


                                                const nameC = item.name;
                                                const titleC = item.title;
                                                const descriptionC = item.description;
                                                const priorityC = item.priority;
                                                const ageC = item.age;
                                                const idC = item.id;
                                                const pressureC = item.pressure;
                                                const weightIndexC = item.weightIndex;
                                                const diseaseC = item.disease;

                                                const visitCardiolog = new VisitCardio(pressureC, weightIndexC, diseaseC, ageC, idC, nameC, "Кардиолог", titleC, descriptionC, priorityC, 'Активен');
                                                visitCardiolog.render(cardsContainer);
                                            }


                                            if (item.doctor === 'therapist') {

                                                const nameT = item.name;
                                                const titleT = item.title;
                                                const descriptionT = item.description;
                                                const priorityT = item.priority;
                                                const ageT = item.age;
                                                const idT = item.id;

                                                const visitTherapist = new VisitTherapist(ageT, idT, nameT, "Терапевт", titleT, descriptionT, priorityT, 'Активен');
                                                visitTherapist.render(cardsContainer);
                                            }

                                        })
                                    }
                                } else {
                                    return cardsContainer.innerHTML = `<div class="no-items">No items have been added</div>`;
                                }
                            });


                        const loginBtn = document.getElementById('login-btn');
                        loginBtn.style.display = 'none';
                        const navbar = document.getElementById('navbar');
                        const createBtn = new Input('button', '', "", "Создать", '', 'create-btn', 'login-btn');
                        createBtn.render(navbar);

                        const cardsContainer = document.getElementById('cards-container');
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
        const entryModal = new Modal("modal-create-visit", `Создать визит к врачу`);
        entryModal.render();
        const chosenDoctor = new Select('doctor-select', 'select');
        const modalCreateVisit = document.getElementById('modal-create-visit');
        chosenDoctor.render(modalCreateVisit);

        const selectDoctor = new SelectDoctor();
        selectDoctor.render();
        const doctorSelect = document.getElementById('doctor-select');

        doctorSelect.onchange = function () {
            const visitationForm = new Form('visit-form');
            visitationForm.render(modalCreateVisit);
            const visit = new visitForm();
            visit.render();
            let visitForms = document.getElementById('visit-form');

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
    const token = localStorage.getItem('token');
    if (token) {

        const loginBtn = document.getElementById('login-btn');
        loginBtn.remove();
        const navbar = document.getElementById('navbar');
        const createBtn = new Input('button', '', "", "Создать", '', 'create-btn', 'login-btn');
        createBtn.render(navbar);

        const cardsContainer = document.getElementById('cards-container');
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

        const authorization = {
            Authorization: `Bearer ${token}`
        };

        const authOptions = {
            method: 'GET',
            url: 'http://cards.danit.com.ua/cards',
            headers: authorization
        };

        axios(authOptions)
            .then(function (response) {
                const dataArr = response.data;

<<<<<<< HEAD
        if (response.status >= 200 && response.status < 300) {
          if (dataArr.length > 0) {
=======
                if (response.status >= 200 && response.status < 300) {
                    if (dataArr.length > 0) {

                        dataArr.forEach(function (item) {
                            if (item.doctor === 'dentist') {

                                const nameD = item.name;
                                const titleD = item.title;
                                const descriptionD = item.description;
                                const priorityD = item.priority;
                                const dateD = item.date;
                                const idD = item.id;

                                const visitDentist = new VisitDentist(dateD, idD, nameD, "Стоматолог", titleD, descriptionD, priorityD, 'Активен');
                                visitDentist.render(cardsContainer);
                            }


                            if (item.doctor === 'cardiologist') {

                                const nameC = item.name;
                                const titleC = item.title;
                                const descriptionC = item.description;
                                const priorityC = item.priority;
                                const ageC = item.age;
                                const idC = item.id;
                                const pressureC = item.pressure;
                                const weightIndexC = item.weightIndex;
                                const diseaseC = item.disease;

                                const visitCardiolog = new VisitCardio(pressureC, weightIndexC, diseaseC, ageC, idC, nameC, "Кардиолог", titleC, descriptionC, priorityC, 'Активен');
                                visitCardiolog.render(cardsContainer);
                            }

                            if (item.doctor === 'therapist') {

                                const nameT = item.name;
                                const titleT = item.title;
                                const descriptionT = item.description;
                                const priorityT = item.priority;
                                const ageT = item.age;
                                const idT = item.id;

                                const visitTherapist = new VisitTherapist(ageT, idT, nameT, "Терапевт", titleT, descriptionT, priorityT, 'Активен');
                                visitTherapist.render(cardsContainer);
                            }
                        })
                    }
                } else {
                    return cardsContainer.innerHTML = `<div class="no-items">No items have been added</div>`;
                }
            });
    }
});
>>>>>>> master


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

    // check PUT or POST request
    checkRequestType(id) {
        if (id) {
            const oldCard = document.getElementById(id);
            return {
                id,
                method: 'PUT',
                url: `http://cards.danit.com.ua/cards/${id}`,
                oldCard,
                ifPut() {
                    this.oldCard.removeAttribute('id');
                    this.oldCard.replaceWith(document.getElementById(this.id));
                }
            };
        } else return {
            method: 'POST',
            url: `http://cards.danit.com.ua/cards`,
            ifPut() {
                return false
            },
        }
    }
}


class visitFormDentist extends visitForm {
    constructor(id) {
        super(id);
    }

    render() {
        super.render();
        const dateInput = new Input('text', 'Дата последнего посещения*', "date", "", 'true', 'date-input', 'input');
        const submitBtn = new Input('submit', '', "", "Подтвердить", '', '', 'submit-btn');

        const visitForms = document.getElementById('visit-form');
        dateInput.render(visitForms);
        submitBtn.render(visitForms);

        const dateInputElement = document.getElementById('date-input');
        dateInputElement.addEventListener("focus", function () {
            this.type = 'date'
        });
        dateInputElement.addEventListener("blur", function () {
            this.type = 'text'
        });

        const nameInput = document.getElementById('name-input');
        const titleInput = document.getElementById('title-input');
        const descriptionInput = document.getElementById('description-input');
        const priorityInput = document.getElementById('form-visit-priority');
        const dateInputs = document.getElementById('date-input');

        const requestOptions = super.checkRequestType(this._id);
        visitForms.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = nameInput.value;
            const title = titleInput.value;
            const description = descriptionInput.value;
            const priority = priorityInput.value;
            const date = dateInputs.value;

            const content = {
                doctor: 'dentist',
                name: name,
                title: title,
                description: description,
                priority: priority,
                date: date
            };

            const token = localStorage.getItem('token');

            const authorization = {
                Authorization: `Bearer ${token}`
            };

            const authOptions = {
                method: requestOptions.method,
                url: requestOptions.url,
                data: JSON.stringify(content),
                headers: authorization
            };
            axios(authOptions)
                .then(function (response) {

                    if (response.status >= 200 && response.status < 300) {
                        const dataId = response.data.id;

                        document.getElementsByClassName('entry-modal-bg')[0].remove();

                        const visitDentist = new VisitDentist(date, dataId, name, "Стоматолог", title, description, priority);
                        const cardsContainer = document.getElementById('cards-container');
                        visitDentist.render(cardsContainer);
                        requestOptions.ifPut();
                    } else {
                        return alert('Ведутся технические работы')
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

        const requestOptions = super.checkRequestType(this._id);
        visitForms.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = nameInput.value;
            const title = titleInput.value;
            const description = descriptionInput.value;
            const priority = priorityInput.value;
            const age = ageInputs.value;

            const content = {
                doctor: 'therapist',
                name: name,
                title: title,
                description: description,
                priority: priority,
                age: age
            };

            const token = localStorage.getItem('token');

            const authorization = {
                Authorization: `Bearer ${token}`
            };

            const authOptions = {
                method: requestOptions.method,
                url: requestOptions.url,
                data: JSON.stringify(content),
                headers: authorization
            };

            axios(authOptions)
                .then(function (response) {

                    if (response.status >= 200 && response.status < 300) {
                        const dataId = response.data.id;

                        document.getElementsByClassName('entry-modal-bg')[0].remove();

                        const visitTherapist = new VisitTherapist(age, dataId, name, "Терапевт", title, description, priority);
                        const cardsContainer = document.getElementById('cards-container');
                        visitTherapist.render(cardsContainer);
                        requestOptions.ifPut();
                    } else {
                        return alert('Ведутся технические работы')
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

        const requestOptions = super.checkRequestType(this._id);
        visitForms.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = nameInput.value;
            const title = titleInput.value;
            const description = descriptionInput.value;
            const priority = priorityInput.value;
            const pressure = pressureInputs.value;
            const weightIndex = weightIndexInputs.value;
            const disease = diseaseInputs.value;
            const age = ageInputs.value;

            const content = {
                doctor: 'cardiologist',
                name: name,
                title: title,
                description: description,
                priority: priority,
                age: age,
                pressure: pressure,
                weightIndex: weightIndex,
                disease: disease,
            };

            const token = localStorage.getItem('token');

            const authorization = {
                Authorization: `Bearer ${token}`
            };

            const authOptions = {
                method: requestOptions.method,
                url: requestOptions.url,
                data: JSON.stringify(content),
                headers: authorization
            };

            axios(authOptions)
                .then(function (response) {

                    if (response.status >= 200 && response.status < 300) {

                        const dataId = response.data.id;

                        document.getElementsByClassName('entry-modal-bg')[0].remove();

                        const visitCardiolog = new VisitCardio(pressure, weightIndex, disease, age, dataId, name, "Кардиолог", title, description, priority);
                        const cardsContainer = document.getElementById('cards-container');
                        visitCardiolog.render(cardsContainer);
                        requestOptions.ifPut();
                    } else {
                        return alert('Ведутся технические работы')
                    }
                });
        });
    }
}
