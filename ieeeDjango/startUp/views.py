import subprocess
import mimetypes
import json
from rest_framework import status
from .forms import CustomUserCreationForm
from django.contrib.auth import get_user_model, authenticate, login as auth_login
from .serializer import CustomUserSerializer
from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login as auth_login

User = get_user_model()

@api_view(['POST'])
def register_api(request):
    if request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    try:
        # Directly get the user object from the database
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        # User does not exist
        return Response({'status': 'error', 'message': 'Invalid username'}, status=status.HTTP_404_NOT_FOUND)
    
    # Check the password
    if user.check_password(password):
        # Password is correct
        auth_login(request, user)  # Log the user in
        return Response({'status': 'success', 'message': 'User logged in successfully'}, status=status.HTTP_200_OK)
    else:
        # Password is incorrect
        return Response({'status': 'error', 'message': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
        

@api_view(['GET'])
def test_call(request):
    return Response('Hello World!', status=status.HTTP_200_OK)

@require_http_methods(['POST'])
def run_script(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        script_name = data.get('script_name')
        script_args = data.get('args', '')

        if not script_name:
            return JsonResponse({'error': 'No script name provided'}, status=400)

        args_list = script_args.split(',') if script_args else []

        # Execute the script
        output = subprocess.check_output(['python', script_name] + args_list, stderr=subprocess.STDOUT).decode('utf-8')

        # Check if the output file is a CSV
        file_type, _ = mimetypes.guess_type(output)
        if file_type == 'text/csv':
            with open(output, 'rb') as file:
                return HttpResponse(file.read(), content_type='text/csv')
        else:
            return JsonResponse({'error': 'Script did not return a CSV file'}, status=400)

    except subprocess.CalledProcessError as e:
        return JsonResponse({'error': 'Script failed', 'details': e.output.decode()}, status=500)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'error': 'An error occurred', 'details': str(e)}, status=500)
