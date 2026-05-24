from django.contrib.auth import login
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.serializers import LoginSerializer


class LoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        profile = serializer.validated_data['access_profile']
        login(request, user)

        return Response(
            {
                'email': user.email,
                'name': user.get_full_name(),
                'profile': profile.profile,
                'role_label': profile.role_label,
                'registration': profile.registration,
            },
            status=status.HTTP_200_OK,
        )
