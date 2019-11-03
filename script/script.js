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
        const submitBtn = new Input('button', '', "", "Submit", '', 'register-btn', 'submit-btn');

        const registrationForm = document.getElementById('registration-form');
        emailInput.render(registrationForm);
        passwordInput.render(registrationForm);
        submitBtn.render(registrationForm);
    }
}

const registerForm = new Form('registration-form');
const modal = document.getElementById('modal');  /*МОДАЛЬНЕ ВІКНО*/
registerForm.render(modal);

const registration = new registrationForm();
registration.render();


// class visitForm extends Form {
//     constructor(id) {
//         super(id);
//     }
//
//     render() {
//         const titleInput = new Input('text', 'Цель визита*', "purpose", "", 'true', '', 'input');
//         const descriptionInput = new Input('text', 'Краткое описание визита', "description", "", '', '', 'input');
//         const priorityInput = new Input('text', 'Срочность*', "priority", "", 'true', '', 'input');
//         const fullNameInput = new Input('text', 'ФИО*', "fullName", "", 'true', '', 'input');
//
//         const visitForm = document.getElementById('visit-form');
//         titleInput.render(visitForm);
//         descriptionInput.render(visitForm);
//         priorityInput.render(visitForm);
//         fullNameInput.render(visitForm);
//     }
// }
//
// const visitationForm = new Form('visit-form');
// visitationForm.render(modal);                           /*МОДАЛЬНЕ ВІКНО*/
// const visit = new visitForm();
// visit.render();
//
//
// class visitFormDentist extends visitForm {
//     constructor(id) {
//         super(id);
//     }
//
//     render() {
//         const dateInput = new Input('text', 'Дата последнего посещения*', "date", "", 'true', '', 'input');
//         const submitBtn = new Input('button', '', "", "Submit", '', '', 'submit-btn');
//
//         const visitForm = document.getElementById('visit-form');
//         dateInput.render(visitForm);
//         submitBtn.render(visitForm);
//     }
// }
//
// const visitDentist = new visitFormDentist();
// visitDentist.render();
//
//
// class visitFormTerapevt extends visitForm {
//     constructor(id) {
//         super(id);
//     }
//
//     render() {
//         const ageInput = new Input('number', 'Возраст*', "age", "", 'true', '', 'input');
//         const submitBtn = new Input('button', '', "", "Submit", '', '', 'submit-btn');
//
//         const visitForm = document.getElementById('visit-form');
//         ageInput.render(visitForm);
//         submitBtn.render(visitForm);
//     }
// }
//
// const visitTerapevt = new visitFormTerapevt();
// visitTerapevt.render();
//
//
// class visitFormCardiolog extends visitForm {
//     constructor(id) {
//         super(id);
//     }
//
//     render() {
//         const pressureInput = new Input('text', 'Обычное давление*', "pressure", "", 'true', '', 'input');
//         const weightIndexInput = new Input('text', 'Индекс массы тела*', "weightIndex", "", 'true', '', 'input');
//         const diseaseInput = new Input('text', 'Перенесенные заболевания сердечно-сосудистой системы*', "diseaseIndex", "", 'true', '', 'input');
//         const ageInput = new Input('number', 'Возраст*', "age", "", 'true', '', 'input');
//         const submitBtn = new Input('button', '', "", "Submit", '', '', 'submit-btn');
//
//         const visitForm = document.getElementById('visit-form');
//         pressureInput.render(visitForm);
//         weightIndexInput.render(visitForm);
//         diseaseInput.render(visitForm);
//         ageInput.render(visitForm);
//         submitBtn.render(visitForm);
//     }
// }
//
// const visitCardiolog = new visitFormCardiolog();
// visitCardiolog.render();
//
//
// /*AJAX-запрос на авторизацію*/
//
// const registerBtn = document.getElementById('register-btn');
//
// registerBtn.addEventListener('click', function () {
//     const email = document.getElementById('email-input').value;
//     const password = document.getElementById('password-input').value;
//
//     const data = {
//         email: email,
//         password: password
//     };
//
//     const authOptions = {
//         method: 'POST',
//         url: 'http://cards.danit.com.ua/login',
//         data: JSON.stringify(data),
//     };
//
//     axios(authOptions)
//         .then(function (response) {
//             // console.log(response);
//             // console.log(response.data);
//             console.log(response.data.status);
//
//             if (response.data.status === "Success") {
//                 const loginBtn = document.getElementById('login-btn');
//                 loginBtn.style.display = 'none';
//                 const navbar = document.getElementById('navbar');
//                 const createBtn = new Input('button', '', "", "Создать", '', 'create-btn', 'login-btn');
//                 createBtn.render(navbar);
//
//                 const wrapper = document.getElementById('wrapper');
//                 const cardsContainer = document.getElementById('cards-container');
//                 wrapper.style.display = 'flex';
//                 cardsContainer.style.display = 'flex';
//                 modal.style.display = 'none';                       /*МОДАЛЬНЕ ВІКНО*/
//             }
//
//             if (response.data.status === "Error") {
//                 alert('Логин или пароль неправильные!')
//             }
//
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// });