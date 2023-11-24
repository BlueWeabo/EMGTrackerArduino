#include <WiFi.h>
#include <SoftwareSerial.h>
#include <Firebase.h>
#include "time.h"
#define WIFI_NAME "Redmi 9A"
#define WIFI_PASSWORD "42315678"
#define DATABASE_URL "https://emgtrackerarduino-default-rtdb.europe-west1.firebasedatabase.app/"
#define DATABASE_SECRET "OAUHcMrInFfygL6UHISgzwd4bsOajW7XYepeNfWR"
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

const char* CLIENT = "/Muscle Biometrics/Ilia Iliev/";
const char* CURRENT = "Current";
const char* MONDAY_HOUR2 = "Monday/Hour2";
const char* MONDAY_HOUR10 = "Monday/Hour10";
const char* MONDAY_HOUR17 = "Monday/Hour17";
const char* SUNDAY_HOUR2 = "Sunday/Hour2";
const char* SUNDAY_HOUR10 = "Sunday/Hour10";
const char* SUNDAY_HOUR17 = "Sunday/Hour17";
char timeWeekDay[10];
char timeMin[3];
char timeHour[3];
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
boolean start = false;
boolean done = false;
void loop() {
  int val = random(1024); //analogRead(EMGSensor);
  char* thing = *CLIENT + *CURRENT;
  Firebase.set(fbdo, thing, val);
  printLocalTime();
  if (timeWeekDay == MONDAY) {
    if ((timeHour == "2" || timeHour == "10" || timeHour == "17") && !done) {
      start= true;
    }
    if ((timeHour == "3" || timeHour == "11" || timeHour == "18") && done) {
      start = false;
      done = false;
    }
  }
  if (timeWeekDay == SUNDAY) {
    if ((timeHour == "2" || timeHour == "10" || timeHour == "17") && !done) {
      start= true;
    }
    if ((timeHour == "3" || timeHour == "11" || timeHour == "18") && done) {
      start = false;
      done = false;
    }
  }
  if (start && !done) {
    if (timeMin == "1" || timeMin == "2") {
      char* magic;
      if (timeWeekDay == MONDAY) {
        if (timeHour == "2") {
          *magic = *CLIENT + *MONDAY_HOUR2;
        }
        if (timeHour == "10") {
          *magic = *CLIENT + *MONDAY_HOUR10;
        }
        if (timeHour == "17") {
          *magic = *CLIENT + *MONDAY_HOUR17;
        }
      }
      if (timeWeekDay == SUNDAY) {
        if (timeHour == "2") {
          *magic = *CLIENT + *SUNDAY_HOUR2;
        }
        if (timeHour == "10") {
          *magic = *CLIENT + *SUNDAY_HOUR10;
        }
        if (timeHour == "17") {
          *magic = *CLIENT + *SUNDAY_HOUR17;
        }
      }
      Firebase.set(fbdo, *magic, *bigData);
      done = true;
    }
    *bigData += val;
  }
}
void printLocalTime(){
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Serial.println("Failed to obtain time");
    return;
  }
  strftime(timeHour,3, "%H", &timeinfo);
  strftime(timeMin,3,"%M", &timeinfo);
  strftime(timeWeekDay,10, "%A", &timeinfo);
}
