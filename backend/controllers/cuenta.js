const { Cuenta } = require('../models');  // Asegúrate de que la ruta sea correcta

module.exports = {
    create(req, res) {
        const { no_cuenta, id_cliente, moneda } = req.body;

        if (!no_cuenta || !id_cliente || !moneda) {
            return res.status(400).send({ message: 'Todos los campos son requeridos' });
        }

        return Cuenta.create({
            no_cuenta,
            id_cliente,
            moneda
        })
        .then(cuenta => res.status(201).send(cuenta))
        .catch(error => res.status(400).send({ message: error.message }));
    },
    list(_, res) {
        return Cuenta.findAll({})
            .then(cuentas => res.status(200).send(cuentas))
            .catch(error => res.status(400).send({ message: error.message }));
    },
    find(req, res) {
        const { id } = req.params;

        return Cuenta.findOne({
            where: { id }
        })
        .then(cuenta => {
            if (!cuenta) {
                return res.status(404).send({ message: 'Cuenta no encontrado' });
            }
            return res.status(200).send(cuenta);
        })
        .catch(error => res.status(400).send({ message: error.message }));
    },
    update(req, res) {
        const { id } = req.params; // Obtenemos el id de los parámetros de la URL
        const { saldo } = req.body;

        if (!saldo) {
            return res.status(400).send({ message: 'El saldo es requerido' });
        }

        return Cuenta.update({ saldo }, {
            where: { id }
        })
        .then(rowsUpdated => {
            if (rowsUpdated[0] === 0) {
                return res.status(404).send({ message: 'Cuenta no encontrada' });
            }
            return res.status(200).send({ message: 'Cuenta actualizada correctamente' });
        })
        .catch(error => res.status(400).send({ message: error.message }));
    },
};
