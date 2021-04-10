from django.db import models

# Create your models here.
from django.conf import settings
from django.db import models


class Sensor(models.Model):
    # sensor_image = models.ImageField(null=True, blank=True)
    sensor_city = models.CharField(max_length=100)
    sensor_location = models.CharField(max_length=100)
    sensor_id = models.IntegerField()
    sensor_datarange = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.sensor_city} - {self.sensor_location}'
