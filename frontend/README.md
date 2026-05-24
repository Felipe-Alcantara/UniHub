# ATLETIZA Frontend

Interface React + Vite + Tailwind do hub mobile-first para atleticas universitarias.

## Setup local

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Por padrao, o Vite sobe em `http://localhost:3000` e faz proxy de `/api` para `http://127.0.0.1:8000`.

O login depende do backend Django ativo e das contas demo persistidas:

- `gabriel@atletiza.com`
- `julia@atletiza.com`
- `andre@atletiza.com`
- `luiz.filipe@atletiza.com`
- `diretoria@exemple.com`
- `admin@exemple.com`

Senha comum: `Atletiza@2026`.

## Estrutura

```text
frontend/src/
├── components/
│   ├── layout/   # Navbar, sidebar e wrapper de pagina
│   └── ui/       # Button, Card, Badge, Input, Modal
├── data/         # Dados mockados do MVP
├── pages/        # Dashboard, aluno, atletica e mapa
└── utils/        # Cliente de API e helpers
```

## Telas ativas

- `/login` autenticacao de demonstracao validada pelo backend
- `/` landing autenticada com resumo e acessos do hub
- `/calendar` agenda e eventos
- `/sports` modalidades e seletivas
- `/board` painel demo de diretoria
