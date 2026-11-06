import { Mail, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginLogic from '../../auth_logic/LoginLogic';

const Input = ({ label, icon: Icon, ...props }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-ink">
                {label}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-[#8b9893]" />
                </div>

                <input
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-line rounded-xl text-sm text-ink placeholder-[#a2adac] transition-all duration-200 ease-in-out hover:border-[#b4c0bb] focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none shadow-sm"
                    {...props}
                />
            </div>
        </div>
    );
};

export default function Login() {
    const { email, password, setEmail, setPassword, isLoading, login } = LoginLogic();

    return (
        <div className="min-h-screen bg-bg-base flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-text hover:text-brand transition-colors mb-6 cursor-pointer"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali ke Beranda</span>
                </Link>

                <h1 className="text-3xl font-bold font-serif text-ink tracking-tight">
                    DapurPintar
                </h1>
                <p className="mt-2 text-sm text-muted-text leading-relaxed">
                    Masuk ke akun Anda untuk merencanakan menu hemat dan melihat daftar belanja.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm border border-line rounded-2xl sm:px-10">
                    <form className="space-y-6" onSubmit={login}>
                        <Input
                            label="Alamat Email"
                            type="email"
                            required
                            icon={Mail}
                            placeholder="Masukan Email Anda..."
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            label="Kata Sandi"
                            type="password"
                            required
                            icon={Lock}
                            placeholder="Masukan Password Anda..."
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-brand hover:bg-[#185541] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all duration-200 mt-4"
                        >
                            {isLoading ? "Memproses..." : "Masuk ke Akun"}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-line text-center">
                        <p className="text-sm text-muted-text">
                            Belum punya akun?{' '}
                            <Link
                                to="/register"
                                className="font-semibold text-brand hover:text-[#185541] hover:underline transition-colors"
                            >
                                Daftar akun
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}