import { createClient } from "@/utils/supabase/server";
import { AdminLayout } from "../_components/AdminLayout";
import { redirect } from "next/navigation";

export default async function FooterAdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  async function logout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <AdminLayout userEmail={user?.email} logoutAction={logout}>
      <div>page</div>
    </AdminLayout>
  );
}
