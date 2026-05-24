# ATLETIZA

Hub mobile-first para atleticas universitarias, focado em centralizar treinos, eventos, modalidades, links, vitrine e comunicacao em um unico fluxo.

## Problema real
As informacoes da atletica normalmente ficam espalhadas entre grupos, redes sociais, planilhas e mensagens privadas. Isso gera perda de informacao para alunos e retrabalho para a diretoria.

## Proposta de valor
ATLETIZA organiza tudo em uma experiencia unica, navegavel e apresentavel em contexto academico:
- landing autenticada com resumo do dia e acessos do hub
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

## Contexto de apresentacao e compromisso real
O ATLETIZA sera apresentado na faculdade em uma avaliacao com recursos e tempo limitados, considerando uma janela de 48 horas. Apesar do formato academico, o projeto nao e tratado como uma ficcao ou somente como demonstracao visual: ele representa uma solucao real para atleticas universitarias e deve permanecer tecnicamente viavel, util e evolutiva apos a apresentacao.

A entrega atual prioriza um MVP navegavel e honesto: o que ainda e simulado esta identificado, enquanto as decisoes de produto, interface e tecnologia devem permitir evolucao para uso real com smartphones e web, sem depender de infraestrutura inacessivel.

## Criterios de avaliacao da apresentacao
### I. Inovacao e adequacao ao tema
- **Compreensao do desafio:** demonstrar que a solucao ataca a raiz do problema: informacoes da atletica dispersas, comunicacao fragmentada e dificuldade de acesso a eventos, modalidades e servicos.
- **Originalidade:** apresentar o diferencial de um hub especializado no funcionamento de atleticas universitarias, em vez de um portal generico ou copia direta de outro aplicativo.
- **Criatividade na restricao:** justificar as escolhas de MVP feitas para produzir uma solucao clara e funcional dentro dos recursos e do prazo de 48 horas.

### II. Experiencia do usuario (UX/UI)
- **Fluxo de navegacao:** permitir percursos logicos entre login, home e funcionalidades; nenhuma tela secundaria deve deixar o usuario sem caminho de retorno.
- **Clareza e intuicao:** manter acoes reconheciveis e linguagem simples para que uma pessoa leiga entenda rapidamente a finalidade da plataforma.
- **Capricho visual:** garantir consistencia da identidade ATLETIZA, alinhamentos, contraste legivel e responsividade mobile-first.

### III. Viabilidade e impacto (visao de negocio)
- **Dor real:** evidenciar que a desorganizacao de informacoes e processos afeta alunos e diretorias de atleticas.
- **Potencial de mercado:** estruturar o MVP para que tres meses adicionais de desenvolvimento possam transforma-lo em um produto efetivamente utilizavel.
- **Custos e realidade:** manter a solucao baseada em tecnologias acessiveis, como aplicacao web responsiva, smartphones e backend convencional.

## Status do MVP
Pronto para demo local e captura de prints de apresentacao.

## Funcionalidades do MVP
- Login padrao com email e senha validados no backend para os perfis `aluno`, `diretoria` e `dev/admin`
- Landing interna pos-login com resumo do aluno, destaques e acesso a todas as areas
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
- Vitrine de produtos com busca, filtro por categoria e contato simulado (sem checkout)
- Carteirinha digital mockada
- Mural de avisos e enquetes
- Painel da diretoria (mockado) com:
  - criacao/edicao visual de eventos, treinos, modalidades, links e produtos
  - aprovacao/rejeicao de seletiva
  - lista de presenca de eventos gratuitos

## O que esta mockado
- Dados de usuarios, eventos, modalidades, links, produtos, avisos e enquetes
- Fluxos administrativos
- Confirmacoes e aprovacoes persistidas apenas em estado local

## Contas de demonstração
O login consulta contas salvas no SQLite pelo backend Django. Todas usam a senha `Atletiza@2026`:

| Participante / Ambiente | E-mail | Matrícula |
| --- | --- | --- |
| Gabriel Fernandes | `gabriel@atletiza.com` | `202612345` (mock existente, a confirmar) |
| Júlia de Oliveira Martins | `julia@atletiza.com` | `2025101351` |
| André Gustavo Melo da Silva | `andre@atletiza.com` | `2023121370` |
| Luiz Filipe Silva Rocha | `luiz.filipe@atletiza.com` | `2025101510` |
| Diretoria | `diretoria@exemple.com` | - |
| Dev/Admin | `admin@exemple.com` | - |

## Limitacoes conscientes do MVP
- Login validado no backend, mas sem recuperacao automatica da sessao no frontend apos recarregar a pagina
- Sem pagamento, checkout ou venda real
- Sem check-in
- Backend integrado apenas para o acesso inicial neste ciclo
- Conteudo funcional do hub ainda alimentado por mocks

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

## Como rodar o backend para login
```bash
cd backend
python -m venv .venv
# Ative o ambiente virtual
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

## Como rodar o frontend
```bash
cd frontend
npm install
npm run dev
```
Acesso local: `http://localhost:3000`. O backend deve estar ativo para realizar login.

## Como rodar testes frontend
```bash
cd frontend
npm test
npm run build
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
Este projeto foi priorizado para UX, navegacao e demonstracao local dentro da restricao de 48 horas. A apresentacao academica valida um MVP, mas o norte do produto e uma solucao real, viavel e clara para continuidade.

## Visao futura
- restauracao automatica de sessao autenticada no frontend
- API completa conectada ao frontend
- permissoes por cargo persistidas
- inscricoes reais em modalidades
- aprovacao real de seletivas
- integracao com WhatsApp/Instagram
- pagamentos externos
- relatorios da diretoria
- suporte multi-atleticas
- deploy
