from django.urls import path
from .import views

urlpatterns = [
    path('user/', views.GetUserView.as_view(), name='user'),
    path('clockin/', views.ClockInView.as_view(), name='clockin'),
    path('clockout/<int:id>/', views.ClockOutView.as_view(), name='clockout'),
    path('timesheet/', views.TimeSheetView.as_view(), name='timesheet-list')
]