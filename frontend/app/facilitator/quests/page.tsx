"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchQuests, createQuest, updateQuest, publishQuest, deleteQuest, clearQuests, Quest } from '../../../lib/quests';

export default function ManageQuestsPage() {
  return (
    <main className="main-shell">
      <Header />
      <QuestsHero />
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

function QuestsHero() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [mockQuests, setMockQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = { title, description, difficulty };

    try {
      if (editingId) {
        const updated = await updateQuest(editingId, payload);
        if (updated) {
          setMockQuests((s) => s.map((q) => (q.id === editingId ? updated : q)));
          setMessage('Updated (local placeholder).');
        }
      } else {
        const created = await createQuest(payload);
        setMockQuests((s) => [created, ...s]);
        setMessage('Created (local placeholder).');
      }
      setTitle('');
      setDescription('');
      setDifficulty('Beginner');
      setEditingId(null);
      setOpen(false);
    } catch (err) {
      setMessage('Failed to save (placeholder). Check console.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    // Remove any existing persisted quests and fetch the (now-empty) list.
    clearQuests();
    fetchQuests().then((list) => {
      if (mounted) setMockQuests(list);
    });
    return () => {
      mounted = false;
    };
  }, []);

  async function handlePublish(id: number) {
    setLoading(true);
    try {
      const updated = await publishQuest(id);
      if (updated) setMockQuests((s) => s.map((q) => (q.id === id ? updated : q)));
    } finally {
      setLoading(false);
    }
  }

  async function handleArchive(id: number) {
    setLoading(true);
    try {
      const ok = await deleteQuest(id);
      if (ok) setMockQuests((s) => s.filter((q) => q.id !== id));
    } finally {
      setLoading(false);
    }
  }

  function startEdit(q: Quest) {
    setEditingId(q.id);
    setTitle(q.title || '');
    setDescription(q.description || '');
    setDifficulty(q.difficulty || 'Beginner');
    setOpen(true);
  }

  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content quests-hero">
          <input
            type="text"
            placeholder="Search quests..."
            className="search-input"
            aria-label="Search quests"
          />
          <button
            className="add-quest-btn"
            onClick={() => {
              setEditingId(null);
              setTitle('');
              setDescription('');
              setDifficulty('Beginner');
              setOpen(true);
            }}
          >
            Add New Quest
          </button>
        </div>
      </section>

      <section className="content-shell">
        <div className="card" style={{ gridTemplateColumns: '1fr' }}>
          <div className="quests-table-container">
            <table className="quests-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Badge</th>
                  <th>Certificate</th>
                  <th>Difficulty</th>
                  <th>Scheduled For</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockQuests.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ color: '#64748b', padding: '1rem' }}>
                      No quests yet — create one with "Add New Quest" (placeholder)
                    </td>
                  </tr>
                ) : (
                  mockQuests.map((q) => (
                    <tr key={q.id}>
                      <td style={{ padding: '1rem 1.25rem' }}>{q.title}</td>
                      <td style={{ padding: '1rem' }}>
                        <button className="badge-btn">View Badge</button>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button className="certificate-btn">View Certificate</button>
                      </td>
                      <td style={{ padding: '1rem' }}>{q.difficulty}</td>
                      <td style={{ padding: '1rem' }}>{q.scheduled}</td>
                      <td style={{ padding: '1rem' }}>
                        <span className={q.status === 'Published' ? 'status-published' : 'status-draft'}>
                          {q.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '.5rem' }}>
                          <button className="edit-action-btn" onClick={() => startEdit(q)}>Edit</button>
                          {q.status === 'Published' ? (
                            <button className="archive-btn" onClick={() => handleArchive(q.id)}>Archive</button>
                          ) : (
                            <button className="publish-btn" onClick={() => handlePublish(q.id)}>Publish</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(2,6,23,0.6)',
            zIndex: 60,
          }}
          onClick={() => {
            setOpen(false);
            setEditingId(null);
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="card"
            style={{ width: 'min(720px, 95%)' }}
          >
            <h3 style={{ marginTop: 0 }}>{editingId ? 'Edit Quest (placeholder)' : 'Create New Quest (placeholder)'}</h3>
            <label style={{ display: 'block', marginBottom: '.5rem' }}>
              Title
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2"
                style={{ width: '100%', marginTop: '.25rem' }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '.5rem' }}>
              Description
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-4 py-2"
                style={{ width: '100%', marginTop: '.25rem', minHeight: '100px' }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '.5rem' }}>
              Difficulty
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{ width: '100%', marginTop: '.25rem' }}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>

            <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="action-btn"
                onClick={() => {
                  setOpen(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="action-btn" disabled={loading}>
                {loading ? (editingId ? 'Saving...' : 'Creating...') : editingId ? 'Save Changes' : 'Create Quest'}
              </button>
            </div>
            {message && <p style={{ marginTop: '.75rem' }}>{message}</p>}
          </form>
        </div>
      )}
    </>
  );
}

