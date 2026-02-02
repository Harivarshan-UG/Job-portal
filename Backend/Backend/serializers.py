from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job, Application


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class JobsSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()
    class Meta:
        model = Job
        fields = '__all__'

class AppilcationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'