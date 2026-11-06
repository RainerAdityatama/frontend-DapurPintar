export const InputForm = ({ label, icon: Icon, ...props }) => {
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