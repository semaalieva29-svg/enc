// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const drugCards = document.querySelectorAll('.drug-card');
const guidelineModal = document.getElementById('guidelineModal');
const calculatorModal = document.getElementById('calculatorModal');
const modalContent = document.getElementById('modalContent');
const calculatorContent = document.getElementById('calculatorContent');
const closeBtns = document.querySelectorAll('.close');

// Mobile Navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const guidelineCards = document.querySelectorAll('.guideline-card');
    const calcCards = document.querySelectorAll('.calc-card');
    const drugCards = document.querySelectorAll('.drug-card');

    // Search in guideline cards
    guidelineCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       tags.some(tag => tag.includes(searchTerm));
        
        card.style.display = matches ? 'block' : 'none';
    });

    // Search in calculator cards
    calcCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || description.includes(searchTerm);
        card.style.display = matches ? 'block' : 'none';
    });

    // Search in drug cards
    drugCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.drug-description').textContent.toLowerCase();
        const drugClass = card.querySelector('.drug-class').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       drugClass.includes(searchTerm);
        
        card.style.display = matches ? 'block' : 'none';
    });
});

// Drug filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        drugCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal functionality
function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking on X
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Guideline data
const guidelines = {
    diabetes: {
        title: 'Сахарный диабет',
        content: `
            <h2>Клинические рекомендации по сахарному диабету</h2>
            
            <h3>Диагностика</h3>
            <ul>
                <li><strong>СД 1 типа:</strong> Аутоиммунное заболевание с абсолютным дефицитом инсулина</li>
                <li><strong>СД 2 типа:</strong> Инсулинорезистентность с относительным дефицитом инсулина</li>
                <li><strong>Критерии диагностики:</strong>
                    <ul>
                        <li>Глюкоза плазмы натощак ≥ 7.0 ммоль/л</li>
                        <li>Глюкоза через 2 часа после нагрузки ≥ 11.1 ммоль/л</li>
                        <li>HbA1c ≥ 6.5%</li>
                    </ul>
                </li>
            </ul>

            <h3>Лечение СД 2 типа</h3>
            <ol>
                <li><strong>Метформин</strong> - препарат первой линии</li>
                <li><strong>Сульфонилмочевины</strong> - при недостаточной эффективности метформина</li>
                <li><strong>Ингибиторы ДПП-4</strong> - нейтральный эффект на массу тела</li>
                <li><strong>Агонисты ГПП-1</strong> - снижение массы тела</li>
                <li><strong>Ингибиторы SGLT-2</strong> - кардиопротекция</li>
            </ol>

            <h3>Мониторинг</h3>
            <ul>
                <li><strong>Самоконтроль гликемии:</strong> 4-7 раз в день при СД 1 типа</li>
                <li><strong>HbA1c:</strong> Каждые 3-6 месяцев</li>
                <li><strong>Осложнения:</strong> Ежегодный скрининг</li>
            </ul>

            <h3>Целевые показатели</h3>
            <ul>
                <li><strong>HbA1c:</strong> < 7.0% (индивидуальный подход)</li>
                <li><strong>Гликемия натощак:</strong> 4.0-7.0 ммоль/л</li>
                <li><strong>Постпрандиальная гликемия:</strong> < 10.0 ммоль/л</li>
            </ul>
        `
    },
    thyroid: {
        title: 'Заболевания щитовидной железы',
        content: `
            <h2>Клинические рекомендации по заболеваниям щитовидной железы</h2>
            
            <h3>Гипотиреоз</h3>
            <ul>
                <li><strong>Диагностика:</strong> Повышение ТТГ, снижение Т4</li>
                <li><strong>Лечение:</strong> L-тироксин 1.6-1.8 мкг/кг/сут</li>
                <li><strong>Мониторинг:</strong> ТТГ каждые 6-12 недель</li>
            </ul>

            <h3>Гипертиреоз</h3>
            <ul>
                <li><strong>Болезнь Грейвса:</strong> Тиреостатики (тиамазол)</li>
                <li><strong>Токсическая аденома:</strong> Радиойодтерапия или операция</li>
                <li><strong>Тиреоидит:</strong> Симптоматическая терапия</li>
            </ul>

            <h3>Узловой зоб</h3>
            <ul>
                <li><strong>ТАБ:</strong> При узлах > 1 см</li>
                <li><strong>Наблюдение:</strong> УЗИ каждые 6-12 месяцев</li>
                <li><strong>Операция:</strong> При подозрении на рак</li>
            </ul>
        `
    },
    adrenal: {
        title: 'Заболевания надпочечников',
        content: `
            <h2>Клинические рекомендации по заболеваниям надпочечников</h2>
            
            <h3>Болезнь Аддисона</h3>
            <ul>
                <li><strong>Диагностика:</strong> Снижение кортизола, повышение АКТГ</li>
                <li><strong>Лечение:</strong> Гидрокортизон 15-25 мг/сут</li>
                <li><strong>Минералокортикоиды:</strong> Флудрокортизон при необходимости</li>
            </ul>

            <h3>Синдром Кушинга</h3>
            <ul>
                <li><strong>Диагностика:</strong> Повышение кортизола, подавление АКТГ</li>
                <li><strong>Лечение:</strong> Хирургическое удаление аденомы</li>
                <li><strong>Медикаментозное:</strong> Кетоконазол, митотан</li>
            </ul>

            <h3>Феохромоцитома</h3>
            <ul>
                <li><strong>Диагностика:</strong> Повышение катехоламинов</li>
                <li><strong>Подготовка:</strong> α-блокаторы перед операцией</li>
                <li><strong>Лечение:</strong> Хирургическое удаление</li>
            </ul>
        `
    },
    obesity: {
        title: 'Ожирение и метаболический синдром',
        content: `
            <h2>Клинические рекомендации по ожирению</h2>
            
            <h3>Диагностика</h3>
            <ul>
                <li><strong>ИМТ:</strong> ≥ 30 кг/м²</li>
                <li><strong>Окружность талии:</strong> > 88 см (женщины), > 102 см (мужчины)</li>
                <li><strong>Метаболический синдром:</strong> 3 из 5 критериев</li>
            </ul>

            <h3>Лечение</h3>
            <ol>
                <li><strong>Диета:</strong> Дефицит 500-750 ккал/сут</li>
                <li><strong>Физическая активность:</strong> 150 мин/нед</li>
                <li><strong>Препараты:</strong> Орлистат, лираглутид</li>
                <li><strong>Бариатрическая хирургия:</strong> ИМТ > 40</li>
            </ol>

            <h3>Метаболический синдром</h3>
            <ul>
                <li><strong>Критерии:</strong> Абдоминальное ожирение + 2 фактора</li>
                <li><strong>Факторы риска:</strong> АГ, дислипидемия, гипергликемия</li>
                <li><strong>Лечение:</strong> Модификация образа жизни</li>
            </ul>
        `
    },
    pituitary: {
        title: 'Заболевания гипофиза',
        content: `
            <h2>Клинические рекомендации по заболеваниям гипофиза</h2>
            
            <h3>Акромегалия</h3>
            <ul>
                <li><strong>Диагностика:</strong> Повышение ИФР-1, СТГ</li>
                <li><strong>Лечение:</strong> Хирургия, соматостатин</li>
                <li><strong>Мониторинг:</strong> ИФР-1 каждые 3-6 месяцев</li>
            </ul>

            <h3>Пролактинома</h3>
            <ul>
                <li><strong>Диагностика:</strong> Повышение пролактина</li>
                <li><strong>Лечение:</strong> Каберголин, бромокриптин</li>
                <li><strong>Хирургия:</strong> При макроаденомах</li>
            </ul>

            <h3>Несахарный диабет</h3>
            <ul>
                <li><strong>Диагностика:</strong> Полиурия, полидипсия</li>
                <li><strong>Тест с десмопрессином:</strong> Центральная форма</li>
                <li><strong>Лечение:</strong> Десмопрессин</li>
            </ul>
        `
    },
    calcium: {
        title: 'Нарушения кальциевого обмена',
        content: `
            <h2>Клинические рекомендации по нарушениям кальциевого обмена</h2>
            
            <h3>Остеопороз (КР от 24.12.2019)</h3>
            <p><strong>Источник:</strong> <a href="https://www.endocrincentr.ru/sites/default/files/specialists/science/clinic-recomendations/kr_op_24.12.2019.pdf" target="_blank">Российская ассоциация эндокринологов</a></p>
            
            <h4>Определение</h4>
            <p>Остеопороз - системное заболевание скелета, характеризующееся снижением костной массы и нарушением микроархитектоники костной ткани, что приводит к увеличению хрупкости костей и риску переломов.</p>
            
            <h4>Диагностика</h4>
            <ul>
                <li><strong>DXA (двухэнергетическая рентгеновская абсорбциометрия):</strong> Золотой стандарт диагностики</li>
                <li><strong>FRAX:</strong> Алгоритм оценки 10-летней вероятности переломов</li>
                <li><strong>Лабораторные маркеры:</strong> CTX, P1NP, кальций, фосфор, ПТГ</li>
                <li><strong>Критерии диагностики:</strong> T-score ≤ -2.5 SD</li>
            </ul>
            
            <h4>Лечение</h4>
            <ol>
                <li><strong>Бисфосфонаты:</strong> Алендронат, ризедронат, золедроновая кислота</li>
                <li><strong>Деносумаб:</strong> Моноклональное антитело к RANKL</li>
                <li><strong>Терипаратид:</strong> Рекомбинантный ПТГ (1-34)</li>
                <li><strong>Стронция ранелат:</strong> При противопоказаниях к другим препаратам</li>
            </ol>
            
            <h4>Профилактика</h4>
            <ul>
                <li><strong>Кальций:</strong> 1000-1200 мг/сут (с пищей + добавки)</li>
                <li><strong>Витамин D:</strong> 800-2000 МЕ/сут</li>
                <li><strong>Физическая активность:</strong> Упражнения с нагрузкой на кости</li>
                <li><strong>Отказ от курения и алкоголя</strong></li>
            </ul>
            
            <h4>Мониторинг</h4>
            <ul>
                <li><strong>DXA:</strong> Каждые 1-2 года</li>
                <li><strong>Маркеры костного обмена:</strong> CTX, P1NP каждые 3-6 месяцев</li>
                <li><strong>Кальций, фосфор:</strong> При лечении бисфосфонатами</li>
            </ul>
            
            <h3>Гиперпаратиреоз</h3>
            <ul>
                <li><strong>Первичный:</strong> Повышение ПТГ, кальция</li>
                <li><strong>Лечение:</strong> Хирургия при показаниях</li>
                <li><strong>Наблюдение:</strong> При мягкой форме</li>
            </ul>

            <h3>Гипопаратиреоз</h3>
            <ul>
                <li><strong>Диагностика:</strong> Снижение ПТГ, кальция</li>
                <li><strong>Лечение:</strong> Кальций + витамин D</li>
                <li><strong>Мониторинг:</strong> Кальций, фосфор</li>
            </ul>
            
            <h3>Рахит</h3>
            <ul>
                <li><strong>Диагностика:</strong> Клинические признаки + снижение витамина D</li>
                <li><strong>Лечение:</strong> Витамин D 2000-4000 МЕ/сут</li>
                <li><strong>Профилактика:</strong> Витамин D 400-800 МЕ/сут</li>
            </ul>
        `
    }
};

