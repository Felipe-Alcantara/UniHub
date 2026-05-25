# ATLETIZA

Hub mobile-first para atléticas universitárias, focado em centralizar treinos, eventos, modalidades, links, vitrine e comunicação em um único fluxo.

---

# Problema real

As informações da atlética normalmente ficam espalhadas entre grupos, redes sociais, planilhas e mensagens privadas. Isso gera perda de informação para alunos e retrabalho para a diretoria.

---

# Proposta de valor

O ATLETIZA organiza tudo em uma experiência única, navegável e apresentável em contexto acadêmico:

- Landing autenticada com resumo do dia e acessos ao hub
- Agenda com filtros
- Modalidades com regra de entrada livre/seletiva
- Detalhe de evento/treino
- Links importantes
- Vitrine de produtos
- Carteirinha digital
- Mural com enquetes
- Painel da diretoria com formulários mockados

---

# Diferencial

Não é um hub acadêmico genérico.

O produto é centrado nas regras reais do ecossistema de atléticas:

- modalidades
- seletivas
- eventos públicos/privados
- aprovações
- lista de presença de eventos gratuitos

---

# Contexto de apresentação e compromisso real

O ATLETIZA será apresentado na faculdade em uma avaliação com recursos e tempo limitados, considerando uma janela de 48 horas.

Apesar do formato acadêmico, o projeto não é tratado como uma ficção ou apenas como demonstração visual: ele representa uma solução real para atléticas universitárias e deve permanecer tecnicamente viável, útil e evolutiva após a apresentação.

A entrega atual prioriza um MVP navegável e honesto:

- o que ainda é simulado está identificado
- as decisões de produto, interface e tecnologia permitem evolução para uso real
- foco em smartphones e web
- sem depender de infraestrutura inacessível

---

# Critérios de avaliação da apresentação

## I. Inovação e adequação ao tema

### Compreensão do desafio

Demonstrar que a solução ataca a raiz do problema:

- informações dispersas
- comunicação fragmentada
- dificuldade de acesso a eventos, modalidades e serviços

### Originalidade

Apresentar o diferencial de um hub especializado no funcionamento de atléticas universitárias, em vez de um portal genérico ou cópia direta de outro aplicativo.

### Criatividade na restrição

Justificar as escolhas de MVP feitas para produzir uma solução clara e funcional dentro dos recursos e do prazo de 48 horas.

---

## II. Experiência do usuário (UX/UI)

### Fluxo de navegação

Permitir percursos lógicos entre login, home e funcionalidades.

Nenhuma tela secundária deve deixar o usuário sem caminho de retorno.

### Clareza e intuição

Manter ações reconhecíveis e linguagem simples para que qualquer pessoa entenda rapidamente a finalidade da plataforma.

### Capricho visual

Garantir:

- consistência da identidade ATLETIZA
- alinhamentos
- contraste legível
- responsividade mobile-first

---

## III. Viabilidade e impacto

### Dor real

Evidenciar que a desorganização de informações e processos afeta alunos e diretorias de atléticas.

### Potencial de mercado

Estruturar o MVP para que três meses adicionais de desenvolvimento possam transformá-lo em um produto efetivamente utilizável.

### Custos e realidade

Manter a solução baseada em tecnologias acessíveis:

- aplicação web responsiva
- smartphones
- backend convencional

---

# Status do MVP

Pronto para demo local e captura de prints para apresentação.

---

# Funcionalidades do MVP

## Autenticação

- Login com e-mail e senha validados no backend
- Perfis:
  - aluno
  - diretoria
  - dev/admin

## Home

- Landing interna pós-login
- Resumo do aluno
- Destaques
- Acesso rápido às áreas do hub

## Agenda

- Filtros por:
  - tipo
  - visibilidade
  - modalidade

## Eventos e treinos

- Tela de detalhe
- Regra de confirmação de presença

## Modalidades

Estados disponíveis:

- participante
- não participante
- solicitação pendente
- rejeitado
- entrada livre
- seletiva necessária

## Links importantes

