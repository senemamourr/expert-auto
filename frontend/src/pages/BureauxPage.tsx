import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Building2 } from 'lucide-react';
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
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bureaux</h1>
          <p className="text-gray-500 mt-1">
            Gérez les compagnies d'assurance et leurs coordonnées
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau bureau
        </Button>
      </div>

      {/* Barre de recherche */}
      <Card>
        <CardHeader>
          <CardTitle>Rechercher</CardTitle>
          <CardDescription>
            Recherchez une compagnie par son nom
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher une compagnie..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des bureaux */}
      <Card>
        <CardHeader>
          <CardTitle>
            Liste des bureaux
            {bureaux && <span className="ml-2 text-sm font-normal text-gray-500">({bureaux.length})</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Chargement...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Erreur lors du chargement des bureaux
            </div>
          ) : bureaux && bureaux.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Agence</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bureaux.map((bureau) => (
                    <TableRow key={bureau.id}>
                      <TableCell className="font-medium">{bureau.code}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          {bureau.nomAgence}
                        </div>
                      </TableCell>
                      <TableCell>{bureau.responsableSinistres}</TableCell>
                      <TableCell>{bureau.telephone}</TableCell>
                      <TableCell>{bureau.email}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(bureau)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setBureauToDelete(bureau)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Aucun bureau trouvé</p>
              <Button onClick={handleCreate} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Créer le premier bureau
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de création/modification */}
      <BureauModal
        open={isModalOpen}
        onOpenChange={handleCloseModal}
        bureau={selectedBureau}
      />

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!bureauToDelete} onOpenChange={() => setBureauToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le bureau "{bureauToDelete?.nomAgence}" ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
