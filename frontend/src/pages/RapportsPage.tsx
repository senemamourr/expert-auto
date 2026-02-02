import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, Edit, Trash2, FileText, Filter } from 'lucide-react';
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
import { useRapports, useDeleteRapport } from '@/hooks/useRapports';
import { Rapport, StatutRapport } from '@/types/rapport';

const statutLabels: Record<StatutRapport, { label: string; color: string }> = {
  [StatutRapport.BROUILLON]: { label: 'Brouillon', color: 'bg-gray-100 text-gray-800' },
  [StatutRapport.EN_COURS]: { label: 'En cours', color: 'bg-orange-100 text-orange-800' },
  [StatutRapport.TERMINE]: { label: 'Terminé', color: 'bg-green-100 text-green-800' },
  [StatutRapport.ARCHIVE]: { label: 'Archivé', color: 'bg-blue-100 text-blue-800' },
};

export const RapportsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statutFilter, setStatutFilter] = useState('');
  const [rapportToDelete, setRapportToDelete] = useState<Rapport | null>(null);

  const { data, isLoading, error } = useRapports({ search, statut: statutFilter });
  const deleteRapport = useDeleteRapport();

  const handleDelete = async () => {
    if (rapportToDelete) {
      await deleteRapport.mutateAsync(rapportToDelete.id);
      setRapportToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(montant);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              ← Retour
            </Button>
            <h1 className="text-2xl font-bold text-blue-900">Rapports d'expertise</h1>
          </div>
          <Button onClick={() => navigate('/rapports/nouveau')}>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau rapport
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Filtres */}
        <Card>
          <CardHeader>
            <CardTitle>Rechercher et filtrer</CardTitle>
            <CardDescription>Trouvez rapidement vos rapports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par N° sinistre, immatriculation..."
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
                className="px-4 py-2 border rounded-md bg-white"
              >
                <option value="">Tous les statuts</option>
                <option value={StatutRapport.BROUILLON}>Brouillon</option>
                <option value={StatutRapport.EN_COURS}>En cours</option>
                <option value={StatutRapport.TERMINE}>Terminé</option>
                <option value={StatutRapport.ARCHIVE}>Archivé</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des rapports */}
        <Card>
          <CardHeader>
            <CardTitle>
              Liste des rapports
              {data && <span className="ml-2 text-sm font-normal text-gray-500">({data.rapports?.length || 0})</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Chargement...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                Erreur lors du chargement des rapports
              </div>
            ) : data && data.rapports && data.rapports.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>N° Ordre</TableHead>
                      <TableHead>N° Sinistre</TableHead>
                      <TableHead>Date Sinistre</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.rapports.map((rapport) => (
                      <TableRow key={rapport.id}>
                        <TableCell className="font-medium">{rapport.numeroOrdreService}</TableCell>
                        <TableCell>{rapport.numeroSinistre}</TableCell>
                        <TableCell>{formatDate(rapport.dateSinistre)}</TableCell>
                        <TableCell>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {rapport.typeRapport.replace('_', ' ')}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${statutLabels[rapport.statut].color}`}>
                            {statutLabels[rapport.statut].label}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold">{formatMontant(rapport.montantTotal)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/rapports/${rapport.id}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/rapports/${rapport.id}/modifier`)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setRapportToDelete(rapport)}
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
                <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Aucun rapport trouvé</p>
                <Button onClick={() => navigate('/rapports/nouveau')} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer le premier rapport
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!rapportToDelete} onOpenChange={() => setRapportToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le rapport N° {rapportToDelete?.numeroOrdreService} ?
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
