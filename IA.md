# Contexto de IA - ATLETIZA

Este arquivo registra a memoria tecnica do projeto para continuidade entre sessoes e agentes.

## Mudanca de produto
- [2026-05-24] O projeto deixou de ser UniHub e passou a ser ATLETIZA.
- [2026-05-24] Fonte de verdade: prompt mestre do hackathon ATLETIZA.
- [2026-05-24] Conceitos antigos (campus/mapa/materias/prazos academicos) foram removidos do frontend ativo.

## Objetivo atual
- [2026-05-24] Entregar MVP mobile-first pronto para demo local e captura de prints de apresentacao.
- [2026-05-24] Prioridade em UX, fluxo navegavel e consistencia visual com dados mockados.
- [2026-05-24] O produto sera apresentado na faculdade sob restricao de 48 horas, mas deve ser conduzido como solucao real, tecnicamente viavel e evolutiva para atleticas universitarias.

## Criterios da apresentacao academica
- [2026-05-24] Inovacao e adequacao ao tema: demonstrar compreensao da dor de comunicacao fragmentada das atleticas, diferencial frente a solucoes genericas e escolhas criativas compativeis com o prazo limitado.
- [2026-05-24] Experiencia do usuario: preservar fluxo logico entre login e funcionalidades, navegacao sem becos sem saida, interface intuitiva, contraste legivel e responsividade mobile-first.
- [2026-05-24] Viabilidade e impacto: sustentar uma dor real, potencial de se tornar produto util com tres meses de evolucao e uso de tecnologias acessiveis como web, smartphones e backend convencional.
- [2026-05-24] Regra de decisao: priorizar funcionalidades e refinamentos que fortalecam demonstracao, uso real e possibilidade de implementacao apos a apresentacao; identificar claramente tudo que permanecer mockado.

## Decisoes de escopo
- [2026-05-24] Frontend completo com mocks e comportamento local.
- [2026-05-24] Backend mantido como base de evolucao futura (nao integrado no MVP atual).
- [2026-05-24] Login, aprovacoes e confirmacoes implementados como simulacao em estado local.
- [2026-05-24] Evolucao posterior integrou apenas o login ao backend; dados das telas, aprovacoes e confirmacoes continuam mockados/locais.

## Stack ativa
- Frontend: React 18, Vite 6, Tailwind CSS, Framer Motion, Lucide React.
- Testes frontend: Vitest.
- Backend base: Django + DRF + SQLite.

## Telas implementadas no frontend
- [2026-05-24] Login mockado por perfil.
- [2026-05-24] Landing autenticada do aluno em `/`, com hero visual, resumo do dia e atalhos para todas as areas do hub.
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

## Evolucao da landing autenticada
- [2026-05-24] O endpoint `/login` permanece como unica entrada publica; qualquer rota interna sem perfil ativo redireciona para login.
- [2026-05-24] Depois do login demo, o acesso inicia em `/`; `/dashboard` foi mantido como redirecionamento compativel.
- [2026-05-24] Conteudo da landing utiliza os mocks existentes de eventos, avisos, produtos, links, modalidades e carteirinha; nenhuma integracao real foi adicionada.
- [2026-05-24] `npm test` (frontend): passou (7 testes), incluindo bloqueio sem login e entrada na landing apos login demo.
- [2026-05-24] `npm run build` (frontend): passou apos adicao da landing e otimizacao do hero.

