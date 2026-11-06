export const Badge = ({
    children,
    variant = 'neutral',
    size = 'md',
    className = '',
    icon: Icon,
    ...props
}) => {
    const variants = {
        neutral: 'bg-[#f7f8f6] text-[#5b6762] border border-[#dde3df]',
        accent: 'bg-[#e3f1ea] text-[#1f6b52] border border-[#1f6b52]/30 font-medium',
        warning: 'bg-[#fbf1dc] text-[#8a5a00] border border-[#8a5a00]/30 font-medium',
        ink: 'bg-[#1d2623] text-white border border-[#1d2623]',
        success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
        danger: 'bg-red-50 text-red-700 border border-red-200',
    };

    const sizes = {
        sm: 'text-[11px] px-2 py-0.5 rounded-sm gap-1',
        md: 'text-xs px-2.5 py-1 rounded-sm gap-1.5',
        lg: 'text-sm px-3 py-1.5 rounded-md gap-2',
    };

    return (
        <span
            className={`inline-flex items-center font-sans tracking-wide select-none ${variants[variant] || variants.neutral
                } ${sizes[size] || sizes.md} ${className}`}
            {...props}
        >
            {Icon && <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />}
            <span>{children}</span>
        </span>
    );
};

export default Badge;

