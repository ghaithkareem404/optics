import type { Metadata } from "next";
import { isAuthed } from "@/lib/auth";
import { getCatalog } from "@/lib/catalog";
import { categories } from "@/data/categories";
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
  const categoryOptions = categories.map((c) => ({ id: c.id, label: c.ar }));

  return (
    <section className="min-h-[70vh] bg-cream py-12">
      <Container>
        <AdminDashboard
          categories={categoryOptions}
          initialCollections={catalog.collections}
          initialModels={catalog.models}
        />
      </Container>
    </section>
  );
}
