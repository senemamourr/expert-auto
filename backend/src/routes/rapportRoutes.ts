import { Router } from 'express';
import {
  getAllRapports,
  getRapportById,
  createRapport,
  updateRapport,
  deleteRapport,
} from '../controllers/rapportController';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Toutes les routes nécessitent une authentification
router.use(authenticate);

/**
 * GET /api/rapports
 * Récupérer tous les rapports
 */
router.get('/', getAllRapports);

/**
 * GET /api/rapports/:id
 * Récupérer un rapport par ID
 */
router.get('/:id', getRapportById);

/**
 * POST /api/rapports
 * Créer un nouveau rapport
 */
router.post('/', createRapport);

/**
 * PUT /api/rapports/:id
 * Mettre à jour un rapport
 */
router.put('/:id', updateRapport);

/**
 * DELETE /api/rapports/:id
 * Supprimer un rapport
 */
router.delete('/:id', deleteRapport);

export default router;
