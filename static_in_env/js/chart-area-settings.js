{% load static %}
<script>
    var timestamp = []
    var data = []

    {% if option == "temperature" %}
        units = '°C'
        colors = ['#bd00ff','#bd00ff']
    {% endif %}

    {% if option == "humidity" %}
        units = '%'
        colors = ['#00ff9f','#00ff9f']
    {% endif %}

    {% if option == "pressure" %}
        units = 'hPa'
        colors = ['#00b8ff','#00b8ff']
    {% endif %}

    {% for val in data %}
        timestamp.push('{{ val.timestamp }}')

        {% if option == "temperature" %}
            data.push({{ val.temperature }});
        {% endif %}

        {% if option == "humidity" %}
            data.push({{ val.humidity }});
        {% endif %}

        {% if option == "pressure" %}
            data.push({{ val.pressure }});
        {% endif %}
    {% endfor %}

    var options = {
        chart: {
            type: "area",
            height: 300,
            foreColor: "#999",
            stacked: true,
            dropShadow: {
                enabled: true,
                enabledSeries: [0],
                top: -2,
                left: 2,
                blur: 5,
                opacity: 0.06
            },
            zoom: {
                enabled: false
            }
        },
        title: {
            style: {
                fontSize:  '14px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#eee'
            },
            text: `{{ option }} [${units}]:
                      range: {{ data_range }}
                      min: ${Math.min(...data)}
                      max: ${Math.max(...data)}
                      now: ${data.last()}`,
            align: 'left'

        },

      colors: colors,
      stroke: {
            curve: "smooth",
            width: 3
      },
      dataLabels: {
            enabled: false
      },
      series: [{
            name: '{{ option }}',
            data: getData()
      }],
        markers: {
        size: 0,
        strokeColor: "#fff",
        strokeWidth: 3,
        strokeOpacity: 1,
        fillOpacity: 1,
        hover: {
            size: 6
        }
    },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
      lines: {
        show: true
      }
      },
    yaxis: {
        min: Math.min(...data),
        max: Math.max(...data),
        labels: {
          offsetX: -10,
          offsetY: -5
        },
        tooltip: {
          enabled: true
        },
              lines: {
        show: true
      },
        // logarithmic: true,
        // forceNiceScale: true,
<!--        tickAmount: 2,-->
    },

    grid: {
        left: -5,
        right: 5,
        borderColor: '#aaa',
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
            lines: {
                show: true
            }
        }
    },

      tooltip: {
        x: {
          format: "dd MMM yyyy"
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      fill: {
        type: "solid",
        fillOpacity: 0.2
      }
    };

    var chart = new ApexCharts(document.querySelector("#{{option}}-chart"), options);

    chart.render();


    function getData() {
      var i = 0;
      var series = [];
        timestamp.forEach((datetime, i) => {
            series.push([datetime, data[i]])
        });
      return series;

}
</script>