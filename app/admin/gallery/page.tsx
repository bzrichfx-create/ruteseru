'use client';

import { useCMS, type CMSGalleryItem } from '@/lib/cms';
import CrudManager, { type CrudField } from '@/components/admin/CrudManager';

const SPAN_OPTIONS = ['normal', 'tall', 'wide'];

const FIELDS: CrudField[] = [
  { name: 'category', label: 'Kategori', type: 'text', placeholder: 'Karimun Jawa' },
  { name: 'image', label: 'URL Gambar', type: 'image' },
  { name: 'caption', label: 'Caption', type: 'text', placeholder: 'Road trip ke Karimun' },
  { name: 'span', label: 'Ukuran Tampilan', type: 'select', options: SPAN_OPTIONS },
];

export default function AdminGalleryPage() {
  const { data, saveGalleryItem, deleteGalleryItem } = useCMS();

  return (
    <CrudManager<CMSGalleryItem>
      items={data.galleryItems}
      fields={FIELDS}
      onSave={saveGalleryItem}
      onDelete={deleteGalleryItem}
      title="Kelola Galeri"
      singular="Foto"
      searchFields={['caption', 'category']}
      renderCard={(g) => (
        <div>
          <div className="relative h-32 overflow-hidden">
            {g.image && <img src={g.image} alt={g.caption} className="w-full h-full object-cover" />}
            <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{g.span}</span>
          </div>
          <div className="p-3">
            <div className="text-xs text-muted-foreground font-bold">{g.category}</div>
            <div className="text-xs text-foreground mt-0.5 line-clamp-2">{g.caption}</div>
          </div>
        </div>
      )}
    />
  );
}
