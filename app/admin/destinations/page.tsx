'use client';

import { useCMS, type CMSDestination } from '@/lib/cms';
import CrudManager, { type CrudField } from '@/components/admin/CrudManager';

const FIELDS: CrudField[] = [
  { name: 'name', label: 'Nama Destinasi', type: 'text', placeholder: 'Karimun Jawa' },
  { name: 'region', label: 'Region', type: 'text', placeholder: 'Jawa Tengah' },
  { name: 'island', label: 'Pulau', type: 'text', placeholder: 'Jawa' },
  { name: 'image', label: 'URL Gambar Utama', type: 'image' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
  { name: 'highlights', label: 'Highlight', type: 'list' },
  { name: 'gallery', label: 'Galeri Foto (URL)', type: 'list' },
  { name: 'mapX', label: 'Posisi Peta X (%)', type: 'number' },
  { name: 'mapY', label: 'Posisi Peta Y (%)', type: 'number' },
];

export default function AdminDestinationsPage() {
  const { data, saveDestination, deleteDestination } = useCMS();

  return (
    <CrudManager<CMSDestination>
      items={data.destinations}
      fields={FIELDS}
      onSave={saveDestination}
      onDelete={deleteDestination}
      title="Kelola Destinasi"
      singular="Destinasi"
      searchFields={['name', 'region', 'island']}
      renderCard={(dest) => (
        <div>
          <div className="relative h-32 overflow-hidden">
            {dest.image && <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />}
          </div>
          <div className="p-3">
            <div className="font-display font-bold text-sm text-foreground truncate">{dest.name}</div>
            <div className="text-xs text-muted-foreground truncate">{dest.region}</div>
            <div className="text-xs text-muted-foreground mt-1">{dest.highlights.length} highlights</div>
          </div>
        </div>
      )}
    />
  );
}
