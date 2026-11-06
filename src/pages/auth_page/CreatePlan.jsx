import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/dashboard_components/Button';
import Card, { CardContent, CardHeader } from '../../components/dashboard_components/Card';
import PlanSelection from '../../components/plan_section/PlanSection';
import { InputForm } from '../../components/input/Input';
import { ArrowLeft, HandCoins } from 'lucide-react';
import CreatePlanLogic from '../../query_logic/meal-plans/CreatePlanLogic';
import SaveMeal from '../../query_logic/meal-plans/SaveMeal';
import NavbarAuth from '../../components/navbar/NavbarAuth';

export default function CreatePlan() {
    const navigate = useNavigate();

    // FSM State: 'IDLE' (Form) | 'SELECTION' (Pilih Menu)
    const [step, setStep] = useState('IDLE');

    // Data State
    const [formData, setFormData] = useState({ date: new Date().toISOString().split('T')[0], budget: '', notes: '' });
    const [aiResponse, setAiResponse] = useState(null); // Menyimpan raw data dari AI (3 opsi per sesi)

    const { mutate, isPending } = CreatePlanLogic(setAiResponse, setStep);
    const { mutate: mutateSave, isPending: isPendingSave } = SaveMeal();

    // Handler Form Generate
    const handleGenerateSubmit = (e) => {
        e.preventDefault();
        if (!formData.budget) {
            return toast.error('Budget wajib diisi.');
        }
        mutate(formData);
    };

    return (
        <div className="min-h-screen bg-bg-base font-sans pb-16">
            <NavbarAuth lokasi="Buat Rencana" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="mb-6">
                    <button
                        onClick={() => step === 'SELECTION' ? setStep('IDLE') : navigate('/dashboard')}
                        className="flex items-center text-sm font-medium text-muted-text hover:text-brand transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        {step === 'SELECTION' ? 'Kembali ke Form' : 'Kembali ke Dashboard'}
                    </button>
                </div>

                {/* Render Step 1: Form Input */}
                {step === 'IDLE' && (
                    <div className="max-w-2xl mx-auto">
                        <Card className="border-line shadow-sm">
                            <CardHeader className="border-b border-line pb-6 mb-1">
                                <h1 className="text-3xl font-bold font-serif text-ink tracking-tight">
                                    Rancang Menu dengan AI
                                </h1>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleGenerateSubmit} className="space-y-5">
                                    <InputForm
                                        label="Target Budget Harian (Rp)"
                                        type="number"
                                        required
                                        icon={HandCoins}
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        placeholder="Contoh: 35000"
                                        min="10000"
                                    />

                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-ink">
                                            Catatan / Preferensi (Opsional)
                                        </label>
                                        <textarea
                                            className="w-full px-4 py-3 bg-white border border-line rounded-xl text-sm text-ink placeholder-muted-text transition-all duration-200 ease-in-out hover:border-[#b4c0bb] focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none shadow-sm resize-none"
                                            rows="3"
                                            placeholder="Contoh: Tinggi protein, tanpa santan, alergi kacang..."
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-full h-12 text-base font-semibold"
                                            disabled={isPending}
                                        >
                                            {isPending ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                                    Meracik Menu AI...
                                                </span>
                                            ) : (
                                                'Generate Menu Sekarang'
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Render Step 2: Halaman Seleksi */}
                {step === 'SELECTION' && (
                    <div className="max-w-4xl mx-auto">
                        <PlanSelection
                            aiData={aiResponse}
                            formData={formData}
                            onSave={(finalPayload) => mutateSave(finalPayload)}
                            isSaving={isPendingSave}
                            onCancel={() => setStep('IDLE')}
                        />
                    </div>
                )}
            </main>
        </div>
    );
}