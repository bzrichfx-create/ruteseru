'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CrudField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'image' | 'list' | 'select' | 'checkbox';
  options?: string[];
  placeholder?: string;
}

export interface CrudItem {
  id: string;
  [key: string]: any;
}

interface CrudManagerProps<T extends CrudItem> {
  items: T[];
  fields: CrudField[];
  onSave: (item: T) => void;
  onDelete: (id: string) => void;
  title: string;
  singular: string;
  searchFields: string[];
  renderCard?: (item: T) => ReactNode;
  emptyId?: string;
}

export default function CrudManager<T extends CrudItem>({
  items, fields, onSave, onDelete, title, singular, searchFields, renderCard, emptyId = 'new',
}: CrudManagerProps<T>) {
  const [editing, setEditing] = useState<T | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<Record<string, any>>({});

  const filtered = search
    ? items.filter((item) => searchFields.some((f) => String(item[f] ?? '').toLowerCase().includes(search.toLowerCase())))
    : items;

  const openNew = () => {
    const blank: Record<string, any> = { id: emptyId === 'new' ? `item-${Date.now()}` : emptyId };
    fields.forEach((f) => {
      if (f.type === 'list') blank[f.name] = [];
      else if (f.type === 'checkbox') blank[f.name] = false;
      else if (f.type === 'number') blank[f.name] = 0;
      else blank[f.name] = '';
    });
    setForm(blank);
    setIsNew(true);
    setEditing(null);
  };

  const openEdit = (item: T) => {
    setForm({ ...item });
    setEditing(item);
    setIsNew(false);
  };

  const close = () => { setEditing(null); setIsNew(false); setForm({}); };

  const handleSave = () => {
    const toSave = { ...form } as T;
    if (!toSave.id) toSave.id = `item-${Date.now()}`;
    onSave(toSave);
    close();
  };

  const handleDelete = (id: string) => {
    if (confirm(`Yakin mau hapus item ini?`)) onDelete(id);
  };

  const updateField = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateListItem = (name: string, value: string) => {
    const items = (form[name] as string[]) || [];
    if (!items.includes(value)) updateField(name, [...items, value]);
  };

  const removeListItem = (name: string, idx: number) => {
    const items = (form[name] as string[]) || [];
    updateField(name, items.filter((_, i) => i !== idx));
  };

  const showForm = editing || isNew;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">{title}</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari..."
              className="pl-9 pr-4 py-2.5 bg-white rounded-xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink text-sm font-medium w-full sm:w-48"
            />
          </div>
          <button onClick={openNew} className="flex items-center gap-2 bg-rute-pink hover:bg-rute-pink-dark text-white font-bold px-4 py-2.5 rounded-xl btn-3d font-display text-sm whitespace-nowrap transition-colors">
            <Plus size={18} /> Tambah
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border-2 border-rute-cream-dark overflow-hidden card-shadow group">
            {renderCard ? renderCard(item) : (
              <div className="p-4">
                {fields.slice(0, 3).map((f) => (
                  <div key={f.name} className="mb-1">
                    <span className="text-xs text-muted-foreground font-medium">{f.label}: </span>
                    <span className="text-sm text-foreground font-semibold">{String(item[f.name] ?? '').slice(0, 60)}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex border-t-2 border-rute-cream-dark">
              <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-bold text-rute-ocean hover:bg-rute-ocean/5 transition-colors">
                <Pencil size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors border-l-2 border-rute-cream-dark">
                <Trash2 size={16} /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg font-display">Belum ada data. Klik "Tambah" untuk mulai!</p>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto card-shadow"
            >
              <div className="sticky top-0 bg-white flex items-center justify-between p-5 border-b-2 border-rute-cream-dark z-10">
                <h2 className="font-display font-bold text-xl text-foreground">{isNew ? `Tambah ${singular}` : `Edit ${singular}`}</h2>
                <button onClick={close} className="w-9 h-9 bg-rute-cream rounded-full flex items-center justify-center hover:bg-rute-cream-dark transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {fields.map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-bold text-foreground mb-1.5 font-display">{f.label}</label>

                    {f.type === 'text' && (
                      <input
                        type="text"
                        value={form[f.name] ?? ''}
                        onChange={(e) => updateField(f.name, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 bg-rute-cream rounded-xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink text-sm font-medium"
                      />
                    )}

                    {f.type === 'number' && (
                      <input
                        type="number"
                        value={form[f.name] ?? 0}
                        onChange={(e) => updateField(f.name, Number(e.target.value))}
                        className="w-full px-4 py-3 bg-rute-cream rounded-xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink text-sm font-medium"
                      />
                    )}

                    {f.type === 'textarea' && (
                      <textarea
                        value={form[f.name] ?? ''}
                        onChange={(e) => updateField(f.name, e.target.value)}
                        rows={3}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 bg-rute-cream rounded-xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink text-sm font-medium resize-y"
                      />
                    )}

                    {f.type === 'image' && (
                      <div className="space-y-2">
                        {form[f.name] && (
                          <img src={form[f.name]} alt="Preview" className="w-full h-32 object-cover rounded-xl border-2 border-rute-cream-dark" />
                        )}
                        <input
                          type="text"
                          value={form[f.name] ?? ''}
                          onChange={(e) => updateField(f.name, e.target.value)}
                          placeholder="URL gambar (https://...)"
                          className="w-full px-4 py-3 bg-rute-cream rounded-xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink text-sm font-medium"
                        />
                      </div>
                    )}

                    {f.type === 'select' && (
                      <select
                        value={form[f.name] ?? ''}
                        onChange={(e) => updateField(f.name, e.target.value)}
                        className="w-full px-4 py-3 bg-rute-cream rounded-xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink text-sm font-medium"
                      >
                        <option value="">Pilih...</option>
                        {f.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {f.type === 'checkbox' && (
                      <button
                        type="button"
                        onClick={() => updateField(f.name, !form[f.name])}
                        className={cn('flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-colors', form[f.name] ? 'bg-rute-pink text-white border-rute-pink-dark' : 'bg-rute-cream text-foreground border-rute-cream-dark')}
                      >
                        <div className={cn('w-5 h-5 rounded-md border-2 flex items-center justify-center', form[f.name] ? 'bg-white border-white' : 'border-muted-foreground')}>
                          {form[f.name] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        {form[f.name] ? 'Ya' : 'Tidak'}
                      </button>
                    )}

                    {f.type === 'list' && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Ketik lalu Enter..."
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const val = (e.target as HTMLInputElement).value.trim();
                                if (val) { updateListItem(f.name, val); (e.target as HTMLInputElement).value = ''; }
                              }
                            }}
                            className="flex-1 px-4 py-2.5 bg-rute-cream rounded-xl border-2 border-rute-cream-dark outline-none focus:border-rute-pink text-sm font-medium"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {((form[f.name] as string[]) || []).map((item, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1.5 bg-rute-pink/10 text-rute-pink px-3 py-1.5 rounded-full text-sm font-medium">
                              {item}
                              <button onClick={() => removeListItem(f.name, idx)} className="hover:text-rute-pink-dark">
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-white flex gap-3 p-5 border-t-2 border-rute-cream-dark">
                <button onClick={close} className="flex-1 py-3 rounded-xl font-bold font-display text-sm bg-rute-cream text-foreground hover:bg-rute-cream-dark transition-colors">
                  Batal
                </button>
                <button onClick={handleSave} className="flex-1 py-3 rounded-xl font-bold font-display text-sm bg-rute-pink text-white hover:bg-rute-pink-dark btn-3d transition-colors">
                  Simpan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
