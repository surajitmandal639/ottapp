export default function SubmitButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type="submit"
            className={
                `btn btn-custom btn-bordred btn-block waves-effect waves-light ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ${className}`
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
