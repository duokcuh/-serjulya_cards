class Modal {
  constructor(id, header, content) {
    this._modal = null;
    this._id = id;
    this._header = header;
    this._content = content;
  }

  render() {
    this._modal = document.createElement("div");
    this._modal.classList.add('entry-modal-bg');
    console.log(this._modal);
    // this._content = document.createElement("form");
    // this._content.classList.add('m');
    this._modal.innerHTML = this._content;
    this._modal.id = this._id;
    const body = document.querySelector('body');
    body.append(this._modal);
    // this._modal.append(this._content);
    console.log(this._modal);
    this._modal.querySelector(".modal-close").addEventListener("click", function() {
      this.parentNode.parentElement.style.display = 'none';
    });
  };
}

function showModal(browserEvent) {

  const modalBg = document.createElement('div');
  const loginForm = document.createElement('form');
  const login = document.createElement('input');
  const password = document.createElement('input');
  const buttonsDiv = document.createElement('div');
  const submit = document.createElement('input');
  const close = document.createElement('input');


  submit.type = 'submit';
  submit.value = 'Войти';
  close.type = 'submit';
  close.value = 'Закрыть';

  password.placeholder = 'Пароль';
  login.placeholder = 'Логин или мейл';

  login.classList.add('modal-input');
  password.classList.add('modal-input');
  submit.classList.add('modal-submit');
  close.classList.add('modal-close');
  buttonsDiv.classList.add('modal-buttons');

  modalBg.classList.add('entry-modal-bg');
  loginForm.classList.add('container-form');

  modalBg.append(loginForm);
  buttonsDiv.append(submit, close);
  loginForm.append(login, password, buttonsDiv);

  /*для того, чтобы нажатия по модальному окну обрабатывались В ТОМ ЖЕ ОБРАБОТЧИКЕ событий, что и все остальные клики внутри mailList'а мі добавляем модальное окно, как дочерний елемент mailList'a
  * в данном случае mailList'ом будет РОДИТЕЛЬСКИЙ елемент, от того, по которому было осуществлено нажатие.
  * Почему? Потому что функция эта вызывается ТОЛЬКО когда нажали по кнопке создания письма, а она - прямой ребенок mailList'a*/
  browserEvent.target.parentElement.append(modalBg);
  console.log(browserEvent.target);
}

const navbar = document.querySelector('.navbar');
navbar.addEventListener('click', (event) => {
  event.preventDefault();
  const nurseImg = document.querySelector('.img-nurse');
  console.log(event.target);
  if (event.target.classList.contains('register-btn')) {
    const entryModal = new Modal(null,null,`<form class="container-form"><div class="modal-close">X</div><input type="email" class="modal-input" placeholder="Логин"><input class="modal-input" placeholder="Пароль" type="password"><input type="submit" value="Войти" class="modal-submit"></form>`);
    entryModal.render();
    // showModal(event);
    nurseImg.style = 'opacity:0';

  }
  if(event.target.classList.contains('entry-modal-bg')) { //если у елемента на который фактически было осуществлено нажатие есть класс new-mail-bg, то мы нажали по полупрозрачному черному фону модального окна
    event.target.remove(); //и нужно удалить модалку с ра
    nurseImg.style = 'opacity:1';
  }
});

// class entryModal extends Modal
