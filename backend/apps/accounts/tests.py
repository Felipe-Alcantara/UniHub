import os
from unittest import mock

from django.contrib.auth import get_user_model
from django.test import Client, TestCase

from apps.accounts import demo_seed
from apps.accounts.models import AccessProfile

TEST_PASSWORD = 'senha-de-teste-nao-usada-em-execucao'

DEMO_ACCOUNTS = [
    ('aluno@exemple.com', 'Gabriel', 'Fernandes', 'student', 'Aluno / Atleta', ''),
    ('diretoria@exemple.com', 'Ana', 'Souza', 'board', 'Diretora de Esportes', ''),
    ('admin@exemple.com', 'Felipe', 'Admin', 'admin', 'Dev/Admin', ''),
    ('gabriel@atletiza.com', 'Gabriel', 'Fernandes', 'student', 'Aluno / Atleta', '202612345'),
    ('julia@atletiza.com', 'Júlia', 'de Oliveira Martins', 'student', 'Aluno / Atleta', '2025101351'),
    ('andre@atletiza.com', 'André', 'Gustavo Melo da Silva', 'student', 'Aluno / Atleta', '2023121370'),
    ('luiz.filipe@atletiza.com', 'Luiz', 'Filipe Silva Rocha', 'student', 'Aluno / Atleta', '2025101510'),
]


def seed_accounts_for_test():
    User = get_user_model()

    for email, first_name, last_name, profile, role_label, registration in DEMO_ACCOUNTS:
        user = User.objects.create_user(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=TEST_PASSWORD,
        )
        AccessProfile.objects.create(
            user=user,
            profile=profile,
            role_label=role_label,
            registration=registration,
        )


class DemoSeedPolicyTests(TestCase):
    """A migration não pode criar conta administrativa sem intenção explícita."""

    def test_migrations_do_not_seed_accounts_by_default(self):
        self.assertEqual(get_user_model().objects.count(), 0)
        self.assertEqual(AccessProfile.objects.count(), 0)

    @mock.patch.dict(os.environ, {}, clear=True)
    def test_seeding_is_off_without_flag_and_password(self):
        self.assertFalse(demo_seed.should_seed())

    @mock.patch.dict(os.environ, {'SEED_DEMO_ACCOUNTS': '1'}, clear=True)
    def test_flag_alone_is_not_enough(self):
        self.assertFalse(demo_seed.should_seed())
        self.assertIn(demo_seed.DEMO_PASSWORD_ENV, demo_seed.skip_reason())

    @mock.patch.dict(os.environ, {'UNIHUB_DEMO_PASSWORD': 'x'}, clear=True)
    def test_password_alone_is_not_enough(self):
        self.assertFalse(demo_seed.should_seed())
        self.assertIn(demo_seed.SEED_FLAG_ENV, demo_seed.skip_reason())

    @mock.patch.dict(
        os.environ, {'SEED_DEMO_ACCOUNTS': '1', 'UNIHUB_DEMO_PASSWORD': 'x'}, clear=True
    )
    def test_flag_and_password_together_enable_seeding(self):
        self.assertTrue(demo_seed.should_seed())


class DemoLoginTests(TestCase):
    def setUp(self):
        seed_accounts_for_test()

    def test_demo_accounts_are_persisted_with_access_profiles(self):
        self.assertEqual(get_user_model().objects.filter(email__endswith='@exemple.com').count(), 3)
        self.assertEqual(get_user_model().objects.filter(email__endswith='@atletiza.com').count(), 4)
        self.assertEqual(AccessProfile.objects.count(), 7)

    def test_each_demo_email_returns_its_environment_profile(self):
        accounts = [
            ('aluno@exemple.com', 'student'),
            ('diretoria@exemple.com', 'board'),
            ('admin@exemple.com', 'admin'),
        ]

        for email, expected_profile in accounts:
            with self.subTest(email=email):
                response = Client().post(
                    '/api/v1/auth/login/',
                    {'email': email, 'password': TEST_PASSWORD},
                    content_type='application/json',
                )

                self.assertEqual(response.status_code, 200)
                self.assertEqual(response.json()['profile'], expected_profile)

    def test_participant_login_returns_personal_identity_and_registration(self):
        participants = [
            ('gabriel@atletiza.com', 'Gabriel Fernandes', '202612345'),
            ('julia@atletiza.com', 'Júlia de Oliveira Martins', '2025101351'),
            ('andre@atletiza.com', 'André Gustavo Melo da Silva', '2023121370'),
            ('luiz.filipe@atletiza.com', 'Luiz Filipe Silva Rocha', '2025101510'),
        ]

        for email, expected_name, expected_registration in participants:
            with self.subTest(email=email):
                response = Client().post(
                    '/api/v1/auth/login/',
                    {'email': email, 'password': TEST_PASSWORD},
                    content_type='application/json',
                )

                self.assertEqual(response.status_code, 200)
                self.assertEqual(response.json()['profile'], 'student')
                self.assertEqual(response.json()['name'], expected_name)
                self.assertEqual(response.json()['registration'], expected_registration)

    def test_invalid_credentials_are_rejected(self):
        response = Client().post(
            '/api/v1/auth/login/',
            {'email': 'admin@exemple.com', 'password': 'incorreta'},
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 400)
