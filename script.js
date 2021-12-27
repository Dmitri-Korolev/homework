
const card = document.querySelector('.card');
const frontCard = document.querySelector('.front');
const backCard = document.querySelector('.back');
const btn = document.querySelector('.btn');

class SwapiService {

    _apiBase = `https://swapi.dev/api`;

    async getResource(url) {

        const res = await fetch(`${this._apiBase}${url}`); //ждём ответ сервера

        if (!res.ok) { // result.ok возвращает true если result.status соответствует ответу (200-299)
            throw new Error(`Could not fetch ${url}` + 
            `,received ${res.status}`) // res.status возвращает код результата
        } // cообщение об ошибке если ответ сервера не 200-ый код
        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results;
    }
    getPerson(id) {
        return this.getResource(`/people/${id}/`)
    }
}

const swapi = new SwapiService ();

window.addEventListener('DOMContentLoaded', () => {
    
    btn.addEventListener('click', () => {
        const rndmPerson = Math.floor(Math.random() * 80)+1;
        swapi.getPerson(rndmPerson).then((p) => {
    
            frontCard.innerHTML = `<img
                   src=https://starwars-visualguide.com/assets/img/characters/${rndmPerson}.jpg
                   alt="персонаж ${p.name}" />`;
        
            backCard.innerHTML = `<ul class="back-content center">
                <h2>${p.name}</h2>
                <li>Год рождения: ${p.birth_year}</li>
                <li>Рост: ${p.height}</li>
                <li>Вес: ${p.mass}</li>
            </ul>`;
        });
    });
    
    card.addEventListener('click', () => {
        frontCard.classList.toggle('front-flipped');
        backCard.classList.toggle('back-flipped');
    });
});





