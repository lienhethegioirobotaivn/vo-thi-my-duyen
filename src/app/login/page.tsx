import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?error=Invalid credentials");
    }

    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-[#0a1b35]">
          Admin Panel
        </h2>
        <form action={login} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="text-gray-800 mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:border-[#0a1b35]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="text-gray-800 mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:border-[#0a1b35]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-[#0a1b35] py-2 font-semibold text-white hover:bg-[#0a1b35]/90 transition cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
