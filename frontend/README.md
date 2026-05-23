# UniHub Frontend

Interface React + Vite + Tailwind para o dashboard academico UniHub.

## Setup local

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Por padrao, o Vite sobe em `http://localhost:3000` e faz proxy de `/api` para `http://localhost:8000`.

## Estrutura

```text
frontend/src/
├── components/
│   ├── layout/   # Navbar, sidebar e wrapper de pagina
│   ├── parts/    # Cards compostos do dominio UniHub
│   └── ui/       # Button, Card, Badge, Input, Modal
├── data/         # Dados mockados do MVP
├── pages/        # Dashboard, aluno, atletica e mapa
└── utils/        # Cliente de API e helpers
```

## Telas iniciais

- `/` dashboard com avisos, prazos, eventos e agenda do dia
- `/aluno` links, materias e pendencias academicas
- `/atletica` area dos atletas e painel administrativo
- `/mapa` mapa interativo por bloco e salas
