// webapp/script.js

document.addEventListener('DOMContentLoaded', () => {
  try {
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.MainButton.hide();

    // Инициализируем календарь. Обратите внимание, что блока 'actions' здесь больше нет.
    const calendar = new VanillaCalendar('#calendar-container', {
      settings: {
        lang: 'ru',
        selection: {
          day: 'single',
        },
        visibility: {
          daysOutside: false,
          theme: tg.colorScheme || 'light',
        },
        range: {
          min: new Date().toISOString().split('T')[0],
        },
      },
    });

    // ИЗМЕНЕНИЕ: Это новый, правильный способ отслеживать выбор даты.
    // Мы "подписываемся" на событие 'date:selected'.
    calendar.on('date:selected', (data) => {
      // Убеждаемся, что данные существуют и содержат хотя бы одну дату
      if (data && data.dates && data.dates[0]) {
        const selectedDate = data.dates[0]; // Формат YYYY-MM-DD
        
        // Отправляем данные и закрываем Web App
        tg.sendData(selectedDate);
        tg.close();
      }
    });

    // Запускаем календарь
    calendar.init();

  } catch (e) {
    // Вывод ошибки на страницу, если что-то пошло не так при инициализации
    document.body.innerHTML = `<div style="padding: 15px; color: #FF0000; font-family: monospace; background-color: #FFF0F0;">
        <h3 style="margin-top: 0;">Критическая ошибка в Web App:</h3>
        <p><b>Имя:</b> ${e.name}</p>
        <p><b>Сообщение:</b> ${e.message}</p>
    </div>`;
  }
});