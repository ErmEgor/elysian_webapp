document.addEventListener('DOMContentLoaded', function () {
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.MainButton.hide();

    const calendar = new VanillaCalendar('#calendar-container', {
        actions: {
            clickDay(e, dates) {
                if (dates[0]) {
                    const selectedDate = dates[0]; // Формат YYYY-MM-DD
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
});