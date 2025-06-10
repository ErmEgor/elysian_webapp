// webapp/script.js

document.addEventListener('DOMContentLoaded', function () {
    try {
        const tg = window.Telegram.WebApp;
        tg.expand();
        tg.MainButton.hide();

        const calendar = new VanillaCalendar('#calendar-container', {
            actions: {
                clickDay(e, dates) {
                    if (dates && dates[0]) {
                        const selectedDate = dates[0]; // Формат YYYY-MM-DD

                        // --- ДОБАВЛЕНА ПРОВЕРКА ---
                        // Это всплывающее окно появится, только если
                        // скрипт успешно определил клик и получил дату.
                        tg.showAlert(`Готовлюсь отправить дату: ${selectedDate}`);

                        tg.sendData(selectedDate);
                        tg.close();
                    } else {
                        tg.showAlert("Не удалось получить дату после клика.");
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
        // Вывод ошибки прямо на страницу, если что-то пошло не так при инициализации
        document.body.innerHTML = `<div style="padding: 10px; color: red; font-family: monospace;">
            <h2>Ошибка при инициализации:</h2>
            <p>${e.name}: ${e.message}</p>
        </div>`;
    }
});