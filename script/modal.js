class Modal {
  constructor(id, header, content) {
    this._modal = null;
    this._wrapper = null;
    this._id = id;
    this._header = header;
    this._content = content;
  }

  render() {
    this._modal = document.createElement("div");
    this._wrapper = document.createElement("div");

    this._modal.classList.add('entry-modal-bg');
    console.log(this._modal);
    // this._content = document.createElement("form");
    // this._content.classList.add('m');
    // this._header.innerHTML = `<h2>${this._header}</h2>`;
    this._wrapper.innerHTML = this._content;
    // this._content.append(this._header);
    this._modal.id = this._id;
    const body = document.querySelector('body');
    body.append(this._modal);
    this._modal.append(this._wrapper);
    this._wrapper.prepend(this._header);
    // this._modal.append(this._header);
    // this._modal.append(this._content);
    console.log(this._modal);
    this._modal.querySelector(".modal-close").addEventListener("click", function() {
      this.parentNode.parentElement.style.display = 'none';
    });
  };
}

const navbar = document.querySelector('.navbar');
navbar.addEventListener('click', (event) => {
  event.preventDefault();
  const nurseImg = document.querySelector('.img-nurse');
  console.log(event.target);
  if (event.target.classList.contains('login-btn')) {
    const entryModal = new Modal("","Авторизация",`<form class="container-form"><div class="modal-close">X</div><input type="email" class="modal-input" placeholder="Логин"><input class="modal-input" placeholder="Пароль" type="password"><input type="submit" value="Войти" class="modal-submit"></form>`);
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
