// Reaction time game
int ledPin = 13;
int buttonPin = 2;
unsigned long minTime_ms = 999;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  Serial.println("");
  Serial.print("Push the button to start game");
  if (minTime_ms < 999) {
    Serial.print(". Your best time: ");
    Serial.print(minTime_ms / 1000.0, 3);
    Serial.print(" seconds");
  }
  Serial.println("");
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

  unsigned long startTime_ms = millis();
  while (millis() - startTime_ms < startDelay_ms) {
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
  Serial.print(time_ms / 1000.0, 3);
  Serial.println(" seconds");
  if (time_ms < minTime_ms) {
    if (minTime_ms < 999) {
    	Serial.print("You beat your previous best of ");
    	Serial.print(minTime_ms / 1000.0, 3);
    	Serial.println(" seconds");
    }
    minTime_ms = time_ms;
  }
  delay(2000); 
}
