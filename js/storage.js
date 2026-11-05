/* ================================================================
   Persistencia · localStorage
   Gestiona racha diaria, métricas globales y dominio acumulado por texto.
================================================================ */

export const STORAGE_KEY = 'zen_tea_2control_v1';

/* ---------------------------------------------------------------
   Estado inicial
--------------------------------------------------------------- */
export function defaultProgress() {
  return {
    streak: 0,
    lastDate: null,
    sessions: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    best: 0,
    perText: {
      1: { a: 0, c: 0 },
      2: { a: 0, c: 0 },
      3: { a: 0, c: 0 },
      4: { a: 0, c: 0 },
      5: { a: 0, c: 0 }
    }
  };
}

/* ---------------------------------------------------------------
   Carga desde localStorage (con fusión defensiva)
--------------------------------------------------------------- */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();

    const parsed = JSON.parse(raw);
    const base = defaultProgress();

    return {
      ...base,
      ...parsed,
      perText: { ...base.perText, ...(parsed.perText || {}) }
    };
  } catch (e) {
    return defaultProgress();
  }
}

/* ---------------------------------------------------------------
   Estado vivo en memoria
--------------------------------------------------------------- */
let _progress = loadProgress();

export function getProgress() {
  return _progress;
}

/* ---------------------------------------------------------------
   Guardado
--------------------------------------------------------------- */
export function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_progress));
  } catch (e) {
    /* almacenamiento no disponible o cuota excedida: fallo silencioso */
  }
}

/* ---------------------------------------------------------------
   Reinicio completo
--------------------------------------------------------------- */
export function resetProgress() {
  _progress = defaultProgress();
  saveProgress();
  return _progress;
}

/* ---------------------------------------------------------------
   Actualización de racha diaria
   +1 si la última sesión fue ayer, reinicio a 1 si hubo corte,
   sin cambios si ya se estudió hoy.
--------------------------------------------------------------- */
function updateStreak() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toDateString();

  if (_progress.lastDate === todayStr) return;

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (_progress.lastDate === yesterday.toDateString()) {
    _progress.streak = (_progress.streak || 0) + 1;
  } else {
    _progress.streak = 1;
  }

  _progress.lastDate = todayStr;
}

/* ---------------------------------------------------------------
   Persiste el resultado de una sesión completa
   @param {Array<{qid, text, ok}>} answers
   @param {number} percentage  (0-100)
   @returns {object} progreso actualizado
--------------------------------------------------------------- */
export function persistSession(answers, percentage) {
  answers.forEach(a => {
    _progress.totalAnswered += 1;
    if (a.ok) _progress.totalCorrect += 1;

    if (!_progress.perText[a.text]) {
      _progress.perText[a.text] = { a: 0, c: 0 };
    }
    _progress.perText[a.text].a += 1;
    if (a.ok) _progress.perText[a.text].c += 1;
  });

  _progress.sessions += 1;

  if (percentage > (_progress.best || 0)) {
    _progress.best = percentage;
  }

  updateStreak();
  saveProgress();

  return _progress;
}
