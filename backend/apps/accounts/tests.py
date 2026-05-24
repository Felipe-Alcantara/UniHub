from django.contrib.auth import get_user_model
from django.test import Client, TestCase

from apps.accounts.models import AccessProfile


class DemoLoginTests(TestCase):
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
                    {'email': email, 'password': 'Atletiza@2026'},
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
                    {'email': email, 'password': 'Atletiza@2026'},
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
