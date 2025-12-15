import Link from "next/link";

const currentQuest = {
  department: {
    title: "DEPARTMENT OF SCIENCE AND TECHNOLOGY",
    organization: "Information Institute",
    logo: "🏛️"
  },
  title: "Light The Tower",
  blurb: "Will you be a keeper of the Tower Flame?",
  difficulty: "Beginner",
  difficultyColor: "bg-red-500",
  goal: "Design and build a functional sensor array using an Arduino that can detect motion or environmental changes, triggering a signal to light up a watchtower. This quest introduces the basics of physical computing, wiring, and sensor integration; your mission is to bring the tower to life and guard the realm!"
};

export default function FacilitatorDashboard() {
  // Placeholder facilitator name until DB/backend wiring is available
  const facilitator = { name: 'Claude' };

  return (
    <main className="main-shell">
      <Header />

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content facilitator-hero">
          <Owl />
            <div className="hero-text">
            <h1 className="text-3xl md-text-4xl font-semibold">Hi there, {facilitator.name}</h1>
          </div>
        </div>
      </section>

      <section className="content-shell">
        <div className="card facilitator-card">
          <div className="quest-info-section">
            <div className="dept-card">
              <div className="dept-logo">{currentQuest.department.logo}</div>
              <div className="dept-info">
                <p className="dept-title">{currentQuest.department.title}</p>
                <p className="dept-org">{currentQuest.department.organization}</p>
              </div>
            </div>
            <div className="quest-detail-card">
              <div className="quest-icon">🌀</div>
              <div className="quest-info">
                <h3 className="quest-name">{currentQuest.title}</h3>
                <p className="quest-blurb">{currentQuest.blurb}</p>
                <button className={`difficulty-btn ${currentQuest.difficultyColor}`}>
                  {currentQuest.difficulty}
                </button>
              </div>
            </div>
          </div>
          <div className="goal-section">
            <h4 className="goal-title">Goal Of This Quest</h4>
            <p className="goal-text">{currentQuest.goal}</p>
            <button className="edit-goal-btn">Edit</button>
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
        <Link href="/facilitator" className="brand">
          MAKER
        </Link>
        <nav className="nav-links">
          <Link href="/facilitator" className="nav-link active">Home</Link>
          <Link href="/facilitator/quests" className="nav-link">Quests</Link>
          <Link href="/facilitator/participants" className="nav-link">Participants</Link>
          <Link href="/facilitator/analytics" className="nav-link">Analytics</Link>
          <Link href="/facilitator/forums" className="nav-link">Forums</Link>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <button className="account-btn flex items-center gap-2">
            <span>Account</span>
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">👤</span>
          </button>
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


