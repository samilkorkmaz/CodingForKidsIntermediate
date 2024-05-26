// Reaction time game
int ledPin = 13;
int buttonPin = 2;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  Serial.println("");
  Serial.println("Push the button to start game");
  while (digitalRead(buttonPin) == 0) {
  }
  Serial.println("");
  Serial.println("Get Ready!");
  delay(1000);
  Serial.println("Get Set!");
  delay(1000);
  int long startDelay_ms = random(5000);
  Serial.print(startDelay_ms);
  Serial.println(" ms");

  unsigned long startTime = millis();
  while (millis() - startTime < startDelay_ms) {
    if (digitalRead(buttonPin) == 1) {
      Serial.println("You pressed too early! You failed.");
      delay(2000); // Short delay before restarting the game
      return; // Restart the game
    }
  }

  Serial.println("Go!");
  unsigned long time_ms = millis();
  digitalWrite(ledPin, HIGH);
  while (digitalRead(buttonPin) == 0) {} // wait for button press
  digitalWrite(ledPin, LOW);
  Serial.println("Your time was");
  time_ms = millis() - time_ms;
  Serial.print(time_ms / 1000.0, 2);
  Serial.println(" seconds");
  delay(2000); 
}
