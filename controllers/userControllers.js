const { User } = require('../db/sequelizeSetup');
const { UniqueConstraintError, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');

const findAllUsers = (req, res) => {
    User.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findUserByPk = (req, res) => {
    User.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un utilisateur a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun utilisateur n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            User.create({ ...req.body, password: hash })
                .then((user) => {
                    user.password = "";
                    res.status(201).json({ message: `L'utilisateur a bien été créé`, data: user });
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message });
                    }
                    res.status(500).json({ message: `L'utilisateur n'a pas pu être créé`, data: error.message });
                });
        })
        .catch(error => {
            console.log(error.message);
        });
}

const updateUser = (req, res) => {
    User.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                if (req.body.password) {
                    return bcrypt.hash(req.body.password, 10)
                        .then((hash) => {
                            req.body.password = hash

                            // On empêche l'utilisateur de mettre à jour son username
                            req.body.username = result.username

                            return result.update(req.body)
                                .then(() => {
                                    res.status(201).json({ message: `L'utilisateur a bien été mis à jour.`, data: result })
                                })
                        })
                }
            } else {
                res.status(404).json({ message: `Aucun utilisateur à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const deleteUser = (req, res) => {
    User.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ mesage: `L'utilisateur a bien été supprimé.`, data: result })
                    })
            } else {
                res.status(404).json({ mesage: `Aucun utilisateur trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllUsers, findUserByPk, createUser, updateUser, deleteUser }