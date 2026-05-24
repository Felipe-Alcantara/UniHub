# ATLETIZA

Hub mobile-first para atleticas universitarias, focado em centralizar treinos, eventos, modalidades, links, vitrine e comunicacao em um unico fluxo.

## Problema real
As informacoes da atletica normalmente ficam espalhadas entre grupos, redes sociais, planilhas e mensagens privadas. Isso gera perda de informacao para alunos e retrabalho para a diretoria.

## Proposta de valor
ATLETIZA organiza tudo em uma experiencia unica, navegavel e apresentavel para hackathon:
- dashboard do dia
- agenda com filtros
- modalidades com regra de entrada livre/seletiva
- detalhe de evento/treino
- links importantes
- vitrine de produtos
- carteirinha digital
- mural com enquetes
- painel da diretoria com formularios mockados

## Diferencial
Nao e um hub academico generico. O produto e centrado nas regras reais do ecossistema de atleticas: modalidades, seletivas, eventos publicos/privados, aprovacoes e lista de presenca de eventos gratuitos.

## Status do MVP
Pronto para demo local e captura de prints de apresentacao.

## Funcionalidades do MVP
- Login mockado por perfil (`aluno`, `diretoria`, `dev/admin`)
- Dashboard do aluno com resumo do dia
- Agenda com filtros por tipo, visibilidade e modalidade
- Tela de detalhe de evento/treino com regra de confirmacao de presenca
- Lista de modalidades e detalhe com estados:
  - participante
  - nao participante
  - solicitacao pendente
  - rejeitado
  - entrada livre
  - seletiva necessaria
- Central de links importantes
- Vitrine de produtos (sem checkout)
- Carteirinha digital mockada
- Mural de avisos e enquetes
- Painel da diretoria (mockado) com:
  - criacao/edicao visual de eventos, treinos, modalidades, links e produtos
  - aprovacao/rejeicao de seletiva
  - lista de presenca de eventos gratuitos

## O que esta mockado
- Autenticacao/login
- Dados de usuarios, eventos, modalidades, links, produtos, avisos e enquetes
- Fluxos administrativos
- Confirmacoes e aprovacoes persistidas apenas em estado local

## Limitacoes conscientes do MVP
- Sem autenticacao real
- Sem pagamento, checkout ou venda real
- Sem check-in
- Sem backend integrado ao frontend neste ciclo
- Backend Django mantido para evolucao futura

## Stack
- Frontend: React + Vite + Tailwind + Framer Motion + Lucide
- Testes frontend: Vitest
- Backend (base existente): Django + DRF + SQLite

## Estrutura de mocks
- `frontend/src/data/mockAthletic.js`
- `frontend/src/data/mockUser.js`
- `frontend/src/data/mockSports.js`
- `frontend/src/data/mockEvents.js`
- `frontend/src/data/mockProducts.js`
- `frontend/src/data/mockLinks.js`
- `frontend/src/data/mockPolls.js`
- `frontend/src/data/mockAnnouncements.js`

## Como rodar o frontend
```bash
cd frontend
npm install
npm run dev
```
Acesso local: `http://localhost:3000`

## Como rodar testes frontend
```bash
cd frontend
npm test
npm run build
```

## Como rodar backend (opcional para este MVP)
```bash
cd backend
python -m venv .venv
# Ative o ambiente virtual
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

## Workflow de branches para agentes IA
- Nao trabalhar direto na `main` sem autorizacao explicita
- Criar branch por feature
  - Exemplo: `feature/atletiza-mvp`
- Implementar -> testar -> validar manualmente -> documentar
- Solicitar revisao/merge
- Apagar branch apos validacao

### Rotina Git obrigatoria
Antes de iniciar uma task:
- `git fetch origin`
- `git pull origin main`
- atualizar a branch de trabalho com a `main` (merge/rebase conforme estrategia adotada pelo time)

Antes de commit/entrega:
- `git fetch origin`
- `git pull origin main`
- rodar testes
- commitar com Conventional Commits
- `git push origin <branch>`
- abrir PR para `main`

## TDD pragmático aplicado
Foram adicionados testes para regras criticas em:
- `frontend/src/utils/__tests__/athletiza-rules.test.js`

Cobertura atual:
- filtro da agenda
- visibilidade de evento publico/privado
- diferenca entrada livre x seletiva
- regra de confirmacao de presenca
- diferenca de acesso aluno x diretoria/admin

## Hackathon
Este projeto foi priorizado para UX, navegacao e demonstracao local, conforme escopo de hackathon (prova de conceito forte, viavel e clara para pitch).

## Visao futura
- autenticacao real e controle de sessao
- API completa conectada ao frontend
- permissoes por cargo persistidas
- inscricoes reais em modalidades
- aprovacao real de seletivas
- integracao com WhatsApp/Instagram
- pagamentos externos
- relatorios da diretoria
- suporte multi-atleticas
- deploy
