const body = document.querySelector('body');
const tbody = document.querySelector('tbody');
const btnAddUpdate = document.querySelector('#btnAddUpdate');
const inputNickname = document.querySelector('#user-nickname');
const inputEmail = document.querySelector('#user-email');
const inputPassword = document.querySelector('#user-password');

const btnAddUser = (e) => {
    //Con esto la pag no se recarga
    e.preventDefault();

    const i = getUsers().length;
    const user = createUser(inputNickname.value, inputEmail.value, inputPassword.value);
    const tr = createRow(user);
    tbody.appendChild(tr);
    alert(`Usuario ${user.nickname} creado correctamente`);
    inputNickname.value = '';
    inputEmail.value = '';
    inputPassword.value = '';
}

const btnUpdateUser = (e, i) => {
    e.preventDefault();
    updateUser(i, inputNickname.value, inputEmail.value, inputPassword.value);
    clearTable();
    fillTable();
    alert(`Usuario actualizado correctamente`);
    inputNickname.value = '';
    inputEmail.value = '';
    inputPassword.value = '';
    btnAddUpdate.textContent = 'GUARDAR';
    btnAddUpdate.onclick = btnAddUser;
}

const clearTable = () => {
    tbody.innerHTML = '';
}

const fillTable = () => {
    //Creamos un array de tr cque tednrá la info de users
    let trs = [];
    const users = getUsers();
    //Iteramos los usuarios
    users.forEach((user, i) => {
        //creamos una fila por cada uno con su info
        const tr = createRow(user, i);
        //las añadimos al tbody
        trs.push(tr);
    })

    //Añadimos todas las filas al tbody
    tbody.append(...trs);
}

const createRow = (user, i) => {

    const { nickname, email, password } = user;

    const tr = document.createElement('TR');

    //Delete
    const tdDelete = document.createElement('TD');
    const iDelete = document.createElement('I');
    iDelete.classList.add('fas', 'fa-trash');
    iDelete.onclick = () => {
        const isConfirm = confirm(`¿Estás seguro de eliminar el usuario ${nickname}?`);
        if (isConfirm) {
            deleteUser(i)
            clearTable();
            fillTable();
        }
    }

    tdDelete.appendChild(iDelete);

    //Update
    const tdUpdate = document.createElement('TD');
    const iUpdate = document.createElement('I');
    iUpdate.classList.add('fas', 'fa-pen');
    iUpdate.onclick = () => {
        btnAddUpdate.textContent = 'ACTUALIZAR';
        inputNickname.value = nickname;
        inputEmail.value = email;
        inputPassword.value = password;
        btnAddUpdate.onclick = (e) => btnUpdateUser(e, i)
    }

    tdUpdate.appendChild(iUpdate);

    //Nickname
    const tdNickname = document.createElement('TD');
    tdNickname.textContent = nickname;
    //Email
    const tdEmail = document.createElement('TD');
    tdEmail.textContent = email;
    //Password
    const tdPassword = document.createElement('TD');
    tdPassword.textContent = password;

    tr.append(tdDelete, tdUpdate, tdNickname, tdEmail, tdPassword);

    return tr;
}

//Cuando el body cargue se llama a esta función
body.onload = () => {

    fillTable();

}

btnAddUpdate.onclick = btnAddUser;