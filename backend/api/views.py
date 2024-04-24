from django.shortcuts import render
from django.contrib.auth.models import *
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ClockInView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = TimeClockSerializer(data = request.data)
        if serializer.is_valid:
            serializer.save()
            return Response({"message": 'Clock out successful!', "data": serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'Clock out unsuccessful', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ClockOutView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, id):
        time_clock = TimeClock.objects.get(id=id)
        serializer = TimeClockSerializer(time_clock, data = request.data, partial=True)


class TimeSheetView(generics.ListAPIView):
    serializer_class = TimeClockSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return TimeClock.objects.filter(employee=user)
    




# Create your views here.
