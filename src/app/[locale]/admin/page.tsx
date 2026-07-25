import type { Metadata } from "next";
import { isAuthed } from "@/lib/auth";
import { getCatalog } from "@/lib/catalog";
import { brands } from "@/data/brands";
import { Container } from "@/components/ui";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!isAuthed()) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-cream py-16">
        <Container>
          <LoginForm />
        </Container>
      </section>
    );
  }

  const catalog = await getCatalog();
  const brandOptions = brands.map((b) => ({ id: b.id, label: b.note.ar, name: b.name }));

  return (
    <section className="min-h-[70vh] bg-cream py-12">
      <Container>
        <AdminDashboard brands={brandOptions} initialModels={catalog.models} />
      </Container>
    </section>
  );
}
