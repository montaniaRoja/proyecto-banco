const { Cliente, Cuenta } = require('../models');

module.exports = {
    create(req, res) {
        const { no_doc, nombre, correo, direccion } = req.body;

        if (!no_doc || !nombre || !correo || !direccion) {
            return res.status(400).send({ message: 'Todos los campos son requeridos' });
        }

        return Cliente.create({
            no_doc,
            nombre,
            correo,
            direccion
        })
        .then(cliente => res.status(201).send(cliente))
        .catch(error => res.status(400).send({ message: error.message }));
    },
    list(_, res) {
        return Cliente.findAll({})
            .then(clientes => res.status(200).send(clientes))
            .catch(error => res.status(400).send({ message: error.message }));
    },
    find(req, res) {
        const { id } = req.params;

        return Cliente.findOne({
            where: { id }
        })
        .then(cliente => {
            if (!cliente) {
                return res.status(404).send({ message: 'Cliente no encontrado' });
            }
            return res.status(200).send(cliente);
        })
        .catch(error => res.status(400).send({ message: error.message }));
    },
    async findWithCuentas(req, res) {
        const { id } = req.params;

        try {
            const cliente = await Cliente.findOne({
                where: { id },
                include: {
                    model: Cuenta,
                    attributes: ['id','no_cuenta', 'moneda','saldo'],
                },
            });

            if (!cliente) {
                return res.status(404).send({ message: 'Cliente no encontrado' });
            }

            return res.status(200).send(cliente);
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }
};
