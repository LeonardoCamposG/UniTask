const formulario = document.querySelector ("form");
const signInButton = document.querySelector("#signInButton");
const signUpButton = document.querySelector("#signUpButton");
const iname = document.querySelector("#name");
const iemail = document.querySelector("#email");
const ipassword = document.querySelector("#password");

function cadastrar (iname, iemail, ipassword) {
    fetch("http://localhost:8080/user", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({
            name: iname,
            email: iemail,
            password: ipassword
        })
    })
    .then(function (res) {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(function(data) {
        console.log(data); // ou faça algo com os dados recebidos
    })
    .catch(function (error) {
        console.error('Houve um problema com a sua solicitação:', error);
        // Adicione tratamento de erro aqui, como exibir uma mensagem para o usuário
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Seu código JavaScript aqui
    const emailInput = document.querySelector("#email");
    console.log(emailInput); // Verifica se o campo de email foi corretamente identificado
});


function login(iemail, ipassword) {
    // Monta a URL da requisição GET
    const url = `http://localhost:8080/user/login/${encodeURIComponent(iemail)}/${encodeURIComponent(ipassword)}`;

    // Realiza a requisição GET
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // Verifica se a resposta é bem-sucedida (código de status 200 a 299)
        if (response.ok) {
            // Retorna true indicando autenticação bem-sucedida
            window.location.href = "pages/tasks.html";
            return true;
        } else {
            throw new Error("Erro ao tentar fazer login");
        }
    })
    .catch(error => {
        // Em caso de erro na requisição, retorna false
        console.error('Ocorreu um erro:', error);
        return false;
    });
}

function limpar(){
    iname.value = "",
    iemail.value = "",
    ipassword.value = ""
}


if(window.location.pathname.includes("cadastrar.html")) {
    signUpButton.addEventListener("click", function (event) {
        event.preventDefault();
    
        const iname = document.getElementById("name").value;
        const iemail = document.getElementById("email").value;
        const ipassword = document.getElementById("password").value;
    
        cadastrar(iname, iemail, ipassword);
        limpar();
    });
}else{
    signInButton.addEventListener("click", function (event) {
        event.preventDefault();
    
        const iemail = document.getElementById("email").value;
        const ipassword = document.getElementById("password").value;
    
        login(iemail, ipassword);
    });
    
}