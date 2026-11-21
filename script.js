document.addEventListener('DOMContentLoaded', () => {
  // 1. Tema Claro / Escuro persistente
  const themeBtn = document.querySelector('.theme-toggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('vm_theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) themeIcon.textContent = '☾';
  }

  themeBtn?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('vm_theme', isLight ? 'light' : 'dark');
    if (themeIcon) themeIcon.textContent = isLight ? '☾' : '☀';
  });

  // 2. Parallax 3D suave no fundo
  const techObjects = document.querySelectorAll('.tech-object[data-depth]');
  window.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth) - 0.5;
    const yRatio = (e.clientY / window.innerHeight) - 0.5;
    techObjects.forEach((obj) => {
      const depth = Number(obj.dataset.depth || 15);
      obj.style.transform = `translate3d(${xRatio * depth}px, ${yRatio * depth}px, 0)`;
    });
  }, { passive: true });

  // 3. GitHub Live Stats (Bento Grid)
  fetch('https://api.github.com/users/VitorMartinsRS')
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!data) return;
      const countEl = document.getElementById('ghReposCount');
      if (countEl) countEl.textContent = `GITHUB (${data.public_repos} REPOS)`;
    })
    .catch(() => {});

  // 4. Filtro de Projetos
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  function applyFilter(category) {
    filterBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.filter === category);
    });
    projectCards.forEach((card) => {
      const cats = (card.dataset.category || '').split(' ');
      const show = category === 'all' || cats.includes(category);
      card.classList.toggle('is-hidden', !show);
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  document.querySelectorAll('[data-filter-jump]').forEach((pill) => {
    pill.addEventListener('click', () => {
      applyFilter(pill.dataset.filterJump);
      document.getElementById('trabalho')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 5. Abas do Afinp Finance (Ao Vivo / Simulador / Afinp AI)
  const afinpTabs = document.querySelectorAll('.afinp-tab');
  const afinpPanels = {
    live: document.getElementById('afinpViewLive'),
    sim: document.getElementById('afinpViewSim'),
    ai: document.getElementById('afinpViewAi')
  };

  afinpTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.afinpView;
      afinpTabs.forEach((t) => t.classList.toggle('active', t === tab));
      Object.entries(afinpPanels).forEach(([key, panel]) => {
        panel?.classList.toggle('active', key === view);
      });
    });
  });

  // 6. Abas do Portfólio Renato Silva (Ao Vivo / Capturas)
  const renatoTabs = document.querySelectorAll('.renato-tab');
  const renatoPanels = {
    live: document.getElementById('renatoViewLive'),
    shots: document.getElementById('renatoViewShots')
  };

  renatoTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.renatoView;
      renatoTabs.forEach((t) => t.classList.toggle('active', t === tab));
      Object.entries(renatoPanels).forEach(([key, panel]) => {
        panel?.classList.toggle('active', key === view);
      });
    });
  });

  // 7. Simulador Financeiro Afinp
  let totalIn = 6850;
  let totalOut = 1990;
  const finForm = document.getElementById('finForm');
  const finList = document.getElementById('finList');

  function formatBRL(val) {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function updateKPIs() {
    document.getElementById('finIn').textContent = formatBRL(totalIn);
    document.getElementById('finOut').textContent = formatBRL(totalOut);
    document.getElementById('finBal').textContent = formatBRL(totalIn - totalOut);
  }

  finForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = document.getElementById('finDesc').value.trim();
    const val = parseFloat(document.getElementById('finVal').value);
    const type = document.getElementById('finType').value;
    if (!desc || isNaN(val) || val <= 0) return;

    if (type === 'in') totalIn += val;
    else totalOut += val;

    updateKPIs();
    const li = document.createElement('li');
    li.innerHTML = `<span>${desc}</span><strong class="${type === 'in' ? 'text-green' : 'text-red'}">${type === 'in' ? '+' : '-'} ${formatBRL(val)}</strong>`;
    finList?.prepend(li);
    finForm.reset();
  });

  // 8. Simulador Arduino (Cancela + LCD)
  let vagas = 8;
  const lcdLine2 = document.getElementById('lcdLine2');
  const gateArm = document.getElementById('gateArm');
  const gateStatus = document.getElementById('gateStatus');

  function pulseGate(msg) {
    if (lcdLine2) lcdLine2.textContent = `VAGAS LIVRES: ${String(vagas).padStart(2, '0')}`;
    gateArm?.classList.add('open');
    if (gateStatus) gateStatus.textContent = msg;
    setTimeout(() => {
      gateArm?.classList.remove('open');
      if (gateStatus) gateStatus.textContent = 'CANCELA FECHADA';
    }, 1800);
  }

  document.getElementById('btnEntry')?.addEventListener('click', () => {
    if (vagas > 0) {
      vagas--;
      pulseGate('ENTRADA LIBERADA');
    } else if (lcdLine2) {
      lcdLine2.textContent = 'ESTACIONAMENTO LOTADO';
    }
  });

  document.getElementById('btnExit')?.addEventListener('click', () => {
    if (vagas < 12) {
      vagas++;
      pulseGate('SAÍDA LIBERADA');
    }
  });

  // 9. Lightbox Universal (Fotos & Vídeos)
  const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox-src]'));
  const lbModal = document.getElementById('lightboxModal');
  const lbStage = document.getElementById('lbStage');
  const lbTitle = document.getElementById('lbTitle');
  const lbDesc = document.getElementById('lbDesc');
  let currentLbIndex = 0;

  function openLightbox(index) {
    if (!lightboxTriggers.length || !lbModal) return;
    currentLbIndex = (index + lightboxTriggers.length) % lightboxTriggers.length;
    const item = lightboxTriggers[currentLbIndex];
    const type = item.dataset.lightboxType;
    const src = item.dataset.lightboxSrc;

    lbTitle.textContent = item.dataset.lightboxTitle || 'Mídia do Projeto';
    lbDesc.textContent = item.dataset.lightboxDesc || '';
    lbStage.innerHTML = '';

    if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      lbStage.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = lbTitle.textContent;
      lbStage.appendChild(img);
    }

    lbModal.hidden = false;
  }

  function closeLightbox() {
    if (!lbModal) return;
    lbStage.innerHTML = '';
    lbModal.hidden = true;
  }

  lightboxTriggers.forEach((btn, idx) => {
    btn.addEventListener('click', () => openLightbox(idx));
  });

  document.getElementById('lbPrev')?.addEventListener('click', () => openLightbox(currentLbIndex - 1));
  document.getElementById('lbNext')?.addEventListener('click', () => openLightbox(currentLbIndex + 1));
  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  lbModal?.addEventListener('click', (e) => {
    if (e.target === lbModal) closeLightbox();
  });

  // 10. Terminal / Paleta de Comandos (Ctrl + K)
  const cmdModal = document.getElementById('cmdModal');
  const cmdInput = document.getElementById('cmdInput');
  const cmdOutput = document.getElementById('cmdOutput');

  function openCmd() {
    if (!cmdModal) return;
    cmdModal.hidden = false;
    setTimeout(() => cmdInput?.focus(), 40);
  }

  function closeCmd() {
    if (cmdModal) cmdModal.hidden = true;
  }

  function printCmd(html) {
    if (!cmdOutput) return;
    const line = document.createElement('div');
    line.innerHTML = html;
    cmdOutput.appendChild(line);
    cmdOutput.scrollTop = cmdOutput.scrollHeight;
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    printCmd(`<span style="color:#10b981">&gt; ${cmd}</span>`);

    if (cmd === 'help') {
      printCmd('Comandos: <strong>afinp</strong> (Afinp Web), <strong>renato</strong> (Renato Silva), <strong>alan</strong> (Alan Santos), <strong>projects</strong> (projetos), <strong>skills</strong> (stack), <strong>contact</strong> (contato), <strong>clear</strong>.');
    } else if (cmd === 'afinp') {
      printCmd('Abrindo <a href="https://vitormartinsrs.github.io/afinp-web/" target="_blank" style="color:#38bdf8">vitormartinsrs.github.io/afinp-web/</a>...');
      window.open('https://vitormartinsrs.github.io/afinp-web/', '_blank', 'noopener,noreferrer');
    } else if (cmd === 'renato') {
      printCmd('Abrindo <a href="https://renatosilvarep.github.io/Portfoliocomercial/" target="_blank" style="color:#fcd34d">renatosilvarep.github.io/Portfoliocomercial/</a>...');
      window.open('https://renatosilvarep.github.io/Portfoliocomercial/', '_blank', 'noopener,noreferrer');
    } else if (cmd === 'alan') {
      printCmd('Abrindo <a href="https://alanadsantos.github.io/portifolio/" target="_blank" style="color:#a3cc52">alanadsantos.github.io/portifolio/</a>...');
      window.open('https://alanadsantos.github.io/portifolio/', '_blank', 'noopener,noreferrer');
    } else if (cmd === 'projects') {
      closeCmd();
      document.getElementById('trabalho')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === 'skills') {
      printCmd('Stack: React, HTML5, CSS3, JavaScript, Java (Spring Boot), Python, Supabase, Arduino UNO (C/C++).');
    } else if (cmd === 'contact') {
      printCmd('WhatsApp: (81) 99271-0955 · GitHub: @VitorMartinsRS · LinkedIn: /in/vitormartinsrs');
    } else if (cmd === 'clear') {
      cmdOutput.innerHTML = '';
    } else {
      printCmd(`Comando "${cmd}" não reconhecido. Digite <strong>help</strong>.`);
    }
  }

  document.querySelector('[data-open-cmd]')?.addEventListener('click', openCmd);
  document.getElementById('cmdClose')?.addEventListener('click', closeCmd);
  cmdModal?.addEventListener('click', (e) => {
    if (e.target === cmdModal) closeCmd();
  });

  document.querySelectorAll('[data-cmd]').forEach((btn) => {
    btn.addEventListener('click', () => runCommand(btn.dataset.cmd));
  });

  document.getElementById('cmdForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    runCommand(cmdInput.value);
    cmdInput.value = '';
  });

  // 11. Modal de Feedback
  const fbModal = document.getElementById('feedbackModal');
  document.querySelectorAll('[data-open-feedback]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (fbModal) fbModal.hidden = false;
    });
  });
  document.getElementById('fbClose')?.addEventListener('click', () => {
    if (fbModal) fbModal.hidden = true;
  });
  document.getElementById('fbForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('fbStatus');
    if (status) status.textContent = 'Obrigado pelo feedback! Sua mensagem foi registrada.';
    setTimeout(() => {
      if (fbModal) fbModal.hidden = true;
      if (status) status.textContent = '';
      e.target.reset();
    }, 1200);
  });

  // Atalhos de Teclado Globais
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdModal?.hidden ? openCmd() : closeCmd();
    } else if (e.key === 'Escape') {
      closeLightbox();
      closeCmd();
      if (fbModal) fbModal.hidden = true;
    } else if (!lbModal?.hidden && e.key === 'ArrowLeft') {
      openLightbox(currentLbIndex - 1);
    } else if (!lbModal?.hidden && e.key === 'ArrowRight') {
      openLightbox(currentLbIndex + 1);
    }
  });
});