// Calculator data
const calculators = {
    bmi: {
        title: 'Калькулятор ИМТ',
        content: `
            <h2>Калькулятор индекса массы тела</h2>
            <div class="calculator-form">
                <div class="form-group">
                    <label for="weight">Вес (кг):</label>
                    <input type="number" id="weight" step="0.1" placeholder="70">
                </div>
                <div class="form-group">
                    <label for="height">Рост (см):</label>
                    <input type="number" id="height" placeholder="170">
                </div>
                <button onclick="calculateBMI()" class="calc-submit-btn">Рассчитать ИМТ</button>
                <div id="bmiResult" class="calc-result"></div>
            </div>
        `
    },
    'cv-risk': {
        title: 'Калькулятор сердечно-сосудистого риска',
        content: `
            <h2>Калькулятор сердечно-сосудистого риска (SCORE)</h2>
            <div class="calculator-form">
                <div class="form-group">
                    <label for="age">Возраст:</label>
                    <input type="number" id="age" placeholder="50">
                </div>
                <div class="form-group">
                    <label for="gender">Пол:</label>
                    <select id="gender">
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="systolic">Систолическое АД (мм рт.ст.):</label>
                    <input type="number" id="systolic" placeholder="140">
                </div>
                <div class="form-group">
                    <label for="cholesterol">Общий холестерин (ммоль/л):</label>
                    <input type="number" id="cholesterol" step="0.1" placeholder="5.0">
                </div>
                <div class="form-group">
                    <label for="smoking">Курение:</label>
                    <select id="smoking">
                        <option value="no">Нет</option>
                        <option value="yes">Да</option>
                    </select>
                </div>
                <button onclick="calculateCVRisk()" class="calc-submit-btn">Рассчитать риск</button>
                <div id="cvRiskResult" class="calc-result"></div>
            </div>
        `
    },
    insulin: {
        title: 'Калькулятор доз инсулина',
        content: `
            <h2>Калькулятор доз инсулина</h2>
            <div class="calculator-form">
                <div class="form-group">
                    <label for="weight">Вес пациента (кг):</label>
                    <input type="number" id="insulinWeight" step="0.1" placeholder="70">
                </div>
                <div class="form-group">
                    <label for="currentGlucose">Текущая гликемия (ммоль/л):</label>
                    <input type="number" id="currentGlucose" step="0.1" placeholder="12.0">
                </div>
                <div class="form-group">
                    <label for="targetGlucose">Целевая гликемия (ммоль/л):</label>
                    <input type="number" id="targetGlucose" step="0.1" placeholder="6.0">
                </div>
                <div class="form-group">
                    <label for="insulinSensitivity">Чувствительность к инсулину:</label>
                    <select id="insulinSensitivity">
                        <option value="high">Высокая (2.5 ммоль/л на 1 ЕД)</option>
                        <option value="medium" selected>Средняя (2.0 ммоль/л на 1 ЕД)</option>
                        <option value="low">Низкая (1.5 ммоль/л на 1 ЕД)</option>
                    </select>
                </div>
                <button onclick="calculateInsulin()" class="calc-submit-btn">Рассчитать дозу</button>
                <div id="insulinResult" class="calc-result"></div>
            </div>
        `
    },
    levothyroxine: {
        title: 'Калькулятор доз левотироксина',
        content: `
            <h2>Калькулятор доз L-тироксина</h2>
            <div class="calculator-form">
                <div class="form-group">
                    <label for="levoWeight">Вес пациента (кг):</label>
                    <input type="number" id="levoWeight" step="0.1" placeholder="70">
                </div>
                <div class="form-group">
                    <label for="ageGroup">Возрастная группа:</label>
                    <select id="ageGroup">
                        <option value="young">Молодые (< 50 лет)</option>
                        <option value="elderly">Пожилые (≥ 50 лет)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="cardiacHistory">Сердечно-сосудистые заболевания:</label>
                    <select id="cardiacHistory">
                        <option value="no">Нет</option>
                        <option value="yes">Да</option>
                    </select>
                </div>
                <button onclick="calculateLevo()" class="calc-submit-btn">Рассчитать дозу</button>
                <div id="levoResult" class="calc-result"></div>
            </div>
        `
    },
    frax: {
        title: 'Калькулятор риска переломов (FRAX)',
        content: `
            <h2>Калькулятор риска переломов (FRAX)</h2>
            <p><em>Упрощенная версия на основе клинических рекомендаций по остеопорозу</em></p>
            <div class="calculator-form">
                <div class="form-group">
                    <label for="fraxAge">Возраст (лет):</label>
                    <input type="number" id="fraxAge" min="40" max="90" placeholder="65">
                </div>
                <div class="form-group">
                    <label for="fraxGender">Пол:</label>
                    <select id="fraxGender">
                        <option value="female">Женский</option>
                        <option value="male">Мужской</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="fraxWeight">Вес (кг):</label>
                    <input type="number" id="fraxWeight" step="0.1" placeholder="60">
                </div>
                <div class="form-group">
                    <label for="fraxHeight">Рост (см):</label>
                    <input type="number" id="fraxHeight" placeholder="160">
                </div>
                <div class="form-group">
                    <label for="fraxPreviousFracture">Предыдущий перелом:</label>
                    <select id="fraxPreviousFracture">
                        <option value="no">Нет</option>
                        <option value="yes">Да</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="fraxParentFracture">Перелом у родителей:</label>
                    <select id="fraxParentFracture">
                        <option value="no">Нет</option>
                        <option value="yes">Да</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="fraxSmoking">Курение:</label>
                    <select id="fraxSmoking">
                        <option value="no">Нет</option>
                        <option value="yes">Да</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="fraxGlucocorticoids">Глюкокортикоиды:</label>
                    <select id="fraxGlucocorticoids">
                        <option value="no">Нет</option>
                        <option value="yes">Да (≥ 3 мес)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="fraxRheumatoidArthritis">Ревматоидный артрит:</label>
                    <select id="fraxRheumatoidArthritis">
                        <option value="no">Нет</option>
                        <option value="yes">Да</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="fraxSecondaryOsteoporosis">Вторичный остеопороз:</label>
                    <select id="fraxSecondaryOsteoporosis">
                        <option value="no">Нет</option>
                        <option value="yes">Да</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="fraxAlcohol">Алкоголь (≥ 3 единиц/день):</label>
                    <select id="fraxAlcohol">
                        <option value="no">Нет</option>
                        <option value="yes">Да</option>
                    </select>
                </div>
                <button onclick="calculateFRAX()" class="calc-submit-btn">Рассчитать риск</button>
                <div id="fraxResult" class="calc-result"></div>
            </div>
        `
    }
};

