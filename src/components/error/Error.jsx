import { AlertCircle, RefreshCw } from 'lucide-react';
import Card, { CardContent } from '../dashboard_components/Card';
import Button from '../dashboard_components/Button';

export const ErrorState = ({ message, onRetry }) => {
    return (
        <Card className="border-red-200 bg-red-50/50 shadow-none">
            <CardContent className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                </div>

                <div className="space-y-1 max-w-md">
                    <h3 className="text-base font-bold font-serif text-ink">
                        Gagal Memuat Data
                    </h3>
                    <p className="text-xs text-muted-text">
                        {message || 'Terjadi kesalahan sistem saat menghubungi server. Silakan periksa koneksi Anda.'}
                    </p>
                </div>

                {onRetry && (
                    <Button
                        variant="secondary"
                        size="sm"
                        iconLeft={RefreshCw}
                        onClick={onRetry}
                        className="mt-2"
                    >
                        Coba Lagi
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};