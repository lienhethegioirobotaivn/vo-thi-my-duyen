"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-[#0a1b35] py-2 font-semibold text-white hover:bg-[#0a1b35]/90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
