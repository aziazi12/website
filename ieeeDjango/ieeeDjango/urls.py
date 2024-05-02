from django.urls import path
from startUp import views
from django.contrib.auth import views as auth_views


app_name = "main"   

urlpatterns = [
    # Account register path
    path("register/", views.register_api, name="register"),
    #path('login/', auth_views.LoginView.as_view(), name='login'),
    # Run script path
    path('run-script/', views.run_script, name='run-script'),

    path('login/', views.login, name='login'),

    # Test call path
    path('test-call/', views.test_call, name='test-call'),

]
