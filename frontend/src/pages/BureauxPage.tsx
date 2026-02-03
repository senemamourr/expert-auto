import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useBureaux, useDeleteBureau } from '@/hooks/useBureaux';
import { BureauModal } from '@/components/bureaux/BureauModal';
import { Bureau } from '@/types/bureau';

export const BureauxPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBureau, setSelectedBureau] = useState<Bureau | undefined>();
  const [bureauToDelete, setBureauToDelete] = useState<Bureau | null>(null);

  const { data: bureaux, isLoading, error } = useBureaux(search);
  const deleteBureau = useDeleteBureau();

  const handleEdit = (bureau: Bureau) => {
    setSelectedBureau(bureau);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedBureau(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (bureauToDelete) {
      await deleteBureau.mutateAsync(bureauToDelete.id);
      setBureauToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBureau(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Bureaux</h1>
                <p className="text-sm text-gray-500">Compagnies d'assurance</p>
              </div>
            </div>
            <Button onClick={handleCreate} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau bureau
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Barre de recherche */}
        <Card>
          <CardHeader>
            <CardTitle>Rechercher</CardTitle>
            <CardDescription>
              Recherchez une compagnie par son nom ou son code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher une compagnie..."
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                className="pl-11 h-12 text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* Liste des bureaux */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des bureaux</CardTitle>
                {bureaux && (
                  <p className="text-sm text-gray-500 mt-1">
                    {bureaux.length} compagnie{bureaux.length > 1 ? 's' : ''} trouvée{bureaux.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                <p className="text-gray-500 mt-4">Chargement...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">⚠️</div>
                <p className="text-red-600 font-medium mb-2">Erreur de chargement</p>
                <p className="text-sm text-gray-500">Impossible de charger les bureaux</p>
              </div>
            ) : bureaux && bureaux.length > 0 ? (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Code</TableHead>
                      <TableHead className="font-semibold">Agence</TableHead>
                      <TableHead className="font-semibold">Responsable</TableHead>
                      <TableHead className="font-semibold">Téléphone</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bureaux.map((bureau) => (
                      <TableRow key={bureau.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono font-medium text-blue-600">
                          {bureau.code}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="font-medium">{bureau.nomAgence}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {bureau.responsableSinistres}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {bureau.telephone}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {bureau.email}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(bureau)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setBureauToDelete(bureau)}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-16">
                <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucun bureau trouvé
                </h3>
                <p className="text-gray-500 mb-6">
                  Commencez par créer votre premier bureau
                </p>
                <Button onClick={handleCreate} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer le premier bureau
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Modal de création/modification */}
      <BureauModal
        open={isModalOpen}
        onOpenChange={handleCloseModal}
        bureau={selectedBureau}
      />

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!bureauToDelete} onOpenChange={() => setBureauToDelete(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Êtes-vous sûr de vouloir supprimer le bureau <strong>"{bureauToDelete?.nomAgence}"</strong> ?
              <br />
              <span className="text-red-600 font-medium mt-2 block">
                Cette action est irréversible.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
