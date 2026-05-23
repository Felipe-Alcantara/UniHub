# UniHub

UniHub e uma plataforma de hackathon para centralizar a vida academica dos estudantes em um unico lugar. O MVP organiza avisos, prazos, eventos, links do curso, mapa do campus e rotinas da atletica com uma interface moderna e direta.

## Stack

- Frontend: React 18, Vite, Tailwind CSS, Framer Motion e Lucide React
- Backend: Python, Django, Django REST Framework e SQLite
- Padroes: estrutura baseada em `felixo-standards`, com componentes reutilizaveis no frontend e backend modular

## Estrutura

```text
UniHub/
├── frontend/          # Aplicacao web React
├── backend/           # API Django + DRF
├── felixo-standards/  # Referencia de padroes do projeto
├── IA.md              # Memoria tecnica para retomada com IA
└── README.md
```

## Rodando localmente

Frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Backend:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_demo
python manage.py runserver 8000
```

URLs principais:

- Frontend: `http://localhost:3000`
- API health check: `http://localhost:8000/api/health/`
- Admin Django: `http://localhost:8000/admin/`

## Funcionalidades do MVP

- Dashboard com avisos, agenda, prazos e eventos destacados
- Area do aluno com links, materias, progresso e pendencias
- Area da atletica com treinos, amistosos, torneios e tarefas da diretoria
- Mapa interativo do campus com blocos, salas e informacoes por andar
- API inicial separada por dominios academico, atletica e campus

## Proximos passos

- Conectar o frontend aos endpoints reais da API
- Adicionar autenticacao e perfis por tipo de usuario
- Refinar mapa com dados reais da instituicao
- Criar testes de fluxo para telas principais
