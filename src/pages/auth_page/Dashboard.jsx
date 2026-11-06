import { Link } from 'react-router-dom';
import {
    ArrowRight,
    BookOpen,
} from 'lucide-react';
import Button from '../../components/dashboard_components/Button';
import Card, { CardContent } from '../../components/dashboard_components/Card';
import { formatRupiah } from '../../components/dashboard_components/currency';
import { useAuth } from "../../context/AuthContext";
import GetPlansForHome from "../../query_logic/dashboard/GetPlansForHome";
import Loading from "../../components/loading/Loading";
import { ErrorState } from "../../components/error/Error";
import { EmptyState } from "../../components/empty/Empty";
import { FetchingState } from "../../components/isFetching/IsFetching";
import NavbarAuth from "../../components/navbar/NavbarAuth";

export default function Dashboard() {
    const { user } = useAuth();
    const { data, isLoading, isError, error, refetch, isFetching } = GetPlansForHome();

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="min-h-screen bg-bg-base text-ink font-sans pb-16">
                    <NavbarAuth lokasi="Dashboard" />

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
                        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-line pb-8">
                            <div>
                                <h1 className="text-3xl font-bold font-serif tracking-tight text-ink">
                                    Halo, {user?.name}
                                </h1>
                                <p className="text-sm text-muted-text mt-2 max-w-2xl">
                                    Kelola rencana makan hemat Anda. Tinjau kembali riwayat menu yang telah dibuat oleh Asisten AI dan pantau daftar belanja dengan mudah.
                                </p>
                            </div>

                            <div className="shrink-0">
                                <Link to="/create-plan">
                                    <Button variant="primary" size="lg" iconRight={ArrowRight}>
                                        Rancang Menu Baru
                                    </Button>
                                </Link>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold font-serif text-ink">
                                    Riwayat Rencana Makan
                                </h2>
                                <Link to='/daily-plans'>
                                    <Button variant="secondary">
                                        Lihat Lebih Lanjut
                                    </Button>
                                </Link>
                            </div>

                            <div className="grid gap-4">
                                {isFetching ? (
                                    <FetchingState />
                                ) : isError ? (
                                    <ErrorState
                                        message={error?.response?.data?.message || error?.message}
                                        onRetry={() => refetch()}
                                    />
                                ) : data && data.length > 0 ? data.map((plan) => {
                                    const target = plan.budget;

                                    const dateStr = new Date(plan.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    });

                                    return (
                                        <Card key={plan.id} className="hover:border-brand transition-all hover:shadow-md">
                                            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="space-y-1.5 flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-lg font-bold font-serif text-ink capitalize">
                                                            {plan.notes}
                                                        </h3>
                                                    </div>
                                                    <p className="text-sm text-muted-text">
                                                        Dibuat pada {dateStr}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-8 text-sm bg-bg-base px-4 py-2 rounded-lg border border-line">
                                                    <div>
                                                        <span className="text-muted-text block text-xs mb-0.5">Target Budget</span>
                                                        <span className="font-semibold text-ink">
                                                            {formatRupiah(target)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 shrink-0 mt-4 md:mt-0">
                                                    <Link to={`/plan-detail/${plan.id}`}>
                                                        <Button variant="primary" size="sm" iconLeft={BookOpen}>
                                                            Lihat Menu
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                }) : (
                                    <EmptyState />
                                )}
                            </div>
                        </section>
                    </main>
                </div>
            )}
        </>
    );
}