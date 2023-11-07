#include <WiFi.h>
#include <SoftwareSerial.h>
const char* WIFI_NAME;
const char* WIFI_PASSWORD;
#define DATABASE_URL "https://emgtrackerarduino-default-rtdb.europe-west1.firebasedatabase.app/"
#define DATABASE_SECRET "OAUHcMrInFfygL6UHISgzwd4bsOajW7XYepeNfWR"
#define CLIENT "Ilia Iliev"
#define BIOMETRIC_DATA "/Muscle Biometrics"
// Define the Firebase Data object
FirebaseData fbdo;

// Define the FirebaseAuth data for authentication data
FirebaseAuth auth;

// Define the FirebaseConfig data for config data
FirebaseConfig config;

char* biometricData;
int EMGSensor;
void setup() {
  Serial.begin(9600);
  initConnection();
  initFirebase();
}
int timer 0;
void loop() {
  if (timer >= 1000) {
    timer = 0;
    Firebase.set(fbdo, "/" + CLIENT + BIOMETRIC_DATA, biometricData);
    biometricData = "";
  }
  int val = analogRead(EMGSensor);
  biometricData = biometricData + ((char)val);
  timer++;
}

void initConnection() {
  WiFi.begin(WIFI_NAME, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void initFirebase() {
  config.cert.file = "/gtsr1.pem";
  config.database_url = DATABASE_URL;
  config.signer.tokens.legacy_token = DATABASE_SECRET;

  // Comment or pass false value when WiFi reconnection will control by your code or third party library e.g. WiFiManager
  Firebase.reconnectNetwork(true);

  // Since v4.4.x, BearSSL engine was used, the SSL buffer need to be set.
  // Large data transmission may require larger RX buffer, otherwise connection issue or data read time out can be occurred.
  fbdo.setBSSLBufferSize(4096 /* Rx buffer size in bytes from 512 - 16384 */, 1024 /* Tx buffer size in bytes from 512 - 16384 */);

  /* Initialize the library with the Firebase authen and config */
  Firebase.begin(&config, &auth);
}