from django.shortcuts import render
import requests
import json

from .models import Sensor

# Create your views here.


def index(request):
    queryset = Sensor.objects.all()
    context = {'queryset': queryset}
    return render(request, 'core/index.html', context)


def get_data(request, sensor_id, data_range):
    r = requests.get(
        f'http://iot-api.krzysztofbrzozowski.pl/'
        f'get-sensor-temperature/sensor_{sensor_id}/{data_range}')
    data = json.loads(r.text)
    context = {
        'sensor_id': sensor_id,
        'data': data,
        'data_range_int': data_range,
        'data_range': '24h' if data_range == 1 else '10d'
    }
    return render(request, 'core/data-display.html', context)
