/**
 * Cоздает новую задачу для каждого контакта у которого нет сделок
 *
 * @param {number} timeTask Время на выполнение задачи с момента создания в часах;
*/
function createTasksContactsWithoutLeads(timeTask) {

    timeTask = timeTask*3600;
    //Количество возвращаемых сущностей за один запрос (Максимум – 250)
    const limit = 25;
    //страница выборки
    let page = 1;
    //queryUrlContact - url обработки запросов amocrm для контактов
    const queryUrlContact = '/api/v4/contacts';
    //queryUrlTasks - url обработки запросов amocrm для задач
    const queryUrlTasks = '/api/v4/tasks';

    // запрос на получение контактов
    $.ajax({
        url: queryUrlContact,
        method: 'GET',
        data: {
            limit: limit,
            with: 'leads',
            page: page
        }
    }).done(function(data) {
        if (!!data) {

            let contactArray = [];

            //обход по объекту ответа
            for (value in data['_embedded']['contacts']){

                //если в контакте нет сделок (leads), записываем в массив эти контакты, формируем тело задачи с Названием контакта и Именем контакта
                if (data['_embedded']['contacts'][value]['_embedded']['leads'].length === 0){
                    contactArray.push(
                        {
                            "text": "Контакт без сделок. " + data['_embedded']['contacts'][value]['name'] + ". Имя: " + data['_embedded']['contacts'][value]['first_name'],
                            "complete_till": Math.round(Date.now()/1000) + timeTask,
                        }
                    )
                }
            }
            // запрос на создание задач
            $.ajax({
                url: queryUrlTasks,
                method: 'POST',
                contentType : 'application/json',
                data: JSON.stringify(contactArray)
            }).done(function(data) {
                if (!!data) {
                    console.log(data);
                }
            }).fail(function(data) {
                console.log('Ошибка запроса');
                console.log(data);
                return false;
            })

        } else {
            console.log('Контактов со сделками нет');
            return false;
        }
    }).fail(function(data) {
        console.log('Что-то пошло не так c получением контактов');
        console.log(data);
        return false;
    })

    page++;
}
console.log(createTasksContactsWithoutLeads(24));

