# ATLETIZA Frontend

Interface React + Vite + Tailwind do hub mobile-first para atleticas universitarias.

## Setup local

```bash
cd frontend
npm install
npm run dev
```

Por padrao, o Vite sobe em `http://localhost:3000`.

O login e demonstrativo e roda somente com estado local:

- `aluno@atletiza.com`
- `andre@atletiza.com`
- `julia@atletiza.com`
- `luiz.filipe@atletiza.com`
- `diretoria@exemple.com`
- `admin@exemple.com`

Senha visual sugerida: `Atletiza@2026`.

## Estrutura

```text
frontend/src/
├── components/   # Layout, marca e componentes de UI
├── data/         # Dados mockados do layout
├── pages/        # Telas navegaveis da Atletiza
└── utils/        # Regras e helpers do frontend
```

## Telas ativas

- `/login` acesso de demonstracao local
- `/` landing autenticada com resumo e acessos do hub
- `/calendar` agenda e eventos
- `/hours` horas complementares oferecidas por evento
- `/sports` modalidades
- `/board` painel demo de diretoria
