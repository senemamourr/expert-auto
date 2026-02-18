import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, Edit, Trash2, FileText, Filter, ArrowLeft, Download } from 'lucide-react';
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
import { Rapport, StatutRapport, TypeRapport } from '@/types/rapport';

const statutLabels: Record<StatutRapport, { label: string; color: string }> = {
  [StatutRapport.BROUILLON]: { label: 'Brouillon', color: 'bg-gray-100 text-gray-800 border-gray-300' },
  [StatutRapport.EN_COURS]: { label: 'En cours', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  [StatutRapport.TERMINE]: { label: 'Terminé', color: 'bg-green-100 text-green-800 border-green-300' },
  [StatutRapport.ARCHIVE]: { label: 'Archivé', color: 'bg-blue-100 text-blue-800 border-blue-300' },
};

const typeLabels: Record<TypeRapport, string> = {
  [TypeRapport.ESTIMATIF_REPARATION]: 'Estimatif réparation',
  [TypeRapport.VALEUR_VENALE]: 'Valeur vénale',
  [TypeRapport.TIERCE_EXPERTISE]: 'Tierce expertise',
};

export const RapportsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statutFilter, setStatutFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [rapportToDelete, setRapportToDelete] = useState<Rapport | null>(null);

  const { data, isLoading, error } = useRapports({ 
    search, 
    statut: statutFilter,
    typeRapport: typeFilter 
  });
  const deleteRapport = useDeleteRapport();

  const handleDelete = async () => {
    if (rapportToDelete) {
      await deleteRapport.mutateAsync(rapportToDelete.id);
      setRapportToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(montant) + ' CFA';
  };

  const rapports = data?.rapports || [];
  const hasFilters = search || statutFilter || typeFilter;

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
                <h1 className="text-2xl font-bold text-gray-900">Rapports d'expertise</h1>
                <p className="text-sm text-gray-500">Gestion des expertises automobiles</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/rapports/nouveau')} 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau rapport
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Filtres */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <CardTitle>Rechercher et filtrer</CardTitle>
            </div>
            <CardDescription>
              Trouvez rapidement vos rapports par critères
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Recherche */}
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="N° sinistre, ordre..."
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtre Type */}
              <div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
                >
                  <option value="">Tous les types</option>
                  <option value={TypeRapport.ESTIMATIF_REPARATION}>Estimatif réparation</option>
                  <option value={TypeRapport.VALEUR_VENALE}>Valeur vénale</option>
                  <option value={TypeRapport.TIERCE_EXPERTISE}>Tierce expertise</option>
                </select>
              </div>

              {/* Filtre Statut */}
              <div>
                <select
                  value={statutFilter}
                  onChange={(e) => setStatutFilter(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm"
                >
                  <option value="">Tous les statuts</option>
                  <option value={StatutRapport.BROUILLON}>Brouillon</option>
                  <option value={StatutRapport.EN_COURS}>En cours</option>
                  <option value={StatutRapport.TERMINE}>Terminé</option>
                  <option value={StatutRapport.ARCHIVE}>Archivé</option>
                </select>
              </div>
            </div>

            {hasFilters && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">Filtres actifs :</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearch('');
                    setStatutFilter('');
                    setTypeFilter('');
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Liste des rapports */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des rapports</CardTitle>
                {data && (
                  <p className="text-sm text-gray-500 mt-1">
                    {rapports.length} rapport{rapports.length > 1 ? 's' : ''} trouvé{rapports.length > 1 ? 's' : ''}
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
                <p className="text-sm text-gray-500">Impossible de charger les rapports</p>
              </div>
            ) : rapports.length > 0 ? (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">N° Ordre</TableHead>
                      <TableHead className="font-semibold">N° Sinistre</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Statut</TableHead>
                      <TableHead className="font-semibold text-right">Montant</TableHead>
                      <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rapports.map((rapport) => (
                      <TableRow key={rapport.id} className="hover:bg-gray-50">
                        <TableCell className="font-mono font-medium text-blue-600">
                          {rapport.numeroOrdreService}
                        </TableCell>
                        <TableCell className="font-medium">
                          {rapport.numeroSinistre}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDate(rapport.dateSinistre)}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-1 rounded border bg-blue-50 text-blue-700 border-blue-200">
                            {typeLabels[rapport.typeRapport]}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded border ${statutLabels[rapport.statut].color}`}>
                            {statutLabels[rapport.statut].label}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold text-right text-gray-900">
                          {formatMontant(rapport.montantTotal)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/rapports/${rapport.id}`)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                              title="Voir"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/rapports/${rapport.id}/modifier`)}
                              className="hover:bg-green-50 hover:text-green-600"
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setRapportToDelete(rapport)}
                              className="hover:bg-red-50 hover:text-red-600"
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
              <div className="text-center py-16">
                <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {hasFilters ? 'Aucun rapport trouvé' : 'Aucun rapport créé'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {hasFilters 
                    ? 'Essayez de modifier vos critères de recherche'
                    : 'Commencez par créer votre premier rapport d\'expertise'
                  }
                </p>
                {!hasFilters && (
                  <Button 
                    onClick={() => navigate('/rapports/nouveau')} 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Créer le premier rapport
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!rapportToDelete} onOpenChange={() => setRapportToDelete(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Êtes-vous sûr de vouloir supprimer le rapport <strong>N° {rapportToDelete?.numeroOrdreService}</strong> ?
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
