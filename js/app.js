/* ================================================================
   Zen Study · TEA 2do Control
   Módulo principal: enrutador de pantallas, motor de evaluación,
   Smart Retry, resultados y atajos de teclado.
================================================================ */

import { QUESTIONS, TEXTS } from '../data/questions.js';
import {
  getProgress,
  saveProgress,
  persistSession,
  resetProgress
} from './storage.js';

/* ================================================================
   1. ESTADO DE LA SESIÓN
================================================================ */
const S = {
  queue: [],
  idx: 0,
  mode: 'main',      // 'main' | 'retry'
  label: 'Sesión',
  mainAnswers: [],   // respuestas de la ronda diagnóstica
  retryAnswers: [],  // respuestas de la ronda de repaso
  failed: [],        // ids de preguntas falladas en la ronda principal
  answered: false
};

/* ================================================================
   2. UTILIDADES
================================================================ */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getText(id) {
  return TEXTS.find(t => t.id === id);
}

function pct(c, a) {
  return a > 0 ? Math.round((c / a) * 100) : 0;
}

function showScreen(name) {
  ['home', 'quiz', 'bridge', 'results'].forEach(s => {
    const el = document.getElementById('screen-' + s);
    if (el) el.classList.toggle('hidden', s !== name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ================================================================
   3. HOME
================================================================ */
function renderHome() {
  const P = getProgress();

  document.getElementById('streak-val').textContent = P.streak || 0;
  document.getElementById('stat-sessions').textContent = P.sessions || 0;
  document.getElementById('stat-answered').textContent = P.totalAnswered || 0;
  document.getElementById('stat-acc').textContent =
    P.totalAnswered > 0 ? pct(P.totalCorrect, P.totalAnswered) + '%' : '—';
  document.getElementById('stat-best').textContent =
    P.best > 0 ? P.best + '%' : '—';

  const grid = document.getElementById('text-grid');

  grid.innerHTML = TEXTS.map(t => {
    const n = QUESTIONS.filter(q => q.text === t.id).length;
    const pt = P.perText[t.id] || { a: 0, c: 0 };
    const m = pct(pt.c, pt.a);

    return `
      <button class="glass glass-hover rounded-3xl p-5 text-left" data-text="${t.id}">
        <div class="flex items-start justify-between mb-4">
          <span class="text-[0.62rem] font-extrabold tracking-[0.12em] px-2.5 py-1 rounded-lg"
                style="color:${t.c1};background:${t.c1}1f;border:1px solid ${t.c1}40">
            TEXTO ${t.id}
          </span>
          <span class="text-[0.68rem] text-slate-500 tabular">${n} preguntas</span>
        </div>
        <h4 class="font-bold text-[0.95rem] text-slate-100 mb-1 leading-snug">${t.title}</h4>
        <p class="text-[0.72rem] text-slate-400 mb-4 leading-relaxed">${t.code}</p>
        <div class="flex items-center gap-3">
          <div class="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div class="h-full rounded-full transition-all duration-700"
                 style="width:${m}%;background:linear-gradient(90deg,${t.c1},${t.c2})"></div>
          </div>
          <span class="text-[0.7rem] font-bold tabular" style="color:${t.c1}">${m}%</span>
        </div>
      </button>
    `;
  }).join('');

  grid.querySelectorAll('button[data-text]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.text, 10);
      const qs = QUESTIONS.filter(q => q.text === id);
      const t = getText(id);
      startSession(shuffle(qs), 'main', 'Texto ' + id + ' · ' + t.code);
    });
  });
}

/* ================================================================
   4. INICIO DE SESIÓN
================================================================ */
function startSession(questions, mode, label) {
  S.queue = questions;
  S.idx = 0;
  S.mode = mode;
  S.label = label;
  S.mainAnswers = [];
  S.retryAnswers = [];
  S.failed = [];
  S.answered = false;

  const badge = document.getElementById('quiz-mode-badge');
  badge.textContent = label;
  badge.className =
    'text-[0.68rem] font-bold tracking-wider uppercase px-3.5 py-2 rounded-xl glass-soft text-indigo-300';

  showScreen('quiz');
  renderQuestion();
}

/* ================================================================
   5. RENDER DE PREGUNTA
================================================================ */
function renderQuestion() {
  const q = S.queue[S.idx];
  if (!q) return;

  S.answered = false;
  const t = getText(q.text);

  const tag = document.getElementById('q-tag');
  tag.textContent = 'Texto ' + q.text + ' · ' + t.code;
  tag.style.color = t.c1;
  tag.style.background = t.c1 + '1a';
  tag.style.borderColor = t.c1 + '40';

  document.getElementById('q-text').textContent = q.q;

  const wrap = document.getElementById('q-options');
  wrap.innerHTML = q.o.map((opt, i) => `
    <button class="opt" data-i="${i}" type="button">
      <span class="opt-letter">${'ABCD'[i]}</span>
      <span class="text-[0.92rem] leading-relaxed text-slate-200 flex-1">${opt}</span>
    </button>
  `).join('');

  wrap.querySelectorAll('.opt').forEach(btn => {
    btn.addEventListener('click', () => answerOption(parseInt(btn.dataset.i, 10)));
  });

  const fb = document.getElementById('q-feedback');
  fb.classList.add('hidden');
  fb.innerHTML = '';

  document.getElementById('btn-next').classList.add('hidden');

  document.getElementById('quiz-counter').textContent =
    (S.idx + 1) + ' / ' + S.queue.length;

  document.getElementById('quiz-progress').style.width =
    ((S.idx / S.queue.length) * 100).toFixed(2) + '%';
}

/* ================================================================
   6. RESPUESTA Y RETROALIMENTACIÓN ESPECÍFICA
================================================================ */
function answerOption(i) {
  if (S.answered) return;
  S.answered = true;

  const q = S.queue[S.idx];
  const ok = i === q.c;

  document.querySelectorAll('#q-options .opt').forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.c) btn.classList.add('correct');
    else if (idx === i) btn.classList.add('wrong');
    else btn.classList.add('dim');
  });

  const record = { qid: q.id, text: q.text, ok };

  if (S.mode === 'main') {
    S.mainAnswers.push(record);
    if (!ok && S.failed.indexOf(q.id) === -1) S.failed.push(q.id);
  } else {
    S.retryAnswers.push(record);
  }

  const fb = document.getElementById('q-feedback');
  fb.classList.remove('hidden');
  fb.classList.remove('fb-anim');
  void fb.offsetWidth;
  fb.classList.add('fb-anim');

  if (ok) {
    fb.innerHTML = `
      <div class="rounded-2xl p-5 border"
           style="background:rgba(52,211,153,.10);border-color:rgba(52,211,153,.35)">
        <div class="flex gap-3">
          <div class="shrink-0 w-7 h-7 rounded-lg grid place-items-center"
               style="background:rgba(52,211,153,.22);border:1px solid rgba(52,211,153,.45)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-bold text-emerald-300 text-sm mb-1.5">Correcto · concepto consolidado</p>
            <p class="text-[0.85rem] text-slate-300 leading-relaxed">${q.fb[q.c]}</p>
          </div>
        </div>
      </div>
    `;
  } else {
    fb.innerHTML = `
      <div class="rounded-2xl p-5 border"
           style="background:rgba(251,113,133,.09);border-color:rgba(251,113,133,.32)">
        <div class="flex gap-3">
          <div class="shrink-0 w-7 h-7 rounded-lg grid place-items-center"
               style="background:rgba(251,113,133,.2);border:1px solid rgba(251,113,133,.45)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fda4af" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-bold text-rose-300 text-sm mb-1.5">Incorrecto · por qué es un error conceptual</p>
            <p class="text-[0.85rem] text-slate-300 leading-relaxed">${q.fb[i]}</p>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t" style="border-color:rgba(255,255,255,.09)">
          <p class="text-[0.63rem] font-extrabold tracking-[0.14em] uppercase text-slate-400 mb-1.5">
            Respuesta correcta · ${'ABCD'[q.c]}
          </p>
          <p class="text-[0.85rem] leading-relaxed" style="color:#a7f3d0">${q.fb[q.c]}</p>
        </div>
      </div>
    `;
  }

  const nextBtn = document.getElementById('btn-next');
  nextBtn.classList.remove('hidden');
  nextBtn.innerHTML = (S.idx === S.queue.length - 1)
    ? 'Finalizar <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
    : 'Siguiente <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

  document.getElementById('quiz-progress').style.width =
    (((S.idx + 1) / S.queue.length) * 100).toFixed(2) + '%';
}