// Open guideline modal
function openGuideline(guidelineType) {
    const guideline = guidelines[guidelineType];
    if (guideline) {
        modalContent.innerHTML = guideline.content;
        openModal(guidelineModal);
    }
}

// Open calculator modal
function openCalculator(calcType) {
    const calculator = calculators[calcType];
    if (calculator) {
        calculatorContent.innerHTML = calculator.content;
        openModal(calculatorModal);
    }
}

// Calculator functions
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    if (weight && height) {
        const heightM = height / 100;
        const bmi = weight / (heightM * heightM);
        let category = '';
        
        if (bmi < 18.5) category = 'Недостаточная масса тела';
        else if (bmi < 25) category = 'Нормальная масса тела';
        else if (bmi < 30) category = 'Избыточная масса тела';
        else if (bmi < 35) category = 'Ожирение I степени';
        else if (bmi < 40) category = 'Ожирение II степени';
        else category = 'Ожирение III степени';
        
        document.getElementById('bmiResult').innerHTML = `
            <h3>Результат:</h3>
            <p><strong>ИМТ:</strong> ${bmi.toFixed(1)} кг/м²</p>
            <p><strong>Категория:</strong> ${category}</p>
        `;
    }
}

function calculateCVRisk() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const systolic = parseInt(document.getElementById('systolic').value);
    const cholesterol = parseFloat(document.getElementById('cholesterol').value);
    const smoking = document.getElementById('smoking').value;
    
    if (age && systolic && cholesterol) {
        // Упрощенная модель SCORE
        let risk = 0;
        
        // Базовый риск по возрасту и полу
        if (gender === 'male') {
            if (age >= 60) risk += 5;
            else if (age >= 50) risk += 3;
            else if (age >= 40) risk += 1;
        } else {
            if (age >= 60) risk += 3;
            else if (age >= 50) risk += 2;
            else if (age >= 40) risk += 0.5;
        }
        
        // Факторы риска
        if (systolic >= 180) risk += 3;
        else if (systolic >= 160) risk += 2;
        else if (systolic >= 140) risk += 1;
        
        if (cholesterol >= 8.0) risk += 3;
        else if (cholesterol >= 6.5) risk += 2;
        else if (cholesterol >= 5.0) risk += 1;
        
        if (smoking === 'yes') risk += 2;
        
        let riskLevel = '';
        if (risk >= 8) riskLevel = 'Очень высокий';
        else if (risk >= 5) riskLevel = 'Высокий';
        else if (risk >= 2) riskLevel = 'Умеренный';
        else riskLevel = 'Низкий';
        
        document.getElementById('cvRiskResult').innerHTML = `
            <h3>Результат:</h3>
            <p><strong>Сумма баллов:</strong> ${risk}</p>
            <p><strong>Уровень риска:</strong> ${riskLevel}</p>
            <p><em>Примечание: Это упрощенная оценка. Для точной диагностики обратитесь к врачу.</em></p>
        `;
    }
}

