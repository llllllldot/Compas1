// Данные для тестирования
const professionsData = {
    'Врач': [
        {
            id: 1,
            name: 'Детский сад № 45',
            address: 'ул. Ленина, 123',
            schedules: [
                { date: '2024-01-15', day: 'Понедельник', time: '10:00-11:30', age: '5-6 лет', spots: 12 },
                { date: '2024-01-17', day: 'Среда', time: '14:00-15:30', age: '6-7 лет', spots: 8 }
            ]
        },
        {
            id: 2,
            name: 'Детский сад № 78',
            address: 'ул. Мира, 45',
            schedules: [
                { date: '2024-01-16', day: 'Вторник', time: '11:00-12:30', age: '5-6 лет', spots: 15 }
            ]
        }
    ],
    'Повар': [
        {
            id: 3,
            name: 'Детский сад № 23',
            address: 'ул. Гагарина, 67',
            schedules: [
                { date: '2024-01-18', day: 'Четверг', time: '10:30-12:00', age: '5-7 лет', spots: 10 }
            ]
        }
    ],
    'Строитель': [
        {
            id: 4,
            name: 'Детский сад № 56',
            address: 'ул. Строителей, 89',
            schedules: [
                { date: '2024-01-19', day: 'Пятница', time: '09:30-11:00', age: '4-5 лет', spots: 20 }
            ]
        }
    ],
    'Художник': [
        {
            id: 5,
            name: 'Детский сад № 12',
            address: 'ул. Творческая, 34',
            schedules: [
                { date: '2024-01-22', day: 'Понедельник', time: '15:00-16:30', age: '5-6 лет', spots: 8 }
            ]
        }
    ],
    'Ученый': [
        {
            id: 6,
            name: 'Детский сад № 89',
            address: 'ул. Научная, 56',
            schedules: [
                { date: '2024-01-23', day: 'Вторник', time: '10:00-11:30', age: '6-7 лет', spots: 12 }
            ]
        }
    ]
};

const allKindergartens = [
    'Детский сад № 12', 'Детский сад № 23', 'Детский сад № 34', 'Детский сад № 45',
    'Детский сад № 56', 'Детский сад № 67', 'Детский сад № 78', 'Детский сад № 89',
    'Детский сад № 90', 'Детский сад № 101', 'Детский сад № 112'
];

let currentSelectedProfession = '';
let currentSelectedSchedule = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeProfessionsList();
    populateKindergartenSelect();
    updateStatistics();
});

// Инициализация списка профессий
function initializeProfessionsList() {
    const professionsList = document.getElementById('professionsList');
    const professions = Object.keys(professionsData);
    
    professionsList.innerHTML = professions.map(profession => `
        <button class="profession-item" onclick="selectProfession('${profession}')">
            ${getProfessionEmoji(profession)} ${profession}
        </button>
    `).join('');
    
    // Выбираем первую профессию по умолчанию
    if (professions.length > 0) {
        selectProfession(professions[0]);
    }
}

// Получение эмодзи для профессии
function getProfessionEmoji(profession) {
    const emojiMap = {
        'Врач': '👨‍⚕️',
        'Повар': '👨‍🍳',
        'Строитель': '👷‍♂️',
        'Художник': '👨‍🎨',
        'Ученый': '👨‍🔬',
        'Музыкант': '👨‍🎤',
        'Полицейский': '👮‍♂️',
        'Космонавт': '👨‍🚀',
        'Спасатель': '👨‍🚒',
        'Фермер': '👨‍🌾'
    };
    return emojiMap[profession] || '👨‍💼';
}

