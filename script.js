const adviceDB = {
    all: [
        "Улыбнитесь себе.",
        "Попробуйте что-то новое сегодня.",
        "Позвоните старому другу.",
        "Заведите дневник благодарности",
        "Попробуйте новый маршрут до работы или учёбы.",
        "Сфотографируйте что-то красивое сегодня",
        "Скажите комплимент незнакомцу.",
        "Выучите одно иностранное слово.",
        "Приготовьте блюдо по новому рецепту.",
        "Сделайте доброе дело анонимно.",
        "Напишите письмо себе в будущее.",
        "Посмотрите на облака и найдите необычную форму.",
        "Устройте сегодня спа день."
    ],
    health: [
        "Пейте больше воды в течение дня.",
        "Спите не менее 7 часов.",
        "Сделайте 10-минутную растяжку утром.",
        "Выпейте стакан воды сразу после пробуждения.",
        "Делайте 5-минутную растяжку каждые 2 часа.",
        "Замените лифт на лестницу.",
        "Спите в полной темноте для выработки мелатонина.",
        "Проверьте осанку прямо сейчас!",
        "Попробуйте дыхание 4-7-8 (вдох 4, задержка 7, выдох 8).",
        "Массируйте уши для бодрости и для избавления от отеков.",
        "Заведите привычку делать 20 приседаний утром.",
        "Пейте имбирный чай для иммунитета."
    ],
    money: [
        "Откладывайте 10% от любого дохода.",
        "Перед покупкой спросите себя: 'Это необходимо?'",
        "Инвестируйте в знания — это лучшая инвестиция.",
        "Сравните тарифы мобильного оператора.",
        "Попробуйте неделю без спонтанных покупок.",
        "Изучите кэшбэк-сервисы для ваших регулярных трат.",
        "Составьте личный финансовый план на год.",
        "Попробуйте технику '24 часа' перед покупкой.",
        "Оптимизируйте подписки (стриминги, сервисы).",
        "Научитесь составлять бюджет в Excel/приложении.",
        "Инвестируйте в самообразование (курсы, книги)."
    ],
    life: [
        "Поблагодарите за 3 вещи, которые у вас есть.",
        "Проведите время без гаджетов.",
        "Напишите список целей на год.",
        "Разберите один ящик с вещами сегодня.",
        "Составьте список 100 желаний.",
        "Позвоните родителям просто так.",
        "Научитесь завязывать галстук/шарф новым способом.",
        "Посадите комнатное растение.",
        "Создайте плейлист для разных настроений.",
        "Наведите порядок на рабочем столе (и в компьютере).",
        "Попробуйте медитацию перед сном.",
        "Заведите ритуал для утра/вечера.",
        "Сходите в музей или на выставку в выходные."
    ],
    hacks: [
        "Используйте резинку для денег как временный кошелёк.",
        "Заряжайте телефон в авиарежиме для ускоренной зарядки.",
        "Храните чеснок в стеклянной банке - он не будет прорастать.",
        "Используйте прищепку для аккуратного нанесения маски на лицо.",
        "Закрепите скрепку на ластике для удобного использования.",
        "Используйте старый чехол для телефона как держатель кредитки.",
        "Прикрепите магнит к ножницам для удобного хранения.",
        "Используйте пустую бутылку для хранения пакетов.",
        "Применяйте зажимы для хлеба для закрытия чипсов.",
        "Используйте старую зубную щетку для чистки клавиатуры."
    ]
};

const elements = {
    advice: document.getElementById('advice'),
    generateBtn: document.getElementById('generate-btn'),
    historyBtn: document.getElementById('history-btn'),
    historySection: document.getElementById('history-section'),
    historyList: document.getElementById('history-list'),
    themeToggle: document.getElementById('theme-toggle'),
    settingsBtn: document.getElementById('settings-btn'),
    clearHistoryBtn: document.getElementById('clear-history'),
    historyLifetime: document.getElementById('history-lifetime'),
    historyCount: document.getElementById('history-count'),
    categoryBtns: document.querySelectorAll('.category-btn')
};


const state = {
    currentCategory: 'all',
    theme: localStorage.getItem('theme') || 'light',
    history: JSON.parse(localStorage.getItem('adviceHistory')) || [],
    historyLifetime: parseInt(localStorage.getItem('historyLifetime')) || 30
};


function init() {
    applyTheme();
    setupEventListeners();
    updateHistoryDisplay();
    elements.historyLifetime.value = state.historyLifetime;
}

function setupEventListeners() {
    elements.generateBtn.addEventListener('click', generateAdvice);
    elements.historyBtn.addEventListener('click', toggleHistory);
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.clearHistoryBtn.addEventListener('click', clearAllHistory);
    elements.historyLifetime.addEventListener('change', updateHistoryLifetime);

    elements.categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentCategory = btn.dataset.category;
        });
    });
}

function generateAdvice() {
    const advices = adviceDB[state.currentCategory];
    const randomAdvice = advices[Math.floor(Math.random() * advices.length)];

    elements.advice.style.animation = 'none';
    setTimeout(() => {
        elements.advice.style.animation = 'fadeIn 0.5s forwards';
        elements.advice.textContent = randomAdvice;
    }, 10);

    addToHistory(randomAdvice);
}


function addToHistory(advice) {
    const newItem = {
        text: advice,
        date: new Date().toISOString(),
        id: Date.now()
    };

    state.history.unshift(newItem);
    cleanOldHistory();
    saveHistory();
    updateHistoryDisplay();
}

function cleanOldHistory() {
    if (state.historyLifetime === 0) return;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - state.historyLifetime);

    state.history = state.history.filter(item => {
        return new Date(item.date) > cutoffDate;
    });
}

function updateHistoryDisplay() {
    elements.historyList.innerHTML = state.history.map(item => `
        <li data-id="${item.id}">
            ${item.text}
            <button class="remove-item" data-id="${item.id}">×</button>
        </li>
    `).join('');

    elements.historyCount.textContent = `(${state.history.length})`;


    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromHistory(btn.dataset.id);
        });
    });
}

function removeFromHistory(id) {
    state.history = state.history.filter(item => item.id !== parseInt(id));
    saveHistory();
    updateHistoryDisplay();
}

function clearAllHistory() {
    state.history = [];
    saveHistory();
    updateHistoryDisplay();
}

function updateHistoryLifetime() {
    state.historyLifetime = parseInt(elements.historyLifetime.value);
    localStorage.setItem('historyLifetime', state.historyLifetime);
    cleanOldHistory();
    saveHistory();
    updateHistoryDisplay();
}


function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme();
    localStorage.setItem('theme', state.theme);
}

function applyTheme() {
    document.body.className = `${state.theme}-theme`;
}


function toggleHistory() {
    elements.historySection.classList.toggle('visible');
}

function saveHistory() {
    localStorage.setItem('adviceHistory', JSON.stringify(state.history));
}


init();