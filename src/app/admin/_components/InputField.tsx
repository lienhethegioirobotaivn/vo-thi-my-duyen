interface InputFieldProps {
  label: string;
  nameVi: string;
  nameEn: string;
  defaultValueVi?: string;
  defaultValueEn?: string;
  isTextArea?: boolean;
}

export function InputField({
  label,
  nameVi,
  nameEn,
  defaultValueVi = "",
  defaultValueEn = "",
  isTextArea = false,
}: InputFieldProps) {
  const inputClass =
    "text-gray-800 w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-[#0a1b35] transition-colors";

  return (
    <div className="space-y-2 border-b border-gray-100 pb-4">
      <label className="text-sm font-semibold text-gray-700 block">
        {label}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {defaultValueVi && (
          <div>
            <span className="text-xs text-gray-600 block mb-1">Tiếng Việt</span>
            {isTextArea ? (
              <textarea
                name={nameVi}
                defaultValue={defaultValueVi}
                rows={3}
                className={inputClass}
              />
            ) : (
              <input
                type="text"
                name={nameVi}
                defaultValue={defaultValueVi}
                className={inputClass}
              />
            )}
          </div>
        )}
        {defaultValueEn && (
          <div>
            <span className="text-xs text-gray-600 block mb-1">Tiếng Anh</span>
            {isTextArea ? (
              <textarea
                name={nameEn}
                defaultValue={defaultValueEn}
                rows={3}
                className={inputClass}
              />
            ) : (
              <input
                type="text"
                name={nameEn}
                defaultValue={defaultValueEn}
                className={inputClass}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
