from datetime import time, timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.academics.models import CourseLink, Deadline, Notice, Subject
from apps.athletics.models import AthleticEvent, BoardTask, Training
from apps.campus.models import CampusBlock, CampusRoom


class Command(BaseCommand):
    help = 'Cria dados demo para apresentacao do UniHub.'

    def handle(self, *args, **options):
        now = timezone.now()

        Notice.objects.update_or_create(
            title='Rematricula aberta',
            defaults={
                'body': 'Prazo para confirmacao das disciplinas do semestre encerra nesta sexta.',
                'category': 'Academico',
                'priority': 'urgent',
                'is_active': True,
            },
        )
        Notice.objects.update_or_create(
            title='Edital de monitoria',
            defaults={
                'body': 'Inscricoes para monitoria de Algoritmos e Calculo I seguem ate quarta.',
                'category': 'Oportunidade',
                'priority': 'info',
                'is_active': True,
            },
        )

        for title, subject, days in [
            ('Entrega do projeto integrador', 'Engenharia de Software', 1),
            ('Lista 3 de Calculo', 'Calculo I', 3),
            ('Questionario AVA', 'Banco de Dados', 5),
        ]:
            Deadline.objects.update_or_create(
                title=title,
                defaults={'subject': subject, 'due_at': now + timedelta(days=days), 'status': 'open'},
            )

        for title, category, url in [
            ('Ambiente Virtual', 'Materiais', 'https://ava.example.edu'),
            ('Calendario Academico', 'Institucional', 'https://calendario.example.edu'),
            ('Grupo da Turma', 'Comunicacao', 'https://chat.example.edu'),
        ]:
            CourseLink.objects.update_or_create(
                title=title,
                defaults={
                    'description': 'Link de referencia para o MVP UniHub.',
                    'category': category,
                    'url': url,
                    'is_active': True,
                },
            )

        for name, teacher, room, progress in [
            ('Engenharia de Software', 'Prof. Helena', 'Lab Maker', 72),
            ('Banco de Dados', 'Prof. Marina', 'B-203', 58),
            ('Calculo I', 'Prof. Renato', 'A-112', 44),
        ]:
            Subject.objects.update_or_create(
                name=name,
                defaults={'teacher': teacher, 'room': room, 'progress': progress},
            )

        for sport, weekday, starts_at, place in [
            ('Futsal', 'Segunda e quarta', time(18, 30), 'Ginasio'),
            ('Volei', 'Terca e quinta', time(19, 0), 'Quadra externa'),
            ('Basquete', 'Sexta', time(17, 30), 'Ginasio'),
        ]:
            Training.objects.update_or_create(
                sport=sport,
                defaults={'weekday': weekday, 'time': starts_at, 'place': place, 'is_active': True},
            )

        for title, event_type, days, place, status in [
            ('Amistoso Futsal x Direito', 'friendly', 4, 'Ginasio', 'Confirmado'),
            ('Seletiva Volei Feminino', 'tryout', 7, 'Quadra externa', 'Inscricoes'),
            ('Copa Intercursos', 'tournament', 15, 'Ginasio', 'Chaveamento'),
        ]:
            AthleticEvent.objects.update_or_create(
                title=title,
                defaults={
                    'event_type': event_type,
                    'date': now + timedelta(days=days),
                    'place': place,
                    'status': status,
                },
            )

        for area, task, owner, status in [
            ('Financeiro', 'Fechar orcamento dos uniformes', 'Tesouraria', 'pending'),
            ('Eventos', 'Reservar som para recepcao', 'Diretoria social', 'in_progress'),
            ('Esportes', 'Atualizar lista de atletas federados', 'Coordenacao', 'done'),
        ]:
            BoardTask.objects.update_or_create(
                task=task,
                defaults={'area': area, 'owner': owner, 'status': status},
            )

        block_data = [
            ('A', 'Bloco A', 'Salas teoricas', '3 andares', ['A-101', 'A-112', 'A-205']),
            ('B', 'Bloco B', 'Laboratorios', '4 andares', ['B-101', 'B-203', 'B-204']),
            ('C', 'Bloco C', 'Eventos e auditorios', '2 andares', ['C-010', 'Auditorio 1']),
            ('G', 'Ginasio', 'Esportes', 'terreo', ['Quadra', 'Sala tatame']),
            ('M', 'Lab Maker', 'Projetos e prototipagem', 'terreo', ['Impressao 3D', 'Coworking']),
        ]

        for code, name, block_type, floor_info, rooms in block_data:
            block, _ = CampusBlock.objects.update_or_create(
                code=code,
                defaults={
                    'name': name,
                    'block_type': block_type,
                    'floor_info': floor_info,
                    'map_position': {},
                },
            )
            for room in rooms:
                CampusRoom.objects.update_or_create(
                    block=block,
                    name=room,
                    defaults={'floor': 'terreo', 'room_type': 'Sala', 'description': ''},
                )

        self.stdout.write(self.style.SUCCESS('Dados demo do UniHub criados com sucesso.'))
