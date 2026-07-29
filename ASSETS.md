# ASSETS.md — Inventário de Assets
## Studio Janaína Portes

> **Registro completo de todos os arquivos de mídia do projeto.** Consulte este documento antes de adicionar, renomear ou remover qualquer asset.

---

## 1. LOGO

| Arquivo | Dimensões originais | Uso no site | Seções |
|---|---|---|---|
| `Logo-principal.jpeg` | 1909 KB | Logo principal, watermark | Navbar, Hero (watermark), Footer |

**Notas:**
- Identidade visual: símbolo fluido curvilíneo em azul noturno e ciano turquesa com detalhe dourado
- Wordmark: "studio Janaína Portes" em azul noturno
- Aplicar com `opacity: 0.07` nas seções com fundo escuro (watermark)
- **NÃO** comprimir abaixo de 80% de qualidade para preservar detalhes

---

## 2. FOTOS DO ESPAÇO

| Arquivo | Conteúdo | Uso recomendado |
|---|---|---|
| `Espaço001.jpg` | Sala de dança versátil — três alunas em movimento frente ao espelho com barra de ballet | Galeria, seção de Danças |
| `Espaço002.jpg` | Sala de Pilates — aparelhos modernos (Reformer, Cadillac, Chair), perspectiva lateral | Galeria, Hero background, seção de Pilates |
| `Espaço003.jpg` | Sala de Pilates — vista alternativa com bolas, Step Barrel, estruturas de apoio | Galeria, seção Sobre |
| `Espaço004.jpg` | Janaína Portes praticando Pilates — pose de teaser no Reformer, estúdio ao fundo | Seção Sobre / Hero secundário |

---

## 3. FOTOS DE SERVIÇOS

| Arquivo | Conteúdo | Serviço representado |
|---|---|---|
| `Serviços001.jpg` | Idosa em exercício com bola grande azul no solo, piso emborrachado azul | Pilates clínico para melhor idade |
| `Serviços002.jpg` | Aluna invertida no Cadillac — exercício avançado, texto "Movimento Cura!" na parede | Pilates avançado / reabilitação |
| `Serviços003.jpg` | Idosa no Cadillac fazendo exercício de tração, parede com "Eu ❤ Pilates" | Pilates melhor idade / Cadillac |
| `Serviços004.jpg` | Idosa na Cadeira de Pilates, ambiente bem equipado com bolas decorativas | Pilates sênior / Chair |
| `Serviços005.jpg` | Jovem adulta no Reformer, posição deitada, texto motivacional na imagem | Pilates jovem adulto / Reformer |

---

## 4. FOTOS DOS PROFISSIONAIS

| Arquivo | Nome | Especialidades | Uso |
|---|---|---|---|
| `Janaina-Pontes-fisioterapeuta-há-24-anos-especialização-em Pilates-pós-graduação-em fisioterapia-na-saúde-da-mulher. Além-disso-reikiana, terapeuta-floral-e-terapeuta-integrativa..jpg` | **Janaína Portes** | Fisioterapeuta (24 anos), Pilates, Saúde da Mulher, Reiki, Terapia Floral, Integrativa | Seção "Sobre a Fundadora" — foto editorial principal |
| `Larissa-Bráz-Pilates-para-Gestantes-liberação-miofascial-ventosaterapia-Dry-Needling..jpg` | **Larissa Bráz** | Fisioterapeuta, Pilates Gestantes, Liberação Miofascial, Ventosaterapia, Dry Needling | Seção Equipe |
| `Thatiana-MartinsNutricionita-integrativa-e-Saúde-da-Mulher.jpg` | **Thatiana Martins** | Nutricionista Integrativa, Saúde da Mulher | Seção Equipe |

---

## 5. MAPEAMENTO DE SEÇÕES × ASSETS

| Seção | Assets utilizados |
|---|---|
| **Navbar** | `Logo-principal.jpeg` |
| **Hero** | `Logo-principal.jpeg` (watermark), `Espaço002.jpg` (background sutil) |
| **Serviços — Pilates** | `Serviços002.jpg`, `Serviços005.jpg` |
| **Serviços — Fisioterapia** | `Serviços001.jpg` |
| **Serviços — Massagem** | *(placeholder gerado)* |
| **Serviços — Quiropraxia** | *(placeholder gerado)* |
| **Serviços — Danças** | `Espaço001.jpg` |
| **Serviços — Yoga** | *(placeholder gerado)* |
| **Seletor de Unidades** | Sem foto (design gráfico) |
| **Sobre a Fundadora** | `Janaina-Pontes-...jpg`, `Espaço004.jpg` |
| **Equipe** | `Larissa-Bráz-...jpg`, `Thatiana-Martins...jpg` |
| **Galeria** | `Espaço001.jpg`, `Espaço002.jpg`, `Espaço003.jpg`, `Espaço004.jpg`, `Serviços002.jpg`, `Serviços003.jpg` |
| **Footer** | `Logo-principal.jpeg` |

---

## 6. CONVENÇÕES PARA NOVOS ASSETS

### Nomenclatura obrigatória:
- **Fotos de espaço:** `Espaço[NNN].jpg` (ex: `Espaço005.jpg`)
- **Fotos de serviços:** `Serviços[NNN].jpg` (ex: `Serviços006.jpg`)
- **Fotos de profissionais:** `[NomeSobrenome]-[especialidades].jpg`
- **Logo variações:** `Logo-[variante].png` (ex: `Logo-branco.png`, `Logo-simples.png`)

### Especificações técnicas:
| Tipo | Formato | Qualidade | Dimensão máxima |
|---|---|---|---|
| Fotos gerais | JPG | 85% | 1920px largura |
| Logo | PNG (transparente) ou JPG | 95% | Original |
| Ícones | SVG | — | — |

### Localização:
- Todos os assets ficam na **pasta raiz** do projeto (mesmo nível do `index.html`)
- Subpastas opcionais para futuras expansões: `assets/images/`, `assets/icons/`

---

## 7. OTIMIZAÇÃO RECOMENDADA

Para sites em produção, considerar:
- Converter JPG para WebP (mantendo fallback JPG)
- Implementar `srcset` para diferentes resoluções
- Usar lazy loading (`loading="lazy"`) em todas as imagens below the fold
- Comprimir imagens com ferramentas como TinyPNG ou Squoosh

---

*Última atualização: Julho 2026*
