import Link from "next/link";

export default function ManageQuestsPage() {
  return (
    <main className="main-shell">
      <Header />

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content quests-hero">
          {/* Would implement search connected to a users table/model in the DB */}
          <input
            type="text"
            placeholder="Search users by name, email, or ID..."
            className="search-input"
          />
          {/* Opens a quest creation dialog/modal that writes to the DB */}
          <button className="add-quest-btn">Add New Quests</button>
        </div>
      </section>

      <section className="content-shell">
        <div className="card" style={{ gridTemplateColumns: '1fr' }}>
          <div className="quests-table-container">
            {/* Table would be populated by live DB data. Map over fetched quests below. */}
            <table className="quests-table">
              <thead>
                <tr>
                  <th>Badge</th>
                  <th>Certificate</th>
                  <th>Difficulty</th>
                  <th>Scheduled For</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Example for future implementers:
                    {quests.map((quest) => (
                      <tr key={quest.id}> ... </tr>
                    ))}
                    // Where quests is the array from the database/API.
                */}
                {/* Each row would correspond to a DB record; map over DB data */}
              </tbody>
            </table>
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
          <Link href="/facilitator" className="nav-link">Home</Link>
          <Link href="/facilitator/quests" className="nav-link active">Quests</Link>
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

