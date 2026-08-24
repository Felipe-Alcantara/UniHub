# ATLETIZA Backend

API Django + DRF. No MVP ATLETIZA, o backend esta integrado ao frontend para validar o login; modulos academicos/campus antigos permanecem como base legada nao consumida pelo produto ativo.

## Setup local

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_demo
python manage.py runserver 8000
```

## Estrutura

```text
backend/
├── app/
│   ├── api/              # health check e roteamento da API
│   ├── core/             # utilidades compartilhadas
│   ├── domain/           # regras centrais futuras
│   ├── repositories/     # consultas estruturadas futuras
│   ├── services/         # casos de uso futuros
│   └── integrations/     # servicos externos futuros
├── apps/
│   ├── academics/        # avisos, prazos, links e materias
│   ├── athletics/        # treinos, jogos e diretoria
│   ├── campus/           # blocos e salas
│   └── accounts/         # usuarios e perfil academico
└── config/               # settings, urls, ASGI e WSGI
```

## Endpoints iniciais

- `GET /api/health/`
- `POST /api/v1/auth/login/`
- `GET /api/v1/academics/notices/`
- `GET /api/v1/academics/deadlines/`
- `GET /api/v1/academics/course-links/`
- `GET /api/v1/academics/subjects/`
- `GET /api/v1/athletics/trainings/`
- `GET /api/v1/athletics/events/`
- `GET /api/v1/athletics/board-tasks/`
- `GET /api/v1/campus/blocks/`
- `GET /api/v1/campus/rooms/`

## Dados demo

As migracoes podem gravar as contas ATLETIZA usadas para determinar o ambiente no
login, mas **nao fazem isso por padrao**. A semeadura exige as duas variaveis:

```bash
export SEED_DEMO_ACCOUNTS=1
export UNIHUB_DEMO_PASSWORD='escolha-uma-senha'
python manage.py migrate
```

Sem `SEED_DEMO_ACCOUNTS` ligado, ou sem `UNIHUB_DEMO_PASSWORD` definido, nenhuma
conta e criada — inclusive a de perfil `admin`. A senha nunca fica no repositorio:
quem semeia escolhe a sua e ela vale so naquele ambiente.

| Participante / Ambiente | Email | Matrícula |
| --- | --- | --- |
| Gabriel Fernandes | `gabriel@atletiza.com` | `202612345` (mock existente, a confirmar) |
| Júlia de Oliveira Martins | `julia@atletiza.com` | `2025101351` |
| André Gustavo Melo da Silva | `andre@atletiza.com` | `2023121370` |
| Luiz Filipe Silva Rocha | `luiz.filipe@atletiza.com` | `2025101510` |
| Diretoria | `diretoria@exemple.com` | - |
| Admin | `admin@exemple.com` | - |

Use `python manage.py seed_demo` apenas para popular os registros legados adicionais da API.
