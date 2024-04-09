from django.urls import path
from .import views

urlpatterns = [
    path('timeclocks/', views.TimeClockView.as_view(), name='timeclock-list')   
]