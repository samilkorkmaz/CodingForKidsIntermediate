//Heartbeat simulator
int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void heartbeat() {
  // Simulate the heartbeat with two quick pulses
  for (int i = 0; i < 2; i++) {
    for (int brightness = 0; brightness < 255; brightness++) {
      analogWrite(ledPin, brightness);
      delay(15);
    }
    for (int brightness = 255; brightness >= 0; brightness--) {
      analogWrite(ledPin, brightness);
      delay(15);
    }
    delay(200);
  }
}

void loop() {
  heartbeat();
  delay(1000);
}

