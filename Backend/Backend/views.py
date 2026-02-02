from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSerializer, JobsSerializer, ApplicationSerializer
from rest_framework import status
from django.contrib.auth.models import User
from .models import Application, Job



@api_view(['GET'])
def hello_api(request):
    return Response({'message': 'Hello, World!'})


@api_view(['POST'])
def register_user(request):
    register_serializer = RegisterSerializer(data = request.data)
    if register_serializer.is_valid():
        register_serializer.save()
        return Response({'data': register_serializer.data, 'message': 'User registered successfully'}, status = status.HTTP_201_CREATED)
    return Response({'errors': register_serializer.errors, 'message': 'Registration failed'}, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user = User.objects.get(username=username, password=password)
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def job_list(request):
    jobs = Job.objects.all()
    jobs_serializer = JobsSerializer(jobs, many=True)
    return Response({'data': jobs_serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def apply_job(request):
    application_serializer = ApplicationSerializer(data=request.data)
    applicant_id = request.data.get('applicant')
    job_id = request.data.get('job')
    applicant = User.objects.get(id=applicant_id)
    job = Job.objects.get(id=job_id)
    if Application.objects.filter(applicant=applicant, job=job).exists():
        return Response({'message': 'You have already applied for this job'}, status=status.HTTP_400_BAD_REQUEST)

    if application_serializer.is_valid():
        application_serializer.save()
        return Response({'data': application_serializer.data, 'message': 'Application submitted successfully'}, status=status.HTTP_201_CREATED)
    return Response({'errors': application_serializer.errors, 'message': 'Application submission failed'}, status=status.HTTP_400_BAD_REQUEST)