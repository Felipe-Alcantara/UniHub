# Felixo System Design

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![C#](https://img.shields.io/badge/C%23-512BD4?style=for-the-badge&logo=csharp&logoColor=white)
![Django](https://img.shields.io/badge/Django-0C4B33?style=for-the-badge&logo=django&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Docs](https://img.shields.io/badge/Docs-Guide-2084FF?style=for-the-badge&logo=read-the-docs&logoColor=white)

**Repositorio central de padroes de design, qualidade de sistema, prompts estruturados, documentacao operacional e guias reutilizaveis para IA.**

[Core (Obrigatorio)](#-core--padroes-obrigatorios) | [Guias (Opcional)](#-guias--padroes-especificos) | [Stack](#%EF%B8%8F-minha-stack) | [Como Usar](#-como-usar-em-outros-projetos)

</div>

---

## Indice

- [Sobre o Repositorio](#-sobre-o-repositorio)
- [Minha Stack](#%EF%B8%8F-minha-stack)
- [Estrutura do Repositorio](#-estrutura-do-repositorio)
- [Core — Padroes Obrigatorios](#-core--padroes-obrigatorios)
- [Guias — Padroes Especificos](#-guias--padroes-especificos)
- [Como Usar em Outros Projetos](#-como-usar-em-outros-projetos)
- [Licenca](#-licenca)
- [Autor](#-autor)

---

## Sobre o Repositorio

Este repositorio serve como **base centralizada** para registrar e padronizar tudo que envolve meus projetos de desenvolvimento. Ele e organizado em duas camadas:

### `core/` — Obrigatorio

Padroes de qualidade que devem acompanhar **todo projeto**:

- **Design Systems** — Contratos de qualidade para frontend, backend e documentacao
- **Prompt Bases** — Guias para montar prompts de IA completos na primeira interacao
- **Template de Contexto IA** — Memoria operacional padronizada para continuidade entre sessoes

### `guias/` — Opcional

Guias reutilizaveis extraidos de **projetos reais**, organizados por dominio. Use apenas quando o projeto precisar daquela funcionalidade especifica.

---

## Minha Stack

### Linguagens

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura e marcacao web |
| **CSS3** | Estilizacao e layout |
| **JavaScript** | Logica client-side e scripts |
| **TypeScript** | Tipagem forte, projetos escalaveis |
| **C#** | Back-end robusto, APIs .NET |
| **Python** | Back-end, automacoes, scripts |

### Frameworks & Bibliotecas

| Tecnologia | Uso |
|------------|-----|
| **React** | Interfaces de usuario reativas |
| **Tailwind CSS** | Estilizacao utilitaria |
| **Bootstrap** | Prototipagem rapida, admin panels |
| **Django** | Back-end Python, APIs REST |
| **Vite** | Build tool e dev server rapido |

### Ferramentas & Infraestrutura

| Ferramenta | Uso |
|------------|-----|
| **Git** | Controle de versao |
| **GitHub** | Repositorios, CI/CD, colaboracao |
| **VS Code** | IDE principal |
| **Windows** | Sistema operacional de desenvolvimento |

---

## Estrutura do Repositorio

```
Felixo-System-Design/
│
├── core/                                    # OBRIGATORIO — usar em todo projeto
│   ├── IA.md                                # Template de contexto operacional para IA
│   ├── DESIGN_SYSTEM_FRONTEND.md            # Padroes de qualidade frontend
│   ├── DESIGN_SYSTEM_BACKEND.md             # Padroes de qualidade backend
│   ├── DESIGN_SYSTEM_README.md              # Padroes de documentacao README
│   ├── PROMPT_BASE_FRONTEND.md              # Prompt guiado para frontend
│   └── PROMPT_BASE_BACKEND.md               # Prompt guiado para backend
│
├── guias/                                   # OPCIONAL — usar quando relevante
│   ├── frontend/                            # UI, visual, UX, dados
│   │   ├── GUIA-COMPONENTES-UI-COMPOSTOS.md
│   │   ├── GUIA-PARTICULAS-E-GLOW.md
│   │   ├── GUIA-BACKGROUND-VISUAL.md
│   │   ├── GUIA-HEATMAP-DE-ATIVIDADE.md
│   │   ├── GUIA-ONBOARDING-E-AJUDA.md
│   │   ├── GUIA-ARVORE-HIERARQUICA.md
│   │   ├── GUIA-ARVORE-DE-MATERIAIS-DUAL-VIEW.md
│   │   ├── GUIA-CALENDARIO-ACADEMICO.md
│   │   └── GUIA-SISTEMA-DE-ALERTA-E-GRADE.md
│   ├── backend/                             # Logica pura Python/Django
│   │   ├── GUIA-BACKEND-CPF.md
│   │   └── GUIA-CRIPTOGRAFIA-CIFRA-DE-CESAR.md
│   └── integracao/                          # Integracoes externas
│       └── GUIA-INTEGRACAO-API-GITHUB.md
│
├── README.md
└── LICENSE
```

---

## Core — Padroes Obrigatorios

A pasta `core/` concentra os artefatos que devem acompanhar **todo projeto**. Ela separa padroes tecnicos de qualidade, prompts operacionais para IA e template de memoria operacional.

### Design System Frontend

Guia completo de padronizacao visual para front-end, extraido do **FelixoVerse**. Documenta paleta, tipografia, layout, componentes, animacoes e padroes de interface. Inclui separacao explicita entre principios universais e escolhas especificas do FelixoVerse.

[Ver design system frontend](core/DESIGN_SYSTEM_FRONTEND.md)

### Design System Backend

Guia de **qualidade de sistema backend**. Define principios de arquitetura, escolha de stack, modularizacao forte, separacao de responsabilidades, estrutura por camadas, padroes de API, persistencia, testes, TDD, SQLite como padrao inicial, Open/Closed, documentacao viva e checklist de qualidade.

[Ver design system backend](core/DESIGN_SYSTEM_BACKEND.md)

### Design System README

Guia de padronizacao para `README.md`, usado como referencia para manter documentacao consistente entre projetos.

[Ver design system README](core/DESIGN_SYSTEM_README.md)

### Prompt Base Backend

Guia tecnico para montar prompts de backend completos na primeira interacao. Inclui stacks recomendadas, decisoes tecnicas por cenario e exige que a IA siga o `DESIGN_SYSTEM_BACKEND.md` como contrato de qualidade.

[Ver prompt base backend](core/PROMPT_BASE_BACKEND.md)

### Prompt Base Frontend

Guia tecnico para montar prompts de frontend completos na primeira interacao. Inclui stacks recomendadas, decisoes visuais por cenario, campos para componentes, identidade visual, responsividade e animacoes.

[Ver prompt base frontend](core/PROMPT_BASE_FRONTEND.md)

### IA.md — Template de Contexto Operacional

Template padrao de **memoria operacional** para projetos com IA. Deve ser copiado e preenchido continuamente durante o desenvolvimento para registrar:

- objetivo atual e milestones
- decisoes tecnicas
- stack e convencoes
- bugs e correcoes relevantes
- testes importantes
- contexto necessario para outra IA retomar o trabalho sem reler tudo

[Ver IA.md](core/IA.md)

---

## Guias — Padroes Especificos

A pasta `guias/` contem **guias reutilizaveis extraidos de projetos reais**, organizados por dominio. Diferente do `core/`, estes arquivos sao **opcionais** — use apenas quando o projeto precisar daquela funcionalidade.

Cada guia responde a tres perguntas:

- Qual problema ele resolve
- De qual projeto o padrao foi extraido
- Em que tipo de sistema vale reutiliza-lo

### Frontend

#### Arvore Hierarquica

Padrao de **exploracao hierarquica de categorias** com modelo Django (self-referential FK), serializer recursivo e componente React recursivo com animacoes.

**Quando usar:** explorador de categorias/pastas, menus hierarquicos, qualquer dado em arvore parent-child.

[Ver guia](guias/frontend/GUIA-ARVORE-HIERARQUICA.md)

#### Background Visual

Padrao de **background visual em camadas** com gradiente, simbolos animados e troca de tema. Extraido da Calculadora Pro Web (Brython).

**Quando usar:** calculadoras, paginas educacionais, dashboards tecnicos, interfaces com profundidade visual.

[Ver guia](guias/frontend/GUIA-BACKGROUND-VISUAL.md)

#### Heatmap de Atividade

Padrao de **calendario de atividade com intensidade visual** no estilo GitHub. Extraido do Reading Tracker.

**Quando usar:** visualizacao de atividade por dia/semana/mes, dashboards de uso, analise temporal.

[Ver guia](guias/frontend/GUIA-HEATMAP-DE-ATIVIDADE.md)

#### Onboarding e Ajuda

Padrao de **primeira experiencia do usuario** com onboarding leve, destaque contextual e centro de ajuda permanente. Extraido do Reading Tracker.

**Quando usar:** produtos com multiplas funcionalidades, interfaces com curva de aprendizado, dashboards.

[Ver guia](guias/frontend/GUIA-ONBOARDING-E-AJUDA.md)

#### Componentes UI Compostos

Kit de **componentes UI compostos** com Card (compound component), Button (4 variantes x 3 tamanhos), Badge e utilitario de classnames. TypeScript + Tailwind, zero dependencias.

**Quando usar:** qualquer projeto React + Tailwind que precise de componentes base consistentes.

[Ver guia](guias/frontend/GUIA-COMPONENTES-UI-COMPOSTOS.md)

#### Particulas e Sistema de Glow

**Background de particulas flutuantes** com Framer Motion e **sistema completo de glow CSS** com 5 niveis de intensidade controlados por CSS variable.

**Quando usar:** landing pages, portfolios, dashboards dark-theme, interfaces com efeitos de glow.

[Ver guia](guias/frontend/GUIA-PARTICULAS-E-GLOW.md)

#### Arvore de Materiais Dual-View

**Arvore de materiais com dois modos de visualizacao** (simples e dinamico), tracking de itens vistos via localStorage e contagem de progresso por pasta.

**Quando usar:** bibliotecas de materiais, exploradores de documentos, listas de leitura com progresso.

[Ver guia](guias/frontend/GUIA-ARVORE-DE-MATERIAIS-DUAL-VIEW.md)

#### Calendario Academico

**Calendario mensal interativo** com grade de dias, agrupamento de eventos por data, status do usuario e 11 funcoes de data sem dependencias externas.

**Quando usar:** dashboards academicos, calendarios de entregas, agendas de projeto.

[Ver guia](guias/frontend/GUIA-CALENDARIO-ACADEMICO.md)

#### Sistema de Alerta e Grade de Horarios

**Sistema de alerta automatico de proxima aula** com parser de grade, cores por sala e tabela semanal com coluna sticky.

**Quando usar:** paineis academicos, portais de turma, apps de agenda escolar.

[Ver guia](guias/frontend/GUIA-SISTEMA-DE-ALERTA-E-GRADE.md)

### Backend

#### Backend CPF

Padrao de **backend logico para CPF** com algoritmo, contratos, fluxo de validacao, matriz de testes e guardrails para dados reais.

**Quando usar:** geracao sintetica de CPF para testes, validacao backend, normalizacao de entrada, formularios.

[Ver guia](guias/backend/GUIA-BACKEND-CPF.md)

#### Criptografia Cifra de Cesar

Sistemas reutilizaveis da **Cifra de Cesar em Python**: cifra tradicional, cifra numerica, normalizacao de acentos e interface web com Brython.

**Quando usar:** apps educacionais de criptografia, playgrounds web, utilitarios de encode/decode.

[Ver guia](guias/backend/GUIA-CRIPTOGRAFIA-CIFRA-DE-CESAR.md)

### Integracao

#### Integracao API GitHub

Padrao de **coleta robusta de repositorios no GitHub** com autenticacao por token, paginacao, deduplicacao, retry com backoff e tratamento de rate limit.

**Quando usar:** importadores de portfolio, dashboards de projetos, sincronizadores, ETLs de inventario tecnico.

[Ver guia](guias/integracao/GUIA-INTEGRACAO-API-GITHUB.md)

---

## Como Usar em Outros Projetos

Use os metodos abaixo do mais usual para o mais especifico.

### 1. Sincronizar `felixo-standards` com a versao mais recente (Recomendado)

Melhor opcao quando voce quer manter uma pasta local sem vinculo com o git original e poder rodar o comando quantas vezes quiser para atualizar.

**Linux / macOS / Git Bash:**
```bash
tmp_dir="$(mktemp -d)" && git clone --depth 1 https://github.com/Felipe-Alcantara/Felixo-System-Design.git "$tmp_dir/repo" && rm -rf "$tmp_dir/repo/.git" && mkdir -p ./felixo-standards && rsync -a --delete "$tmp_dir/repo/" ./felixo-standards/ && rm -rf "$tmp_dir"
```

**PowerShell (Windows):**
```powershell
$tmpDir = Join-Path $env:TEMP ("felixo-standards-" + [guid]::NewGuid())
git clone --depth 1 https://github.com/Felipe-Alcantara/Felixo-System-Design.git $tmpDir
Remove-Item -Recurse -Force (Join-Path $tmpDir ".git")
New-Item -ItemType Directory -Force -Path "./felixo-standards" | Out-Null
robocopy $tmpDir "./felixo-standards" /MIR | Out-Null
Remove-Item -Recurse -Force $tmpDir
```

**CMD (Windows):**
```cmd
set TMP_DIR=%TEMP%\felixo-standards-%RANDOM% && git clone --depth 1 https://github.com/Felipe-Alcantara/Felixo-System-Design.git %TMP_DIR% && rmdir /s /q %TMP_DIR%\.git && if not exist felixo-standards mkdir felixo-standards && robocopy %TMP_DIR% felixo-standards /MIR >nul && rmdir /s /q %TMP_DIR%
```

- **Use quando**: quer todos os arquivos como base independente, com atualizacao simples depois
- **Requisito**: Git
- **Vinculo com o git original?** Nao

#### Atalho global `felixo` (Bash/Zsh)

```bash
felixo() {
  local dest="./felixo-standards"
  local repo_url="https://github.com/Felipe-Alcantara/Felixo-System-Design.git"
  local tmp_dir
  tmp_dir="$(mktemp -d)" || return 1
  git clone --depth 1 "$repo_url" "$tmp_dir/repo" || { rm -rf "$tmp_dir"; return 1; }
  rm -rf "$tmp_dir/repo/.git"
  mkdir -p "$dest"
  rsync -a --delete "$tmp_dir/repo/" "$dest/"
  rm -rf "$tmp_dir"
}
```

---

### 2. Baixar o repositorio inteiro como ZIP

**PowerShell (Windows):**
```powershell
Invoke-WebRequest -Uri "https://github.com/Felipe-Alcantara/Felixo-System-Design/archive/refs/heads/main.zip" -OutFile "felixo.zip"
Expand-Archive "felixo.zip" -DestinationPath .
Rename-Item "Felixo-System-Design-main" "felixo-standards"
Remove-Item "felixo.zip"
```

**CMD (Windows):**
```cmd
curl -L https://github.com/Felipe-Alcantara/Felixo-System-Design/archive/refs/heads/main.zip -o felixo.zip
tar -xf felixo.zip
ren Felixo-System-Design-main felixo-standards
del felixo.zip
```

**Linux / macOS:**
```bash
curl -L https://github.com/Felipe-Alcantara/Felixo-System-Design/archive/refs/heads/main.zip -o felixo.zip
unzip felixo.zip && mv Felixo-System-Design-main felixo-standards && rm felixo.zip
```

---

### 3. Baixar com `npx degit`

```bash
npx degit Felipe-Alcantara/Felixo-System-Design ./felixo-standards
```

---

### 4. Clonar com `git`

```bash
git clone --depth 1 https://github.com/Felipe-Alcantara/Felixo-System-Design.git ./felixo-standards
```

---

### 5. Baixar apenas `guias/` com `npx degit`

```bash
npx degit Felipe-Alcantara/Felixo-System-Design/guias ./felixo-guias
```

---

### 6. Baixar apenas `core/` com `git sparse-checkout`

```bash
mkdir felixo-core
cd felixo-core
git init
git remote add -f origin https://github.com/Felipe-Alcantara/Felixo-System-Design.git
git sparse-checkout init --no-cone
git sparse-checkout set core
git pull origin main
```

---

### 7. Baixar apenas `guias/` com `git sparse-checkout`

```bash
mkdir felixo-guias
cd felixo-guias
git init
git remote add -f origin https://github.com/Felipe-Alcantara/Felixo-System-Design.git
git sparse-checkout init --no-cone
git sparse-checkout set guias
git pull origin main
```

---

### 8. Clonar tudo e copiar so a pasta desejada

```bash
git clone --depth 1 https://github.com/Felipe-Alcantara/Felixo-System-Design.git ./felixo-standards
```

Depois, copie manualmente:

- `./felixo-standards/core`
- `./felixo-standards/guias`

---

### Escolha Rapida por Cenario

| Cenario | Melhor opcao |
|---------|--------------|
| Quero tudo com atualizacao simples | sincronizacao sem `.git` (metodo 1 / atalho `felixo`) |
| Quero tudo da forma mais simples | ZIP |
| Quero tudo sem `.git` via terminal | `npx degit` |
| Quero tudo e depois atualizar | `git clone` |
| Quero so `guias/` sem `git` | `npx degit` em `guias` |
| Quero so `guias/` com atualizacao futura | `git sparse-checkout` |
| Quero so `core/` com atualizacao futura | `git sparse-checkout` |
| Quero uma opcao universal | clone completo + copiar a pasta |

---

## Licenca

Este projeto esta sob a licenca MIT — veja o arquivo `LICENSE`.

## Autor

**Felipe Martin**
- GitHub: [@Felipe-Alcantara](https://github.com/Felipe-Alcantara)

---

> **Assinatura de Origem**  
> Este arquivo foi criado por **Felipe Martin** e faz parte do repositorio **Felixo System Design**.  
> Origem: https://github.com/Felipe-Alcantara/Felixo-System-Design  
> Data desta versao: 2026-05-23  
> Sugestoes e pull requests sao bem-vindos.
