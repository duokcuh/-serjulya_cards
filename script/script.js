class Visit {
    constructor (id, doctor, doctorName, title, description, status, priority, patient) {
        this._id = id;
        this._doctor = doctor;
        this._title = title;
        this._description = description;
        this._status = status;
        this._priority = priority;
        this._patient = patient;
    }



}

class VisitCardio extends Visit {
    constructor (pressure, massIndex, diseases, age, ...args) {
        super(...args);
        this._pressure = pressure;
        this._massIndex = massIndex;
        this._age = age;
    }


}

class VisitDentist extends Visit {
    constructor (lastVisit, ...args) {
        super(...args);
        this._lastVisit = lastVisit;
    }


}

class VisitTherapist extends Visit {
    constructor (age, ...args) {
        super(...args);
        this._age = age;
    }


}