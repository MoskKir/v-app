// Получение всех пользователей
function GetUsers() {
    $.ajax({
        url: "/api/users",
        type: "GET",
        contentType: "application/json",
        success: function (users) {
            var rows = "";
            $.each(users, function (index, user) {
                // добавляем полученные элементы в таблицу
                rows += row(user);
            })
            $("table tbody").append(rows);
         }
    });
}
// Получение одного пользователя
function GetUser(id) {
    $.ajax({
        url: "/api/users/"+id,
        type: "GET",
        contentType: "application/json",
        success: function (user) {
            var form = document.forms["userForm"];
            form.elements["id"].value = user._id;
            form.elements["name"].value = user.name;
            form.elements["age"].value = user.age;
        }
    });
}
// Auth 
function AuthUser(userName, userPassword) {
    $.ajax({
        url: "login",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            name: userName,
            password: userPassword
        }),
        success: function (user) {
            resetAuthForm();
            console.log('Успешная аунтефикация')
            // $("table tbody").append(row(user));
        }
    })
}
// Добавление пользователя
function CreateUser(userName, userAge, userPassword) {
    $.ajax({
        url: "api/users",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            name: userName,
            age: userAge,
            password: userPassword
        }),
        success: function (user) {
            reset();
            $("table tbody").append(row(user));
        }
    })
}
// Изменение пользователя
function EditUser(userId, userName, userAge) {
    $.ajax({
        url: "api/users",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: userId,
            name: userName,
            age: userAge
        }),
        success: function (user) {
            reset();
            $("tr[data-rowid='" + user.id + "']").replaceWith(row(user));
        }
    })
}

// сброс формы
function reset() {
    var form = document.forms["userForm"];
    form.reset();
    form.elements["id"].value = 0;
}
function resetAuthForm() {
    console.log('Reset authForm')
    var form = document.forms["userAuth"];
    form.reset();
    form.elements["id"].value = 0;
}

// Удаление пользователя
function DeleteUser(id) {
    $.ajax({
        url: "api/users/"+id,
        contentType: "application/json",
        method: "DELETE",
        success: function (user) {
            $("tr[data-rowid='" + user._id + "']").remove();
        }
    })
}
// создание строки для таблицы
var row = function (user) {
    return "<tr data-rowid='" + user._id + "'><td>" + user._id + "</td>" +
           "<td>" + user.name + "</td> <td>" + user.age + "</td>" +
           "<td><a class='editLink' data-id='" + user._id + "'>Изменить</a> | " +
            "<a class='removeLink' data-id='" + user._id + "'>Удалить</a></td></tr>";
}
// сброс значений формы
$("#reset").click(function (e) {
    e.preventDefault();
    reset();
})

// отправка формы
$("#editUserForm").submit(function (e) {
    e.preventDefault();
    var id = this.elements["id"].value;
    var name = this.elements["name"].value;
    var age = this.elements["age"].value;
    var password = this.elements["psw"].value;
    if (id == 0)
        CreateUser(name, age, password);
    else
        EditUser(id, name, age);
});
// Авторизация 
$("#userAuth").submit(function (e) {
    e.preventDefault();
    console.log('userauth send');
    var name = this.elements["name"].value;
    var password = this.elements["psw"].value;
    console.log(name, password)
    AuthUser(name, password)
});

// нажимаем на ссылку Изменить
$("body").on("click", ".editLink", function () {
    var id = $(this).data("id");
    GetUser(id);
})
// нажимаем на ссылку Удалить
$("body").on("click", ".removeLink", function () {
    var id = $(this).data("id");
    DeleteUser(id);
})

// загрузка пользователей
GetUsers();