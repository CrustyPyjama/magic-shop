
export function Button({ children, className, disabled }) {
  return (
    <button
      className={`px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
