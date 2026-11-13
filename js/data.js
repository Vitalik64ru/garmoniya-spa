// Список услуг (клиентская база данных)
const DEFAULT_SERVICES = [
    { id: 1, title: 'Спа-программа «Детокс & Перезагрузка»', category: 'Спа-программы', description: 'Комплексная программа очищения: пилинг, обёртывание, массаж, травяной чай.', duration: 120, price: 4500, image: 'spa1.jpg' },
    { id: 2, title: 'Шоколадное удовольствие', category: 'Спа-программы', description: 'Расслабляющая программа с шоколадным скрабом и обёртыванием.', duration: 90, price: 3800, image: 'spa2.jpeg' },
    { id: 3, title: 'Тайский массаж', category: 'Массажи', description: 'Традиционный тайский массаж с элементами растяжки и акупрессуры.', duration: 90, price: 3200, image: 'massage1.jpeg' },
    { id: 4, title: 'Балийский массаж', category: 'Массажи', description: 'Глубокий расслабляющий массаж с ароматическими маслами.', duration: 60, price: 2800, image: 'massage2.jpeg' },
    { id: 5, title: 'Антицеллюлитный массаж', category: 'Массажи', description: 'Интенсивный массаж проблемных зон.', duration: 60, price: 2500, image: 'massage3.jpeg' },
    { id: 6, title: 'Стоун-терапия', category: 'Массажи', description: 'Массаж горячими вулканическими камнями.', duration: 75, price: 3500, image: 'massage4.jpeg' },
    { id: 7, title: 'Пилинг лица', category: 'Эстетика лица и тела', description: 'Глубокое очищение кожи профессиональной косметикой.', duration: 45, price: 2200, image: 'face1.jpeg' },
    { id: 8, title: 'Гидромассаж', category: 'Эстетика лица и тела', description: 'Водный массаж в ванне с гидромассажными форсунками.', duration: 40, price: 1800, image: 'body1.jpeg' },
    { id: 9, title: 'Программа омоложения', category: 'Эстетика лица и тела', description: 'Комплекс процедур для упругости кожи.', duration: 90, price: 5500, image: 'face2.jpeg' },
    { id: 10, title: 'Хаммам', category: 'Банный комплекс', description: 'Турецкая парная с мраморным лежаком.', duration: 60, price: 2000, image: 'bath1.jpeg' },
    { id: 11, title: 'Кедровая бочка', category: 'Банный комплекс', description: 'Фитотерапевтическая процедура в кедровой бочке.', duration: 30, price: 1500, image: 'bath2.jpeg' },
    { id: 12, title: 'Фито-сауна', category: 'Банный комплекс', description: 'Сауна с травяными настоями и ароматерапией.', duration: 45, price: 1800, image: 'bath3.jpeg' }
];

// Инициализация хранилища браузера при первом открытии сайта
if (!localStorage.getItem('services')) {
    localStorage.setItem('services', JSON.stringify(DEFAULT_SERVICES));
}
if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify([]));
}
if (!localStorage.getItem('feedback')) {
    localStorage.setItem('feedback', JSON.stringify([]));
}

function getServices() {
    return JSON.parse(localStorage.getItem('services') || '[]');
}
function getBookings() {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
}
function saveBooking(booking) {
    const list = getBookings();
    list.push(booking);
    localStorage.setItem('bookings', JSON.stringify(list));
}
function saveFeedback(message) {
    const list = JSON.parse(localStorage.getItem('feedback') || '[]');
    list.push(message);
    localStorage.setItem('feedback', JSON.stringify(list));
}