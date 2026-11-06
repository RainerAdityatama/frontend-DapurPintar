export const Card = ({
    children,
    className = '',
    selected = false,
    onClick,
    as: Component = 'div',
    ...props
}) => {
    const isInteractive = Boolean(onClick);

    return (
        <Component
            onClick={onClick}
            className={`
        bg-white border transition-all duration-150 rounded-md
        ${selected ? 'border-brand ring-1 ring-brand' : 'border-line'}
        ${isInteractive ? 'cursor-pointer hover:border-brand' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </Component>
    );
};

export const CardHeader = ({ children, className = '', title, subtitle, action }) => {
    return (
        <div className={`p-5 border-b border-line flex items-start justify-between gap-4 ${className}`}>
            {title || subtitle ? (
                <div>
                    {title && (
                        <h3 className="text-lg font-bold font-serif text-ink tracking-tight">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-xs text-muted-text mt-0.5 font-sans">{subtitle}</p>
                    )}
                </div>
            ) : (
                children
            )}
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
};

export const CardContent = ({ children, className = '' }) => {
    return <div className={`p-5 font-sans ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
    return (
        <div className={`p-4 border-t border-line bg-bg-base/50 rounded-b-md ${className}`}>
            {children}
        </div>
    );
};

export default Card;

