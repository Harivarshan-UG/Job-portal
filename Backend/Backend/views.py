from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RegisterSerializer, JobsSerializer, ApplicationSerializer
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Application, Job



@api_view(['GET'])
def hello_api(request):
    return Response({'message': 'Hello, World!'})


@api_view(['POST'])
def register_user(request):
    register_serializer = RegisterSerializer(data=request.data)
    if register_serializer.is_valid():
        user = register_serializer.save()
        return Response({
            'data': register_serializer.data,
            'message': 'User registered successfully',
            'user_id': user.id,
            'username': user.username
        }, status=status.HTTP_201_CREATED)
    return Response({'errors': register_serializer.errors, 'message': 'Registration failed'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    # Use Django's authenticate for secure password verification
    user = authenticate(username=username, password=password)
    
    if user is not None:
        return Response({
            'message': 'Login successful',
            'user_id': user.id,
            'username': user.username
        }, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def job_list(request):
    jobs = Job.objects.all()
    jobs_serializer = JobsSerializer(jobs, many=True)
    return Response({'data': jobs_serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def job_detail(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
        job_serializer = JobsSerializer(job)
        return Response(job_serializer.data, status=status.HTTP_200_OK)
    except Job.DoesNotExist:
        return Response({'message': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def apply_job(request):
    try:
        application_serializer = ApplicationSerializer(data=request.data)
        applicant_id = request.data.get('applicant')
        job_id = request.data.get('job')
        
        # Check if applicant exists
        try:
            applicant = User.objects.get(id=applicant_id)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if job exists
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({'message': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if already applied
        if Application.objects.filter(applicant=applicant, job=job).exists():
            return Response({'message': 'You have already applied for this job'}, status=status.HTTP_400_BAD_REQUEST)

        if application_serializer.is_valid():
            application_serializer.save()
            return Response({'data': application_serializer.data, 'message': 'Application submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response({'errors': application_serializer.errors, 'message': 'Application submission failed'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'message': f'Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def user_applications(request, user_id):
    try:
        applications = Application.objects.filter(applicant_id=user_id).select_related('job')
        applications_data = []
        for app in applications:
            applications_data.append({
                'id': app.id,
                'status': app.status,
                'applied_at': app.applied_at,
                'job': {
                    'id': app.job.id,
                    'title': app.job.title,
                    'company': app.job.company,
                    'location': app.job.location,
                    'salary_range': app.job.salary_range,
                    'About': app.job.About,
                    'posted_at': app.job.posted_at
                }
            })
        return Response(applications_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)