import { sequelize, testConnection } from '../config/database';
import { User, Bureau, syncDatabase } from '../models';
import { UserRole } from '../models/User';

async function seed() {
  try {
    console.log('🌱 Démarrage du seeding...');

    // Tester la connexion
    await testConnection();

    // Synchroniser la base de données (force: true pour recréer les tables)
    console.log('📦 Synchronisation de la base de données...');
    await syncDatabase(true);

    // Créer un utilisateur admin
    console.log('👤 Création de l\'utilisateur admin...');
    const admin = await User.create({
      email: 'admin@expertise-auto.com',
      password: 'Admin123!',
      nom: 'Admin',
      prenom: 'Super',
      role: UserRole.ADMIN,
    });
    console.log('✅ Admin créé:', admin.email);

    // Créer un expert
    console.log('👤 Création d\'un expert...');
    const expert = await User.create({
      email: 'expert@expertise-auto.com',
      password: 'Expert123!',
      nom: 'Dupont',
      prenom: 'Jean',
      role: UserRole.EXPERT,
    });
    console.log('✅ Expert créé:', expert.email);

    // Créer des bureaux (compagnies d'assurance)
    console.log('🏢 Création des bureaux...');
    
    const bureaux = [
      {
        code: 'AXA001',
        nomAgence: 'AXA Assurances Dakar',
        responsableSinistres: 'Mamadou Diallo',
        telephone: '+221 33 123 45 67',
        email: 'sinistres@axa.sn',
        adresse: 'Avenue Léopold Sédar Senghor, Dakar',
      },
      {
        code: 'NSIA001',
        nomAgence: 'NSIA Assurances Sénégal',
        responsableSinistres: 'Fatou Ndiaye',
        telephone: '+221 33 234 56 78',
        email: 'sinistres@nsia.sn',
        adresse: 'Rue de Thiong, Plateau, Dakar',
      },
      {
        code: 'AMSA001',
        nomAgence: 'AMSA Assurances',
        responsableSinistres: 'Abdou Sow',
        telephone: '+221 33 345 67 89',
        email: 'sinistres@amsa.sn',
        adresse: 'Boulevard de la République, Dakar',
      },
      {
        code: 'SALAMA001',
        nomAgence: 'Salama Assurances Sénégal',
        responsableSinistres: 'Aïssatou Ba',
        telephone: '+221 33 456 78 90',
        email: 'sinistres@salama.sn',
        adresse: 'Place de l\'Indépendance, Dakar',
      },
      {
        code: 'ASKIA001',
        nomAgence: 'Askia Assurances',
        responsableSinistres: 'Ousmane Diop',
        telephone: '+221 33 567 89 01',
        email: 'sinistres@askia.sn',
        adresse: 'Rue Carnot, Dakar',
      },
    ];

    for (const bureauData of bureaux) {
      const bureau = await Bureau.create(bureauData);
      console.log('✅ Bureau créé:', bureau.nomAgence);
    }

    console.log('\n🎉 Seeding terminé avec succès !');
    console.log('\n📝 Utilisateurs créés :');
    console.log('   - Admin: admin@expertise-auto.com / Admin123!');
    console.log('   - Expert: expert@expertise-auto.com / Expert123!');
    console.log('\n🏢 Bureaux créés : 5 compagnies d\'assurance');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    process.exit(1);
  }
}

seed();
