//Traffic light simulator
int red = 13;
int yellow = 12;
int green = 11;

void setup() {
  pinMode(red, OUTPUT);
  pinMode(yellow, OUTPUT);
  pinMode(green, OUTPUT);
}

void blink(int pin) {
	digitalWrite(pin, HIGH);
	delay(500);
	digitalWrite(pin,  LOW);
	delay(500);
}

void loop() {
	digitalWrite(red, HIGH);
	delay(3000);
	digitalWrite(red, LOW);
	
	digitalWrite(yellow, HIGH);
	delay(1000);
	digitalWrite(yellow, LOW);
	digitalWrite(red, LOW);
	
	digitalWrite(green, HIGH);
	delay(3000);
	digitalWrite(green,  LOW);
	
	blink(yellow);
	blink(yellow);
	blink(yellow);
}