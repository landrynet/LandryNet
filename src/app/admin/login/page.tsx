import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { auth } from "@/auth";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

async function authenticate(formData: FormData) {
  "use server";

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/admin/login?error=invalid-credentials");
    }
    throw error;
  }
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  if (session?.user) redirect("/admin/dashboard");

  const { error } = await searchParams;

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="section-kicker">Admin / Secure area</p>
        <h1>Welcome back.</h1>
        <p className="auth-copy">Sign in to manage your portfolio content.</p>
        <form action={authenticate} className="auth-form">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
          {error ? <p className="auth-error">Invalid email or password.</p> : null}
          <button className="button button-dark" type="submit">Sign in <span aria-hidden="true">↗</span></button>
        </form>
      </div>
    </main>
  );
}
