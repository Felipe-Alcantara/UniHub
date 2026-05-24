# AGENTS.md - Guia para Agentes de IA

## Fonte de verdade
O prompt mestre ATLETIZA e a fonte universal da verdade do projeto.

Se houver conflito com arquivos antigos, comentarios antigos ou logica antiga do UniHub, o prompt mestre ATLETIZA prevalece.

## Leitura obrigatoria antes de alterar codigo
1. `README.md`
2. `IA.md`
3. `AGENTS.md`
4. Pasta `felixo-standards`

## Direcao de produto
- Este projeto e ATLETIZA, nao UniHub.
- Foco: hub mobile-first para atleticas universitarias.
- Prioridade: MVP navegavel, UX clara e demo robusta com mocks.

## Regras operacionais
- Nao trabalhar direto na `main` sem autorizacao explicita.
- Criar branch por feature/fix/docs.
- Usar TDD de forma pragmatica (fluxos criticos primeiro).
- Rodar testes antes de finalizar.
- Documentar alteracoes relevantes no `IA.md`.
- Nao apagar arquivos uteis sem justificativa tecnica clara.
- Nao quebrar fluxo mobile-first.
- Nao reintroduzir telas/conceitos de hub academico generico.

## Rotina Git obrigatoria
### Antes de iniciar qualquer task
1. `git fetch origin`
2. `git pull origin main`
3. Fazer merge da `main` para a branch de trabalho (se necessario): `git merge origin/main`
4. Executar a task normalmente

### Quando for solicitado commit/entrega
1. `git fetch origin`
2. `git pull origin main`
3. Garantir que a branch de trabalho esta atualizada com a `main`
4. Rodar testes e validacoes
5. Criar commits seguindo padrao convencional
6. `git push origin <nome-da-branch>`
7. Abrir PR da branch para `main`

## Padrao de commit obrigatorio
- Seguir Conventional Commits.
- Prefixos permitidos:
  - `feat:` nova funcionalidade
  - `fix:` correcao de bug
  - `docs:` documentacao
  - `test:` testes
  - `refactor:` refatoracao sem alterar comportamento
  - `chore:` manutencao/configuracao
  - `style:` ajuste visual/estilo sem mudanca logica

## Qualidade esperada
- Componentes pequenos e reutilizaveis.
- Funcoes com responsabilidade unica.
- Nomes claros e sem variaveis genericas.
- Mocks organizados em arquivos dedicados.
- Botao sem acao real deve ter feedback de simulacao.
- Nenhuma tela secundaria sem opcao de voltar.

## O que deve ficar explicito na entrega
- O que e mockado
- O que e real
- O que ficou para evolucao futura
- Quais testes foram executados

## Workflow sugerido por feature
1. Criar branch
2. Definir comportamento testavel
3. Implementar minimo necessario
4. Rodar testes
5. Validar fluxo manual
6. Atualizar documentacao
7. Solicitar validacao/merge
8. Apagar branch apos validacao
