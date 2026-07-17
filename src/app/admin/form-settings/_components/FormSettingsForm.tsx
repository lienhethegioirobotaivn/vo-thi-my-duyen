"use client";

import { useState } from "react";

interface FormSettingsFormProps {
  formKeys: readonly string[];
  initialData: { formKey: string; recipientEmail: string }[];
  onSave: (formKey: string, recipientEmail: string) => Promise<void>;
}

const LABELS: Record<string, string> = {
  "speaker-booking": "Form đặt lịch diễn giả",
  newsletter: "Form đăng ký newsletter",
};

export function FormSettingsForm({
  formKeys,
  initialData,
  onSave,
}: FormSettingsFormProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(
      formKeys.map((key) => [
        key,
        initialData.find((d) => d.formKey === key)?.recipientEmail || "",
      ]),
    ),
  );
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<Record<string, string>>({});

  const handleSave = async (formKey: string) => {
    setSaving(formKey);
    await onSave(formKey, values[formKey]);
    setSaving(null);
    setMessage((prev) => ({ ...prev, [formKey]: "Lưu thay đổi thành công" }));
  };

  return (
    <div className="max-w-lg space-y-8 text-gray-700">
      {formKeys.map((key) => (
        <div key={key} className="space-y-2">
          <label className="block text-xl font-semibold">
            {LABELS[key] || key}
          </label>
          <input
            type="email"
            value={values[key]}
            onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            placeholder="admin@vtalk.edu.vn"
            className="w-full border rounded px-3 py-2"
          />
          <button
            onClick={() => handleSave(key)}
            disabled={saving === key}
            className="mt-1 bg-black text-white px-3 py-1 rounded-md disabled:opacity-50 cursor-pointer"
          >
            {saving === key ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
          {message[key] && (
            <p className="text-sm text-green-600">{message[key]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
