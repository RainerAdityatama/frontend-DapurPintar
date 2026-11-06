import { ArrowRight, Sliders, Cpu, ShoppingBag } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
    const stepIcons = [
        <Sliders className="w-5 h-5 text-brand" key="1" />,
        <Cpu className="w-5 h-5 text-brand" key="2" />,
        <ShoppingBag className="w-5 h-5 text-brand" key="3" />,
    ];

    return (
        <section id="cara-kerja" className="py-16 lg:py-24 border-b border-line bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-14">
                    <div className="text-xs font-medium text-brand uppercase tracking-wider mb-2">
                        Alur Pengguna Sederhana
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold font-serif text-ink tracking-tight">
                        Bagaimana DapurPintar AI Bekerja
                    </h2>
                    <p className="mt-4 text-base text-muted-text leading-relaxed">
                        Hanya butuh waktu kurang dari 2 menit untuk mengubah nominal budget di dompetmu menjadi daftar
                        belanja siap pakai tanpa kebingungan.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {HOW_IT_WORKS_STEPS.map((step, index) => (
                        <div
                            key={step.step}
                            className="relative bg-bg-base border border-line p-6 sm:p-8 rounded-lg flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-baseline justify-between border-b border-line pb-4 mb-6">
                                    <span className="text-4xl sm:text-5xl font-bold font-serif text-brand leading-none">
                                        {step.step}
                                    </span>
                                    <div className="p-2 bg-surface border border-line rounded-md">
                                        {stepIcons[index]}
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-ink mb-2 font-serif">
                                    {step.title}
                                </h3>
                                <div className="text-xs font-semibold text-brand mb-3">
                                    {step.summary}
                                </div>
                                <p className="text-sm text-muted-text leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-line flex items-center justify-between text-xs text-muted-text">
                                <span>Tahap {index + 1} dari 3</span>
                                <span className="font-mono text-ink">INSTAN</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-bg-base border border-line rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-ink">
                        <span className="font-semibold">Ingin mencoba langsung alur perencanaannya?</span>{' '}
                        <span className="text-muted-text">Uji simulator interaktif di bagian fitur bawah ini atau buat akun.</span>
                    </div>
                    <Link
                        to='/login'
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand hover:bg-brand-hover rounded-md transition-all shrink-0"
                    >
                        <span>Mulai Sekarang</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}