// Выбор профессии
function selectProfession(profession) {
    currentSelectedProfession = profession;
    
    // Обновляем активный элемент в списке
    document.querySelectorAll('.profession-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Обновляем заголовок
    const selectedProfessionDiv = document.getElementById('selectedProfession');
    selectedProfessionDiv.innerHTML = `
        <div class="profession-header">
            <h3>${getProfessionEmoji(profession)} ${profession}</h3>
            <p>Детские сады, проводящие мастер-классы по профессии "${profession}"</p>
        </div>
    `;
    
    // Показываем детские сады
    displayKindergartens(profession);
}

// Отображение детских садов для выбранной профессии
function displayKindergartens(profession) {
    const kindergartensList = document.getElementById('kindergartensList');
    const kindergartens = professionsData[profession] || [];
    
    if (kindergartens.length === 0) {
        kindergartensList.innerHTML = `
            <div class="no-data">
                <p>Пока нет детских садов, проводящих мастер-классы по этой профессии</p>
            </div>
        `;
        return;
    }
    
    kindergartensList.innerHTML = kindergartens.map(kindergarten => `
        <div class="kindergarten-card">
            <div class="kindergarten-header">
                <div class="kindergarten-name">${kindergarten.name}</div>
            </div>
            <div class="kindergarten-address">📍 ${kindergarten.address}</div>
            
            ${kindergarten.schedules.map(schedule => `
                <div class="schedule-item">
                    <div class="schedule-time">
                        📅 ${schedule.day}, ${schedule.date} | 🕒 ${schedule.time}
                    </div>
                    <div class="schedule-details">
                        👶 Возраст: ${schedule.age} | ✅ Свободных мест: ${schedule.spots}
                    </div>
                    <button class="register-btn" onclick="openRegistrationModal('${profession}', '${kindergarten.name}', '${schedule.day}, ${schedule.date} ${schedule.time}')">
                        Записаться на пробу
                    </button>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// Фильтрация профессий
function filterProfessions() {
    const searchTerm = document.getElementById('professionSearch').value.toLowerCase();
    const professionItems = document.querySelectorAll('.profession-item');
    
    professionItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Заполнение выпадающего списка детских садов
function populateKindergartenSelect() {
    const select = document.getElementById('guestKindergarten');
    select.innerHTML = '<option value="">Выберите детский сад</option>' +
        allKindergartens.map(kg => `<option value="${kg}">${kg}</option>`).join('');
}

// Открытие модального окна регистрации
function openRegistrationModal(profession, kindergarten, dateTime) {
    currentSelectedSchedule = { profession, kindergarten, dateTime };
    
    document.getElementById('modalProfession').value = profession;
    document.getElementById('modalKindergarten').value = kindergarten;
    document.getElementById('modalDateTime').value = dateTime;
    
    document.getElementById('registrationModal').style.display = 'block';
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('registrationModal').style.display = 'none';
    document.getElementById('registrationForm').reset();
}

// Отправка формы
function submitForm(event) {
    event.preventDefault();
    
    const formData = {
        profession: document.getElementById('modalProfession').value,
        kindergarten: document.getElementById('modalKindergarten').value,
        dateTime: document.getElementById('modalDateTime').value,
        guestKindergarten: document.getElementById('guestKindergarten').value,
        childrenCount: document.getElementById('childrenCount').value,
        educatorName: document.getElementById('educatorName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        notes: document.getElementById('notes').value
    };
    
    // Здесь будет отправка данных на сервер
    console.log('Данные заявки:', formData);
    
    // Показываем уведомление об успехе
    showNotification('Заявка успешно отправлена! С вами свяжутся для подтверждения.', 'success');
    
    // Закрываем модальное окно
    closeModal();
}

// Показ уведомления
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type === 'error' ? 'error' : ''}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Обновление статистики
function updateStatistics() {
    const professionsCount = Object.keys(professionsData).length;
    const kindergartensCount = new Set(
        Object.values(professionsData).flat().map(kg => kg.name)
    ).size;
    const eventsCount = Object.values(professionsData).flat().reduce(
        (total, kg) => total + kg.schedules.length, 0
    );
    
    document.getElementById('professionsCount').textContent = professionsCount;
    document.getElementById('kindergartensCount').textContent = kindergartensCount;
    document.getElementById('eventsCount').textContent = eventsCount;
}

// Прокрутка к разделу профессий
function scrollToProfessions() {
    document.getElementById('professions').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('registrationModal');
    if (event.target === modal) {
        closeModal();
    }
}
