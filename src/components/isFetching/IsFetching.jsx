import Card, { CardContent } from "../dashboard_components/Card";

export const FetchingState = () => {
    return (
        <Card className="border-dashed border-2 border-line bg-transparent shadow-none">
            <CardContent className="p-10 text-center flex flex-col items-center justify-center space-y-1">
                <div className="space-y-1 max-w-sm">
                    <p className="text-lg text-muted-text leading-relaxed">
                        Sedang Memuat Data...
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};