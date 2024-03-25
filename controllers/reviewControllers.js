const { Review, User } = require('../db/sequelizeSetup');
const { ValidationError } = require('sequelize');

const findAllReviews = (req, res) => {
    Review.findAll({ include: User })
        .then((results) => {
            res.json(results);
        })
        .catch((error) => {
            res.status(500).json(error.message);
        });
};

const findReviewByPk = (req, res) => {
    Review.findByPk(parseInt(req.params.id))
        .then(review => {
            if (review) {
                res.json({ message: `La critique a été trouvée`, data: review });
            } else {
                res.status(404).json({ message: `Veuillez saisir le bon ID correspondant à la critique` });
            }
        })
        .catch(error => {
            res.status(500).json({ message: `Une erreur s'est produite`, data: error.message });
        });
};

const createReview = (req, res) => {
    User.findOne({ where: { email: req.email } }) // Utilisation de req.email au lieu de req.username
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `User not found.` })
            }
            return Review.create({ ...req.body, UserId: user.id })
                .then(result => {
                    res.json({ message: `Review created.`, data: result })
                })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}

const updateReview = (req, res) => {
    Review.findByPk(req.params.id)
        .then((result => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: `La critique a été mise à jour`, data: result });
                    });
            } else {
                res.status(400).json({ message: `Aucune critique n'a été mise à jour` });
            }
        }))
        .catch((error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: `Une erreur s'est produite`, data: error.message });
        }));
};

const deleteReview = (req, res) => {
    Review.findByPk(req.params.id)
        .then((review => {
            if (review) {
                return review.destroy()
                    .then(() => {
                        res.status(200).json({ message: `La critique a été supprimée`, data: review });
                    });
            } else {
                res.status(400).json({ message: `Aucune critique n'a été trouvée` });
            }
        }))
        .catch((error => {
            if (error instanceof ValidationError) {
                res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: `La requête n'a pas abouti`, data: error.message });
        }));
};

module.exports = { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview };