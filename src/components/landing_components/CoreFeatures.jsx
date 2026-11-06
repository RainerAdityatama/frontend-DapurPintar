import { useState } from 'react';
import {
    Sparkles,
    Calculator,
    ListChecks,
    RefreshCw,
    Check,
    Clock,
    ArrowRight,
} from 'lucide-react';
import { CORE_FEATURES_LIST, SAMPLE_MEAL_SLOTS } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function CoreFeatures() {
    // Interactive Simulator State
    const [mealSlots, setMealSlots] = useState(SAMPLE_MEAL_SLOTS);
    const [activeSlotId, setActiveSlotId] = useState('siang');

    // Track items marked as already owned in kos
    const [ownedItems, setOwnedItems] = useState({
        'Bawang merah & putih': true,
        'Kecap asin & merica': true,
        'Saus tiram sachet': true,
        'Quick Oat instant': true,
        'Abon sapi / ayam kos': true,
        'Beras kosan': true,
        'Minyak & daun jeruk': true,
        'Minyak goreng & garam': true,
        'Bawang putih geprek': true,
        'Bumbu kaldu bubuk & lada': true,
        'Bawang goreng tabur': true,
        'Sambal terasi sachet': true,
        'Mie instan kuah/goreng': true,
        'Minyak kelapa kosan': true,
    });

    // Active slot object
    const currentSlot = mealSlots.find((s) => s.slotId === activeSlotId) || mealSlots[0];
    const selectedRecipe = currentSlot.options[currentSlot.selectedOptionIndex];

    // Handler for Single-Slot Swap (Requirement #4)
    const handleSelectRecipe = (slotId, optionIndex) => {
        setMealSlots((prev) =>
            prev.map((slot) =>
                slot.slotId === slotId
                    ? { ...slot, selectedOptionIndex: optionIndex }
                    : slot
            )
        );
    };

    // Toggle owned state for an ingredient
    const toggleOwned = (name) => {
        setOwnedItems((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    // Calculate consolidated grocery list and total costs
    const allSelectedRecipes = mealSlots.map(
        (slot) => slot.options[slot.selectedOptionIndex]
    );

    // Aggregate ingredients across all 3 selected meals
    const groceryItemsMap = new Map();

    allSelectedRecipes.forEach((recipe) => {
        recipe.ingredients.forEach((ing) => {
            const isOwned = !!ownedItems[ing.name];
            if (groceryItemsMap.has(ing.name)) {
                const existing = groceryItemsMap.get(ing.name);
                groceryItemsMap.set(ing.name, {
                    ...existing,
                    cost: existing.cost + ing.cost,
                });
            } else {
                groceryItemsMap.set(ing.name, {
                    name: ing.name,
                    quantity: ing.quantity,
                    cost: ing.cost,
                    isOwned,
                });
            }
        });
    });

    const consolidatedGroceryList = Array.from(groceryItemsMap.values());
    const itemsToBuy = consolidatedGroceryList.filter((item) => !item.isOwned);
    const totalCostToSpend = itemsToBuy.reduce((sum, item) => sum + item.cost, 0);
    const totalSavedByKosanStok = consolidatedGroceryList
        .filter((item) => item.isOwned)
        .reduce((sum, item) => sum + item.cost, 0);

    const featureIcons = [
        <Sparkles className="w-5 h-5 text-brand" key="1" />,
        <Calculator className="w-5 h-5 text-brand" key="2" />,
        <ListChecks className="w-5 h-5 text-brand" key="3" />,
        <RefreshCw className="w-5 h-5 text-brand" key="4" />,
    ];

    return (
        <section id="fitur" className="py-16 lg:py-24 border-b border-line">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-14">
                    <div className="text-xs font-medium text-brand uppercase tracking-wider mb-2">
                        Spesifikasi Fitur MVP
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold font-serif text-ink tracking-tight">
                        Dirancang Presisi untuk Kebutuhan Anak Kos
                    </h2>
                    <p className="mt-4 text-base text-muted-text leading-relaxed">
                        Empat pilar fungsional yang memastikan kamu bisa makan enak, bergizi, dan bervariasi tanpa
                        pernah khawatir uang saku jebol sebelum tanggal gajian atau kiriman bulanan.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
                    {CORE_FEATURES_LIST.map((feat, idx) => (
                        <div
                            key={feat.number}
                            className="bg-surface border border-line p-6 sm:p-8 rounded-lg flex flex-col justify-between hover:border-brand/60 transition-colors"
                        >
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-line mb-5">
                                    <span className="text-2xl font-serif font-bold text-brand">
                                        {feat.number}
                                    </span>
                                    <div className="p-2 bg-bg-base border border-line rounded">
                                        {featureIcons[idx]}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-ink font-serif mb-2">
                                    {feat.title}
                                </h3>
                                <div className="text-xs font-semibold text-brand mb-3">
                                    {feat.summary}
                                </div>
                                <p className="text-sm text-muted-text leading-relaxed mb-6">
                                    {feat.description}
                                </p>
                            </div>

                            <div className="pt-4 border border-line text-xs text-ink font-medium flex items-start gap-2 bg-bg-base/60 p-3 rounded">
                                <span className="text-brand font-bold">Dampak:</span>
                                <span>{feat.benefit}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-surface border border-line rounded-lg p-6 sm:p-8 lg:p-10 shadow-xs">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-line gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-wider mb-1">
                                <span>Simulasi Interaktif Langsung</span>
                                <span aria-hidden="true">·</span>
                                <span>Coba Di Sini</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold font-serif text-ink">
                                Uji Coba Cara Kerja 3 Pilihan & Estimasi Belanja
                            </h3>
                            <p className="text-sm text-muted-text mt-1">
                                Pilih slot makan, klik alternatif resep (perencanaan fleksibel), dan centang bahan yang sudah kamu miliki di kos.
                            </p>
                        </div>

                        <div className="bg-bg-base border border-line px-5 py-3 rounded-md shrink-0 flex flex-col justify-center">
                            <span className="text-xs font-medium text-muted-text">TOTAL PERKIRAAN BELANJA</span>
                            <div className="text-2xl font-bold font-mono text-brand tabular-nums">
                                Rp {totalCostToSpend.toLocaleString('id-ID')}
                            </div>
                            <span className="text-[11px] text-muted-text">
                                Hemat Rp {totalSavedByKosanStok.toLocaleString('id-ID')} dari stok kos
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                        {mealSlots.map((slot) => {
                            const active = slot.slotId === activeSlotId;
                            const chosen = slot.options[slot.selectedOptionIndex];
                            return (
                                <button
                                    key={slot.slotId}
                                    onClick={() => setActiveSlotId(slot.slotId)}
                                    className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-2 border ${active
                                        ? 'bg-brand text-white border-brand'
                                        : 'bg-bg-base text-ink border-line hover:border-brand'
                                        }`}
                                >
                                    <span>{slot.label}</span>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded font-mono ${active ? 'bg-white/20 text-white' : 'bg-white text-muted-text'
                                            }`}
                                    >
                                        {chosen.title.split(' ')[0]}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3 text-xs text-muted-text">
                            <span className="font-semibold text-ink">
                                3 ALTERNATIF RESEP VALID UNTUK {currentSlot.label.toUpperCase()}:
                            </span>
                            <span>Klik kartu untuk menukar resep (Perencanaan Fleksibel)</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {currentSlot.options.map((opt, idx) => {
                                const isSelected = idx === currentSlot.selectedOptionIndex;
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleSelectRecipe(currentSlot.slotId, idx)}
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
                                            <h4 className="text-base font-bold text-ink mb-1 font-serif">
                                                {opt.title}
                                            </h4>
                                        </div>

                                        <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs text-muted-text">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{opt.cookTimeMinutes} mnt</span>
                                            </div>
                                            <span className="font-mono font-semibold text-ink">
                                                Rp {opt.estimatedCost.toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-line">
                        <div className="lg:col-span-7">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                                    Bahan untuk: {selectedRecipe.title}
                                </span>
                                <span className="text-xs text-muted-text">Centang jika sudah ada di kos</span>
                            </div>

                            <div className="space-y-2">
                                {selectedRecipe.ingredients.map((ing) => {
                                    const isOwned = !!ownedItems[ing.name];
                                    return (
                                        <div
                                            key={ing.name}
                                            onClick={() => toggleOwned(ing.name)}
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
                                                    id={`ing-${ing.name}`}
                                                />
                                                <label htmlFor={`ing-${ing.name}`} className="cursor-pointer">
                                                    <span className={isOwned ? 'line-through text-muted-text' : 'font-medium'}>
                                                        {ing.name}
                                                    </span>
                                                    <span className="text-xs text-muted-text ml-2">({ing.quantity})</span>
                                                </label>
                                            </div>

                                            <div className="font-mono text-xs tabular-nums">
                                                {isOwned ? (
                                                    <span className="text-brand font-medium">Stok Kos (Rp 0)</span>
                                                ) : (
                                                    <span>Rp {ing.cost.toLocaleString('id-ID')}</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex flex-col justify-between">
                            <div>
                                <div className="relative aspect-4/3 rounded-md overflow-hidden border border-line mb-4 bg-bg-base">
                                    <img
                                        src="/src/assets/feature_market_grocery_1793104917554.jpg"
                                        alt="Tas belanja pasar tradisional isi sayuran segar dan catatan belanja"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute bottom-2 right-2 bg-surface/90 px-2 py-1 rounded text-[11px] font-mono text-ink border border-line">
                                        {itemsToBuy.length} Item Perlu Dibeli
                                    </div>
                                </div>

                                <div className="text-xs text-muted-text leading-relaxed mb-4">
                                    DapurPintar AI secara otomatis menghitung harga referensi bumbu pasar dan mencocokkan stok di kamar kosmu.
                                </div>
                            </div>

                            <Link
                                to='/login'
                                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-brand hover:bg-brand-hover text-white font-medium text-sm rounded-md transition-colors shadow-sm"
                            >
                                <span>Buka Rencana Mingguan Penuh (Gratis)</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}