# Contexto de IA - UniHub

Este arquivo concentra o contexto tecnico do projeto para permitir retomada rapida por outra IA ou por uma nova sessao.

## Objetivo do Projeto

[2026-05-23] UniHub centraliza informacoes academicas, eventos, prazos, mapa do campus e rotinas da atletica em uma experiencia unica para estudantes.

[2026-05-23] O projeto nasceu para hackathon; prioridade atual: MVP navegavel, estrutura clara e base pronta para evoluir.

## Metas & Milestones

[2026-05-23] concluida - Estrutura frontend React + Vite + Tailwind criada.

[2026-05-23] concluida - Telas iniciais criadas: dashboard, area do aluno, atletica e mapa do campus.

[2026-05-23] concluida - Backend Django + DRF scaffoldado com apps academico, atletica e campus.

[2026-05-23] pendente - Conectar frontend aos endpoints reais da API.

[2026-05-23] concluida - Criado comando `python manage.py seed_demo` para dados de apresentacao.

## Stack & Dependencias

[2026-05-23] Frontend: React 18, Vite 6, Tailwind CSS 3, Framer Motion 11, Lucide React e React Router DOM 6.

[2026-05-23] Backend: Python, Django, Django REST Framework, django-cors-headers e SQLite.

[2026-05-23] Documentacao base e organizacao seguem a pasta `felixo-standards`.

## Decisoes de Arquitetura

[2026-05-23] Frontend organizado em `components/ui`, `components/layout`, `components/parts`, `pages`, `data` e `utils`, seguindo o padrao Felixo.

[2026-05-23] Dados do frontend ficam mockados em `frontend/src/data/unihub-data.js` para velocidade de prototipacao no hackathon.

[2026-05-23] Backend criado como monolito Django modular, com `apps/academics`, `apps/athletics` e `apps/campus`.

[2026-05-23] API inicial usa `ReadOnlyModelViewSet` para reduzir risco no MVP e liberar leitura publica dos dados.

## Decisoes de Design & Convencoes

[2026-05-23] Interface segue tema escuro com acentos indigo, emerald, amber e sky para diferenciar estados e dominios.

[2026-05-23] Arquivos React usam `kebab-case.jsx`; componentes exportam default quando representam uma unica unidade.

[2026-05-23] Rotas frontend iniciais: `/`, `/aluno`, `/atletica`, `/mapa`.

[2026-05-23] Endpoints backend versionados sob `/api/v1/`; health check fora da versao em `/api/health/`.

## Testes Importantes

[2026-05-23] concluido - `npm run build` passou no frontend.

[2026-05-23] concluido - `.venv/bin/python manage.py test` passou no backend com health check.

## Bugs & Fixes Relevantes

[2026-05-23] Nenhum bug funcional registrado ainda; projeto esta em scaffold inicial.

## Integracoes & Servicos Externos

[2026-05-23] Nenhuma integracao externa configurada. Frontend preparado para consumir API via `VITE_API_URL`.

## Notas Gerais

[2026-05-23] O README original continha a descricao do produto em texto corrido; foi reorganizado em documentacao tecnica de entrada.

[2026-05-23] O mapa do campus usa layout interativo mockado no frontend ate existirem dados reais da instituicao.
