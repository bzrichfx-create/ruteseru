'use client';

import { useCMS, type CMSTeamMember } from '@/lib/cms';
import CrudManager, { type CrudField } from '@/components/admin/CrudManager';

const FIELDS: CrudField[] = [
  { name: 'name', label: 'Nama', type: 'text', placeholder: 'Ka Vita' },
  { name: 'role', label: 'Jabatan', type: 'text', placeholder: 'Founder & Tour Leader' },
  { name: 'photo', label: 'URL Foto', type: 'image' },
  { name: 'bio', label: 'Bio', type: 'textarea' },
];

export default function AdminTeamPage() {
  const { data, saveTeamMember, deleteTeamMember } = useCMS();

  return (
    <CrudManager<CMSTeamMember>
      items={data.team}
      fields={FIELDS}
      onSave={saveTeamMember}
      onDelete={deleteTeamMember}
      title="Kelola Tim"
      singular="Anggota Tim"
      searchFields={['name', 'role']}
      renderCard={(m) => (
        <div>
          <div className="relative h-32 overflow-hidden">
            {m.photo && <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />}
          </div>
          <div className="p-3">
            <div className="font-display font-bold text-sm text-foreground truncate">{m.name}</div>
            <div className="text-xs text-rute-pink font-bold truncate">{m.role}</div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.bio}</p>
          </div>
        </div>
      )}
    />
  );
}
