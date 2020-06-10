
const baseUrl = `http://localhost:3000`
let currentTodoId

$( document ).ready(()=> {
    authentication()
})

const authentication = () => {
    if(localStorage.access_token) {
        $('.section-login').hide()
        $('.section-register').hide()
        $('.section-list-todo').show()
        $('.section-edit-todo').hide()
        $('.section-add-todo').hide()
        $('.header').show()
        fetchTodos()   
    } else {
        $('.section-login').show()
        $('.section-register').hide()
        $('.section-list-todo').hide()
        $('.section-edit-todo').hide()
        $('.section-add-todo').hide()
        $('.header').hide()
    }
}

const login = (event) => {
    event.preventDefault()
    const email = $('#email_login').val()
    const password = $('#password_login').val()
    
    $.ajax({
        method: "post",
        url: `${baseUrl}/users/login`,
        data: {email, password}
    })
        .done(data => {
            localStorage.setItem('access_token', data.access_token)
            authentication()
        })
        .fail(err => {
            console.log(err.responseJSON)
        })
}

const logout = () => {
    localStorage.clear()
    authentication()
}

const register = (event) => {
    event.preventDefault()
    const email = $('#email_register').val()
    const password = $('#password_register').val()
    const confirm_password = $('#confirm_password_register').val()

    if (password == confirm_password) {
        $.ajax({
            method: 'post',
            url: `${baseUrl}/users/register`,
            data: { email, password }
        })
            .done(data => {
                loginPage()
                authentication()

            })
            .fail(err => {
                console.log(err.responseJSON)
            })

    } else {
        $('#password_register').val('')
        $('#confirm_password_register').val('')
        
    }
}


const fetchTodos = () => {
    $.ajax({
        method: "get",
        url: `${baseUrl}/todos/list`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done((data) => {
            $('#table-body').empty()
            data.data.forEach((el,i) => {
                $('#table-body').append(`
                <tr>
                    <th scope="row">${i+1}</th>
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td>
                        <a onclick="editPage(${el.id})" class="btn btn-success text-white">Edit</a>
                        <a onclick="destroy(${el.id})" class="btn btn-danger text-white">Delete</a>
                    </td>
                </tr>
              `)
            })
        })
        .fail(err => {
            console.log(err.responseJSON)
        })
        .always( () => {
            $('#email_login').val('')
            $('#password_login').val('')
        })
}

const editTodo = (event) => {
    event.preventDefault()
    const title = $('#title_edit').val()
    const description = $('#description_edit').val()
    const due_date = $('#due_date_edit').val()
    const status = $("input[name='status_edit']:checked").val()

    $.ajax({
        method: "put",
        url: `${baseUrl}/todos/edit/${currentTodoId}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title, description, due_date, status
        }
    })
        .done(() => {
            authentication()
        })
        .fail(err => {
            console.log(err.responseJSON)
        })
}

const destroy = (id) => {
    $.ajax({
        method: 'delete',
        url: `${baseUrl}/todos/delete/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(data => {
            authentication()
        })
        .fail(err => {
            console.log(err.responseJSON)
        })
}


const addTodo = (event) => {
    event.preventDefault()
    const title = $('#title').val()
    const description = $('#description').val()
    const due_date = $('#due_date').val()
    const status = $("input[name='status']:checked").val()

    $.ajax({
        method: 'post',
        url: `${baseUrl}/todos/add`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title, description, due_date, status
        }
    })
        .done(data => {
            authentication()
        })
        .fail(err => {
            console.log(err.responseJSON)
        })
}

const addTodoPage = () => {
    $('.section-login').hide()
    $('.section-register').hide()
    $('.section-list-todo').hide()
    $('.section-edit-todo').hide()
    $('.section-add-todo').show()
    $('.header').show()
}

const registerPage = () => {
    $('.section-login').hide()
    $('.section-register').show()
    $('.section-list-todo').hide()
    $('.section-edit-todo').hide()
    $('.section-add-todo').hide()
    $('.header').hide()
}

const loginPage = () => {
    $('.section-login').show()
    $('.section-register').hide()
    $('.section-list-todo').hide()
    $('.section-edit-todo').hide()
    $('.section-add-todo').hide()
    $('.header').hide()
}

const editPage = (id) => {
    currentTodoId = id
    $.ajax({
        method: 'get',
        url: `${baseUrl}/todos/edit/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(data => {
            $(`input[id='status_${data.data.status}']`).prop("checked", true)
            $('#title_edit').val(data.data.title)
            $('#description_edit').val(data.data.description)

            const formatedDate = `${new Date(data.data.due_date).getFullYear()}-${new Date(data.data.due_date).getMonth() +1 < 10 ? '0'+(new Date(data.data.due_date).getMonth()+1) : new Date(data.data.due_date).getMonth()+1}-${new Date(data.data.due_date).getDate() < 10 ? '0'+new Date(data.data.due_date).getDate() : new Date(data.data.due_date).getDate()}`
            
            $('#due_date_edit').val(formatedDate)    
        })
        .fail(err => {
            console.log(err.responseJSON)
        })

    $('.section-login').hide()
    $('.section-register').hide()
    $('.section-list-todo').hide()
    $('.section-add-todo').hide()
    $('.section-edit-todo').show()
    $('.header').hide()
}

