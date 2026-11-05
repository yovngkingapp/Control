/* ================================================================
   Zen Study · TEA 2do Control
   Módulo principal: enrutador de pantallas, motor de evaluación,
   Smart Retry, resultados y atajos de teclado.
================================================================ */

import { QUESTIONS, TEXTS } from '../data/questions.js';
import {
  getProgress,
  persistSession,
  resetProgress
} from './storage.js';

const S = {
  queue: [],
  idx: 0,
  mode: 'main',
  label: 'Sesión',
  mainAnswers: [],
  retryAnswers: [],
  failed: [],
  answered: false
};

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getText(id) {
  return TEXTS.find(text => text.id === id);
}

function pct(correct, total) {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

function showScreen(name) {
  ['home', 'quiz', 'bridge', 'results'].forEach(screen => {
    const element = document.getElementById(`screen-${screen}`);
    if (element) element.classList.toggle('hidden', screen !== name);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHome() {
  const progress = getProgress();
  document.getElementById('streak-val').textContent = progress.streak || 0;
  document.getElementById('stat-sessions').textContent = progress.sessions || 0;
  document.getElementById('stat-answered').textContent = progress.totalAnswered || 0;
  document.getElementById('stat-acc').textContent = progress.totalAnswered > 0
    ? `${pct(progress.totalCorrect, progress.totalAnswered)}%`
    : '—';
  document.getElementById('stat-best').textContent = progress.best > 0 ? `${progress.best}%` : '—';

  const grid = document.getElementById('text-grid');
  grid.innerHTML = TEXTS.map(text => {
    const questionCount = QUESTIONS.filter(question => question.text === text.id).length;
    const textProgress = progress.perText[text.id] || { a: 0, c: 0 };
    const mastery = pct(textProgress.c, textProgress.a);

    return `
      <button class="glass glass-hover rounded-3xl p-5 text-left" data-text="${text.id}" type="button">
        <div class="flex items-start justify-between mb-4">
          <span class="text-[0.62rem] font-extrabold tracking-[0.12em] px-2.5 py-1 rounded-lg"
                style="color:${text.c1};background:${text.c1}1f;border:1px solid ${text.c1}40">TEXTO ${text.id}</span>
          <span class="text-[0.68rem] text-slate-500 tabular">${questionCount} preguntas</span>
        </div>
        <h4 class="font-bold text-[0.95rem] text-slate-100 mb-1 leading-snug">${text.title}</h4>
        <p class="text-[0.72rem] text-slate-400 mb-4 leading-relaxed">${text.code}</p>
        <div class="flex items-center gap-3">
          <div class="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div class="h-full rounded-full transition-all duration-700" style="width:${mastery}%;background:linear-gradient(90deg,${text.c1},${text.c2})"></div>
          </div>
          <span class="text-[0.7rem] font-bold tabular" style="color:${text.c1}">${mastery}%</span>
        </div>
      </button>`;
  }).join('');

  grid.querySelectorAll('button[data-text]').forEach(button => {
    button.addEventListener('click', () => {
      const id = Number.parseInt(button.dataset.text, 10);
      const questions = QUESTIONS.filter(question => question.text === id);
      const text = getText(id);
      if (!text || questions.length === 0) return;
      startSession(shuffle(questions), 'main', `Texto ${id} · ${text.code}`);
    });
  });
}

function startSession(questions, mode, label) {
  if (!Array.isArray(questions) || questions.length === 0) return;

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
  badge.className = 'text-[0.68rem] font-bold tracking-wider uppercase px-3.5 py-2 rounded-xl glass-soft text-indigo-300';

  showScreen('quiz');
  renderQuestion();
}

function renderQuestion() {
  const question = S.queue[S.idx];
  if (!question) return;

  S.answered = false;
  const text = getText(question.text);
  const tag = document.getElementById('q-tag');
  tag.textContent = `Texto ${question.text} · ${text.code}`;
  tag.style.color = text.c1;
  tag.style.background = `${text.c1}1a`;
  tag.style.borderColor = `${text.c1}40`;
  document.getElementById('q-text').textContent = question.q;

  const options = document.getElementById('q-options');
  options.innerHTML = question.o.map((option, index) => `
    <button class="opt" data-i="${index}" type="button">
      <span class="opt-letter">${'ABCD'[index]}</span>
      <span class="text-[0.92rem] leading-relaxed text-slate-200 flex-1">${option}</span>
    </button>`).join('');
  options.querySelectorAll('.opt').forEach(button => {
    button.addEventListener('click', () => answerOption(Number.parseInt(button.dataset.i, 10)));
  });

  const feedback = document.getElementById('q-feedback');
  feedback.classList.add('hidden');
  feedback.innerHTML = '';
  document.getElementById('btn-next').classList.add('hidden');
  document.getElementById('quiz-counter').textContent = `${S.idx + 1} / ${S.queue.length}`;
  document.getElementById('quiz-progress').style.width = `${((S.idx / S.queue.length) * 100).toFixed(2)}%`;
}

function answerOption(index) {
  if (S.answered) return;
  const question = S.queue[S.idx];
  if (!question || index < 0 || index >= question.o.length) return;
  S.answered = true;
  const correct = index === question.c;

  document.querySelectorAll('#q-options .opt').forEach((button, optionIndex) => {
    button.disabled = true;
    if (optionIndex === question.c) button.classList.add('correct');
    else if (optionIndex === index) button.classList.add('wrong');
    else button.classList.add('dim');
  });

  const record = { qid: question.id, text: question.text, ok: correct };
  if (S.mode === 'main') {
    S.mainAnswers.push(record);
    if (!correct && !S.failed.includes(question.id)) S.failed.push(question.id);
  } else {
    S.retryAnswers.push(record);
  }

  const feedback = document.getElementById('q-feedback');
  feedback.classList.remove('hidden', 'fb-anim');
  void feedback.offsetWidth;
  feedback.classList.add('fb-anim');

  if (correct) {
    feedback.innerHTML = `
      <div class="rounded-2xl p-5 border" style="background:rgba(52,211,153,.10);border-color:rgba(52,211,153,.35)">
        <div class="flex gap-3"><div class="shrink-0 w-7 h-7 rounded-lg grid place-items-center" style="background:rgba(52,211,153,.22);border:1px solid rgba(52,211,153,.45)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div><div class="flex-1"><p class="font-bold text-emerald-300 text-sm mb-1.5">Correcto · concepto consolidado</p><p class="text-[0.85rem] text-slate-300 leading-relaxed">${question.fb[question.c]}</p></div></div>
      </div>`;
  } else {
    feedback.innerHTML = `
      <div class="rounded-2xl p-5 border" style="background:rgba(251,113,133,.09);border-color:rgba(251,113,133,.32)">
        <div class="flex gap-3"><div class="shrink-0 w-7 h-7 rounded-lg grid place-items-center" style="background:rgba(251,113,133,.2);border:1px solid rgba(251,113,133,.45)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fda4af" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </div><div class="flex-1"><p class="font-bold text-rose-300 text-sm mb-1.5">Incorrecto · por qué es un error conceptual</p><p class="text-[0.85rem] text-slate-300 leading-relaxed">${question.fb[index]}</p></div></div>
        <div class="mt-4 pt-4 border-t" style="border-color:rgba(255,255,255,.09)"><p class="text-[0.63rem] font-extrabold tracking-[0.14em] uppercase text-slate-400 mb-1.5">Respuesta correcta · ${'ABCD'[question.c]}</p><p class="text-[0.85rem] leading-relaxed" style="color:#a7f3d0">${question.fb[question.c]}</p></div>
      </div>`;
  }

  const nextButton = document.getElementById('btn-next');
  nextButton.classList.remove('hidden');
  nextButton.innerHTML = S.idx === S.queue.length - 1
    ? 'Finalizar <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
    : 'Siguiente <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  document.getElementById('quiz-progress').style.width = `${(((S.idx + 1) / S.queue.length) * 100).toFixed(2)}%`;
}

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
  if (S.mode === 'main' && S.failed.length > 0) showBridge();
  else showResults();
}

function showBridge() {
  document.getElementById('bridge-count').textContent = S.failed.length;
  document.getElementById('bridge-list').innerHTML = S.failed.map(id => {
    const question = QUESTIONS.find(item => item.id === id);
    if (!question) return '';
    const text = getText(question.text);
    return `<div class="glass-soft rounded-xl px-4 py-3 flex items-start gap-3"><span class="shrink-0 mt-0.5 text-[0.6rem] font-extrabold px-2 py-0.5 rounded" style="color:${text.c1};background:${text.c1}1f;border:1px solid ${text.c1}40">T${question.text}</span><p class="text-[0.8rem] text-slate-300 leading-snug">${question.q}</p></div>`;
  }).join('');
  showScreen('bridge');
}

function startRetry() {
  const questions = S.failed.map(id => QUESTIONS.find(question => question.id === id)).filter(Boolean);
  if (questions.length === 0) return;
  S.mode = 'retry';
  S.queue = questions;
  S.idx = 0;
  S.answered = false;
  const badge = document.getElementById('quiz-mode-badge');
  badge.textContent = 'Repaso exprés';
  badge.className = 'text-[0.68rem] font-bold tracking-wider uppercase px-3.5 py-2 rounded-xl glass-soft text-amber-300';
  showScreen('quiz');
  renderQuestion();
}

function computeStats(answers) {
  const byText = Object.fromEntries(TEXTS.map(text => [text.id, { a: 0, c: 0 }]));
  let total = 0;
  let correct = 0;
  answers.forEach(answer => {
    total++;
    if (answer.ok) correct++;
    if (!byText[answer.text]) byText[answer.text] = { a: 0, c: 0 };
    byText[answer.text].a++;
    if (answer.ok) byText[answer.text].c++;
  });
  return { total, correct, byText };
}

function showResults() {
  const diagnosticAnswers = S.mainAnswers.length ? S.mainAnswers : S.retryAnswers;
  const stats = computeStats(diagnosticAnswers);
  const percentage = pct(stats.correct, stats.total);
  persistSession(diagnosticAnswers, percentage);

  const circumference = 2 * Math.PI * 52;
  const ring = document.getElementById('ring');
  ring.setAttribute('stroke-dasharray', circumference.toFixed(2));
  ring.setAttribute('stroke-dashoffset', circumference.toFixed(2));
  requestAnimationFrame(() => {
    ring.setAttribute('stroke-dashoffset', (circumference * (1 - percentage / 100)).toFixed(2));
  });

  const percentageElement = document.getElementById('res-pct');
  const startTime = performance.now();
  const duration = 650;
  function animatePercentage(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    percentageElement.textContent = `${Math.round(percentage * progress)}%`;
    if (progress < 1) requestAnimationFrame(animatePercentage);
  }
  requestAnimationFrame(animatePercentage);

  let title = 'Requiere refuerzo';
  if (percentage >= 90) title = 'Dominio sobresaliente';
  else if (percentage >= 75) title = 'Buen dominio general';
  else if (percentage >= 55) title = 'Dominio en construcción';
  document.getElementById('res-title').textContent = title;
  document.getElementById('res-subtitle').textContent = `Completaste ${stats.total} preguntas diagnósticas. El desglose por fuente te indica exactamente qué texto reforzar antes del control.`;
  document.getElementById('res-correct').textContent = `✓ ${stats.correct} correctas · ${stats.total - stats.correct} falladas`;

  const recoveredElement = document.getElementById('res-recovered');
  if (S.retryAnswers.length > 0) {
    const recovered = S.retryAnswers.filter(answer => answer.ok).length;
    recoveredElement.textContent = `↻ Repaso: ${recovered} / ${S.retryAnswers.length} recuperadas`;
  } else {
    recoveredElement.textContent = 'Sin fallos · sesión limpia';
  }

  const presentTexts = TEXTS.filter(text => stats.byText[text.id]?.a > 0);
  document.getElementById('res-breakdown').innerHTML = presentTexts.map(text => {
    const textStats = stats.byText[text.id];
    const textPercentage = pct(textStats.c, textStats.a);
    return `<div><div class="flex items-center justify-between mb-2 gap-3"><div class="flex items-center gap-2.5 min-w-0"><span class="shrink-0 text-[0.6rem] font-extrabold px-2 py-0.5 rounded" style="color:${text.c1};background:${text.c1}1f;border:1px solid ${text.c1}40">T${text.id}</span><span class="text-[0.82rem] font-semibold text-slate-200 truncate">${text.code}</span></div><span class="shrink-0 text-[0.75rem] font-bold tabular" style="color:${text.c1}">${textPercentage}% <span class="text-slate-500 font-medium">(${textStats.c}/${textStats.a})</span></span></div><div class="h-2 rounded-full overflow-hidden" style="background:rgba(255,255,255,.07)"><div class="h-full rounded-full transition-all duration-1000" style="width:${textPercentage}%;background:linear-gradient(90deg,${text.c1},${text.c2});box-shadow:0 0 14px ${text.c1}66"></div></div></div>`;
  }).join('');

  const lastAnswers = new Map();
  S.mainAnswers.concat(S.retryAnswers).forEach(answer => lastAnswers.set(answer.qid, answer.ok));
  const pending = [...lastAnswers]
    .filter(([, ok]) => !ok)
    .map(([id]) => QUESTIONS.find(question => question.id === id))
    .filter(Boolean);
  const pendingWrap = document.getElementById('res-pending-wrap');
  const retryButton = document.getElementById('btn-retry-pending');

  if (pending.length === 0) {
    pendingWrap.classList.add('hidden');
    retryButton.classList.add('hidden');
  } else {
    pendingWrap.classList.remove('hidden');
    retryButton.classList.remove('hidden');
    retryButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>Repetir fallos restantes (${pending.length})`;
    document.getElementById('res-pending').innerHTML = pending.map(question => {
      const text = getText(question.text);
      return `<div class="glass-soft rounded-xl p-4"><div class="flex items-center gap-2.5 mb-2"><span class="text-[0.6rem] font-extrabold px-2 py-0.5 rounded" style="color:${text.c1};background:${text.c1}1f;border:1px solid ${text.c1}40">T${question.text}</span><span class="text-[0.68rem] text-slate-500 truncate">${text.code}</span></div><p class="text-[0.83rem] font-semibold text-slate-200 leading-snug mb-2">${question.q}</p><p class="text-[0.8rem] leading-relaxed" style="color:#a7f3d0"><span class="text-slate-500 font-semibold">Correcta:</span> ${question.o[question.c]}</p><p class="text-[0.78rem] text-slate-400 leading-relaxed mt-2">${question.fb[question.c]}</p></div>`;
    }).join('');
  }
  showScreen('results');
}

function retryPendingFromResults() {
  const lastAnswers = new Map();
  S.mainAnswers.concat(S.retryAnswers).forEach(answer => lastAnswers.set(answer.qid, answer.ok));
  const pending = [...lastAnswers]
    .filter(([, ok]) => !ok)
    .map(([id]) => QUESTIONS.find(question => question.id === id))
    .filter(Boolean);
  if (pending.length > 0) startSession(shuffle(pending), 'main', 'Refuerzo dirigido');
}

function bindEvents() {
  document.getElementById('btn-start-full').addEventListener('click', () => startSession(shuffle(QUESTIONS), 'main', 'Sesión completa'));
  document.getElementById('btn-start-random').addEventListener('click', () => startSession(shuffle(QUESTIONS).slice(0, 12), 'main', 'Repaso aleatorio'));
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (!confirm('Se borrará todo el progreso guardado (rachas, precisión y dominio por texto). ¿Continuar?')) return;
    resetProgress();
    renderHome();
  });
  document.getElementById('btn-next').addEventListener('click', goNext);
  document.getElementById('btn-quit').addEventListener('click', () => {
    if ((S.answered || S.idx > 0) && !confirm('¿Salir de la sesión? El progreso de esta sesión no se guardará.')) return;
    S.queue = [];
    S.idx = 0;
    S.mainAnswers = [];
    S.retryAnswers = [];
    S.failed = [];
    S.answered = false;
    renderHome();
    showScreen('home');
  });
  document.getElementById('btn-start-retry').addEventListener('click', startRetry);
  document.getElementById('btn-home').addEventListener('click', () => {
    renderHome();
    showScreen('home');
  });
  document.getElementById('btn-retry-pending').addEventListener('click', retryPendingFromResults);

  document.addEventListener('keydown', event => {
    if (document.getElementById('screen-quiz').classList.contains('hidden')) return;
    if (['1', '2', '3', '4'].includes(event.key) && !S.answered) {
      const index = Number.parseInt(event.key, 10) - 1;
      const buttons = document.querySelectorAll('#q-options .opt');
      if (buttons[index]) answerOption(index);
    }
    if (event.key === 'Enter' && S.answered) {
      event.preventDefault();
      goNext();
    }
  });
}

function init() {
  bindEvents();
  renderHome();
  showScreen('home');
}

init();
