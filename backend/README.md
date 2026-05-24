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

As migracoes gravam as contas ATLETIZA usadas para determinar o ambiente no login:

| Participante / Ambiente | Email | Matrícula | Senha |
| --- | --- | --- | --- |
| Gabriel Fernandes | `gabriel@atletiza.com` | `202612345` (mock existente, a confirmar) | `Atletiza@2026` |
| Júlia de Oliveira Martins | `julia@atletiza.com` | `2025101351` | `Atletiza@2026` |
| André Gustavo Melo da Silva | `andre@atletiza.com` | `2023121370` | `Atletiza@2026` |
| Luiz Filipe Silva Rocha | `luiz.filipe@atletiza.com` | `2025101510` | `Atletiza@2026` |
| Diretoria | `diretoria@exemple.com` | - | `Atletiza@2026` |
| Admin | `admin@exemple.com` | - | `Atletiza@2026` |

Use `python manage.py seed_demo` apenas para popular os registros legados adicionais da API.