/* ================================================================
   7. AVANCE ENTRE PREGUNTAS
================================================================ */
function goNext() {
  if (!S.answered) return;

  if (S.idx < S.queue.length - 1) {
    S.idx++;
    renderQuestion();
  } else {
    finishRound();
  }
}

function finishRound() {
  if (S.mode === 'main' && S.failed.length > 0) {
    showBridge();
  } else {
    showResults();
  }
}

/* ================================================================
   8. PUENTE · SMART RETRY
================================================================ */
function showBridge() {
  document.getElementById('bridge-count').textContent = S.failed.length;

  document.getElementById('bridge-list').innerHTML = S.failed.map(id => {
    const q = QUESTIONS.find(x => x.id === id);
    const t = getText(q.text);
    return `
      <div class="glass-soft rounded-xl px-4 py-3 flex items-start gap-3">
        <span class="shrink-0 mt-0.5 text-[0.6rem] font-extrabold px-2 py-0.5 rounded"
              style="color:${t.c1};background:${t.c1}1f;border:1px solid ${t.c1}40">T${q.text}</span>
        <p class="text-[0.8rem] text-slate-300 leading-snug">${q.q}</p>
      </div>
    `;
  }).join('');

  showScreen('bridge');
}

function startRetry() {
  const qs = S.failed
    .map(id => QUESTIONS.find(q => q.id === id))
    .filter(Boolean);

  S.mode = 'retry';
  S.queue = qs;
  S.idx = 0;
  S.answered = false;

  const badge = document.getElementById('quiz-mode-badge');
  badge.textContent = 'Repaso exprés';
  badge.className =
    'text-[0.68rem] font-bold tracking-wider uppercase px-3.5 py-2 rounded-xl glass-soft text-amber-300';

  showScreen('quiz');
  renderQuestion();
}

