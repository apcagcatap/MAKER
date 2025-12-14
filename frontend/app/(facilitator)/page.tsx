import Link from "next/link";

export default function FacilitatorDashboard() {
  return (
    <main className="main-shell">
      <Header />

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <Owl />
          <h1 className="text-3xl md:text-4xl font-semibold">Facilitator Dashboard</h1>
          <p className="text-lg text-white/80">Manage quests and guide participants</p>
        </div>
      </section>

      <section className="content-shell">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Facilitator Features</h2>
          <p className="text-gray-700 mb-6">
            This is the facilitator dashboard. Here you can manage quests, view participant progress, and facilitate learning activities.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard title="Manage Quests" description="Create and edit quests for participants" />
            <FeatureCard title="View Participants" description="Monitor participant progress and engagement" />
            <FeatureCard title="Analytics" description="View detailed analytics and reports" />
            <FeatureCard title="Settings" description="Configure quest settings and preferences" />
          </div>
        </div>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="header-bar">
      <div className="header-inner">
        <Link href="/" className="brand">
          MAKER
        </Link>
        <nav className="nav-links">
          <Link href="/facilitator" className="nav-link">Dashboard</Link>
          <Link href="/facilitator/quests" className="nav-link">Quests</Link>
          <Link href="/facilitator/participants" className="nav-link">Participants</Link>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <button className="account-btn">Account</button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </header>
  );
}

function Owl() {
  return (
    <div className="owl">
      <span role="img" aria-label="owl">
        🦉
      </span>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3> 
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}



