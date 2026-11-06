import { AlertCircle, CheckCircle } from 'lucide-react';
import { PROBLEM_METRICS, SOLUTION_POINTS } from '../../data/mockData';

export default function ProblemSolution() {
    return (
        <section id="masalah" className="py-16 lg:py-24 border-b border-line">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-12 lg:mb-16">
                    <div className="text-xs font-medium text-brand uppercase tracking-wider mb-2">
                        Realita Masak di Kos vs Solusi Terarah
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold font-serif text-ink tracking-tight text-balance">
                        Kenapa Memasak Sendiri di Kos Sering Terasa Melelahkan?
                    </h2>
                    <p className="mt-4 text-base text-muted-text leading-relaxed">
                        Niat berhemat sering gagal bukan karena malas menyalakan kompor, melainkan karena ketiadaan
                        sistem perencanaan menu dan estimasi belanja yang realistis untuk anak kos.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    <div className="bg-surface border border-line p-6 sm:p-8 rounded-lg flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-muted-text" />
                                    <span className="text-xs font-semibold tracking-wider uppercase text-muted-text">
                                        Kondisi Tanpa Perencanaan
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-muted-text">MASALAH NYATA</span>
                            </div>

                            <div className="space-y-6">
                                {PROBLEM_METRICS.map((item, index) => (
                                    <div key={index} className="pb-5 border-b border-line last:border-0 last:pb-0">
                                        <div className="flex items-baseline justify-between mb-1.5">
                                            <h3 className="text-base font-semibold text-ink">
                                                {item.title}
                                            </h3>
                                            <span className="text-sm font-bold font-mono text-ink tabular-nums shrink-0 ml-4">
                                                {item.metric}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-text leading-relaxed">
                                            {item.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-line text-xs text-muted-text italic">
                            Hasil survei: 8 dari 10 anak kos menyerah memasak karena bingung menentukan menu harian.
                        </div>
                    </div>

                    {/* Solution Column */}
                    <div className="bg-surface border-2 border-brand/40 p-6 sm:p-8 rounded-lg flex flex-col justify-between relative">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-brand" />
                                    <span className="text-xs font-semibold tracking-wider uppercase text-brand">
                                        Solusi DapurPintar AI
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-brand font-semibold">SISTEM TERPADU</span>
                            </div>

                            <div className="space-y-6">
                                {SOLUTION_POINTS.map((sol, idx) => (
                                    <div key={idx} className="pb-5 border-b border-line last:border-0 last:pb-0">
                                        <div className="flex items-start gap-3">
                                            <span className="text-xs font-bold font-mono text-brand mt-0.5">
                                                0{idx + 1}.
                                            </span>
                                            <div>
                                                <h3 className="text-base font-semibold text-ink mb-1">
                                                    {sol.title}
                                                </h3>
                                                <p className="text-sm text-muted-text leading-relaxed">
                                                    {sol.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-line flex items-center justify-between text-xs text-brand font-medium">
                            <span>Satu alur terpadu dari layar ponsel langsung ke pasar.</span>
                            <span className="font-mono">HEMAT & CEPAT</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}