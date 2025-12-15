export type Quest = {
  id: number;
  title: string;
  description?: string;
  difficulty?: string;
  scheduled?: string;
  status?: string;
};

const STORAGE_KEY = 'maker_mock_quests_v1';

// Start with an empty seed so new installs show no quests by default.
const seed: Quest[] = [];

function safeGetStorage(): Quest[] {
  if (typeof window === 'undefined') return [...seed];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return [...seed];
    }
    return JSON.parse(raw) as Quest[];
  } catch (err) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return [...seed];
  }
}

function writeStorage(items: Quest[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function clearQuests() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

function delay(ms = 200) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchQuests(): Promise<Quest[]> {
  await delay(150);
  return safeGetStorage();
}

export async function createQuest(payload: Partial<Quest>): Promise<Quest> {
  await delay(250);
  const id = Date.now();
  const item: Quest = { id, status: 'Draft', title: payload.title || 'Untitled Quest', description: payload.description, difficulty: payload.difficulty, scheduled: payload.scheduled };
  const items = safeGetStorage();
  items.unshift(item);
  writeStorage(items);
  return item;
}

export async function updateQuest(id: number, updates: Partial<Quest>): Promise<Quest | null> {
  await delay(200);
  const items = safeGetStorage();
  const idx = items.findIndex((q) => q.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...updates };
  writeStorage(items);
  return items[idx];
}

export async function deleteQuest(id: number): Promise<boolean> {
  await delay(150);
  let items = safeGetStorage();
  const before = items.length;
  items = items.filter((q) => q.id !== id);
  writeStorage(items);
  return items.length < before;
}

export async function publishQuest(id: number): Promise<Quest | null> {
  return updateQuest(id, { status: 'Published' });
}
