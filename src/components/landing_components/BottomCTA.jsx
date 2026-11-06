import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BottomCTA() {
    return (
        <section className="py-16 lg:py-24 bg-brand text-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-light font-medium mb-4">
                    <Sparkles className="w-4 h-4 text-brand-light" />
                    <span>Akses Gratis Selamanya Untuk Anak Kos</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-bold font-serif leading-tight tracking-tight mb-6 max-w-3xl mx-auto text-balance">
                    Siap mengubah cara kamu mengatur uang makan bulanan?
                </h2>

                <p className="text-base sm:text-lg text-brand-light max-w-2xl mx-auto mb-10 leading-relaxed">
                    Bergabunglah sekarang. Masukkan anggaran mingguanmu, biarkan AI menyusun 3 pilihan menu terbaik,
                    dan nikmati daftar belanja terkurasi tanpa pusing.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to='/login'
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-brand bg-white hover:bg-bg-base active:scale-[0.98] rounded-md transition-all shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
                    >
                        <span>Coba DapurPintar Sekarang</span>
                        <ArrowRight className="w-5 h-5 text-brand" />
                    </Link>
                </div>
            </div>
        </section>
    );
}