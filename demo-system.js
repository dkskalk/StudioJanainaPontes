/**
 * ==================================================
 * SISTEMA NATIVO DE DEMONSTRAÇÃO E EXPIRAÇÃO AUTOMÁTICA
 * Studio Janaína Portes — Desenvolvido por Douglas Kalk
 * ==================================================
 */

(function () {
  'use strict';

  // Configuração da data limite de expiração: 08/08/2026 às 23:59:59 (horário local)
  // Mês 7 no JavaScript representa Agosto (0-indexed: Jan=0, Feb=1... Aug=7)
  const EXPIRATION_DATE = new Date(2026, 7, 8, 23, 59, 59).getTime();

  // Para simulação: se true ou via query string ?expired=true, força a exibição pós-expiração
  const SIMULATE_EXPIRED = false;

  // Links de contato oficial
  const WHATSAPP_URL = 'https://wa.me/5521988784584';
  const INSTAGRAM_URL = 'https://www.instagram.com/kalkdouglas/';

  /**
   * Inicialização principal quando o DOM estiver pronto
   */
  function initDemoSystem() {
    const now = new Date().getTime();
    const isExpired = SIMULATE_EXPIRED || window.location.search.includes('expired=true') || now >= EXPIRATION_DATE;

    if (isExpired) {
      renderExpiredState();
    } else {
      renderActiveDemoState();
    }
  }

  /**
   * ESTADO ATIVO (Antes da expiração)
   */
  function renderActiveDemoState() {
    // 1. Criar e renderizar Badge Flutuante
    createFloatingBadge();

    // 2. Agendar Popup Intercom para 15 segundos se ainda não foi fechado nesta sessão
    scheduleIntercomPopup();
  }

  /**
   * Criação do Badge Flutuante (Canto inferior direito)
   */
  function createFloatingBadge() {
    if (document.getElementById('demo-badge')) return;

    const badge = document.createElement('div');
    badge.id = 'demo-badge';
    badge.className = 'demo-badge';
    badge.setAttribute('role', 'region');
    badge.setAttribute('aria-label', 'Informações de demonstração');

    badge.innerHTML = `
      <div class="demo-badge-info">
        <div class="demo-badge-header">
          <span>✨</span> Versão de demonstração
        </div>
        <div class="demo-badge-time">
          Disponível por mais: <span id="demo-countdown-timer">--d --h --m --s</span>
        </div>
      </div>
      <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="demo-badge-btn">Conversar</a>
    `;

    document.body.appendChild(badge);

    // Atualizar contagem regressiva imediatamente e a cada 1 segundo
    updateCountdown();
    const timerInterval = setInterval(() => {
      const isStillActive = updateCountdown();
      if (!isStillActive) {
        clearInterval(timerInterval);
        renderExpiredState();
      }
    }, 1000);
  }

  /**
   * Atualiza os números da contagem regressiva
   */
  function updateCountdown() {
    const timerElem = document.getElementById('demo-countdown-timer');
    if (!timerElem) return false;

    const now = new Date().getTime();
    const diff = EXPIRATION_DATE - now;

    if (diff <= 0) {
      return false;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    let timeFormatted = '';
    if (days > 0) {
      timeFormatted = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    } else {
      timeFormatted = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
    }

    timerElem.textContent = timeFormatted;
    return true;
  }

  /**
   * Agendamento do Popup Estilo Intercom (15 segundos)
   */
  function scheduleIntercomPopup() {
    // Verificar se já foi fechado na sessão atual
    if (sessionStorage.getItem('demo_popup_closed') === 'true') {
      return;
    }

    setTimeout(() => {
      // Re-verificar validade do tempo e se popup já foi fechado
      if (
        new Date().getTime() < EXPIRATION_DATE &&
        sessionStorage.getItem('demo_popup_closed') !== 'true' &&
        !document.getElementById('demo-popup')
      ) {
        createIntercomPopup();
      }
    }, 15000);
  }

  /**
   * Criação do Popup Intercom
   */
  function createIntercomPopup() {
    const popup = document.createElement('div');
    popup.id = 'demo-popup';
    popup.className = 'demo-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-label', 'Aviso de versão de demonstração');

    popup.innerHTML = `
      <div class="demo-popup-header">
        <span class="demo-popup-badge">✨ Demonstração</span>
        <button class="demo-popup-close" id="demo-popup-close-x" aria-label="Fechar aviso">&times;</button>
      </div>
      <div class="demo-popup-body">
        <p>Este projeto está disponível em uma versão de demonstração por tempo limitado.</p>
        <p>Após o encerramento do período de demonstração ele ficará temporariamente indisponível, mas poderá ser publicado novamente a qualquer momento.</p>
      </div>
      <div class="demo-popup-actions">
        <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="demo-popup-btn-primary">
          Conversar pelo WhatsApp
        </a>
        <button class="demo-popup-btn-secondary" id="demo-popup-close-btn">Fechar</button>
      </div>
    `;

    document.body.appendChild(popup);

    const closePopup = () => {
      sessionStorage.setItem('demo_popup_closed', 'true');
      if (popup && popup.parentNode) {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(10px)';
        popup.style.transition = 'all 0.25s ease';
        setTimeout(() => popup.remove(), 250);
      }
    };

    document.getElementById('demo-popup-close-x')?.addEventListener('click', closePopup);
    document.getElementById('demo-popup-close-btn')?.addEventListener('click', closePopup);
  }

  /**
   * ESTADO EXPIRADO (A partir de 08/08/2026 23:59:59)
   */
  function renderExpiredState() {
    // 1. Remover badge ou popup se existirem
    document.getElementById('demo-badge')?.remove();
    document.getElementById('demo-popup')?.remove();

    // 2. Aplicar filtro visual no DOM do site (fundo visível e rodando normalmente)
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach((child) => {
      if (child.id !== 'demo-expired-overlay' && child.tagName !== 'SCRIPT' && child.tagName !== 'LINK') {
        child.classList.add('demo-expired-blur');
      }
    });

    // 3. Criar e renderizar Overlay Glassmorphism se não existir
    if (!document.getElementById('demo-expired-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'demo-expired-overlay';
      overlay.className = 'demo-expired-overlay';

      overlay.innerHTML = `
        <div class="demo-expired-card">
          <h1 class="demo-expired-title">Projeto temporariamente indisponível</h1>
          
          <div class="demo-expired-body">
            <p>Se você chegou até esta página, provavelmente acessou um link de um projeto desenvolvido por mim.</p>
            <p>Este site foi criado como uma proposta de apresentação para demonstrar, na prática, como uma presença profissional na internet pode fortalecer uma marca, transmitir credibilidade e gerar novas oportunidades de negócio.</p>
            <p>Neste momento, o projeto não está publicado.</p>
            <p>Entendo perfeitamente que nem sempre o momento é o ideal para investir em uma nova estratégia digital. Cada empresa possui suas prioridades, seu planejamento e seu tempo.</p>
            <p>Ainda assim, existe uma certeza: empresas que investem continuamente em sua presença digital costumam construir autoridade, aumentar sua visibilidade e colher resultados cada vez mais consistentes ao longo do tempo.</p>
            <p>Foi um enorme prazer desenvolver este projeto e imaginar todo o potencial que ele poderia alcançar.</p>
            <p>Se, em algum momento, você decidir colocar este site no ar novamente, todo o trabalho realizado poderá ser recuperado e publicado rapidamente, preservando toda a identidade visual, conteúdo e estrutura já desenvolvidos.</p>
            <p>Será um prazer conversar novamente e encontrar uma solução que faça sentido para o seu momento atual.</p>
          </div>

          <hr class="demo-expired-divider">

          <div class="demo-expired-contact-block">
            <div class="demo-expired-author-info">
              <span class="demo-expired-author-name">Douglas Kalk</span>
              <span class="demo-expired-author-role">Especialista em Soluções Digitais</span>
            </div>
            <div class="demo-expired-buttons">
              <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="demo-btn-whatsapp">
                💬 Conversar pelo WhatsApp
              </a>
              <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="demo-btn-instagram">
                Instagram
              </a>
            </div>
          </div>

          <div class="demo-expired-quote-box">
            <p class="demo-expired-quote">
              "Grandes projetos raramente começam no momento perfeito. Eles começam quando alguém decide dar o próximo passo."
            </p>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);
    }
  }

  // Executar quando o DOM estiver carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDemoSystem);
  } else {
    initDemoSystem();
  }
})();
