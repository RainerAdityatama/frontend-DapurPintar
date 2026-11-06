import { Link } from "react-router-dom"
import Button from "../dashboard_components/Button"
import LogoutLogic from "../../auth_logic/LogoutLogic"
import { LogOut } from "lucide-react"

export default function NavbarAuth({ lokasi }) {
    const { logout } = LogoutLogic();

    return (
        <header className="bg-white border-b border-line sticky top-0 z-20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        to="/dashboard"
                        className="text-xl font-bold font-serif text-ink hover:text-brand transition-colors"
                    >
                        DapurPintar
                    </Link>
                    <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-muted-text border-l border-line pl-4">
                        {lokasi}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        onClick={logout}
                        size="sm"
                        iconLeft={LogOut}
                        title="Keluar Akun"
                    >
                        Keluar
                    </Button>
                </div>
            </div>
        </header>
    )
}