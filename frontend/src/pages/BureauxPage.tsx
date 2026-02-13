import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { PageHeader } from '@/components/PageHeader';
import { Bureau } from '@/types/bureau';

export const BureauxPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <PageHeader
        title="Gestion des Bureaux"
        subtitle="Compagnies d'assurance et coordonnées"
        actions={
          <Button 
            onClick={handleCreate} 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouveau bureau
          </Button>
        }
      />

      <main className="container mx-auto px-6 py-8 space-y-6">
        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase text-gray-500 font-semibold">
                Total Bureaux
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-gray-900">
                {bureaux?.length || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase text-gray-500 font-semibold">
                Actifs
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-gray-900">
                {bureaux?.length || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription className="text-xs uppercase text-gray-500 font-semibold">
                Recherches
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-gray-900">
                {search ? bureaux?.length || 0 : '-'}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Barre de recherche améliorée */}
        <Card className="shadow-md">
          <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Rechercher une compagnie</CardTitle>
                <CardDescription>
                  Trouvez rapidement un bureau par nom ou code
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Saisir le nom de la compagnie ou le code..."
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                className="pl-12 h-12 text-base border-2 focus:border-blue-500"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Liste des bureaux */}
        <Card className="shadow-md">
          <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Liste des bureaux</CardTitle>
                  {bureaux && (
                    <p className="text-sm text-gray-500 mt-1">
                      {bureaux.length} compagnie{bureaux.length > 1 ? 's' : ''} enregistrée{bureaux.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                <p className="text-gray-500 mt-4 font-medium">Chargement des données...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚠️</span>
                </div>
                <p className="text-red-600 font-semibold mb-2">Erreur de chargement</p>
                <p className="text-sm text-gray-500">Impossible de charger les bureaux</p>
              </div>
            ) : bureaux && bureaux.length > 0 ? (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-bold text-gray-700">Code</TableHead>
                      <TableHead className="font-bold text-gray-700">Compagnie</TableHead>
                      <TableHead className="font-bold text-gray-700">Responsable</TableHead>
                      <TableHead className="font-bold text-gray-700">Contact</TableHead>
                      <TableHead className="text-right font-bold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bureaux.map((bureau, index) => (
                      <TableRow 
                        key={bureau.id} 
                        className={`hover:bg-blue-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <TableCell>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-700 border border-blue-300">
                            {bureau.code}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex-shrink-0">
                              <Building2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{bureau.nomAgence}</p>
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <MapPin className="w-3 h-3" />
                                <span className="line-clamp-1">{bureau.adresse}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-gray-900">{bureau.responsableSinistres}</p>
                          <p className="text-xs text-gray-500 mt-1">Responsable Sinistres</p>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{bureau.telephone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{bureau.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(bureau)}
                              className="hover:bg-green-50 hover:text-green-600 transition-all"
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setBureauToDelete(bureau)}
                              className="hover:bg-red-50 hover:text-red-600 transition-all"
                              title="Supprimer"
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
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Aucun bureau enregistré
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Commencez par créer votre premier bureau pour gérer les compagnies d'assurance
                </p>
                <Button 
                  onClick={handleCreate} 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Créer le premier bureau
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Modal */}
      <BureauModal
        open={isModalOpen}
        onOpenChange={handleCloseModal}
        bureau={selectedBureau}
      />

      {/* Dialog de suppression */}
      <AlertDialog open={!!bureauToDelete} onOpenChange={() => setBureauToDelete(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl flex items-center gap-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              Confirmer la suppression
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base pt-4">
              Êtes-vous sûr de vouloir supprimer le bureau{' '}
              <strong className="text-gray-900">"{bureauToDelete?.nomAgence}"</strong> ?
              <br />
              <span className="text-red-600 font-semibold mt-3 block">
                ⚠️ Cette action est irréversible.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
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
