"""Política de semeadura das contas de demonstração.

A senha não fica no código: vem de UNIHUB_DEMO_PASSWORD. A semeadura só
acontece com SEED_DEMO_ACCOUNTS ligado, para que aplicar as migrations num
ambiente qualquer não crie conta administrativa sem querer.
"""

import os

SEED_FLAG_ENV = 'SEED_DEMO_ACCOUNTS'
DEMO_PASSWORD_ENV = 'UNIHUB_DEMO_PASSWORD'

_TRUTHY = {'1', 'true', 'yes', 'on'}


def seeding_enabled():
    return os.environ.get(SEED_FLAG_ENV, '').strip().lower() in _TRUTHY


def demo_password():
    return os.environ.get(DEMO_PASSWORD_ENV, '').strip()


def should_seed():
    """Falha fechado: sem a flag ou sem senha definida, nada é semeado."""
    return seeding_enabled() and bool(demo_password())


def skip_reason():
    if not seeding_enabled():
        return f'{SEED_FLAG_ENV} não está ligado'
    return f'{DEMO_PASSWORD_ENV} não foi definido'
