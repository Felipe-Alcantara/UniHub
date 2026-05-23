# UniHub Backend

API Django + DRF para centralizar avisos, prazos, eventos, mapa do campus e rotinas da atletica.

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

Use `python manage.py seed_demo` apos as migrations para preencher a API com registros de apresentacao.
