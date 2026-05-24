from django.contrib.auth import authenticate
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, trim_whitespace=False)

    def validate(self, attrs):
        email = attrs['email'].lower()
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=attrs['password'],
        )

        if not user or not hasattr(user, 'access_profile'):
            raise serializers.ValidationError('E-mail ou senha inválidos.')

        attrs['user'] = user
        attrs['access_profile'] = user.access_profile
        return attrs
