/*
 * MiniMercado Bom Preço - JavaScript
 * Fase 2 - Fundamentos de Sistemas Web
 * Arquivo: assets/js/script.js
 */

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema do MiniMercado Bom Preço carregado!');
    
    // Inicializa todas as funcionalidades
    initCarousel();
    initClock();
    initFormValidation();
    initCalendar();
    initAccessibility();
    initAnimations();
});

/**
 * Inicializa o carrossel de produtos em destaque
 */
function initCarousel() {
    const carousel = document.getElementById('produtoCarousel');
    if (!carousel) return;
    
    // Dados dos produtos em destaque
    const produtosDestaque = [
        {
            nome: 'Banana Prata (kg)',
            preco: 'R$ 6,90',
            imagem: 'assets/img/produtos/banana.png',
            descricao: 'Bananas frescas selecionadas'
        },
        {
            nome: 'Tomate Italiano (kg)',
            preco: 'R$ 9,50',
            imagem: 'assets/img/produtos/tomate.png',
            descricao: 'Tomates maduros e saborosos'
        },
        {
            nome: 'Arroz Tipo 1 (5kg)',
            preco: 'R$ 29,90',
            imagem: 'assets/img/produtos/arroz.png',
            descricao: 'Arroz branco tipo 1, grãos selecionados'
        }
    ];
    
    let currentSlide = 0;
    const totalSlides = produtosDestaque.length;
    
    // Cria os slides dinamicamente
    const carouselInner = carousel.querySelector('.carousel-inner');
    if (carouselInner) {
        carouselInner.innerHTML = '';
        
        produtosDestaque.forEach((produto, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            slideDiv.innerHTML = `
                <div class="carousel-slide">
                    <img src="${produto.imagem}" 
                         alt="${produto.nome}" 
                         class="d-block w-100"
                         onerror="this.src='assets/img/placeholder.png'">
                    <div class="carousel-caption">
                        <h5>${produto.nome}</h5>
                        <p>${produto.descricao}</p>
                        <span class="price-tag">${produto.preco}</span>
                    </div>
                </div>
            `;
            carouselInner.appendChild(slideDiv);
        });
    }
    
    // Auto-play do carrossel
    setInterval(() => {
        nextSlide();
    }, 4000); // Muda a cada 4 segundos
    
    function nextSlide() {
        const slides = document.querySelectorAll('.carousel-item');
        if (slides.length === 0) return;
        
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
        
        // Anuncia a mudança para leitores de tela
        announceSlideChange(produtosDestaque[currentSlide]);
    }
    
    function prevSlide() {
        const slides = document.querySelectorAll('.carousel-item');
        if (slides.length === 0) return;
        
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        
        announceSlideChange(produtosDestaque[currentSlide]);
    }
    
    // Event listeners para os botões do carrossel
    const nextBtn = document.querySelector('.carousel-control-next');
    const prevBtn = document.querySelector('.carousel-control-prev');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
}

/**
 * Inicializa o relógio em tempo real
 */
function initClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;
    
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        clockElement.innerHTML = `
            <div class="time">${timeString}</div>
            <div class="date">${dateString}</div>
        `;
        
        // Verifica se a loja está aberta
        updateStoreStatus(now);
    }
    
    // Atualiza a cada segundo
    setInterval(updateClock, 1000);
    updateClock(); // Executa imediatamente
}

/**
 * Atualiza o status de funcionamento da loja
 */
function updateStoreStatus(now) {
    const statusElement = document.getElementById('storeStatus');
    if (!statusElement) return;
    
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hour = now.getHours();
    
    let isOpen = false;
    let statusText = '';
    
    if (day >= 1 && day <= 6) { // Segunda a Sábado
        if (hour >= 8 && hour < 20) {
            isOpen = true;
            statusText = '🟢 Aberto - Funcionamos até às 20h';
        } else {
            statusText = '🔴 Fechado - Abrimos às 8h';
        }
    } else { // Domingo
        statusText = '🔴 Fechado - Abrimos na Segunda às 8h';
    }
    
    statusElement.innerHTML = statusText;
    statusElement.className = `store-status ${isOpen ? 'open' : 'closed'}`;
}

/**
 * Inicializa a validação de formulários
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(form)) {
                showSuccess('Formulário enviado com sucesso!');
                console.log('Dados do formulário:', getFormData(form));
                
                // Simula envio (em produção, enviaria para servidor)
                setTimeout(() => {
                    if (form.id === 'cadastroForm') {
                        // Após cadastro, redireciona para agendamento
                        const agendamentoSection = document.getElementById('agendamento');
                        if (agendamentoSection) {
                            agendamentoSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }, 1000);
            } else {
                showError('Por favor, corrija os campos indicados.');
            }
        });
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

/**
 * Valida um formulário completo
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Valida um campo específico
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove erro anterior
    clearFieldError(field);
    
    // Validação de campo obrigatório
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo é obrigatório.';
        isValid = false;
    }
    
    // Validações específicas por tipo
    if (value && isValid) {
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Por favor, digite um e-mail válido.';
                    isValid = false;
                }
                break;
                
            case 'tel':
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage = 'Formato esperado: (11) 99999-9999';
                    isValid = false;
                }
                break;
        }
        
        // Validação de CPF
        if (field.name === 'cpf' && !validateCPF(value)) {
            errorMessage = 'CPF inválido.';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Valida CPF
 */
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    
    return digit === parseInt(cpf.charAt(10));
}