## Evolucao da tela de login
- [2026-05-24] Login redesenhado como experiencia premium mobile-first, com hero fotografico, painel clean translucido e hierarquia visual alinhada a identidade escura/laranja ATLETIZA.
- [2026-05-24] Foram adicionadas microanimacoes com Framer Motion para entrada, ambientacao e selecao de perfil, respeitando preferencia de movimento reduzido (`prefers-reduced-motion`).
- [2026-05-24] O fluxo permanece integralmente mockado: a tela apenas seleciona `student`, `board` ou `admin` em estado local e encaminha para a landing autenticada.
- [2026-05-24] Teste de fluxo ampliado para validar a selecao acessivel de perfil via `aria-pressed`.
- [2026-05-24] `npm test` (frontend): passou (8 testes) apos o redesenho do login.
- [2026-05-24] `npm run build` (frontend): passou apos o redesenho do login.
- [2026-05-24] A pedido do stakeholder, o seletor de perfil foi substituido por tela padrao de email e senha com animacao discreta.
- [2026-05-24] Login integrado a `POST /api/v1/auth/login/`; a resposta do backend determina o ambiente (`student`, `board` ou `admin`).
- [2026-05-24] Contas persistidas via migracao Django/SQLite: `aluno@exemple.com`, `diretoria@exemple.com`, `admin@exemple.com`; senha demo comum `Atletiza@2026`.
- [2026-05-24] A integracao autentica o acesso inicial e cria sessao Django; restauracao automatica da sessao no frontend apos refresh permanece evolucao futura.
- [2026-05-24] `python manage.py migrate` aplicado no SQLite local; consulta ORM confirmou as tres contas e seus ambientes persistidos.
- [2026-05-24] `.venv\Scripts\python.exe manage.py test` (backend): passou (4 testes), incluindo os tres emails/ambientes e rejeicao de senha invalida.
- [2026-05-24] `npm test` (frontend): passou (8 testes) com chamada de login via API e preenchimento de credencial demo.
- [2026-05-24] `npm run build` (frontend): passou apos integracao do login padrao ao backend.
- [2026-05-24] O cliente de login passou a tratar backend indisponivel e respostas sem JSON com mensagem acionavel, em vez de expor `Unexpected end of JSON input`.
- [2026-05-24] Testes do frontend cobrem resposta vazia/nao JSON e falha de conexao ao endpoint de login.
- [2026-05-24] O proxy de desenvolvimento do Vite aponta para `127.0.0.1:8000`, evitando falha de conexao a `localhost` quando o Django esta vinculado apenas ao endereco IPv4 local.
- [2026-05-24] O inicializador `start.py` resolve o Python da virtualenv corretamente no Windows (`.venv/Scripts/python.exe`) e em sistemas POSIX (`.venv/bin/python`).
- [2026-05-24] Correcao do login validada com `npm test` (10 testes), `npm run build`, `.venv\Scripts\python.exe manage.py test apps.accounts` (3 testes) e requisicao real via proxy Vite retornando o perfil `student`.
- [2026-05-24] Navbar autenticada refinada com fundo translucido, blur mais suave e alinhamento full-width para aproximar marca e bloco do usuario das bordas em telas largas.
- [2026-05-24] Refinamento da navbar validado com `npm test` (10 testes) e `npm run build` (frontend).
- [2026-05-24] Transparencia da navbar autenticada elevada para acabamento visual mais leve, mantendo blur para legibilidade.
- [2026-05-24] Card da atletica no menu lateral removeu o texto interno `Hub mobile-first` e passou a exibir apenas um dos simbolos do asset de marca.
- [2026-05-24] O brasao Godzilla fornecido pelo stakeholder passou a identificar a atletica no menu, carteirinha, vitrine e painel; a marca ATLETIZA segue reservada ao produto.
- [2026-05-24] Aplicacao do brasao validada com `npm test` (12 testes) e `npm run build` (frontend).
- [2026-05-24] Scrollbar global alinhada a identidade ATLETIZA com trilho cinza escuro e indicador no laranja forte oficial da marca.
- [2026-05-24] Landing autenticada simplificada com remocao dos cards redundantes de carteirinha, vitrine e links oficiais; os acessos permanecem nas areas dedicadas e nos atalhos do hub.
- [2026-05-24] Bloco `Explore a ATLETIZA` removido da home por duplicar a navegacao existente; a landing prioriza hero, resumo, eventos e mural.
- [2026-05-24] Selo textual `Inicio autenticado` removido do hero para reduzir ruido visual na home apos o login.
- [2026-05-24] Interface revisada em português brasileiro: textos visíveis, mocks exibidos e mensagens do login receberam acentuação correta em UTF-8; `.editorconfig` fixa a codificação para futuras edições.
- [2026-05-24] Vitrine redesenhada como catálogo visual ATLETIZA com hero editorial, busca textual, filtro por categoria, cards compactos responsivos e contato simulado com feedback explícito; não há checkout nem venda real no MVP.
- [2026-05-24] Cabeçalho da vitrine compactado em composição horizontal: título e disponibilidade à esquerda, busca e filtro à direita em telas largas, reduzindo texto redundante.
- [2026-05-24] Filtro de categoria da vitrine substituiu o menu nativo por dropdown ATLETIZA acessível, com seleção destacada, fechamento por `Escape`/clique externo e animações leves; cards e feedback transitam suavemente ao filtrar/interagir.
- [2026-05-24] Dropdown customizado preserva navegacao por teclado com setas, `Home` e `End`, evitando perda de acessibilidade em relacao ao seletor nativo.
- [2026-05-24] Camada do dropdown da vitrine foi elevada sobre os cards e o hero deixou de recortar o menu aberto, preservando bordas arredondadas no fundo decorativo.
- [2026-05-24] Carteirinha digital ganhou QR visual de demonstração em SVG, com legenda clara de mock, para substituir o bloco textual anterior.
- [2026-05-24] QR da carteirinha validado com `npm test` (15 testes) e `npm run build` (frontend).
- [2026-05-24] Contatos telefônicos mockados padronizados com DDD `(24)`, correspondente à cidade da atlética, em modalidades, eventos, links, vitrine e contato institucional.
- [2026-05-24] Dados institucionais mockados atualizados para identificar `Davi` como presidente da Atlética Godzilla; o evento associado ao contato presidencial também foi alinhado.
- [2026-05-24] Itens oficiais da vitrine antes atribuídos a `Carlos Lima` passaram a encaminhar contato simulado para `Davi`, presidente da Atlética Godzilla, pelo número institucional `(24) 98888-2100`.
- [2026-05-24] Login ampliado com contas pessoais persistidas para `gabriel@atletiza.com`, `julia@atletiza.com`, `andre@atletiza.com` e `luiz.filipe@atletiza.com`; a API agora retorna matrícula e o frontend exibe nome/matrícula do participante autenticado.
- [2026-05-24] Matrículas recebidas e cadastradas: André `2023121370`, Júlia `2025101351` e Luiz Filipe `2025101510`; a matrícula de Gabriel permanece como mock existente `202612345` até confirmação.
- [2026-05-24] Contas pessoais validadas com migração aplicada no SQLite local, `.venv\Scripts\python.exe manage.py test apps.accounts` (4 testes), `npm.cmd test` (16 testes) e `npm.cmd run build`.
- [2026-05-24] Frontend passou a manter diretório local por e-mail dos participantes como fallback da API, garantindo que `luiz.filipe@atletiza.com` exiba a matrícula `2025101510` mesmo se a resposta de login vier sem matrícula.
- [2026-05-24] Ícones públicos do Drive `Icones` foram baixados para `frontend/src/assets/sports` e aplicados em modalidades com correspondência direta: futsal, vôlei, basquete, handebol e e-sports; bateria e cheer permanecem com fallback visual por ausência de arquivo específico na pasta.
- [2026-05-24] Atalhos visíveis da tela de login voltaram a exibir apenas contas genéricas de demonstração (`aluno@exemple.com`, `diretoria@exemple.com`, `admin@exemple.com`); contas pessoais seguem persistidas para uso manual quando necessário.
- [2026-05-24] Tela de login refinada com composição minimalista premium: card translúcido com blur, gradientes sutis, inputs claros harmonizados em 48px, CTA laranja em gradiente e seção demo compacta.
- [2026-05-24] Login recebeu background animatic/cinematic com as palavras `Atletiza`, `ambientação` e `conectividade` em escala grande, entrada sequencial com blur e deriva sutil respeitando `prefers-reduced-motion`.
- [2026-05-24] Campo de senha do login ganhou alternância visual com ícone de olho e ação `Esqueci minha senha` com feedback simulado, mantendo o MVP sem recuperação real de credenciais.
- [2026-05-24] Background do login ganhou camadas sutis de glow e linha de profundidade no lado direito, além de leve deslocamento do card em telas grandes para reduzir vazio visual sem comprometer a estética clean.
- [2026-05-24] Background do login foi novamente refinado para reduzir massa preta no lado direito: a cápsula decorativa foi removida, a grade ficou mais sutil e o card foi recentrado em desktop amplo, preservando composição minimalista.
- [2026-05-24] Hub autenticado recebeu controle fixo de aparência no canto inferior esquerdo, alternando entre tema escuro e tema branco com persistência em `localStorage`; o tema branco acompanha as demais sessões autenticadas com inversão de fundos/textos escuros para claros sem alterar o fluxo do MVP.
- [2026-05-24] Ajuste visual posterior centralizou o modal de login no eixo real da viewport e removeu a grade/linha/glows laterais da direita, mantendo apenas uma iluminação central suave no fundo.
- [2026-05-24] Lado direito do background de login recebeu degradê lateral sutil em tons escuros, branco translúcido e laranja ATLETIZA para reduzir vazio preto sem deslocar o modal central.
- [2026-05-24] Background do login evoluiu para composição com degradê diagonal contínuo, painéis translúcidos na direita e card com contraste levemente maior, reduzindo áreas de preto chapado sem perder estética clean.
- [2026-05-24] Degradê do login foi suavizado para aparência mais esfumaçada: divisórias lineares e linha vertical foram removidas em favor de camadas radiais amplas com blur alto.
- [2026-05-24] Camadas esfumaçadas do login deixaram de usar elementos com blur e largura limitada, evitando recorte retangular visível; os efeitos passaram a ser gradientes `inset-0` sem bordas duras.
- [2026-05-24] Link `Esqueci minha senha` do login foi reposicionado abaixo do campo de senha como ação secundária, e o botão `Entrar` foi reduzido para melhorar proporção visual do card.
- [2026-05-24] Botão `Entrar` do login voltou a ocupar largura total; apenas altura, texto e ícone foram suavemente reduzidos conforme ajuste visual solicitado.
- [2026-05-24] Espaçamento entre senha, recuperação e CTA do login foi harmonizado: link ficou mais discreto, espaço vertical menor e botão com sombra/peso visual mais suave.
- [2026-05-24] Subtítulo do card de login (`Acesse seu ambiente...`) foi removido para simplificar a hierarquia visual.
- [2026-05-24] Card de login foi alongado verticalmente com mais padding e respiros internos; composição do background/texto lateral foi levemente ajustada para manter o card visualmente centralizado.
- [2026-05-24] Título interno visível `Entrar na Atletiza` foi removido do card de login; o heading permanece como `sr-only` para acessibilidade/testes, com padding e respiros ajustados para manter altura, simetria e equilíbrio visual sem texto redundante.
- [2026-05-24] Card de login recebeu sombra externa mais profunda e feixe de luz laranja animado ao redor, preservando o conteúdo interno e respeitando `prefers-reduced-motion`.
- [2026-05-24] Feixe do card de login foi refinado para agir como fita LED fina no contorno, usando máscara CSS em vez de bloco luminoso atrás do card.
- [2026-05-24] Fita LED do login foi corrigida para SVG com `rect` sem preenchimento e stroke animado, restringindo o efeito exclusivamente ao perímetro do card.
- [2026-05-24] Contorno LED do login passou a ser uma linha contínua presa ao limite real do card, evitando segmentos que pareciam parar ou atravessar conteúdo interno.
- [2026-05-24] Contorno LED do login foi simplificado para pseudo-elemento CSS com `border-radius: inherit`, garantindo encaixe perfeito nos cantos do card sem deformação de SVG.
- [2026-05-24] Desalinhamento do contorno LED foi corrigido pela causa: o efeito estava no wrapper externo com `inset` assimétrico, enquanto o card visível era o `section`; o LED passou para `box-shadow` no próprio painel.
- [2026-05-24] Linha do contorno do login foi separada do glow: a borda nítida passou para `::before` com `z-index` alto sobre o painel, enquanto o brilho ficou apenas como sombra externa.
- [2026-05-24] Logos ATLETIZA passaram a usar o componente `AtletizaLogo`, com variações de contraste para fundo escuro, fundo claro e modo adaptativo; a versão preta é derivada por CSS a partir do asset branco quando necessário.
- [2026-05-24] Ícones de modalidades ganharam moldura própria (`sport-icon-frame`) com base clara, borda e sombra para preservar contraste dos assets preto/branco nos temas escuro e claro.
- [2026-05-24] Tema branco foi refinado nos componentes base: cards, botões, badges e textos de estado ganharam estilos específicos; o overlay escuro dos cards bloqueados de modalidades foi removido para evitar barra preta no modo claro.
- [2026-05-24] Agenda ganhou área útil mais larga em desktop e filtros compactados em selects nativos para tipo/visibilidade e modalidade, substituindo a faixa horizontal de chips.
- [2026-05-24] Revisao de layout: o frontend autenticado foi ajustado para demonstracao local sem dependencia de backend no login, sem fluxos de confirmacao de presenca e sem aprovacoes manuais. Entradas de modalidades agora ficam liberadas/aprovadas visualmente, eventos mostram participacao como informacao de layout e o painel da diretoria exibe registros prontos em vez de acoes pendentes.
- [2026-05-24] O login voltou a usar contas demo locais, exibindo `aluno@atletiza.com`, `diretoria@exemple.com` e `admin@exemple.com`; os aliases pessoais `gabriel@atletiza.com`, `julia@atletiza.com`, `andre@atletiza.com` e `luiz.filipe@atletiza.com` tambem entram localmente com a senha visual `Atletiza@2026`, sem chamada a API no frontend.
- [2026-05-24] `npm test` (frontend): passou (15 testes) apos revisao para layout local.
- [2026-05-24] `npm run build` (frontend): passou apos revisao para layout local.
- [2026-05-24] O hub ganhou a aba local de horas complementares em `/hours`; cada evento mockado informa carga entre 5 e 20 horas, exibida na agenda, no detalhe e no resumo de oportunidades elegiveis.
- [2026-05-24] A concessao de horas foi refinada para apenas eventos justificaveis: campeonatos oficiais e atividade formativa; festas, treinos e amistosos nao geram horas.
- [2026-05-24] `npm test` (frontend): passou (16 testes), incluindo navegacao e totais da aba de horas complementares.
- [2026-05-24] `npm run build` (frontend): passou apos inclusao da aba de horas complementares.
- [2026-05-24] A central de links foi convertida em canais sociais da atletica, priorizando Instagram e grupos de WhatsApp com cards, icones e CTAs diretos de acesso.
- [2026-05-24] Background cinematografico do login removeu a palavra decorativa `Atletiza:` e alinhou `ambientacao & conectividade` horizontalmente, com entradas opostas nas laterais da composicao desktop.
- [2026-05-24] Modalidades deixaram de exibir valores/mensalidades nos cards de listagem e detalhe; a informacao de horarios de treino foi preservada.
- [2026-05-24] Landing passou a listar os tres proximos eventos futuros vinculados as modalidades ativas do usuario, com contagem regressiva em tempo real ate o inicio de cada evento; presenca individual permanece sem persistencia no MVP.
- [2026-05-24] Carteirinha digital foi redesenhada em formato horizontal ampliado e minimalista, com cabecalho institucional, dados do titular, modalidades, status, codigo de credencial, emissao/validade e QR claramente identificado como demonstrativo.
- [2026-05-24] Modalidades `Bateria` e `Cheer` foram removidas do catalogo demonstrativo e dos vinculos de perfis/solicitacoes, evitando cards e contagens residuais na interface.
- [2026-05-24] Badges visuais de visibilidade dos eventos (`Publico`, `Privado da atletica` e `Privado da modalidade`) foram removidos da agenda e do detalhe para reduzir ruido; as regras de acesso continuam ativas.
- [2026-05-24] Agenda recebeu refinamento exclusivamente visual: filtros com hierarquia mais clara, dias em cards compactos responsivos e eventos com composicao editorial de horario/local, sem alteracao das regras ou dados.

