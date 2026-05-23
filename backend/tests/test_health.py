from django.test import Client, TestCase


class HealthCheckTests(TestCase):
    def test_health_check_returns_ok(self):
        response = Client().get('/api/health/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'ok')
