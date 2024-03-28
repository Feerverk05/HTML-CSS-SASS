// Отримуємо форму та елемент для виводу результатів
const form = document.getElementById('artForm');
const resultContainer = document.getElementById('results');

// Додаємо обробник події для форми
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Отримуємо значення з форми
    let formData = {
        pictureType: document.getElementById('pictureType').value,
        style: document.getElementById('style').value,
        priroda: document.getElementById('priroda').checked,
        town: document.getElementById('town').checked,
        abstraction: document.getElementById('abstraction').checked,
        interest: document.querySelector('input[name="interest"]:checked').value,
        delivery: Array.from(document.querySelectorAll('input[name="delivery"]:checked')).map(el => el.value),
        canvasColor: document.getElementById('canvas-color').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        volume: document.getElementById('volume').value,
        time: document.getElementById('time').value
    };

    // Зчитуємо дані з LocalStorage або створюємо новий масив
    let surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    surveys.push(formData);

    // Зберігаємо масив у LocalStorage
    localStorage.setItem('surveys', JSON.stringify(surveys));

    // Очищаємо форму
    form.reset();
});

// Функція для фільтрації результатів
function filterSurveys() {
    let surveys = JSON.parse(localStorage.getItem('surveys')) || [];

    // Фільтрація за стилем картини
    let styleFilter = document.getElementById('filter-style').value;
    if (styleFilter !== 'all') {
        surveys = surveys.filter(function(survey) {
            return survey.style === styleFilter;
        });
    }

    // Фільтрація за тематикою картини
    let themeFilter = document.getElementById('filter-theme').value;
    if (themeFilter !== 'all') {
        surveys = surveys.filter(function(survey) {
            return survey[themeFilter];
        });
    }

    // Фільтрація за розміром картини
    let sizeFilter = document.getElementById('filter-size').value;
    if (sizeFilter !== 'all') {
        surveys = surveys.filter(function(survey) {
            return survey.interest === sizeFilter;
        });
    }

    // Вивід результатів
    resultContainer.innerHTML = '';
    if (surveys.length > 0) {
        surveys.forEach(function(survey) {
            let surveyElement = document.createElement('div');
            surveyElement.textContent = JSON.stringify(survey);
            resultContainer.appendChild(surveyElement);
        });
    } else {
        resultContainer.textContent = 'Результати не знайдено.';
    }
}

// Додатково можна додати обробник події для кнопки фільтру
document.getElementById('filter-button').addEventListener('click', filterSurveys);

// Викликаємо функцію фільтрації за замовчуванням, щоб відобразити всі результати при завантаженні сторінки
filterSurveys();
