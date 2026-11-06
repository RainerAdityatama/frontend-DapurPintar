import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../../components/dashboard_components/Button';
import Card from '../../components/dashboard_components/Card';
import { formatRupiah } from '../../components/dashboard_components/currency';
import {
    Trash2,
    Clock,
    Info,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import GetDetailDailyPlans from '../../query_logic/daily-plans/GetDetailDailyPlans';
import Loading from '../../components/loading/Loading';
import { ErrorState } from '../../components/error/Error';
import NavbarAuth from '../../components/navbar/NavbarAuth';
import DeletePlanLogic from '../../query_logic/daily-plans/DeletePlanLogic';

export default function DetailDailyPlans() {
    const { id } = useParams();
    const navigate = useNavigate();

    // State untuk Tab Sesi (Pagi, Siang, Malam)
    const [activeSession, setActiveSession] = useState('pagi');
    const sessionTabs = [
        { id: 'pagi', label: 'Pagi' },
        { id: 'siang', label: 'Siang' },
        { id: 'malam', label: 'Malam' },
    ];

    const { data: plan, isLoading, isError, error, refetch, isFetching } = GetDetailDailyPlans(id);


    const { mutate, isPending } = DeletePlanLogic();

    const handleDelete = (e) => {
        e.preventDefault();

        mutate(id);
    }

    if (isLoading || isFetching) {
        return <Loading />;
    }

    if (isError || !plan) {
        return (
            <div className="min-h-screen bg-bg-base pt-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <ErrorState
                        message={error?.response?.data?.message || 'Gagal memuat detail rencana.'}
                        onRetry={refetch}
                    />
                    <div className="mt-4 text-center">
                        <Button variant="ghost" onClick={() => navigate('/daily-plans')}>
                            Kembali ke Riwayat
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // --- Data Processing (Derived State) ---
    // 1. Dapatkan objek meal sesuai tab yang aktif
    const activeMeal = plan.meals?.find((m) => m.session === activeSession);

    // 2. Kalkulasi Finansial Keseluruhan (Total Plan)
    let totalCostToSpend = 0;
    let totalSavedByKosStok = 0;

    plan.meals?.forEach((meal) => {
        meal.ingredients?.forEach((ing) => {
            if (ing.is_owned) {
                totalSavedByKosStok += Number(ing.price);
            } else {
                totalCostToSpend += Number(ing.price);
            }
        });
    });

    // Formatting Tanggal
    const dateStr = plan.created_at
        ? new Date(plan.created_at).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : '-';

    return (
        <>
            <div className="min-h-screen bg-bg-base font-sans pb-20">
                <NavbarAuth lokasi="Detail Daily Plan" />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
                    <Card className="border-line shadow-sm overflow-hidden">
                        <div className="bg-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-line">
                            <div className="flex-1 space-y-2">
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-light/30 text-brand">
                                    {dateStr}
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-ink capitalize">
                                    {plan.notes || 'Rencana Makan Hemat'}
                                </h1>
                                <p className="text-sm text-muted-text">
                                    ID Referensi: #{plan.id.toString().padStart(4, '0')}
                                </p>
                            </div>

                            <div className="flex items-center gap-8 text-sm bg-bg-base px-5 py-4 rounded-xl border border-line shrink-0">
                                <div>
                                    <span className="text-muted-text block text-[11px] font-bold uppercase tracking-wider mb-1">Target Budget</span>
                                    <span className="font-semibold text-ink text-lg">{formatRupiah(plan.budget)}</span>
                                </div>
                                <div className="w-px h-10 bg-line"></div>
                                <div>
                                    <span className="text-muted-text block text-[11px] font-bold uppercase tracking-wider mb-1">Estimasi Belanja</span>
                                    <span className={`font-bold text-lg ${totalCostToSpend <= plan.budget ? 'text-brand' : 'text-red-600'}`}>
                                        {formatRupiah(totalCostToSpend)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-bg-base/50 p-4 px-6 sm:px-8 flex items-start gap-3 text-sm">
                            <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                            <p className="text-muted-text">
                                Total efisiensi pengeluaran dari bahan yang sudah Anda miliki di kos adalah sebesar <span className="font-bold text-ink">{formatRupiah(totalSavedByKosStok)}</span>.
                            </p>
                        </div>
                    </Card>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {sessionTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveSession(tab.id)}
                                    className={`px-5 py-3 rounded-t-lg text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeSession === tab.id
                                        ? 'bg-white text-brand border-brand'
                                        : 'bg-transparent text-muted-text border-transparent hover:bg-white/50 hover:text-ink'
                                        }`}
                                >
                                    Makan {tab.label}
                                </button>
                            ))}
                        </div>

                        <Card className="border-line shadow-sm min-h-100">
                            {activeMeal ? (
                                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-line">
                                    <div className="flex-1 p-6 sm:p-8">
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-wider mb-2">
                                                <span>Resep Pilihan</span>
                                            </div>
                                            <h2 className="text-2xl font-bold font-serif text-ink mb-3 leading-snug">
                                                {activeMeal.name}
                                            </h2>
                                            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-bg-base border border-line px-3 py-1.5 rounded text-muted-text">
                                                <Clock className="w-4 h-4" />
                                                Waktu Persiapan: {activeMeal.cook_time_minutes} Menit
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-sm font-bold text-ink uppercase tracking-wide">Cara Memasak:</h3>
                                            <p className="text-sm text-muted-text leading-relaxed whitespace-pre-line">
                                                {activeMeal.instructions || 'Tidak ada instruksi tersedia.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-[40%] p-6 sm:p-8 bg-bg-base/30">
                                        <h3 className="text-sm font-bold text-ink uppercase tracking-wide mb-4">
                                            Daftar Bahan ({activeMeal.ingredients?.length || 0})
                                        </h3>

                                        <div className="space-y-2.5">
                                            {activeMeal.ingredients?.map((ing, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`flex items-center justify-between p-3 rounded-md border text-sm ${ing.is_owned
                                                        ? 'bg-bg-base border-line opacity-75'
                                                        : 'bg-white border-line'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {ing.is_owned ? (
                                                            <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                                                        ) : (
                                                            <XCircle className="w-4 h-4 text-muted-text shrink-0" />
                                                        )}
                                                        <span className={ing.is_owned ? 'line-through text-muted-text' : 'font-medium text-ink'}>
                                                            {ing.name}
                                                        </span>
                                                    </div>
                                                    <span className="font-mono text-xs font-semibold tabular-nums text-ink">
                                                        {ing.is_owned ? 'Rp 0' : formatRupiah(ing.price)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div className="p-12 text-center text-muted-text text-lg">
                                    Tidak ada data menu untuk sesi ini.
                                </div>
                            )}
                        </Card>
                    </div>

                    <div className="flex justify-end pt-8">
                        <Link to='/daily-plans'>
                            <Button variant='secondary'>
                                Kembali ke Daily Plans
                            </Button>
                        </Link>
                        <button
                            onClick={handleDelete}
                            disabled={isPending}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                        >
                            <Trash2 className="w-4 h-4" />
                            {isPending ? 'Menghapus...' : 'Hapus Rencana Ini'}
                        </button>
                    </div>
                </main>
            </div>
        </>
    )
}