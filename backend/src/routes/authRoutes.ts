import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authenticate } from '../middlewares/auth';

const router = Router();

/**
 * POST /api/auth/register
 * Inscription d'un nouvel utilisateur
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * Connexion d'un utilisateur
 */
router.post('/login', login);

/**
 * GET /api/auth/profile
 * Récupérer le profil de l'utilisateur connecté
 */
router.get('/profile', authenticate, getProfile);

export default router;