function calculateInsulin() {
    const weight = parseFloat(document.getElementById('insulinWeight').value);
    const currentGlucose = parseFloat(document.getElementById('currentGlucose').value);
    const targetGlucose = parseFloat(document.getElementById('targetGlucose').value);
    const sensitivity = document.getElementById('insulinSensitivity').value;
    
    if (weight && currentGlucose && targetGlucose) {
        let sensitivityFactor = 2.0; // средняя по умолчанию
        if (sensitivity === 'high') sensitivityFactor = 2.5;
        else if (sensitivity === 'low') sensitivityFactor = 1.5;
        
        const glucoseDifference = currentGlucose - targetGlucose;
        const insulinDose = glucoseDifference / sensitivityFactor;
        
        let recommendation = '';
        if (insulinDose > 0) {
            recommendation = `Рекомендуемая доза инсулина: ${insulinDose.toFixed(1)} ЕД`;
        } else {
            recommendation = 'Коррекция не требуется';
        }
        
        document.getElementById('insulinResult').innerHTML = `
            <h3>Результат:</h3>
            <p><strong>Разница гликемии:</strong> ${glucoseDifference.toFixed(1)} ммоль/л</p>
            <p><strong>Чувствительность:</strong> ${sensitivityFactor} ммоль/л на 1 ЕД</p>
            <p><strong>${recommendation}</strong></p>
        `;
    }
}

