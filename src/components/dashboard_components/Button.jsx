export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    iconLeft: IconLeft,
    iconRight: IconRight,
    className = '',
    type = 'button',
    onClick,
    ...props
}) => {
    const baseStyles =
        'inline-flex items-center justify-center font-medium font-sans transition-all duration-150 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b52] disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary:
            'bg-[#1f6b52] text-white border border-[#1f6b52] hover:bg-[#17523f] hover:border-[#17523f] active:bg-[#124131]',
        secondary:
            'bg-white text-[#1d2623] border border-[#dde3df] hover:border-[#1f6b52] hover:text-[#1f6b52] active:bg-[#f7f8f6]',
        'accent-soft':
            'bg-[#e3f1ea] text-[#1f6b52] border border-transparent hover:bg-[#d0e8dd] active:bg-[#bde0cf]',
        warning:
            'bg-[#8a5a00] text-white border border-[#8a5a00] hover:bg-[#734b00] active:bg-[#5c3c00]',
        'warning-soft':
            'bg-[#fbf1dc] text-[#8a5a00] border border-[#8a5a00]/20 hover:bg-[#f7e6c4]',
        ghost:
            'bg-transparent text-[#5b6762] border border-transparent hover:text-[#1d2623] hover:bg-[#dde3df]/40',
        danger:
            'bg-red-600 text-white border border-red-600 hover:bg-red-700 active:bg-red-800',
    };

    const sizes = {
        sm: 'text-xs px-3 py-1.5 rounded-sm gap-1.5',
        md: 'text-sm px-4 py-2 rounded-md gap-2',
        lg: 'text-base px-6 py-2.5 rounded-md gap-2.5',
    };

    const currentVariant = variants[variant] || variants.primary;
    const currentSize = sizes[size] || sizes.md;

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            className={`${baseStyles} ${currentVariant} ${currentSize} ${className}`}
            {...props}
        >
            {isLoading ? (
                <svg
                    className="animate-spin h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            ) : (
                IconLeft && <IconLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            )}
            <span>{children}</span>
            {!isLoading && IconRight && (
                <IconRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            )}
        </button>
    );
};

export default Button;

