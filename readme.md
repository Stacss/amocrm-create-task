# Тестовое задание

## Вводные данные:
Вам необходимо написать js-скрипт, который работает с API системы amoCRM. Скрипт должен для всех контактов без сделок создать новую задачу с текстом “Контакт без сделок”.

## Результат
Работает в консоле авторизованного пользователя amoCRM. Скрипт создает задачу в которую записывается название контакта и имя для каждого контакта у которого нет сделки. Так же можно добавить любую информацию о контакте в задачу содержащуюся в параметрах ответа контактов, например телефон и т.д. (см. инструкцию контаков)
## Внимание
- для корректной отправки запроса в "задачи" необходимо массив с телом запроса пропускать через функцию JSON.stringify()
- в заголовке POST запроса указать contentType : 'application/json';
- Инструкция по рпботе с API amoCRM "контакты" https://www.amocrm.ru/developers/content/crm_platform/contacts-api#with-88398e14-be90-44b7-91e0-6371e268833b-params
- Инструкция по рпботе с API amoCRM "задачи" https://www.amocrm.ru/developers/content/crm_platform/tasks-api#tasks-add
