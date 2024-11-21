$(document).ready(function () {
    const fullName = $('#FullName');
    const signUp = $('#signUp');
    const email = $('#email');
    const password = $('#password');
    const repeatPassword = $('#repeatPassword');
    const popUp = $('#pop-up');
    const link = $('#link');
    const checkboxBox = $('#checkbox');
    const yourUsername = $('#YourUsername');
    const form = $('form');
    const btnOk = $('.btn-ok');

    signUp.on('click', function (e) {
        if ($(this).val() === "Sign Up") {
            validateFormReg();
        } else if ($(this).val() === "Sign In") {
            validateUser ();
        }
    });

    btnOk.on('click', createUserPage);
    link.on('click', createUserPage);


    function createUserPage() {
        form[0].reset();
        popUp.removeClass('open');
        link.text('Registration');
        signUp.val('Sign In');
        fullName.parent().remove();
        email.parent().remove();
        repeatPassword.parent().remove();
        $('.info-text').text('Log in to the system');
        checkboxBox.parent().remove();
        link.off('click');
        link.on('click', function() {
            location.reload();
        });

    }


    function validateFormReg() {
        resetValidation();

        if (!fullName.css('border-color', '').val()) {
            showError(fullName.css('border-color', 'red'), "Заполните поле FullName");
            return;
        } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(fullName.css('border-color', '').val())) {
            showError(fullName.css('border-color', 'red'), "Full Name может содержать только буквы и пробел");
            return;
        } else if (!yourUsername.css('border-color', '').val()) {
            showError(yourUsername.css('border-color', 'red'), "Заполните поле Your User Name");
            return;
        } else if (!/^[A-Za-zА-Яа-я0-9_-]+$/.test(yourUsername.css('border-color', '').val())) {
            showError(yourUsername.css('border-color', 'red'), "Your User Name может содержать только буквы, цифры, символ подчеркивания и тире");
            return;
        } else if (!email.css('border-color', '').val()) {
            showError(email.css('border-color', 'red'), "Заполните поле E-mail");
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.css('border-color', '').val())) {
            showError(email.css('border-color', 'red'), "Введите корректный E-mail");
            return;
        } else if (!password.css('border-color', '').val()) {
            showError(password.css('border-color', 'red'), "Заполните пароль");
            return;
        } else if (password.css('border-color', '').val().length < 8) {
            showError(password.css('border-color', 'red'), "Пароль должен содержать не менее 8 символов");
            return;
        } else if (!/[A-Z]/.test(password.css('border-color', '').val())) {
            showError(password.css('border-color', 'red'), "Пароль должен содержать хотя бы одну букву в верхнем регистре");
            return;
        } else if (!/\d/.test(password.css('border-color', '').val())) {
            showError(password.css('border-color', 'red'), "Пароль должен содержать хотя бы одну цифру");
            return;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.css('border-color', '').val())) {
            showError(password.css('border-color', 'red'), "Пароль должен содержать хотя бы один спецсимвол");
            return;
        } else if (password.css('border-color', '').val() !== repeatPassword.css('border-color', '').val()) {
            showError(repeatPassword.css('border-color', 'red'), "Пароли не совпадают");
            return;
        } else if (!checkboxBox.is(':checked')) {
            showError(checkboxBox.css('border-color', 'red'), "Поставьте отметку в чекбоксе");
            return;
        } else {
            const user = {
                fullName: fullName.val(),
                username: yourUsername.val(),
                email: email.val(),
                password: password.val()
            };

            let clients = JSON.parse(localStorage.getItem('clients')) || [];
            clients.push(user);
            localStorage.setItem('clients', JSON.stringify(clients));

            showModal();

        }

    }

    function showModal(message) {
        popUp.addClass('open');
    }
    function validateUser () {
        resetValidation();

        if (!yourUsername.val()) {
            showError(yourUsername, "Заполните поле Your User Name");
            return;
        } else if (!password.val()) {
            showError(password, "Введите пароль");
            return;
        } else {
            let clients = JSON.parse(localStorage.getItem('clients')) || [];
            const user = clients.find(client => client.username === yourUsername.val());
            function createUserPage2() {
                form[0].reset();
                popUp.removeClass('open');
                yourUsername.parent().remove();
                password.parent().remove();
                link.text('').remove();
                signUp.val('Exit');
                $('.info-text').text('Welcome, ' + user.username + '!');
                signUp.on('click', function() {
                    location.reload();
                });

            }


            if (!user) {
                showError(yourUsername, "Такой пользователь не зарегистрирован");
                return;
            } else if (user.password !== password.val()) {
                showError(password, "Неверный пароль");
                return;
            } else {

                createUserPage2();

            }
        }
    }

    function showError(inputField, message) {
        const errorText = $('<div class="error-text"></div>').text(message);
        inputField.parent().append(errorText);
    }

    function resetValidation() {
        $('.error-text').remove();
        $('input').removeClass('error');
    }

    console.log("Hello, World! 22222");
});
