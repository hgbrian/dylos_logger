import serial
import time
from google.cloud import pubsub

ser = None
data = None
pubsub_client = pubsub.Client()
topic = pubsub_client.topic("dylosparticlecounter")

while True:
    if ser is None:
        ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=10)

    try:
        data = ser.readline()
    except:
        ser = None
        data = None

    if data is not None and len(data) > 0:
        message_id = topic.publish(data.encode('utf-8').strip())
        print("data:", message_id, data.strip())

    time.sleep(900)