function calculateLevo() {
    const weight = parseFloat(document.getElementById('levoWeight').value);
    const ageGroup = document.getElementById('ageGroup').value;
    const cardiacHistory = document.getElementById('cardiacHistory').value;
    
    if (weight) {
        let baseDose = weight * 1.6; // мкг/кг/сут
        
        // Коррекция по возрасту
        if (ageGroup === 'elderly') {
            baseDose *= 0.8; // снижение дозы на 20%
        }
        
        // Коррекция при сердечно-сосудистых заболеваниях
        if (cardiacHistory === 'yes') {
            baseDose *= 0.7; // снижение дозы на 30%
        }
        
        const roundedDose = Math.round(baseDose / 25) * 25; // округление до ближайших 25 мкг
        
        document.getElementById('levoResult').innerHTML = `
            <h3>Результат:</h3>
            <p><strong>Расчетная доза:</strong> ${baseDose.toFixed(0)} мкг/сут</p>
            <p><strong>Рекомендуемая доза:</strong> ${roundedDose} мкг/сут</p>
            <p><em>Начинайте с 25-50 мкг/сут и титруйте по ТТГ</em></p>
        `;
    }
}

function calculateFRAX() {
    const age = parseInt(document.getElementById('fraxAge').value);
    const gender = document.getElementById('fraxGender').value;
    const weight = parseFloat(document.getElementById('fraxWeight').value);
    const height = parseFloat(document.getElementById('fraxHeight').value);
    const previousFracture = document.getElementById('fraxPreviousFracture').value;
    const parentFracture = document.getElementById('fraxParentFracture').value;
    const smoking = document.getElementById('fraxSmoking').value;
    const glucocorticoids = document.getElementById('fraxGlucocorticoids').value;
    const rheumatoidArthritis = document.getElementById('fraxRheumatoidArthritis').value;
    const secondaryOsteoporosis = document.getElementById('fraxSecondaryOsteoporosis').value;
    const alcohol = document.getElementById('fraxAlcohol').value;
    
    if (age && weight && height) {
        // Упрощенная модель FRAX
        let riskScore = 0;
        
        // Базовый риск по возрасту и полу
        if (gender === 'female') {
            if (age >= 80) riskScore += 15;
            else if (age >= 70) riskScore += 12;
            else if (age >= 60) riskScore += 8;
            else if (age >= 50) riskScore += 5;
        } else {
            if (age >= 80) riskScore += 8;
            else if (age >= 70) riskScore += 6;
            else if (age >= 60) riskScore += 4;
            else if (age >= 50) riskScore += 2;
        }
        
        // Факторы риска
        if (previousFracture === 'yes') riskScore += 8;
        if (parentFracture === 'yes') riskScore += 3;
        if (smoking === 'yes') riskScore += 2;
        if (glucocorticoids === 'yes') riskScore += 4;
        if (rheumatoidArthritis === 'yes') riskScore += 2;
        if (secondaryOsteoporosis === 'yes') riskScore += 3;
        if (alcohol === 'yes') riskScore += 2;
        
        // Низкий ИМТ
        const bmi = weight / Math.pow(height / 100, 2);
        if (bmi < 19) riskScore += 3;
        else if (bmi < 22) riskScore += 1;
        
        // Расчет рисков
        const majorFractureRisk = Math.min(riskScore * 0.8, 30);
        const hipFractureRisk = Math.min(riskScore * 0.4, 15);
        
        let riskLevel = '';
        let recommendation = '';
        
        if (majorFractureRisk >= 20) {
            riskLevel = 'Высокий';
            recommendation = 'Рекомендуется лечение остеопороза';
        } else if (majorFractureRisk >= 10) {
            riskLevel = 'Умеренный';
            recommendation = 'Рассмотреть DXA и лечение при T-score ≤ -2.5';
        } else {
            riskLevel = 'Низкий';
            recommendation = 'Профилактика: кальций, витамин D, физическая активность';
        }
        
        document.getElementById('fraxResult').innerHTML = `
            <h3>Результат FRAX:</h3>
            <p><strong>10-летний риск основных переломов:</strong> ${majorFractureRisk.toFixed(1)}%</p>
            <p><strong>10-летний риск перелома бедра:</strong> ${hipFractureRisk.toFixed(1)}%</p>
            <p><strong>Уровень риска:</strong> ${riskLevel}</p>
            <p><strong>Рекомендация:</strong> ${recommendation}</p>
            <p><em>Примечание: Это упрощенная оценка. Для точной диагностики используйте официальный калькулятор FRAX.</em></p>
        `;
    }
}

