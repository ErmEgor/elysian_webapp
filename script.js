document.addEventListener('DOMContentLoaded', function () {
    const tg = window.Telegram.WebApp;
    tg.expand(); // Расширяем Web App на весь экран для удобства
    tg.MainButton.hide(); // Скрываем основную кнопку, нам она не нужна

    const calendar = new VanillaCalendar('#calendar-container', {
        // Обработка событий
        actions: {
            // Эта функция вызывается при клике на день
            clickDay(e, dates) {
                if (dates[0]) {
                    const selectedDate = dates[0]; // Формат YYYY-MM-DD
                    // Отправляем выбранную дату боту
                    tg.sendData(selectedDate);
                    // Web App можно закрыть после выбора
                    tg.close();
                }
            },
        },
        // Настройки календаря
        settings: {
            lang: 'ru', // Язык
            selection: {
                day: 'single', // Можно выбрать только один день
            },
            visibility: {
                daysOutside: false, // Не показывать дни из других месяцев
                theme: tg.colorScheme, // 'light' или 'dark'
            },
            // Запрещаем выбирать даты в прошлом
            range: {
                min: new Date().toISOString().split('T')[0],
            }
        }
    });
    calendar.init();
});