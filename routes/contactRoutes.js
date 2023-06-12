const express = require("express")
const routes = express.Router();
const contactController = require('../controllers/contactController')

routes.post('/',contactController.createContact)
routes.get('/',contactController.getContactByID)
routes.put('/update',contactController.updateContact)
routes.post('/delete',contactController.delteContact)


module.exports = routes