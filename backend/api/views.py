from django.shortcuts import render
from django.contrib.auth.models import *
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class TimeClockView(generics.ListAPIView):
    serializer_class = TimeClockSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return TimeClock.objects.filter(employee=user)
    




# Create your views here.