Central de acesso rápido.

## Vitrine de produtos

- Busca
- Filtro por categoria
- Contato simulado
- Sem checkout

## Carteirinha digital

Versão mockada.

## Mural

- Avisos
- Enquetes

## Painel da diretoria (mockado)

- Criação/edição visual de:
  - eventos
  - treinos
  - modalidades
  - links
  - produtos

- Aprovação/rejeição de seletiva
- Lista de presença de eventos gratuitos

---

# O que está mockado

- Dados de usuários
- Eventos
- Modalidades
- Links
- Produtos
- Avisos
- Enquetes
- Fluxos administrativos

Persistência apenas em estado local.

---

# Contas de demonstração

Senha padrão para todas as contas:

```txt
Atletiza@2026
```

| Participante / Ambiente | E-mail | Matrícula |
|---|---|---|
| Gabriel Fernandes | `gabriel@atletiza.com` | `202612345` |
| Júlia de Oliveira Martins | `julia@atletiza.com` | `2025101351` |
| André Gustavo Melo da Silva | `andre@atletiza.com` | `2023121370` |
| Luiz Filipe Silva Rocha | `luiz.filipe@atletiza.com` | `2025101510` |
| Diretoria | `diretoria@example.com` | - |
| Dev/Admin | `admin@example.com` | - |

---

# Limitações conscientes do MVP

- Sem recuperação automática de sessão autenticada
- Sem checkout/pagamentos
- Sem check-in
- Backend integrado apenas para login neste ciclo
- Conteúdo funcional ainda alimentado por mocks

---

# Stack

## Frontend

- React
- Vite
- TailwindCSS
- Framer Motion
- Lucide

## Backend

- Django
- Django REST Framework
- SQLite

## Testes

- Vitest

---

# Estrutura de mocks

```txt
frontend/src/data/mockAthletic.js
frontend/src/data/mockUser.js
frontend/src/data/mockSports.js
frontend/src/data/mockEvents.js
frontend/src/data/mockProducts.js
frontend/src/data/mockLinks.js
frontend/src/data/mockPolls.js
frontend/src/data/mockAnnouncements.js
```

---

# Como rodar o backend

```bash
cd backend

python -m venv .venv

# Ative o ambiente virtual

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver 8000
```

---

# Como rodar o frontend

```bash
cd frontend

npm install

npm run dev
```

Acesso local:

```txt
http://localhost:3000
```

O backend deve estar ativo para realizar login.

---

# Como rodar os testes

```bash
cd frontend

npm test

npm run build
```

---

# Workflow Git

## Regras

- Não trabalhar diretamente na `main`
- Criar branch por feature
- Implementar → testar → validar → documentar
- Abrir PR
- Remover branch após merge

Exemplo:

```bash
feature/atletiza-mvp
```

---

# Rotina Git obrigatória

## Antes de iniciar

```bash
git fetch origin

git pull origin main
```

Atualizar a branch de trabalho com a `main`.

---

## Antes da entrega

```bash
git fetch origin

git pull origin main

npm test
```

Depois:

```bash
git commit -m "feat: descricao"

git push origin nome-da-branch
```

Abrir PR para `main`.

---

# TDD pragmático aplicado

Testes implementados em:

```txt
frontend/src/utils/__tests__/athletiza-rules.test.js
```

## Cobertura atual

- filtro da agenda
- visibilidade público/privado
- entrada livre x seletiva
- confirmação de presença
- acesso aluno x diretoria/admin

---

# Hackathon

O projeto foi priorizado para:

- UX
- navegação
- demonstração local
- entrega realista dentro da restrição de 48 horas

A apresentação acadêmica valida um MVP, mas o norte do produto é uma solução real, viável e evolutiva.

---

# Visão futura

- restauração automática de sessão
- API completa integrada ao frontend
- permissões persistidas
- inscrições reais em modalidades
- aprovação real de seletivas
- integração com WhatsApp/Instagram
- pagamentos externos
- relatórios da diretoria
- suporte multiatléticas
- deploy

---
