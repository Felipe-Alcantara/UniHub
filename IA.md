# Contexto de IA - ATLETIZA

Este arquivo registra a memoria tecnica do projeto para continuidade entre sessoes e agentes.

## Mudanca de produto
- [2026-05-24] O projeto deixou de ser UniHub e passou a ser ATLETIZA.
- [2026-05-24] Fonte de verdade: prompt mestre do hackathon ATLETIZA.
- [2026-05-24] Conceitos antigos (campus/mapa/materias/prazos academicos) foram removidos do frontend ativo.

## Objetivo atual
- [2026-05-24] Entregar MVP mobile-first pronto para demo local e captura de prints de apresentacao.
- [2026-05-24] Prioridade em UX, fluxo navegavel e consistencia visual com dados mockados.

## Decisoes de escopo
- [2026-05-24] Frontend completo com mocks e comportamento local.
- [2026-05-24] Backend mantido como base de evolucao futura (nao integrado no MVP atual).
- [2026-05-24] Login, aprovacoes e confirmacoes implementados como simulacao em estado local.

## Stack ativa
- Frontend: React 18, Vite 6, Tailwind CSS, Framer Motion, Lucide React.
- Testes frontend: Vitest.
- Backend base: Django + DRF + SQLite.

## Telas implementadas no frontend
- [2026-05-24] Login mockado por perfil.
- [2026-05-24] Dashboard do aluno.
- [2026-05-24] Agenda/calendario com filtros.
- [2026-05-24] Detalhe de evento/treino.
- [2026-05-24] Modalidades.
- [2026-05-24] Detalhe de modalidade.
- [2026-05-24] Links importantes.
- [2026-05-24] Vitrine de produtos.
- [2026-05-24] Carteirinha digital.
- [2026-05-24] Mural de avisos e enquetes.
- [2026-05-24] Painel da diretoria com formularios mockados, aprovacoes e lista de presenca.

## Mocks e organizacao de dados
- [2026-05-24] Dados separados em `frontend/src/data/mock*.js`.
- [2026-05-24] Regras de negocio front em `frontend/src/utils/athletiza-rules.js`.
- [2026-05-24] Estado demo global em `frontend/src/context/demo-context.jsx`.

## Testes executados
- [2026-05-24] `npm test` (frontend): passou (5 testes).
- [2026-05-24] `npm run build` (frontend): passou.
- [2026-05-24] `python manage.py test` (backend): falhou por dependencia ausente (`django` nao instalado no ambiente atual).

## Pendencias e proximos passos
- Integrar frontend a API real do backend.
- Persistir aprovacoes e confirmacoes em banco.
- Implementar autenticacao real e permissoes por cargo.
- Revisar textos finais para pitch e storytelling.
- Adicionar capturas de tela finais no README.

## Regras para proximos agentes
- Ler `README.md`, `IA.md`, `AGENTS.md` e `felixo-standards` antes de alterar codigo.
- Nao reintroduzir o conceito UniHub no produto ativo.
- Manter foco mobile-first e UX sem becos sem saida.
- Preservar mocks organizados e clareza do que e simulacao.
- Rodar testes frontend e build antes de finalizar alteracoes.
- [2026-05-24] Rotina Git obrigatoria registrada:
  - Antes de iniciar task: `git fetch origin` -> `git pull origin main` -> merge da `main` na branch de trabalho.
  - Antes de commit/entrega: `git fetch origin` -> `git pull origin main` -> validar testes -> commit convencional -> `git push` -> abrir PR para `main`.
