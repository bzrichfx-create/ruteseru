'use client';

import { useCMS, type CMSTestimonial } from '@/lib/cms';
import CrudManager, { type CrudField } from '@/components/admin/CrudManager';

const FIELDS: CrudField[] = [
  { name: 'name', label: 'Nama', type: 'text', placeholder: 'Bu Sari' },
  { name: 'location', label: 'Lokasi', type: 'text', placeholder: 'Jakarta' },
  { name: 'trip', label: 'Trip', type: 'text', placeholder: 'Karimun Jawa' },
  { name: 'rating', label: 'Rating (1-5)', type: 'number' },
  { name: 'text', label: 'Testimoni', type: 'textarea' },
  { name: 'photo', label: 'URL Foto', type: 'image' },
];

export default function AdminTestimonialsPage() {
  const { data, saveTestimonial, deleteTestimonial } = useCMS();

  return (
    <CrudManager<CMSTestimonial>
      items={data.testimonials}
      fields={FIELDS}
      onSave={saveTestimonial}
      onDelete={deleteTestimonial}
      title="Kelola Testimoni"
      singular="Testimoni"
      searchFields={['name', 'location', 'trip']}
      renderCard={(t) => (
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            {t.photo && <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-rute-pink" />}
            <div className="min-w-0">
              <div className="font-display font-bold text-sm text-foreground truncate">{t.name}</div>
              <div className="text-xs text-muted-foreground truncate">{t.location}</div>
            </div>
          </div>
          <div className="text-xs text-rute-yellow-dark font-bold">{'★'.repeat(t.rating)}</div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.text}</p>
        </div>
      )}
    />
  );
}
