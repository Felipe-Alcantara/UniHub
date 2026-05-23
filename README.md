# 🎓 UniHub

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Django](https://img.shields.io/badge/Django-5-0C4B33?style=for-the-badge&logo=django&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Central acadêmica moderna para organizar avisos, prazos, eventos, mapa do campus e rotinas da atlética em um único lugar.**

[📋 Sobre](#-sobre-o-projeto) • [⭐ Destaque](#-dashboard-central) • [🚀 Funcionalidades](#-funcionalidades-do-mvp) • [🎯 Como Usar](#-como-usar)

</div>

---

## 📋 Índice

- [⭐ **Dashboard Central**](#-dashboard-central) ⭐ **DESTAQUE**
- [📋 Sobre o Projeto](#-sobre-o-projeto)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Funcionalidades do MVP](#-funcionalidades-do-mvp)
- [🛠️ Stack](#️-stack)
- [🎯 Como Usar](#-como-usar)
- [📚 Guia Rápido](#-guia-rápido)
- [🔮 Próximos Passos](#-próximos-passos)
- [📄 Licença](#-licença)
- [👤 Autor](#-autor)

---

## ⭐ Dashboard Central

> **UNIÃO DAS INFORMAÇÕES IMPORTANTES DO DIA EM UMA ÚNICA TELA**
>
> O UniHub usa um dashboard como ponto principal da experiência, destacando avisos, prazos e eventos para que o estudante entenda rapidamente o que exige atenção.

### 💡 Por que usar?

- **🎯 Mais visibilidade:** avisos e informações do dia aparecem em destaque logo na tela inicial.
- **⏱️ Senso de urgência:** prazos acadêmicos ficam organizados por prioridade e proximidade.
- **📣 Eventos em destaque:** palestras, campeonatos, atividades da faculdade e outros eventos aparecem em banners próprios.
- **🧭 Menos dispersão:** links, salas, blocos, atividades e rotinas ficam concentrados no mesmo ambiente.

---

## 📋 Sobre o Projeto

O **UniHub** é um projeto voltado a facilitar a vida acadêmica dos estudantes de forma prática, intuitiva e organizada. A proposta é centralizar as principais pendências e dores da rotina universitária em um único ponto de acesso, usando uma interface moderna e fácil de utilizar.

A plataforma foi pensada para melhorar a experiência dentro da faculdade ao reunir informações que normalmente ficam espalhadas: avisos institucionais, prazos, eventos, links do curso, matérias, grupos, dados acadêmicos, mapa da universidade e rotinas da atlética.

### ✨ Áreas principais

- **📊 Dashboard:** reúne avisos, prazos, agenda do dia e eventos importantes.
- **🎓 Área do aluno:** concentra links do curso, grupos, matérias e informações acadêmicas.
- **🗺️ Mapa interativo:** mostra blocos, salas e andares para facilitar a localização dentro da instituição.
- **🏆 Área da atlética:** separa informações para atletas e uma área administrativa para organização da diretoria.

---

## 📁 Estrutura do Projeto

```text
UniHub/
│
├── 📁 frontend/              # Aplicação web React + Vite
│   ├── 📁 src/               # Código principal da interface
│   ├── 📁 public/            # Assets públicos
│   └── README.md             # Guia específico do frontend
│
├── 📁 backend/               # API Django + Django REST Framework
│   ├── 📁 app/               # Camadas compartilhadas da API
│   ├── 📁 apps/              # Domínios do produto
│   └── README.md             # Guia específico do backend
│
├── 📁 felixo-standards/      # Padrões de qualidade e documentação
├── IA.md                     # Memória técnica para retomada com IA
├── LICENSE                   # Licença MIT
└── README.md                 # Este arquivo
```

---

## 🚀 Funcionalidades do MVP

### 📊 Dashboard (`frontend/src/pages/dashboard.jsx`)

- Exibe os principais avisos do dia com prioridade visual.
- Organiza prazos acadêmicos por urgência.
- Destaca eventos importantes em banners.
- Mostra a agenda do estudante em formato rápido de consulta.

---

### 🎓 Área do Aluno (`frontend/src/pages/student-area.jsx`)

- Centraliza links relacionados ao curso.
- Reúne atalhos para grupos, materiais e documentos acadêmicos.
- Mostra matérias em andamento e progresso simulado.
- Exibe pendências acadêmicas importantes.

---

### 🗺️ Mapa do Campus (`frontend/src/pages/campus-map.jsx`)

- Apresenta um mapa interativo da universidade.
- Permite selecionar blocos e visualizar salas.
- Mostra tipo de bloco, andares e ambientes disponíveis.
- Serve como base para futura navegação interna por rotas.

---

### 🏆 Área da Atlética (`frontend/src/pages/athletics.jsx`)

- Separa a experiência entre **Atletas** e **Diretoria**.
- Lista treinos, amistosos, torneios e seletivas.
- Organiza tarefas administrativas da atlética.
- Apoia a diretoria na gestão interna de atividades.

---

### 🔌 API Inicial (`backend/`)

- Expõe endpoints versionados em `/api/v1/`.
- Organiza domínios em `academics`, `athletics` e `campus`.
- Inclui health check em `/api/health/`.
- Possui comando de seed para dados de apresentação.

---

## 🛠️ Stack

- **Frontend:** React 18, Vite 6, Tailwind CSS 3, Framer Motion e Lucide React.
- **Backend:** Python, Django 5, Django REST Framework e SQLite.
- **Arquitetura:** frontend componentizado e backend Django modular.
- **Padrões:** documentação e estrutura baseadas em `felixo-standards`.

---

## 🎯 Como Usar

### Opção 1: Rodar a interface web

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Crie o arquivo de ambiente local
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse:

```text
http://localhost:3000
```

### Opção 2: Rodar a API

```bash
# Entre na pasta do backend
cd backend

# Crie um ambiente virtual
python3 -m venv .venv

# Ative o ambiente virtual
source .venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Crie o arquivo de ambiente local
cp .env.example .env

# Aplique as migrations
python3 manage.py migrate

# Popule dados de demonstração
python3 manage.py seed_demo

# Inicie a API
python3 manage.py runserver 8000
```

URLs úteis:

- **Frontend:** `http://localhost:3000`
- **API health check:** `http://localhost:8000/api/health/`
- **Admin Django:** `http://localhost:8000/admin/`

---

## 📚 Guia Rápido

### Para estudantes

1. Abra o dashboard para ver avisos, prazos e eventos do dia.
2. Use a área do aluno para acessar links, grupos, matérias e pendências.
3. Consulte o mapa do campus para localizar blocos e salas.
4. Acesse a área da atlética para acompanhar treinos, jogos e atividades.

### Para a diretoria da atlética

1. Entre na aba administrativa da atlética.
2. Consulte tarefas internas por área responsável.
3. Acompanhe status de organização de eventos, finanças e esportes.
4. Use a estrutura como base para futuras permissões e fluxos internos.

### Para desenvolvedores

1. Use `frontend/src/data/unihub-data.js` para ajustar dados mockados.
2. Use `backend/apps/academics`, `backend/apps/athletics` e `backend/apps/campus` para evoluir os domínios.
3. Rode `python3 manage.py seed_demo` para preparar dados de apresentação.
4. Consulte `IA.md` para entender decisões técnicas e contexto acumulado.

---

## 🔮 Próximos Passos

- Conectar o frontend aos endpoints reais da API.
- Adicionar autenticação e perfis por tipo de usuário.
- Refinar o mapa com dados reais da instituição.
- Criar testes de fluxo para as telas principais.
- Evoluir permissões da área administrativa da atlética.

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

Desenvolvido por **Felipe Martin**.

---

<div align="center">

**UniHub — centralizando a rotina acadêmica para tornar a experiência universitária mais simples, visível e organizada.**

</div>
