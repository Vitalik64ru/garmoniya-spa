// ============================================
// Спа-салон «Гармония» — логика сайта
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ---------- Мобильное меню ----------
    const burger = document.getElementById('burger');
    const nav = document.getElementById('mainNav');
    if (burger && nav) {
        burger.addEventListener('click', () => nav.classList.toggle('open'));
    }

    // ---------- Популярные услуги на главной ----------
    const popular = document.getElementById('popularServices');
    if (popular) {
        const list = [...getServices()].sort(() => 0.5 - Math.random()).slice(0, 6);
        popular.innerHTML = list.map(s => cardHTML(s)).join('');
    }

    // ---------- Каталог услуг с фильтром ----------
    const grid = document.getElementById('servicesGrid');
    const filterBar = document.getElementById('filterBar');
    if (grid && filterBar) {
        const services = getServices();
        const cats = ['all', ...new Set(services.map(s => s.category))];

        filterBar.innerHTML = cats.map(c =>
            `<button class="filter-btn ${c === 'all' ? 'active' : ''}" data-filter="${c}">${c === 'all' ? 'Все услуги' : c}</button>`
        ).join('');

        const render = (f) => {
            const list = f === 'all' ? services : services.filter(s => s.category === f);
            grid.innerHTML = list.map(s => cardHTML(s)).join('');
        };

        filterBar.addEventListener('click', e => {
            if (!e.target.classList.contains('filter-btn')) return;
            filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            render(e.target.dataset.filter);
        });

        render('all');
    }

    // ---------- Карточка услуги ----------
    const detail = document.getElementById('detailContainer');
    if (detail) {
        const id = parseInt(new URLSearchParams(location.search).get('id'));
        const s = getServices().find(x => x.id === id);
        if (!s) {
            detail.innerHTML = '<p>Услуга не найдена. <a href="services.html">Вернуться в каталог</a></p>';
        } else {
            detail.innerHTML = `
                <div class="service-detail">
                    <img src="img/${s.image}" alt="${s.title}">
                    <div>
                        <p style="color:var(--accent); text-transform:uppercase; letter-spacing:1px; font-size:0.85rem;">${s.category}</p>
                        <h1>${s.title}</h1>
                        <p>${s.description}</p>
                        <ul>
                            <li>Длительность: ${s.duration} минут</li>
                            <li>Профессиональная косметика премиум-класса</li>
                            <li>Индивидуальный подбор программы</li>
                        </ul>
                        <div class="price">${s.price.toLocaleString('ru-RU')} ₽</div>
                        <a href="booking.html?service_id=${s.id}" class="btn btn-large">Записаться на процедуру</a>
                    </div>
                </div>`;
        }
    }

    // ---------- Выпадающий список услуг в форме записи ----------
    const serviceSelect = document.getElementById('serviceSelect');
    if (serviceSelect) {
        const preId = new URLSearchParams(location.search).get('service_id');
        serviceSelect.innerHTML = '<option value="">— Не выбрано —</option>' +
            getServices().map(s =>
                `<option value="${s.id}" ${preId == s.id ? 'selected' : ''}>${s.title} — ${s.price.toLocaleString('ru-RU')} ₽</option>`
            ).join('');
    }

    // ---------- Форма онлайн-записи ----------
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            bookingForm.querySelectorAll('[required]').forEach(f => {
                f.classList.remove('error');
                if (!f.value.trim()) { f.classList.add('error'); valid = false; }
            });

            const phone = bookingForm.querySelector('[name="phone"]');
            if (phone.value.trim() && !/^[\d\s\+\-\(\)]{10,}$/.test(phone.value.trim())) {
                phone.classList.add('error');
                valid = false;
            }

            const msgBox = document.getElementById('bookingMsg');

            if (!valid) {
                msgBox.innerHTML = '<div class="alert alert-error">Заполните все поля корректно.</div>';
                return;
            }

            const data = Object.fromEntries(new FormData(bookingForm));
            saveBooking({
                ...data,
                id: Date.now(),
                status: 'new',
                created: new Date().toISOString()
            });

            msgBox.innerHTML = '<div class="alert alert-success">Вы успешно записаны! Наш администратор свяжется с Вами.</div>';
            bookingForm.reset();
        });
    }

    // ---------- Форма обратной связи ----------
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            feedbackForm.querySelectorAll('[required]').forEach(f => {
                f.classList.remove('error');
                if (!f.value.trim()) { f.classList.add('error'); valid = false; }
            });

            const msgBox = document.getElementById('feedbackMsg');

            if (!valid) {
                msgBox.innerHTML = '<div class="alert alert-error">Заполните обязательные поля.</div>';
                return;
            }

            const data = Object.fromEntries(new FormData(feedbackForm));
            saveFeedback({
                ...data,
                id: Date.now(),
                created: new Date().toISOString()
            });

            msgBox.innerHTML = '<div class="alert alert-success">Спасибо! Ваше сообщение отправлено.</div>';
            feedbackForm.reset();
        });
    }

    // ---------- Автоскрытие уведомлений ----------
    setTimeout(() => {
        document.querySelectorAll('.alert').forEach(el => {
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = '0';
            setTimeout(() => el.remove(), 500);
        });
    }, 5000);
});

// ---------- Шаблон карточки услуги ----------
function cardHTML(s) {
    return `
        <div class="card">
            <img src="img/${s.image}" alt="${s.title}">
            <h3>${s.title}</h3>
            <p>${s.description.substring(0, 90)}...</p>
            <div class="price">${s.price.toLocaleString('ru-RU')} ₽</div>
            <a href="service-detail.html?id=${s.id}" class="btn">Подробнее</a>
        </div>`;
}