from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TimeClock

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        
class TimeClockSerializer(serializers.ModelSerializer):
    hours_worked = serializers.SerializerMethodField()

    class Meta:
        model = TimeClock
        fields = ['id', 'employee', 'date', 'clock_in_time', 'clock_out_time','location', 'role' ]

        def get_hours_worked(self, obj):
            return obj.time_worked()