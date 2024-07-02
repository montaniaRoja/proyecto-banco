document.addEventListener('DOMContentLoaded', function () {

    const params = new URLSearchParams(window.location.search);
    const idcliente = params.get('id');
    const nombre = params.get('nombre');

    console.log('ID:', idcliente);
    console.log('Nombre:', nombre);

    fetch('http://localhost:3000/api/cliente/find/' + idcliente + '/cuentas')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('La respuesta no fue exitosa');
        })
        .then(function (data) {
            let tableBody = document.getElementById('cuentasbody');
            console.log(data);
            // Eliminar filas existentes
            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }

            // Crear nuevas filas con los datos recibidos
            data.Cuenta.forEach(cuenta => {
                let row = tableBody.insertRow();
                let idCell = row.insertCell(0);
                let nombreCell = row.insertCell(1);
                let cuentaCell = row.insertCell(2);
                let monedaCell = row.insertCell(3);
                let saldoCell = row.insertCell(4);
                var transaccionButton = createTransaccionButton();
                transaccionButton.setAttribute("data-cuenta", cuenta.no_cuenta);
                let botonCell = row.insertCell(5);



                idCell.textContent = idcliente;
                nombreCell.textContent = nombre;
                cuentaCell.textContent = cuenta.no_cuenta;
                monedaCell.textContent = cuenta.moneda;
                saldoCell.textContent = cuenta.saldo;
                botonCell.append(transaccionButton);

                transaccionButton.addEventListener('click', function () {
                    var nocuenta = transaccionButton.getAttribute('data-cuenta');
                    console.log('cuenta ' + nocuenta);
                    document.getElementById('modalcuentanumero').value = nocuenta;
                    document.getElementById('modalmoneda').value = cuenta.moneda;
                    document.getElementById('modalcuentaid').value = cuenta.id;

                });



            });

            $('#cuentas').DataTable();

        }).catch(function (error) {
            console.log(error);
        });

    function createTransaccionButton() {
        var boton = document.createElement("button");
        boton.innerHTML = "Transacciones";
        boton.id = "accountButton";
        boton.type = "button";
        boton.classList.add("btn", "btn-primary", "btn-sm");
        boton.setAttribute("data-bs-toggle", "modal");
        boton.setAttribute("data-bs-target", "#transaccionesModal");
        return boton;
    }

});

function enviarTransaccion() {
    console.log('registrando transaccion');
    $('#transaccionesform').trigger("reset");
    $('#transaccionesModal').modal('hide');
    $('.modal-backdrop').remove();

}
