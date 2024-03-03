// Blink Arduino UNO built in LED in SOS pattern

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}
void dot() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(250); // Short delay for dot
  digitalWrite(LED_BUILTIN, LOW);
  delay(250); // Gap between symbols
}

void dash() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000); // Longer delay for dash
  digitalWrite(LED_BUILTIN, LOW);
  delay(250); // Gap between symbols
}

void letterSpace() {
  delay(750); // Longer gap between letters
}

// Example function to blink "SOS" in Morse code
void blinkSOS() {
  // S: three dots
  dot(); dot(); dot();
  // Space between letters
  letterSpace();
  // O: three dashes
  dash(); dash(); dash();
  // Space between letters
  letterSpace();
  // S: three dots
  dot(); dot(); dot();
  // Space before repeating the message
  delay(2000); // Longer delay before repeating the sequence
}

void loop() {
  blinkSOS(); // Blink "SOS" repeatedly
}