/* ================================================================
   9. RESULTADOS
================================================================ */
function computeStats(answers) {
  const byText = {};
  TEXTS.forEach(t => { byText[t.id] = { a: 0, c: 0 }; });

  let total = 0;
  let correct = 0;

  answers.forEach(ans => {
    total++;
    if (ans.ok) correct++;
    if (!byText[ans.text]) byText[ans.text] = { a: 0, c: 0 };
    byText[ans.text].a++;
    if (ans.ok) byText[ans.text].c++;
  });

  return { total, correct, byText };
}

function showResults() {
  const diagnostic = S.mainAnswers.length ? S.mainAnswers : S.retryAnswers;
  const stats = computeStats(diagnostic);
  const percentage = pct(stats.correct, stats.total);

  /* --- Persistencia --- */
  persistSession(diagnostic, percentage);

  /* --- Anillo animado --- */
  const CIRC = 2 * Math.PI * 52;
  const ring = document.getElementById('ring');
  ring.setAttribute('stroke-dasharray', CIRC.toFixed(2));
  ring.setAttribute('stroke-dashoffset', CIRC.toFixed(2));

  setTimeout(() => {
    ring.setAttribute('stroke-dashoffset', (CIRC * (1 - percentage / 100)).toFixed(2));
  }, 120);

  let animated = 0;
  const pctEl = document.getElementById('res-pct');
  const counterAnim = setInterval(() => {
    animated += Math.max(1, Math.ceil(percentage / 30));
    if (animated >= percentage) {
      animated = percentage;
      clearInterval(counterAnim);
    }
    pctEl.textContent = animated + '%';
  }, 30);

  /* --- Título --- */
  let title = 'Reporte de dominio';
  if (percentage >= 90) title = 'Dominio sobresaliente';
  else if (percentage >= 75) title = 'Buen dominio general';
  else if (percentage >= 55) title = 'Dominio en construcción';
  else title = 'Requiere refuerzo';

  document.getElementById('res-title').textContent = title;

  document.getElementById('res-subtitle').textContent =
    'Completaste ' + stats.total +
    ' preguntas diagnósticas. El desglose por fuente te indica exactamente qué texto reforzar antes del control.';

  document.getElementById('res-correct').textContent =
    '✓ ' + stats.correct + ' correctas · ' + (stats.total - stats.correct) + ' falladas';

  /* --- Repaso --- */
  const recoveredEl = document.getElementById('res-recovered');
  if (S.retryAnswers.length > 0) {
    const recovered = S.retryAnswers.filter(a => a.ok).length;
    recoveredEl.textContent =
      '↻ Repaso: ' + recovered + ' / ' + S.retryAnswers.length + ' recuperadas';
  } else {
    recoveredEl.textContent = 'Sin fallos · sesión limpia';
  }

  /* --- Desglose por texto --- */
  const presentTexts = TEXTS.filter(
    t => stats.byText[t.id] && stats.byText[t.id].a > 0
  );

  document.getElementById('res-breakdown').innerHTML = presentTexts.map(t => {
    const s = stats.byText[t.id];
    const p = pct(s.c, s.a);

    return `
      <div>
        <div class="flex items-center justify-between mb-2 gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="shrink-0 text-[0.6rem] font-extrabold px-2 py-0.5 rounded"
                  style="color:${t.c1};background:${t.c1}1f;border:1px solid ${t.c1}40">T${t.id}</span>
            <span class="text-[0.82rem] font-semibold text-slate-200 truncate">${t.code}</span>
          </div>
          <span class="shrink-0 text-[0.75rem] font-bold tabular" style="color:${t.c1}">
            ${p}% <span class="text-slate-500 font-medium">(${s.c}/${s.a})</span>
          </span>
        </div>
        <div class="h-2 rounded-full overflow-hidden" style="background:rgba(255,255,255,.07)">
          <div class="h-full rounded-full transition-all duration-1000"
               style="width:${p}%;background:linear-gradient(90deg,${t.c1},${t.c2});box-shadow:0 0 14px ${t.c1}66"></div>
        </div>
      </div>
    `;
  }).join('');

  /* --- Conceptos pendientes (estado final de cada pregunta) --- */
  const lastMap = {};
  S.mainAnswers.concat(S.retryAnswers).forEach(a => { lastMap[a.qid] = a.ok; });

  const pending = Object.keys(lastMap)
    .filter(id => lastMap[id] === false)
    .map(id => QUESTIONS.find(q => q.id === id))
    .filter(Boolean);

  const pendingWrap = document.getElementById('res-pending-wrap');
  const retryBtn = document.getElementById('btn-retry-pending');

  if (pending.length === 0) {
    pendingWrap.classList.add('hidden');
    retryBtn.classList.add('hidden');
  } else {
    pendingWrap.classList.remove('hidden');
    retryBtn.classList.remove('hidden');
    retryBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M23 4v6h-6M1 20v-6h6"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
      Repetir fallos restantes (${pending.length})
    `;

    document.getElementById('res-pending').innerHTML = pending.map(q => {
      const t = getText(q.text);
      return `
        <div class="glass-soft rounded-xl p-4">
          <div class="flex items-center gap-2.5 mb-2">
            <span class="text-[0.6rem] font-extrabold px-2 py-0.5 rounded"
                  style="color:${t.c1};background:${t.c1}1f;border:1px solid ${t.c1}40">T${q.text}</span>
            <span class="text-[0.68rem] text-slate-500 truncate">${t.code}</span>
          </div>
          <p class="text-[0.83rem] font-semibold text-slate-200 leading-snug mb-2">${q.q}</p>
          <p class="text-[0.8rem] leading-relaxed" style="color:#a7f3d0">
            <span class="text-slate-500 font-semibold">Correcta:</span> ${q.o[q.c]}
          </p>
          <p class="text-[0.78rem] text-slate-400 leading-relaxed mt-2">${q.fb[q.c]}</p>
        </div>
      `;
    }).join('');
  }

  showScreen('results');
}

/* ================================================================
   10. RECUPERACIÓN DE PENDIENTES DESDE RESULTADOS
================================================================ */
function retryPendingFromResults() {
  const lastMap = {};
  S.mainAnswers.concat(S.retryAnswers).forEach(a => { lastMap[a.qid] = a.ok; });

  const pending = Object.keys(lastMap)
    .filter(id => lastMap[id] === false)
    .map(id => QUESTIONS.find(q => q.id === id))
    .filter(Boolean);

  if (pending.length === 0) return;

  startSession(shuffle(pending), 'main', 'Refuerzo dirigido');
}

/* ================================================================
   11. EVENTOS GLOBALES
================================================================ */
function bindEvents() {
  /* Home */
  document.getElementById('btn-start-full').addEventListener('click', () => {
    startSession(shuffle(QUESTIONS), 'main', 'Sesión completa');
  });

  document.getElementById('btn-start-random').addEventListener('click', () => {
    const qs = shuffle(QUESTIONS).slice(0, 12);
    startSession(qs, 'main', 'Repaso aleatorio');
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    const ok = confirm(
      'Se borrará todo el progreso guardado (rachas, precisión y dominio por texto). ¿Continuar?'
    );
    if (!ok) return;
    resetProgress();
    renderHome();
  });

  /* Quiz */
  document.getElementById('btn-next').addEventListener('click', goNext);

  document.getElementById('btn-quit').addEventListener('click', () => {
    if (S.answered || S.idx > 0) {
      if (!confirm('¿Salir de la sesión? El progreso de esta sesión no se guardará.')) return;
    }
    S.queue = [];
    S.idx = 0;
    S.mainAnswers = [];
    S.retryAnswers = [];
    S.failed = [];
    S.answered = false;

    renderHome();
    showScreen('home');
  });

  /* Bridge */
  document.getElementById('btn-start-retry').addEventListener('click', startRetry);

  /* Results */
  document.getElementById('btn-home').addEventListener('click', () => {
    renderHome();
    showScreen('home');
  });

  document.getElementById('btn-retry-pending').addEventListener('click', retryPendingFromResults);

  /* Atajos de teclado */
  document.addEventListener('keydown', (e) => {
    const quizVisible = !document.getElementById('screen-quiz').classList.contains('hidden');
    if (!quizVisible) return;

    if (['1', '2', '3', '4'].includes(e.key) && !S.answered) {
      const idx = parseInt(e.key, 10) - 1;
      const btns = document.querySelectorAll('#q-options .opt');
      if (btns[idx]) answerOption(idx);
    }

    if (e.key === 'Enter' && S.answered) {
      e.preventDefault();
      goNext();
    }
  });
}

/* ================================================================
   12. ARRANQUE
================================================================ */
function init() {
  bindEvents();
  renderHome();
  showScreen('home');
}

init();
