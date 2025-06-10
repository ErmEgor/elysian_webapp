// webapp/script.js

document.addEventListener('DOMContentLoaded', function () {
    try {
        const tg = window.Telegram.WebApp;
        tg.expand();
        tg.MainButton.hide();

        const calendar = new VanillaCalendar('#calendar-container', {
            actions: {
                clickDay(e, dates) {
                    // Убеждаемся, что dates существует и содержит хотя бы один элемент
                    if (dates && dates[0]) {
                        const selectedDate = dates[0]; // Формат YYYY-MM-DD
                        
                        // Проблемная строка УДАЛЕНА. Теперь код сразу перейдет к отправке данных.
                        
                        tg.sendData(selectedDate);
                        tg.close();
                    }
                },
            },
            settings: {
                lang: 'ru',
                selection: {
                    day: 'single',
                },
                visibility: {
                    daysOutside: false,
                    theme: tg.colorScheme,
                },
                range: {
                    min: new Date().toISOString().split('T')[0],
                }
            }
        });
        calendar.init();
    } catch (e) {
        document.body.innerHTML = `<div style="padding: 10px; color: red; font-family: monospace;">
            <h2>Ошибка при инициализации:</h2>
            <p>${e.name}: ${e.message}</p>
        </div>`;
    }
});