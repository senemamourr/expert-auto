import { Router } from 'express';
import {
  getAllBureaux,
  getBureauById,
  getBureauByCode,
  createBureau,
  updateBureau,
  deleteBureau,
} from '../controllers/bureauController';
import { authenticate, authorize } from '../middlewares/auth';
import { UserRole } from '../models/User';

const router = Router();

// Toutes les routes nécessitent une authentification
router.use(authenticate);

/**
 * GET /api/bureaux
 * Récupérer tous les bureaux
 */
router.get('/', getAllBureaux);

/**
 * GET /api/bureaux/:id
 * Récupérer un bureau par ID
 */
router.get('/:id', getBureauById);

/**
 * GET /api/bureaux/code/:code
 * Récupérer un bureau par code (pour autocomplétion)
 */
router.get('/code/:code', getBureauByCode);

/**
 * POST /api/bureaux
 * Créer un nouveau bureau (admin et expert seulement)
 */
router.post('/', authorize(UserRole.ADMIN, UserRole.EXPERT), createBureau);

/**
 * PUT /api/bureaux/:id
 * Mettre à jour un bureau (admin et expert seulement)
 */
router.put('/:id', authorize(UserRole.ADMIN, UserRole.EXPERT), updateBureau);

/**
 * DELETE /api/bureaux/:id
 * Supprimer un bureau (admin seulement)
 */
router.delete('/:id', authorize(UserRole.ADMIN), deleteBureau);

export default router;