/**
 * Mostra erro em um campo específico
 */
function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorDiv = field.parentNode.querySelector('.field-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        field.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert'); // Para acessibilidade
}

/**
 * Remove erro de um campo
 */
function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * Coleta dados do formulário
 */
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

/**
 * Inicializa o calendário para agendamento
 */
function initCalendar() {
    const calendarElement = document.getElementById('calendar');
    if (!calendarElement) return;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    renderCalendar(currentYear, currentMonth);
    
    function renderCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        let calendarHTML = `
            <div class="calendar-header">
                <button type="button" id="prevMonth" aria-label="Mês anterior">&lt;</button>
                <h3>${monthNames[month]} ${year}</h3>
                <button type="button" id="nextMonth" aria-label="Próximo mês">&gt;</button>
            </div>
            <div class="calendar-grid">
                <div class="day-header">Dom</div>
                <div class="day-header">Seg</div>
                <div class="day-header">Ter</div>
                <div class="day-header">Qua</div>
                <div class="day-header">Qui</div>
                <div class="day-header">Sex</div>
                <div class="day-header">Sáb</div>
        `;
        
        // Dias vazios no início
        for (let i = 0; i < startingDay; i++) {
            calendarHTML += '<div class="day-cell empty"></div>';
        }
        
        // Dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay();
            const isPast = date < today.setHours(0, 0, 0, 0);
            const isToday = date.toDateString() === new Date().toDateString();
            const isWeekend = dayOfWeek === 0; // Domingo (fechado)
            
            let classes = 'day-cell';
            if (isPast) classes += ' past';
            if (isToday) classes += ' today';
            if (isWeekend) classes += ' weekend';
            
            const isSelectable = !isPast && !isWeekend;
            
            calendarHTML += `
                <div class="${classes}" 
                     data-date="${year}-${month + 1}-${day}"
                     ${isSelectable ? 'role="button" tabindex="0"' : ''}
                     ${isWeekend ? 'title="Fechado aos domingos"' : ''}
                     ${isSelectable ? 'aria-label="Selecionar ' + day + ' de ' + monthNames[month] + '"' : ''}>
                    ${day}
                </div>
            `;
        }
        
        calendarHTML += '</div>';
        calendarElement.innerHTML = calendarHTML;
        
        // Event listeners
        document.getElementById('prevMonth')?.addEventListener('click', () => {
            const newDate = new Date(year, month - 1);
            renderCalendar(newDate.getFullYear(), newDate.getMonth());
        });
        
        document.getElementById('nextMonth')?.addEventListener('click', () => {
            const newDate = new Date(year, month + 1);
            renderCalendar(newDate.getFullYear(), newDate.getMonth());
        });
        
        // Seleção de data
        const selectableDays = calendarElement.querySelectorAll('.day-cell:not(.past):not(.weekend)');
        selectableDays.forEach(day => {
            day.addEventListener('click', () => selectDate(day));
            day.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectDate(day);
                }
            });
        });
    }
    
    function selectDate(dayElement) {
        // Remove seleção anterior
        const previousSelected = calendarElement.querySelector('.day-cell.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }
        
        // Adiciona nova seleção
        dayElement.classList.add('selected');
        
        const selectedDate = dayElement.dataset.date;
        const dateInput = document.getElementById('dataAgendamento');
        if (dateInput) {
            dateInput.value = selectedDate;
        }
        
        // Mostra horários disponíveis
        showAvailableTimes();
        
        // Anuncia para leitores de tela
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.textContent = `Data selecionada: ${dayElement.textContent}`;
        announcement.className = 'visually-hidden';
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
}

/**
 * Mostra horários disponíveis para agendamento
 */
function showAvailableTimes() {
    const timeSelect = document.getElementById('horarioAgendamento');
    if (!timeSelect) return;
    
    const horarios = [
        '08:00', '09:00', '10:00', '11:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
    ];
    
    timeSelect.innerHTML = '<option value="">Selecione um horário</option>';
    
    horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario;
        option.textContent = horario;
        timeSelect.appendChild(option);
    });
    
    timeSelect.style.display = 'block';
}

/**
 * Inicializa recursos de acessibilidade
 */
function initAccessibility() {
    // Botão de alto contraste
    const contrastButton = document.getElementById('contrastToggle');
    if (contrastButton) {
        contrastButton.addEventListener('click', toggleHighContrast);
    }
    
    // Skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 9999;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Melhora navegação por teclado
    enhanceKeyboardNavigation();
}

