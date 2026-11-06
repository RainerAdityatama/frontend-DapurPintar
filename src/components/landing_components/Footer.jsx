export default function Footer() {
    return (
        <footer className="bg-bg-base border-t border-line text-muted-text text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-2">
                        <span className="text-xl font-bold font-serif text-ink block mb-3">
                            DapurPintar
                        </span>
                        <p className="text-sm text-muted-text max-w-sm leading-relaxed mb-4">
                            Asisten perencanaan menu berbasis AI untuk anak kos. Mengubah anggaran terbatas menjadi
                            masakan variatif, lezat, dan bergizi tanpa pemborosan.
                        </p>
                        <div className="text-xs text-muted-text">
                            Inisiatif teknologi pangan & pengelolaan pengeluaran mahasiswa mandiri.
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">
                            Navigasi Cepat
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <a href="#masalah" className="hover:text-ink transition-colors">
                                    Masalah Anak Kos
                                </a>
                            </li>
                            <li>
                                <a href="#cara-kerja" className="hover:text-ink transition-colors">
                                    Alur Pengguna
                                </a>
                            </li>
                            <li>
                                <a href="#fitur" className="hover:text-ink transition-colors">
                                    Fitur MVP
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">
                            Akses Aplikasi
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <button
                                    className="hover:text-brand transition-colors text-left"
                                >
                                    Pendaftaran Baru (Gratis)
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-text">
                    <div>
                        © {new Date().getFullYear()} DapurPintar AI. Hak cipta dilindungi undang-undang.
                    </div>

                    <div className="text-center md:text-right text-muted-text italic max-w-md">
                        *Catatan Teknis: Harga yang digunakan adalah harga referensi, bukan harga pasar real-time.
                    </div>
                </div>
            </div>
        </footer>
    );
}