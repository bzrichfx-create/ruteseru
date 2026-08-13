'use client';

import { useCMS, type CMSTrip } from '@/lib/cms';
import CrudManager, { type CrudField } from '@/components/admin/CrudManager';

const REGIONS = ['Jawa', 'Sumatera', 'Sulawesi', 'One Day Trip'];

const FIELDS: CrudField[] = [
  { name: 'name', label: 'Nama Trip', type: 'text', placeholder: 'Pacitan Beach Adventure' },
  { name: 'destination', label: 'Destinasi', type: 'text', placeholder: 'Pacitan, Jawa Timur' },
  { name: 'region', label: 'Region', type: 'select', options: REGIONS },
  { name: 'startDate', label: 'Tanggal Mulai', type: 'text', placeholder: '2026-09-18' },
  { name: 'endDate', label: 'Tanggal Selesai', type: 'text', placeholder: '2026-09-20' },
  { name: 'durationDays', label: 'Durasi (hari)', type: 'number' },
  { name: 'price', label: 'Harga (Ribu Rupiah)', type: 'number' },
  { name: 'totalSeats', label: 'Total Seat', type: 'number' },
  { name: 'filledSeats', label: 'Seat Terisi', type: 'number' },
  { name: 'popular', label: 'Trip Populer', type: 'checkbox' },
  { name: 'image', label: 'URL Gambar', type: 'image' },
  { name: 'includes', label: 'Fasilitas Include', type: 'list' },
  { name: 'excludes', label: 'Fasilitas Exclude', type: 'list' },
  { name: 'highlights', label: 'Highlight Trip', type: 'list' },
  { name: 'mepoInfo', label: 'Info Mepo', type: 'text', placeholder: 'Jl. Kramat 5 No. 8 JakPus, kumpul 23:30' },
];

export default function AdminTripsPage() {
  const { data, saveTrip, deleteTrip } = useCMS();

  return (
    <CrudManager<CMSTrip>
      items={data.trips}
      fields={FIELDS}
      onSave={saveTrip}
      onDelete={deleteTrip}
      title="Kelola Trip"
      singular="Trip"
      searchFields={['name', 'destination', 'region']}
      renderCard={(trip) => (
        <div>
          <div className="relative h-32 overflow-hidden">
            {trip.image && <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" />}
            {trip.popular && <span className="absolute top-2 left-2 bg-rute-yellow text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full font-display">POPULER</span>}
          </div>
          <div className="p-3">
            <div className="font-display font-bold text-sm text-foreground truncate">{trip.name}</div>
            <div className="text-xs text-muted-foreground truncate">{trip.destination}</div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs font-bold text-rute-ocean">Rp {trip.price}K</span>
              <span className="text-xs text-muted-foreground">{trip.filledSeats}/{trip.totalSeats}</span>
            </div>
          </div>
        </div>
      )}
    />
  );
}
