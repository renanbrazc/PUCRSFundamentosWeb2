# MiniMercado Bom Preço - Fase 2
## Fundamentos de Sistemas Web

### Visão Geral do Projeto

Este projeto representa a evolução da Fase 1, agora implementando CSS/Bootstrap, JavaScript, formulário de cliente e recursos de acessibilidade para criar um sistema web moderno e interativo para o MiniMercado Bom Preço.

---

## Requisitos Implementados

### 1. Utilização de CSS/Bootstrap e JavaScript

#### **CSS Personalizado (`assets/css/style.css`)**
- **Design responsivo** com Mobile-First
- **Sistema de cores** baseado em verde (#2c5530, #4a7c59) representando frescor
- **Animações CSS** (fade-in, hover effects, transitions)
- **Grid layout** para produtos com auto-fit
- **Tipografia** otimizada com Segoe UI
- **Alto contraste** para acessibilidade

#### **Bootstrap 5.3.0**
- **Carrossel responsivo** na página inicial
- **Sistema de grid** para layouts
- **Componentes** (botões, formulários, alertas)
- **Utilitários** para espaçamento e responsividade

#### **JavaScript Interativo (`assets/js/script.js`)**
- **Carrossel automático** (4 segundos por slide)
- **Relógio em tempo real** com data formatada
- **Status da loja** baseado no horário atual
- **Validação de formulários** em tempo real
- **Calendário personalizado** para agendamentos
- **Máscaras de entrada** (CPF, telefone, CEP)
- **Animações** com Intersection Observer

### 2. Formulário de Cadastro do Cliente

#### **Campos Implementados:**
```html
- Nome Completo (input text, required)
- CPF (input text com máscara, required, validação)
- Sexo (radio buttons: Masculino/Feminino/Outro, required)
- E-mail (input email, required, validação)
- Telefone (input tel com máscara, required)
- Endereço completo (text, number, required)
- Bairro (text, required)
- CEP (text com máscara, opcional)
- Aceite de termos (checkbox, required)
```

#### **Recursos do Formulário:**
- **Validação em tempo real** com feedback visual
- **Máscaras automáticas** para CPF, telefone e CEP
- **Validação de CPF** com algoritmo oficial
- **Placeholders descritivos** para melhor UX
- **Campos obrigatórios** claramente marcados
- **Feedback de erro** específico por campo
- **Acessibilidade** com ARIA labels e roles

### 3. Escolha do Serviço e Agendamento

#### **Sistema de Agendamento:**
- **Dois tipos de serviço:**
  - Retirada no Local (sem custo)
  - Tele-entrega (R$ 7,00 - apenas no bairro)

#### **Calendário Personalizado:**
- **Navegação por mês** com botões anterior/próximo
- **Bloqueio de datas passadas** automaticamente
- **Bloqueio de domingos** (loja fechada)
- **Seleção visual** de data com feedback
- **Navegação por teclado** com suporte a Enter/Space
- **Anúncios para leitores de tela**

#### **Seleção de Horário:**
- **Horários disponíveis:** 8h-11h e 14h-19h
- **Carregamento dinâmico** após seleção de data
- **Select box** com horários pré-definidos

### 4. Acessibilidade para Deficientes Visuais

#### **Recursos Implementados:**

##### **Atributos Alt Descritivos:**
```html
<!-- Exemplos de implementação -->
alt="Banana Prata vendida por quilograma"
alt="Tomate Italiano vendido por quilograma" 
alt="Arroz Tipo 1 pacote de 5 quilogramas"
```

##### **ARIA Labels e Roles:**
```html
aria-label="Menu principal"
aria-current="page"
aria-live="polite"
role="banner"
role="navigation"
role="main"
role="contentinfo"
```

##### **Navegação por Teclado:**
- **Skip links** para conteúdo principal
- **Tab order** lógico e funcional
- **Focus visual** melhorado
- **Suporte a teclas** (Enter, Space, Arrow keys)

##### **Leitores de Tela:**
- **Anúncios dinâmicos** para mudanças de estado
- **Estrutura semântica** com headings hierárquicos
- **Labels descritivos** para todos os elementos interativos
- **Live regions** para atualizações dinâmicas

##### **Alto Contraste:**
- **Botão toggle** para modo alto contraste
- **Persistência** da preferência no localStorage
- **Cores otimizadas** para baixa visão

---

## 🛠️ Estrutura de Arquivos

```
minimercado-bom-preco/
├── assets/
│   ├── css/
│   │   └── style.css          # Estilos principais
│   ├── js/
│   │   └── script.js          # JavaScript principal
│   └── img/
│       ├── produtos/          # Imagens dos produtos
│      
├── index.html                 # Página principal (atualizada)
├── produtos.html              # Página de produtos
├── servicos.html              # Página de serviços
├── sobre.html                 # Página sobre
├── contato.html               # Página de contato
├── ajuda.html                 # Página de ajuda
└── README_FASE2.md            # Esta documentação
```

---

## Funcionalidades JavaScript

### **1. Carrossel Dinâmico:**
```javascript
// Auto-rotação a cada 4 segundos
// Controles manuais (anterior/próximo)
// Anúncios para acessibilidade
// Navegação por teclado (setas)
```

### **2. Relógio em Tempo Real:**
```javascript
// Atualização a cada segundo
// Data e hora formatadas em português
// Status da loja baseado no horário
// Indicação visual ( Aberto /  Fechado)
```

### **3. Validação de Formulários:**
```javascript
// Validação em tempo real (blur/input)
// Validação de CPF com algoritmo oficial
// Máscaras automáticas para campos
// Feedback visual de erro/sucesso
// Prevenção de submit inválido
```

### **4. Calendário Personalizado:**
```javascript
// Renderização dinâmica por mês
// Bloqueio de datas inválidas
// Seleção visual interativa
// Integração com select de horários
// Suporte completo a teclado
```

---

## Design System

### **Cores Principais:**
```css
--primary-dark: #2c5530;    /* Verde escuro */
--primary-light: #4a7c59;   /* Verde claro */
--success: #28a745;         /* Sucesso */
--danger: #dc3545;          /* Erro */
--warning: #ffc107;         /* Aviso */
--light: #f8f9fa;          /* Fundo */
```

### **Tipografia:**
```css
--font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
--font-size-base: 1rem;
--line-height-base: 1.6;
```

### **Espaçamentos:**
```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
```
