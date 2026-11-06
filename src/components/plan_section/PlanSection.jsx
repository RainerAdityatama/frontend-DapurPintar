import { useState } from 'react';
import {
    Clock,
    Check,
    Sparkles,
    ArrowRight,
} from 'lucide-react';
import Button from '../dashboard_components/Button';
import { formatRupiah } from '../dashboard_components/currency';

export default function PlanSelection({ aiData, formData, onSave, isSaving, onCancel }) {
    // 1. State Active Tab Sesi: 'pagi' | 'siang' | 'malam'
    const [activeSession, setActiveSession] = useState('pagi');

    // 2. State Pilihan Resep (Index 0, 1, atau 2 per Sesi)
    const [selectedRecipes, setSelectedRecipes] = useState({
        pagi: 0,
        siang: 0,
        malam: 0,
    });

    // 3. State Tracking Bahan yang Sudah Dimiliki di Kos (Key: nama bahan, Value: boolean)
    const [ownedItems, setOwnedItems] = useState({});

    // Label Sesi Navigasi
    const sessionTabs = [
        { id: 'pagi', label: 'Makan Pagi' },
        { id: 'siang', label: 'Makan Siang' },
        { id: 'malam', label: 'Makan Malam' },
    ];

    // Helper untuk mendapatkan resep terpilih dari masing-masing sesi
    const getSelectedRecipeObj = (sessionKey) => {
        const options = aiData?.[sessionKey] || [];
        const index = selectedRecipes[sessionKey] ?? 0;
        return options[index] || options[0];
    };

    const currentRecipe = getSelectedRecipeObj(activeSession);

    // Toggle checklist status kepemilikan bahan
    const toggleOwned = (ingredientName) => {
        setOwnedItems((prev) => ({
            ...prev,
            [ingredientName]: !prev[ingredientName],
        }));
    };

    // Handler Ganti Opsi Resep pada Sesi Aktif
    const handleSelectOption = (optionIndex) => {
        setSelectedRecipes((prev) => ({
            ...prev,
            [activeSession]: optionIndex,
        }));
    };

    // Perhitungan Finansial Konsolidasi 3 Sesi
    const allSelectedRecipes = [
        getSelectedRecipeObj('pagi'),
        getSelectedRecipeObj('siang'),
        getSelectedRecipeObj('malam'),
    ].filter(Boolean);

    let totalCostToSpend = 0;
    let totalSavedByKosStok = 0;

    allSelectedRecipes.forEach((recipe) => {
        recipe?.bahan?.forEach((ing) => {
            const isOwned = !!ownedItems[ing.nama];
            if (isOwned) {
                totalSavedByKosStok += ing.harga;
            } else {
                totalCostToSpend += ing.harga;
            }
        });
    });

    // Handler Submit Menyusun Payload Akhir untuk Backend
    const handleSubmitFinalPayload = () => {
        const finalMeals = ['pagi', 'siang', 'malam'].map((sessionKey) => {
            const recipe = getSelectedRecipeObj(sessionKey);
            return {
                session: sessionKey,
                cook_time_minutes: recipe.cook_time_minutes || 20,
                name: recipe.nama,
                instructions: recipe.instruksi,
                ingredients: recipe.bahan.map((ing) => ({
                    name: ing.nama,
                    price: ing.harga,
                    is_owned: !!ownedItems[ing.nama],
                })),
            };
        });

        const finalPayload = {
            date: formData.date,
            budget: Number(formData.budget),
            notes: formData.notes || '',
            meals: finalMeals,
        };

        onSave(finalPayload);
    };

    return (
        <div className="bg-surface border border-line rounded-lg p-6 sm:p-8 lg:p-10 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-line gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-wider mb-1">
                        <Sparkles className="w-4 h-4 text-brand" />
                        <span>Rekomendasi AI Tergenerasi</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-ink">
                        Pilih Kombinasi Menu Harian Anda
                    </h2>
                    <p className="text-sm text-muted-text mt-1">
                        Pilih 1 dari 3 alternatif resep per waktu makan dan tandai bahan yang sudah tersedia di kos.
                    </p>
                </div>

                <div className="bg-bg-base border border-line px-5 py-3 rounded-md shrink-0 flex flex-col justify-center">
                    <span className="text-xs font-medium text-muted-text">TOTAL PERKIRAAN BELANJA</span>
                    <div className="text-2xl font-bold font-mono text-brand tabular-nums">
                        {formatRupiah(totalCostToSpend)}
                    </div>
                    <span className="text-[11px] text-muted-text">
                        Hemat {formatRupiah(totalSavedByKosStok)} dari stok kos
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {sessionTabs.map((tab) => {
                    const active = tab.id === activeSession;
                    const chosenRecipe = getSelectedRecipeObj(tab.id);
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSession(tab.id)}
                            className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-2 border ${active
                                ? 'bg-brand text-white border-brand'
                                : 'bg-bg-base text-ink border-line hover:border-brand'
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span
                                className={`text-xs px-2 py-0.5 rounded font-mono ${active ? 'bg-white/20 text-white' : 'bg-white text-muted-text'
                                    }`}
                            >
                                {chosenRecipe?.nama ? chosenRecipe.nama.split(' ')[0] : 'Pilih'}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-3 text-xs text-muted-text">
                    <span className="font-semibold text-ink uppercase">
                        3 ALTERNATIF RESEP VALID UNTUK {activeSession.toUpperCase()}:
                    </span>
                    <span>Klik kartu untuk memilih resep</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(aiData?.[activeSession] || []).map((opt, idx) => {
                        const isSelected = idx === selectedRecipes[activeSession];
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleSelectOption(idx)}
                                className={`text-left p-4 rounded-md border transition-all flex flex-col justify-between ${isSelected
                                    ? 'border-2 border-brand bg-brand-light/30 ring-1 ring-brand'
                                    : 'border-line bg-surface hover:border-brand/50'
                                    }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-mono font-bold text-muted-text">
                                            Opsi 0{idx + 1}
                                        </span>
                                        {isSelected && (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-brand">
                                                <Check className="w-3.5 h-3.5" /> Terpilih
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-base font-bold text-ink mb-1 font-serif line-clamp-2">
                                        {opt.nama}
                                    </h4>
                                </div>

                                <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs text-muted-text mt-4">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{opt.cook_time_minutes || 20} mnt</span>
                                    </div>
                                    <span className="font-mono font-semibold text-ink">
                                        {formatRupiah(opt.estimasi_harga)}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {currentRecipe && (
                <div className="pt-6 border-t border-line">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                            Bahan untuk: {currentRecipe.nama}
                        </span>
                        <span className="text-xs text-muted-text">Centang jika sudah ada di kos</span>
                    </div>

                    <div className="space-y-2 mb-8">
                        {currentRecipe.bahan?.map((ing, idx) => {
                            const isOwned = !!ownedItems[ing.nama];
                            return (
                                <div
                                    key={idx}
                                    onClick={() => toggleOwned(ing.nama)}
                                    className={`flex items-center justify-between p-3 rounded border text-sm cursor-pointer transition-colors ${isOwned
                                        ? 'bg-bg-base border-line text-muted-text'
                                        : 'bg-surface border-line text-ink hover:bg-brand-light/20'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={isOwned}
                                            onChange={() => { }}
                                            className="w-4 h-4 rounded text-brand focus:ring-brand"
                                            id={`ing-${activeSession}-${idx}`}
                                        />
                                        <label htmlFor={`ing-${activeSession}-${idx}`} className="cursor-pointer">
                                            <span className={isOwned ? 'line-through text-muted-text' : 'font-medium'}>
                                                {ing.nama}
                                            </span>
                                        </label>
                                    </div>

                                    <div className="font-mono text-xs tabular-nums">
                                        {isOwned ? (
                                            <span className="text-brand font-medium">Stok Kos (Rp 0)</span>
                                        ) : (
                                            <span>{formatRupiah(ing.harga)}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-line">
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSaving}
                >
                    Batal / Reset
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmitFinalPayload}
                    disabled={isSaving}
                    iconRight={ArrowRight}
                >
                    {isSaving ? 'Menyimpan...' : 'Simpan Rencana Makan'}
                </Button>
            </div>
        </div>
    );
}