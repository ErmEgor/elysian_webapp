// webapp/script.js

document.addEventListener('DOMContentLoaded', () => {
  try {
    const tg = window.Telegram.WebApp;
    // Если мы не в Telegram, создаем заглушку, чтобы скрипт не падал в браузере
    if (!tg || !tg.sendData) {
        window.Telegram = { WebApp: { 
            expand: () => console.log('WebApp.expand()'),
            MainButton: { hide: () => console.log('MainButton.hide()') },
            sendData: (data) => console.log(`WebApp.sendData: ${data}`),
            close: () => console.log('WebApp.close()'),
            colorScheme: 'light'
        }};
        tg = window.Telegram.WebApp;
    }

    tg.expand();
    tg.MainButton.hide();

    // ВОЗВРАЩАЕМСЯ К ПРАВИЛЬНОЙ СТРУКТУРЕ
    const calendar = new VanillaCalendar('#calendar-container', {
      // ВАЖНО: Обработчики событий передаются здесь, внутри объекта actions
      actions: {
        // clickDay - это правильный обработчик для этой библиотеки
        clickDay: (e, dates) => {
          // Убеждаемся, что dates - это массив и в нем есть хотя бы одна дата
          if (dates && dates.length > 0) {
            const selectedDate = dates[0]; // Формат YYYY-MM-DD
            
            // Отправляем данные и закрываем Web App
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
        },
      },
    });

    // Запускаем календарь
    calendar.init();

  } catch (e) {
    // Вывод ошибки на страницу
    document.body.innerHTML = `<div style="padding: 15px; color: #FF0000; font-family: monospace; background-color: #FFF0F0;">
        <h3 style="margin-top: 0;">Критическая ошибка в Web App:</h3>
        <p><b>Имя:</b> ${e.name}</p>
        <p><b>Сообщение:</b> ${e.message}</p>
    </div>`;
  }
});