/**
 * Alterna modo alto contraste
 */
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isActive = document.body.classList.contains('high-contrast');
    
    // Salva preferência
    localStorage.setItem('highContrast', isActive);
    
    // Atualiza texto do botão
    const button = document.getElementById('contrastToggle');
    if (button) {
        button.textContent = isActive ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste';
        button.setAttribute('aria-pressed', isActive);
    }
    
    // Anuncia mudança
    announceToScreenReader(isActive ? 'Alto contraste ativado' : 'Alto contraste desativado');
}

/**
 * Melhora navegação por teclado
 */
function enhanceKeyboardNavigation() {
    // Adiciona indicadores visuais de foco
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Navegação por setas no carrossel
    const carousel = document.getElementById('produtoCarousel');
    if (carousel) {
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                document.querySelector('.carousel-control-prev')?.click();
            } else if (e.key === 'ArrowRight') {
                document.querySelector('.carousel-control-next')?.click();
            }
        });
    }
}

/**
 * Inicializa animações
 */
function initAnimations() {
    // Observador de interseção para animações
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observa elementos que devem ser animados
    const animatedElements = document.querySelectorAll('section, .produto-card');
    animatedElements.forEach(el => observer.observe(el));
    
    // Animação de carregamento
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

/**
 * Funções utilitárias para mensagens
 */
function showSuccess(message) {
    showMessage(message, 'success');
}

function showError(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}`;
    messageDiv.textContent = message;
    messageDiv.setAttribute('role', 'alert');
    messageDiv.setAttribute('aria-live', 'assertive');
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove após 4 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => messageDiv.remove(), 300);
    }, 4000);
}

/**
 * Anuncia mensagem para leitores de tela
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

/**
 * Anuncia mudança de slide do carrossel
 */
function announceSlideChange(produto) {
    const message = `Produto em destaque: ${produto.nome}, ${produto.preco}`;
    announceToScreenReader(message);
}

/**
 * Máscaras para campos de entrada
 */
function initInputMasks() {
    // Máscara para telefone
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
            }
            e.target.value = value;
        });
    });
    
    // Máscara para CPF
    const cpfInputs = document.querySelectorAll('input[name="cpf"]');
    cpfInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            e.target.value = value;
        });
    });
    
    // Máscara para CEP
    const cepInputs = document.querySelectorAll('input[name="cep"]');
    cepInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
            e.target.value = value;
        });
        
        // Busca endereço via CEP (simulado)
        input.addEventListener('blur', (e) => {
            const cep = e.target.value.replace(/\D/g, '');
            if (cep.length === 8) {
                // Em produção, faria uma requisição à API dos Correios
                console.log('Buscando endereço para CEP:', cep);
            }
        });
    });
}

/**
 * Carrega preferências salvas
 */
function loadPreferences() {
    // Carrega preferência de alto contraste
    const highContrast = localStorage.getItem('highContrast') === 'true';
    if (highContrast) {
        document.body.classList.add('high-contrast');
        const button = document.getElementById('contrastToggle');
        if (button) {
            button.textContent = 'Desativar Alto Contraste';
            button.setAttribute('aria-pressed', 'true');
        }
    }
}

/**
 * Adiciona estilos CSS dinamicamente
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .field-error {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .form-control.error {
            border-color: #dc3545;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }
        
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 1px;
            background: #ddd;
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
        }
        
        .day-header {
            background: #2c5530;
            color: white;
            padding: 0.5rem;
            text-align: center;
            font-weight: bold;
            font-size: 0.875rem;
        }
        
        .day-cell {
            background: white;
            padding: 0.75rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            min-height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .day-cell:hover:not(.past):not(.weekend) {
            background: #e8f5e8;
        }
        
        .day-cell.selected {
            background: #4a7c59;
            color: white;
        }
        
        .day-cell.today {
            font-weight: bold;
            border: 2px solid #4a7c59;
        }
        
        .day-cell.past {
            color: #ccc;
            cursor: not-allowed;
        }
        
        .day-cell.weekend {
            background: #f8f9fa;
            color: #6c757d;
            cursor: not-allowed;
        }
        
        .day-cell.empty {
            background: #f8f9fa;
            cursor: default;
        }
        
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .calendar-header button {
            background: #4a7c59;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.2rem;
        }
        
        .calendar-header h3 {
            margin: 0;
            color: #2c5530;
        }
        
        .store-status {
            padding: 1rem;
            border-radius: 5px;
            font-weight: bold;
            margin: 1rem 0;
            text-align: center;
        }
        
        .store-status.open {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .store-status.closed {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .clock-container {
            text-align: center;
            margin: 1rem 0;
            padding: 1rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .time {
            font-size: 2rem;
            font-weight: bold;
            color: #2c5530;
        }
        
        .date {
            font-size: 1rem;
            color: #666;
            text-transform: capitalize;
        }
        
        .keyboard-navigation *:focus {
            outline: 3px solid #4a7c59 !important;
            outline-offset: 2px !important;
        }
        
        .loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .skip-link:focus {
            top: 6px !important;
        }
    `;
    
    document.head.appendChild(style);
}

// Inicializa estilos e preferências quando o script carrega
addDynamicStyles();
loadPreferences();

// Inicializa máscaras quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initInputMasks);
