from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            # redirect to a new URL:
            return redirect('login')  # login is the name of the URL pattern
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})



