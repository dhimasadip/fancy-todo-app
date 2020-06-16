// const { fail } = require("assert")

const baseUrl = `http://localhost:3000`
let currentTodoId

$( document ).ready(()=> {
    authentication()
})

const authentication = () => {
    if(localStorage.access_token) {
        $('.section-login').hide()
        $('.section-register').hide()
        $('.section-list-todo').slideDown(1500)
        $('.section-edit-todo').hide()
        $('.section-add-todo').hide()
        $('.header').show(1500)
        fetchTodos()   
    } else {
        $('.section-login').fadeIn(2000)
        $('.section-register').hide()
        $('.section-list-todo').fadeOut(1200)
        $('.section-edit-todo').hide()
        $('.section-add-todo').hide()
        $('.header').hide("slow")
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
            $('#email_login').val('')
            $('#password_login').val('')
            $('#email_register').val('')
            $('#password_register').val('')
            $('#confirm_password_register').val('')

            $('#user-email').empty()
            $('#user-email').append(`<h6 class="font-weight-light">${email}</h6>`)
            localStorage.setItem('access_token', data.access_token)
            authentication()
        })
        .fail(err => {
            $('.alert-login').empty()
            $('.alert-login').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>ERR ${err.responseJSON.err_code}!</strong> ${err.responseJSON.err_msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        })
}

const logout = () => {
    localStorage.clear()
    authentication()
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
        console.log('User signed out.') 
    })
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
            .done(() => {
                loginPage()
                authentication()
                $('.alert-login').empty()
                $('.alert-login').append(`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Successfully created new account
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `)

                $('#email_login').val('')
                $('#password_login').val('')
                $('#email_register').val('')
                $('#password_register').val('')
                $('#confirm_password_register').val('') 

            })
            .fail(err => {
                $('.alert-register').empty()
                $('.alert-register').append(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>ERR ${err.responseJSON.err_code}!</strong> ${err.responseJSON.err_msg}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `)
            })

    } else {
        $('.alert-register').empty()
        $('.alert-register').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Password doesn't match
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `)
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
        .done(({data}) => {

            const pict_1 = './resources/img/todo-ex-min.jpg'
            const pict_2 = './resources/img/note-book-min.jpg'
            const pict_3 = './resources/img/notebook-today-min.jpg'
            const pict_4 = './resources/img/potrait-book-min.jpg'

            
            $('.heading').empty()
            if (data.length == 0) {
                $('.heading').append(`<h3 class="text-secondary text-center" style="word-spacing: 5px; letter-spacing: 2px;">You don't have any todo</h3>`)
            } else {
                $('.heading').append(`<h1 class="text-secondary text-center" style="word-spacing: 20px; letter-spacing: 3px;">LIST TODO</h1>`)
            }

            $('#content').empty()
            data.forEach(el => {
                const dice = Math.round(Math.random()*3)

                $('#content').append(`
                <div class="col mb-4">
                    <div class="card shadow rounded">
                        <img src="${ dice == 0 ? pict_1 : dice == 1 ? pict_2 : dice == 2 ? pict_3 : pict_4}" class="card-img-top" alt="todo">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">${el.title}</h5>
                                <h6 class="card-title border border-info p-1 rounded text-info">${el.status == 'done' ? 'Done' : el.status == 'waiting' ? 'Waiting' : 'On Process'}</h6>
                                <h6 class="card-title">${new Date(el.due_date).toDateString().replace(/ /, ', ')}</h6>
                            </div>
                            <p class="card-text text-secondary">${el.description}</p>
                            <div class="d-flex justify-content-around">
                                <a onclick="editPage(${el.id})" class="btn btn-info text-white">Edit</a>
                                <button onclick="notify(${el.id})" type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                                    Notify me!
                                </button>
                                <button onclick="destroyModal(${el.id})" type="button" class="btn btn-danger" data-toggle="modal" data-target="#confirmation-modal">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                `)
            })

        })
        .fail(err => {
            $('.alert-list').empty()
            $('.alert-list').append(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ERR ${err.responseJSON.err_code}!</strong> ${err.responseJSON.err_msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
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
            $('.alert-edit').empty()
            $('.alert-edit').append(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ERR ${err.responseJSON.err_code}!</strong> ${err.responseJSON.err_msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
        })
}

const destroyModal = (id) => {
    $('.confirmation').empty()
    $('.confirmation').append(`
    <div class="modal fade" id="confirmation-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Confirmation</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure want to delete todo?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button onclick="destroy(${id})" type="button" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `)
    $('#confirmation-modal').modal('show')
}

const destroy = (id) => {
    $.ajax({
        method: 'delete',
        url: `${baseUrl}/todos/delete/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(() => {
            authentication()
            $('#confirmation-modal').modal('hide')
        })
        .fail(err => {
            $('.alert-list').empty()
            $('.alert-list').append(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ERR ${err.responseJSON.err_code}!</strong> ${err.responseJSON.err_msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
            
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
        .done(() => {
            authentication()
        })
        .fail(err => {
            $('.alert-add').empty()
            $('.alert-add').append(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ERR ${err.responseJSON.err_code}!</strong> ${err.responseJSON.err_msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
        })
}

const addTodoPage = () => {
    $('#title').val('')
    $('#description').val('')
    $('#due_date').val('')
    

    $('.section-login').hide()
    $('.section-register').hide()
    $('.section-list-todo').hide()
    $('.section-edit-todo').hide()
    $('.section-add-todo').slideDown(800)
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
            $('.alert-list').empty()
            $('.alert-list').append(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ERR ${err.responseJSON.err_code}!</strong> ${err.responseJSON.err_msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
        })

    $('.section-login').hide()
    $('.section-register').hide()
    $('.section-list-todo').hide()
    $('.section-add-todo').hide()
    $('.section-edit-todo').slideDown(800)
    $('.header').show()
}

function onSignIn(googleUser) {
    const { id_token } = googleUser.getAuthResponse()
    
    $.ajax({
        method: "post",
        url: `${baseUrl}/users/google-sign-in`,
        data: {
            id_token
        }
    })
        .done(({data}) => {
            $('#email_login').val('')
            $('#password_login').val('')
            $('#email_register').val('')
            $('#password_register').val('')
            $('#confirm_password_register').val('')

            $('#user-email').empty()
            $('#user-email').append(`<h6 class="font-weight-light">${data.email}</h6>`)
            const { access_token } = data
            localStorage.setItem('access_token', access_token)
            authentication()
        })
        .fail(err => {
            $('.alert-login').empty()
            $('.alert-login').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>ERR ${err.responseJSON.err_code}!</strong> ${err.responseJSON.err_msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        })
}


// api
function notify(id) {
    
    $.ajax({
        method: "post",
        url: `${baseUrl}/todos/notify`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            id
        }
    })
        .done( data => {
            $('.alert-list').empty()
            $('.alert-list').append(`
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Notify me!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Successfully notify todo to your email!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
            `)
            $('#exampleModal').modal('show')
        })
        .fail(err => {
            $('.alert-list').empty()
            $('.alert-list').append(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ERR ${err.responseJSON.err_code}!</strong> ${err.responseJSON.err_msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
        })
}