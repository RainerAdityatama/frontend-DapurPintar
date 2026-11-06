import { ChefHat } from 'lucide-react';
import Card, { CardContent } from '../dashboard_components/Card';

export const EmptyState = () => {
    return (
        <Card className="border-dashed border-2 border-line bg-transparent shadow-none">
            <CardContent className="p-10 text-center flex flex-col items-center justify-center space-y-1">
                <div className="w-11 h-11 bg-bg-base text-brand rounded-full flex items-center justify-center border border-line">
                    <ChefHat className="w-7 h-7" />
                </div>

                <div className="space-y-1 max-w-sm">
                    <h3 className="text-lg font-bold font-serif text-ink">
                        Belum Ada Rencana Makan
                    </h3>
                    <p className="text-xs text-muted-text leading-relaxed">
                        Anda belum memiliki rencana makan tersimpan. Mulai buat racikan menu hemat Anda menggunakan Asisten AI.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};