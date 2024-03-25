
const express = require('express');
const router = express.Router();
const { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview } = require('../controllers/reviewControllers');

// Route pour obtenir toutes les critiques
router.get('/', findAllReviews);

// Route pour obtenir un avis par son identifiant
router.get('/:id', findReviewByPk);

// Route pour créer une nouvelle critique
router.post('/', createReview);

// Route pour mettre à jour une critique
router.put('/:id', updateReview);

// Route pour supprimer une critique
router.delete('/:id', deleteReview);

module.exports = router;