// Drug information function
function openDrugInfo(drugName) {
    const drugInfo = {
        metformin: {
            title: 'Метформин',
            content: `
                <h2>Метформин</h2>
                <h3>Фармакологическая группа</h3>
                <p>Бигуаниды</p>
                
                <h3>Механизм действия</h3>
                <ul>
                    <li>Снижает продукцию глюкозы печенью</li>
                    <li>Увеличивает чувствительность тканей к инсулину</li>
                    <li>Снижает всасывание глюкозы в кишечнике</li>
                </ul>
                
                <h3>Показания</h3>
                <ul>
                    <li>Сахарный диабет 2 типа</li>
                    <li>Метаболический синдром</li>
                    <li>Синдром поликистозных яичников</li>
                </ul>
                
                <h3>Дозировка</h3>
                <ul>
                    <li><strong>Начальная доза:</strong> 500 мг 1-2 раза в день</li>
                    <li><strong>Максимальная доза:</strong> 2550 мг/сут</li>
                    <li><strong>Прием:</strong> Во время еды</li>
                </ul>
                
                <h3>Противопоказания</h3>
                <ul>
                    <li>Почечная недостаточность (СКФ < 30 мл/мин)</li>
                    <li>Метаболический ацидоз</li>
                    <li>Тяжелые инфекции</li>
                    <li>Обезвоживание</li>
                </ul>
                
                <h3>Побочные эффекты</h3>
                <ul>
                    <li>Желудочно-кишечные расстройства</li>
                    <li>Металлический привкус во рту</li>
                    <li>Витамин B12 дефицит (при длительном приеме)</li>
                </ul>
            `
        },
        insulin: {
            title: 'Инсулин',
            content: `
                <h2>Инсулин</h2>
                <h3>Фармакологическая группа</h3>
                <p>Гормон поджелудочной железы</p>
                
                <h3>Типы инсулина</h3>
                <ul>
                    <li><strong>Ультракороткий:</strong> Аспарт, Лизпро, Глулизин</li>
                    <li><strong>Короткий:</strong> Регуляр инсулин</li>
                    <li><strong>Средний:</strong> НПХ инсулин</li>
                    <li><strong>Длительный:</strong> Гларгин, Детемир, Деглудек</li>
                </ul>
                
                <h3>Показания</h3>
                <ul>
                    <li>Сахарный диабет 1 типа</li>
                    <li>СД 2 типа при неэффективности таблетированных препаратов</li>
                    <li>Гестационный диабет</li>
                </ul>
                
                <h3>Дозировка</h3>
                <ul>
                    <li><strong>Базальная доза:</strong> 0.5-1.0 ЕД/кг/сут</li>
                    <li><strong>Болюсная доза:</strong> 0.1-0.15 ЕД/кг на прием пищи</li>
                    <li><strong>Введение:</strong> Подкожно</li>
                </ul>
                
                <h3>Осложнения</h3>
                <ul>
                    <li>Гипогликемия</li>
                    <li>Липодистрофия</li>
                    <li>Аллергические реакции</li>
                    <li>Прибавка массы тела</li>
                </ul>
            `
        },
        levothyroxine: {
            title: 'L-Тироксин',
            content: `
                <h2>L-Тироксин (Левотироксин)</h2>
                <h3>Фармакологическая группа</h3>
                <p>Гормон щитовидной железы</p>
                
                <h3>Механизм действия</h3>
                <ul>
                    <li>Заместительная терапия при гипотиреозе</li>
                    <li>Стимулирует обмен веществ</li>
                    <li>Нормализует функцию сердечно-сосудистой системы</li>
                </ul>
                
                <h3>Показания</h3>
                <ul>
                    <li>Гипотиреоз любой этиологии</li>
                    <li>Профилактика рецидива после тиреоидэктомии</li>
                    <li>Супрессивная терапия при раке щитовидной железы</li>
                </ul>
                
                <h3>Дозировка</h3>
                <ul>
                    <li><strong>Начальная доза:</strong> 25-50 мкг/сут</li>
                    <li><strong>Поддерживающая доза:</strong> 1.6-1.8 мкг/кг/сут</li>
                    <li><strong>Прием:</strong> Утром натощак за 30 мин до еды</li>
                </ul>
                
                <h3>Мониторинг</h3>
                <ul>
                    <li>ТТГ каждые 6-12 недель</li>
                    <li>Т4 свободный</li>
                    <li>Клинические симптомы</li>
                </ul>
                
                <h3>Взаимодействия</h3>
                <ul>
                    <li>Кальций, железо (прием через 4 часа)</li>
                    <li>Ингибиторы протонной помпы</li>
                    <li>Эстрогены</li>
                </ul>
            `
        },
        hydrocortisone: {
            title: 'Гидрокортизон',
            content: `
                <h2>Гидрокортизон (Кортизол)</h2>
                <h3>Фармакологическая группа</h3>
                <p>Глюкокортикоиды</p>
                
                <h3>Механизм действия</h3>
                <ul>
                    <li>Заместительная терапия при недостаточности коры надпочечников</li>
                    <li>Противовоспалительное действие</li>
                    <li>Иммуносупрессивное действие</li>
                </ul>
                
                <h3>Показания</h3>
                <ul>
                    <li>Болезнь Аддисона</li>
                    <li>Вторичная надпочечниковая недостаточность</li>
                    <li>Врожденная гиперплазия коры надпочечников</li>
                </ul>
                
                <h3>Дозировка</h3>
                <ul>
                    <li><strong>Заместительная терапия:</strong> 15-25 мг/сут</li>
                    <li><strong>Режим приема:</strong> 2/3 утром, 1/3 вечером</li>
                    <li><strong>Стрессовые ситуации:</strong> Увеличение дозы в 2-3 раза</li>
                </ul>
                
                <h3>Мониторинг</h3>
                <ul>
                    <li>Клинические симптомы</li>
                    <li>АКТГ (при болезни Аддисона)</li>
                    <li>Электролиты</li>
                </ul>
                
                <h3>Осложнения</h3>
                <ul>
                    <li>Остеопороз</li>
                    <li>Артериальная гипертензия</li>
                    <li>Сахарный диабет</li>
                    <li>Катаракта</li>
                </ul>
            `
        },
        alendronate: {
            title: 'Алендронат',
            content: `
                <h2>Алендронат (Фосамакс)</h2>
                <h3>Фармакологическая группа</h3>
                <p>Бисфосфонаты (азотсодержащие)</p>
                
                <h3>Механизм действия</h3>
                <ul>
                    <li>Ингибирует активность остеокластов</li>
                    <li>Снижает костную резорбцию</li>
                    <li>Увеличивает минеральную плотность кости</li>
                </ul>
                
                <h3>Показания</h3>
                <ul>
                    <li>Постменопаузальный остеопороз</li>
                    <li>Остеопороз у мужчин</li>
                    <li>Глюкокортикоидный остеопороз</li>
                    <li>Болезнь Педжета</li>
                </ul>
                
                <h3>Дозировка</h3>
                <ul>
                    <li><strong>Остеопороз:</strong> 70 мг 1 раз в неделю</li>
                    <li><strong>Болезнь Педжета:</strong> 40 мг/сут в течение 6 месяцев</li>
                    <li><strong>Прием:</strong> Утром натощак за 30 мин до еды</li>
                </ul>
                
                <h3>Противопоказания</h3>
                <ul>
                    <li>Гипокальциемия</li>
                    <li>Нарушения пищевода</li>
                    <li>Неспособность стоять или сидеть 30 минут</li>
                    <li>Беременность и лактация</li>
                </ul>
                
                <h3>Побочные эффекты</h3>
                <ul>
                    <li>Желудочно-кишечные расстройства</li>
                    <li>Гипокальциемия</li>
                    <li>Остеонекроз челюсти (редко)</li>
                    <li>Атипичные переломы бедра</li>
                </ul>
                
                <h3>Мониторинг</h3>
                <ul>
                    <li>Кальций, фосфор, креатинин</li>
                    <li>DXA каждые 1-2 года</li>
                    <li>Маркеры костного обмена</li>
                </ul>
            `
        },
        denosumab: {
            title: 'Деносумаб',
            content: `
                <h2>Деносумаб (Пролиа)</h2>
                <h3>Фармакологическая группа</h3>
                <p>Моноклональное антитело к RANKL</p>
                
                <h3>Механизм действия</h3>
                <ul>
                    <li>Связывается с RANKL</li>
                    <li>Ингибирует образование и активность остеокластов</li>
                    <li>Снижает костную резорбцию</li>
                </ul>
                
                <h3>Показания</h3>
                <ul>
                    <li>Постменопаузальный остеопороз</li>
                    <li>Остеопороз у мужчин</li>
                    <li>Глюкокортикоидный остеопороз</li>
                    <li>Потеря костной массы при раке</li>
                </ul>
                
                <h3>Дозировка</h3>
                <ul>
                    <li><strong>Остеопороз:</strong> 60 мг подкожно каждые 6 месяцев</li>
                    <li><strong>Введение:</strong> Подкожно в живот, бедро или плечо</li>
                    <li><strong>Длительность:</strong> Неопределенно</li>
                </ul>
                
                <h3>Противопоказания</h3>
                <ul>
                    <li>Гипокальциемия</li>
                    <li>Беременность</li>
                    <li>Тяжелая почечная недостаточность</li>
                </ul>
                
                <h3>Побочные эффекты</h3>
                <ul>
                    <li>Гипокальциемия</li>
                    <li>Инфекции (включая остеомиелит)</li>
                    <li>Остеонекроз челюсти</li>
                    <li>Атипичные переломы бедра</li>
                    <li>Реакции в месте инъекции</li>
                </ul>
                
                <h3>Мониторинг</h3>
                <ul>
                    <li>Кальций каждые 2 недели в первые 2 месяца</li>
                    <li>DXA каждые 1-2 года</li>
                    <li>Стоматологический осмотр перед началом</li>
                </ul>
            `
        }
    };
    
    const drug = drugInfo[drugName];
    if (drug) {
        modalContent.innerHTML = drug.content;
        openModal(guidelineModal);
    }
}

// Add CSS for calculator forms
const calculatorStyles = `
    <style>
        .calculator-form {
            max-width: 500px;
            margin: 0 auto;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }
        
        .form-group input,
        .form-group select {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .calc-submit-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-bottom: 1rem;
        }
        
        .calc-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
        
        .calc-result {
            background: #f8fafc;
            padding: 1.5rem;
            border-radius: 10px;
            border-left: 4px solid #667eea;
            margin-top: 1rem;
        }
        
        .calc-result h3 {
            color: #333;
            margin-bottom: 1rem;
        }
        
        .calc-result p {
            margin-bottom: 0.5rem;
            color: #666;
        }
        
        .calc-result strong {
            color: #333;
        }
        
        .calc-result em {
            color: #667eea;
            font-style: italic;
        }
    </style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', calculatorStyles);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.guideline-card, .calc-card, .drug-card, .news-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}); 