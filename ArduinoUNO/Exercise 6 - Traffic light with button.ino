//Traffic light simulator with button
// LED and Button Pins
int redLED = 10;
int yellowLED = 9;
int greenLED = 8;
int buttonPin = 2;

// Traffic Light State
int lightState = 0; // 0: Green, 1: Yellow, 2: Red

// For Debouncing the Button
int lastButtonState = LOW; // the previous state of the button
unsigned long lastDebounceTime = 0; // the last time the output pin was toggled
unsigned long debounceDelay = 50; // the debounce time; increase if the output flickers

void setup() {
  pinMode(redLED, OUTPUT);
  pinMode(yellowLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP); // Using internal pull-up resistor
}

void updateTrafficLights(int state) {
  // Turn off all LEDs
  digitalWrite(redLED, LOW);
  digitalWrite(yellowLED, LOW);
  digitalWrite(greenLED, LOW);
  
  // Turn on the current LED
  if (state == 0) {
    digitalWrite(greenLED, HIGH);
  } else if (state == 1) {
    digitalWrite(yellowLED, HIGH);
  } else if (state == 2) {
    digitalWrite(redLED, HIGH);
  }
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  
  // Check if the button state has changed
  if (buttonState != lastButtonState) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > debounceDelay) {
    // if the button state has changed:
    if (buttonState == LOW && lastButtonState == HIGH) {
      // Button was pressed, move to the next state
      lightState = (lightState + 1) % 3; // Cycle through 0, 1, 2
    }
  }
  
  // Update the LEDs based on the current state
  updateTrafficLights(lightState);
  
  // Save the current state as the last state, for next time through the loop
  lastButtonState = buttonState;
}
