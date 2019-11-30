# serjulya_cards

STEP_3: Cards

email: team@gmail.com
password: step

1. Сергей Аникин (slack: Sergo):

HTML/CSS:
cекция с карточками визитов;
cards.css;
footer;
favicon

JS:
class Visit и наследуемые классы (VisitCardio, VisitDentist, VisitTerapist);
все методы и запросы внутри этих классов;
методы редактирования и удаление карточек;
метод смены статуса визита (открыт/завершен);
финальная логика фильтров;
выделение токена при авторизации и сохранение его в Local Storage;
метод проверки типа запроса (PUT/POST) в классе visitForm

2. Юлия Чорненька (slack: Yulia Chornenka):

HTML/CSS:
Дизайн, header и фильтры;
form.css, style.css

JS:
class Form и наследуемые классы (registrationForm, visitForm, visitFormDentist и т.д.);
class Input;
class Select и наследуемые классы (SelectStatus, SelectPriority, SelectDoctor и т.д.);
class Option;
POST-запрос на авторизацию
Сотрудничество при написании PUT-запроса на редактирование карточек
Базовая логика фильтров

3. Иван Рябоконь (slack: Ivan R):

HTML/CSS:
modal.css

JS:
class Modal и все внутрение отображения в модальных окнах;
Код внутри слушателя событий по клику на "navbar";
LocalStorage при загрузке страницы и сохранении всех изменений после + отрисовка имеющихся 
карточек в базе данных, фильтров;
Сотрудничество при написании class Select и наследуемые классы (SelectStatus, SelectPriority, 
SelectDoctor и т.д.), class Option;
Сделал шаблоны для команды на GET/POST/DELETE/PUT запросы для карточек.
