import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/dashboard_components/Button";
import Card, { CardContent } from "../../components/dashboard_components/Card";
import { ErrorState } from "../../components/error/Error";
import { EmptyState } from "../../components/empty/Empty";
import { formatRupiah } from "../../components/dashboard_components/currency";
import {
    BookOpen,
    PlusCircle,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
} from 'lucide-react';
import GetDailyPlansLogic from "../../query_logic/daily-plans/GetDailyPlansLogic";
import Loading from "../../components/loading/Loading";
import NavbarAuth from "../../components/navbar/NavbarAuth";

export default function DailyPlans() {
    // State untuk mengontrol halaman saat ini
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error, isFetching, refetch } = GetDailyPlansLogic(page);

    const plans = data?.data || [];
    const pagination = {
        currentPage: data?.current_page || 1,
        lastPage: data?.last_page || 1,
        total: data?.total || 0,
        perPage: data?.per_page || 10,
    };

    const handlePrevPage = () => setPage((old) => Math.max(old - 1, 1));
    const handleNextPage = () => {
        if (page < pagination.lastPage) {
            setPage((old) => old + 1);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="min-h-screen bg-bg-base font-sans pb-16">
                    <NavbarAuth lokasi="Riwayat Rencana" />

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-line pb-6">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-ink tracking-tight">
                                    Semua Riwayat Menu Anda
                                </h1>
                                <p className="text-sm text-muted-text mt-2">
                                    Kelola dan tinjau kembali total {pagination.total} rencana makan yang telah dibuat.
                                </p>
                            </div>
                            <div className="shrink-0 flex gap-3">
                                <Link to="/dashboard">
                                    <Button variant="secondary" size="md" iconLeft={ArrowLeft}>
                                        Kembali Ke Dashboard
                                    </Button>
                                </Link>
                                <Link to="/create-plan">
                                    <Button variant="primary" size="md" iconLeft={PlusCircle}>
                                        Buat Rencana Baru
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-4 min-h-100 relative">
                            {isFetching ? (
                                <div className="p-16 text-center bg-white border border-line rounded-xl shadow-sm">
                                    <div className="w-10 h-10 border-2 border-line border-t-brand rounded-full animate-spin mx-auto mb-4" />
                                    <span className="text-sm font-medium text-muted-text">
                                        Memuat daftar rencana makan...
                                    </span>
                                </div>
                            ) : isError ? (
                                <ErrorState
                                    message={error?.response?.data?.message || 'Gagal memuat riwayat data.'}
                                    onRetry={refetch}
                                />
                            ) : plans.length === 0 ? (
                                <EmptyState />
                            ) : (
                                <div className="grid gap-4">
                                    {plans.map((plan) => {
                                        const dateStr = plan.created_at
                                            ? new Date(plan.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })
                                            : 'Baru saja';

                                        return (
                                            <Card key={plan.id} className="hover:border-brand transition-all hover:shadow-md">
                                                <CardContent className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                    <div className="space-y-1.5 flex-1">
                                                        <h3 className="text-lg font-bold font-serif text-ink capitalize">
                                                            {plan.notes || 'Rencana Makan Hemat'}
                                                        </h3>
                                                        <p className="text-sm text-muted-text">
                                                            Dibuat pada {dateStr}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-8 text-sm bg-bg-base px-4 py-2.5 rounded-lg border border-line">
                                                        <div>
                                                            <span className="text-muted-text block text-[11px] font-semibold uppercase tracking-wider mb-0.5">
                                                                Target Budget
                                                            </span>
                                                            <span className="font-bold text-brand font-mono text-base">
                                                                {formatRupiah(plan.budget)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center shrink-0 mt-2 md:mt-0">
                                                        <Link to={`/plan-detail/${plan.id}`} className="w-full md:w-auto">
                                                            <Button variant="secondary" size="sm" iconLeft={BookOpen} className="w-full">
                                                                Lihat Menu
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {pagination.lastPage > 1 && (
                            <div className="flex items-center justify-between mt-1 pt-6 border-t border-line">
                                <p className="text-sm text-muted-text hidden sm:block">
                                    Menampilkan halaman <span className="font-bold text-ink">{pagination.currentPage}</span> dari <span className="font-bold text-ink">{pagination.lastPage}</span>
                                </p>

                                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        iconLeft={ChevronLeft}
                                        onClick={handlePrevPage}
                                        disabled={pagination.currentPage === 1 || isFetching}
                                    >
                                        <span className="hidden sm:inline">Sebelumnya</span>
                                    </Button>

                                    <span className="text-sm font-semibold text-ink sm:hidden">
                                        {pagination.currentPage} / {pagination.lastPage}
                                    </span>

                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        iconRight={ChevronRight}
                                        onClick={handleNextPage}
                                        disabled={pagination.currentPage === pagination.lastPage || isFetching}
                                    >
                                        <span className="hidden sm:inline">Selanjutnya</span>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            )}
        </>
    );
}