## Auditoria de contexto e documentacao
- [2026-05-24] Leitura integral do repositorio confirmou que o frontend ativo representa o produto ATLETIZA e deve prevalecer sobre referencias antigas a UniHub.
- [2026-05-24] `prompt.md` esta vazio no workspace, embora seja citado como fonte universal de verdade; ate que receba conteudo, a direcao valida esta consolidada em `AGENTS.md`, `README.md`, `IA.md` e na implementacao ATLETIZA vigente.
- [2026-05-24] `frontend/README.md`, `backend/README.md`, `frontend/index.html`, `start.py` e modulos Django de `academics`/`campus` ainda contem nomenclatura ou conceitos legados de UniHub.
- [2026-05-24] O backend Django permanece como base futura nao integrada; suas rotas academicas/campus nao definem o escopo funcional do MVP atual.
- [2026-05-24] Identidade visual observada no frontend: tema escuro, acento laranja ATLETIZA, logos proprios e landing com hero esportivo; `felixo-standards` orienta estrutura e qualidade, nao substitui a marca do produto.
- [2026-05-24] A auditoria foi apenas documental e de leitura de codigo; nenhum teste adicional foi executado nesta etapa.

## Pendencias e proximos passos
- Integrar frontend a API real do backend.
- Persistir aprovacoes e confirmacoes em banco.
- Implementar autenticacao real e permissoes por cargo.
- Preencher `prompt.md` com o prompt mestre ATLETIZA ou declarar formalmente o arquivo vigente de fonte de verdade.
- Atualizar documentacao e metadados legados que ainda nomeiam UniHub sem reintroduzir funcionalidades academicas no frontend.
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
