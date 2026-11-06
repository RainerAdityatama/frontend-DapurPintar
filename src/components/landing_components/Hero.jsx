import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-line">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-xs font-medium text-brand uppercase tracking-wider mb-4">
                            <span>Perencanaan Menu Cerdas</span>
                            <span aria-hidden="true">·</span>
                            <span>Khusus Anak Kos</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-ink font-serif leading-[1.15] tracking-tight mb-6 text-balance">
                            Masak Hemat & Bervariasi, Tanpa Pusing Mikir Menu.
                        </h1>

                        <p className="text-base sm:text-lg text-muted-text leading-relaxed mb-8 max-w-2xl">
                            Asisten perencanaan menu berbasis AI untuk anak kos, dapatkan variasi masakan,
                            estimasi uang belanja, dan daftar belanja dalam satu alur.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                            <Link
                            to='/login'
                                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-base font-semibold text-white bg-brand hover:bg-brand-hover active:scale-[0.99] rounded-md transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                            >
                                <span>Mulai Rencanakan Menu (Gratis)</span>
                                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </Link>

                            <a
                                href="#cara-kerja"
                                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-ink hover:text-brand hover:bg-surface border border-line rounded-md transition-all"
                            >
                                Lihat Cara Kerja
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="relative bg-surface border border-line p-3 rounded-lg shadow-sm">
                            <div className="relative aspect-16/10 overflow-hidden rounded-md bg-brand-light border border-line">
                                <img
                                    src="/src/assets/hero_kos_meal_prep_1793104917341.jpg"
                                    alt="Bahan segar masakan kos: tempe, tahu, sayuran hijau, telur, dan cabai"
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute top-3 left-3 bg-surface/95 backdrop-blur-sm border border-line px-3 py-1.5 rounded text-xs font-medium text-ink flex items-center gap-1.5 shadow-xs">
                                    <Sparkles className="w-3.5 h-3.5 text-brand" />
                                    <span>3 Pilihan Resep / Slot</span>
                                </div>
                            </div>

                            <div className="p-4 mt-1 bg-surface">
                                <div className="flex items-center justify-between border-b border-line pb-2 text-xs font-medium text-muted-text">
                                    <span>CONTOH ALOKASI HARIAN</span>
                                    <span className="text-brand font-semibold">STATUS: SESUAI BUDGET</span>
                                </div>
                                <div className="pt-3 space-y-2 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-ink">Pagi: Nasi Orak-Arik Buncis</span>
                                        <span className="font-mono text-xs tabular-nums text-muted-text">Rp 12.000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-ink">Siang: Tempe Mendoan + Kangkung</span>
                                        <span className="font-mono text-xs tabular-nums text-muted-text">Rp 15.500</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-ink">Malam: Tahu Balado Kemangi</span>
                                        <span className="font-mono text-xs tabular-nums text-muted-text">Rp 11.500</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-line font-semibold text-ink">
                                        <span>Estimasi Uang Belanja</span>
                                        <span className="font-mono tabular-nums text-brand">Rp 39.000 / hari</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}