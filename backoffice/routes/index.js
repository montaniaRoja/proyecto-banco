const clienteController = require('../controllers/cliente');
const cuentaController=require('../controllers/cuenta');
const transaccionController = require('../controllers/transaccion');

module.exports = (app) => {
    app.get('/api', (_req, res) => res.status(200).send({
        message: 'Example project did not give you access to the API web services',
    }));
    app.post('/api/cliente/create', clienteController.create);
    app.get('/api/cliente/list', clienteController.list);
    app.get('/api/cliente/find/:id', clienteController.find);

    app.post('/api/cuenta/create/:id_cliente', cuentaController.create);

    app.post('/api/transaccion/create/:id_cuenta', transaccionController.create)
};
