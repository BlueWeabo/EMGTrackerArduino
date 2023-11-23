#include <WiFi.h>
#include <SoftwareSerial.h>
#include <Firebase.h>
#include "time.h"
#define WIFI_NAME "Redmi 9A"
#define WIFI_PASSWORD = "42315678"
#define DATABASE_URL "https://emgtrackerarduino-default-rtdb.europe-west1.firebasedatabase.app/"
#define DATABASE_SECRET "OAUHcMrInFfygL6UHISgzwd4bsOajW7XYepeNfWR"
#define CLIENT "/Muscle Biometrics/Ilia Iliev"
#define MONDAY "Monday"
#define SUNDAY "Sunday"
// Define the Firebase Data object
FirebaseData fbdo;

// Define the FirebaseAuth data for authentication data
FirebaseAuth auth;

// Define the FirebaseConfig data for config data
FirebaseConfig config;

const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 7200;
const int daylightOffset_sec = 3600;

int EMGSensor;
int* bigData;
void setup() {
  Serial.begin(9600);
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
  // Init and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  printLocalTime();
}
void loop() {
  int val = random(1024); //analogRead(EMGSensor);
  Firebase.set(fbdo, CLIENT, val);
  printLocalTime();
}

void printLocalTime(){
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Serial.println("Failed to obtain time");
    return;
  }
//  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
//  Serial.print("Day of week: ");
//  Serial.println(&timeinfo, "%A");
//  Serial.print("Month: ");
//  Serial.println(&timeinfo, "%B");
//  Serial.print("Day of Month: ");
//  Serial.println(&timeinfo, "%d");
//  Serial.print("Year: ");
//  Serial.println(&timeinfo, "%Y");
//  Serial.print("Hour: ");
//  Serial.println(&timeinfo, "%H");
//  Serial.print("Hour (12 hour format): ");
//  Serial.println(&timeinfo, "%I");
//  Serial.print("Minute: ");
//  Serial.println(&timeinfo, "%M");
//  Serial.print("Second: ");
//  Serial.println(&timeinfo, "%S");
//
//  Serial.println("Time variables");
  char timeHour[3];
  strftime(timeHour,3, "%H", &timeinfo);
//  Serial.println(timeHour);
  char timeWeekDay[10];
  strftime(timeWeekDay,10, "%A", &timeinfo);
//  Serial.println(timeWeekDay);
//  Serial.println();

  if (timeWeekDay == MONDAY) {
    if (timeHour == '2') {
      
    }
  }
  if (timeWeekDay == SUNDAY) {
    
  }

}
