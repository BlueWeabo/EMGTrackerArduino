#include <WiFi.h>
#include <Firebase.h>
#include "time.h"
#define WIFI_NAME "Redmi 9A"
#define WIFI_PASSWORD "42315678"
#define DATABASE_URL "https://emgtrackerarduino-default-rtdb.europe-west1.firebasedatabase.app/"
#define DATABASE_SECRET "OAUHcMrInFfygL6UHISgzwd4bsOajW7XYepeNfWR"
#define MONDAY "Monday"
#define SUNDAY "Sunday"
// Define the Firebase data object
FirebaseData fbdo;

// Define the FirebaseAuth val for authentication val
FirebaseAuth auth;

// Define the FirebaseConfig val for config val
FirebaseConfig config;

const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 2 * 3600;
const int daylightOffset_sec = 0;

const String CLIENT = "/Muscle Biometrics/Ilia Iliev/Current/";
const String MONDAY_HOUR2 = "/Muscle Biometrics/Ilia Iliev/Monday/Hour2/";
const String MONDAY_HOUR10 = "/Muscle Biometrics/Ilia Iliev/Monday/Hour10/";
const String MONDAY_HOUR17 = "/Muscle Biometrics/Ilia Iliev/Monday/Hour17/";
const String SUNDAY_HOUR2 = "/Muscle Biometrics/Ilia Iliev/Sunday/Hour2/";
const String SUNDAY_HOUR10 = "/Muscle Biometrics/Ilia Iliev/Sunday/Hour10/";
const String SUNDAY_HOUR17 = "/Muscle Biometrics/Ilia Iliev/Sunday/Hour17/";
char timeWeekDay[10] = "Monday";
char timeMin[3];
char timeHour[3] = "17";
int EMGSensor = 35;
void setup() {
  pinMode(EMGSensor, INPUT);
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
  // Large val transmission may require larger RX buffer, otherwise connection issue or val read time out can be occurred.
  fbdo.setBSSLBufferSize(4096 /* Rx buffer size in bytes from 512 - 16384 */, 1024 /* Tx buffer size in bytes from 512 - 16384 */);

  /* Initialize the library with the Firebase authen and config */
  Firebase.begin(&config, &auth);
  // Init and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  while (time(nullptr) < 1510592825)
  {
    delay(1);
  }

  time_t now = time(nullptr);
  struct tm* t = localtime(&now);
  Serial.println(t, "%A, %B %d %Y %H:%M:%S");
  printLocalTime();
}
boolean start = false;
boolean done = false;
long cycle = 0;
long index = 0;
void loop() {
  float val = analogRead(EMGSensor);
  //char thing[] = CLIENT + CURRENT;
  Firebase.set(fbdo, CLIENT + String(index), val);
  printLocalTime();
  if (timeWeekDay == MONDAY) {
    if ((timeHour == "2" || timeHour == "10" || timeHour == "17") && !done) {
      start= true;
    }
    if ((timeHour == "3" || timeHour == "11" || timeHour == "18") && done) {
      start = false;
      done = false;
      cycle = 0;
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
    if (timeMin == "1" || timeMin == "2" || timeMin == "43") {
      done = true;
    }
    if (timeWeekDay == MONDAY) {
      if (timeHour == "2") {
        Firebase.set(fbdo, MONDAY_HOUR2 + String(cycle), val);
      }
      if (timeHour == "10") {
        Firebase.set(fbdo, MONDAY_HOUR10 + String(cycle), val);
      }
      if (timeHour == "17") {
        Firebase.set(fbdo, MONDAY_HOUR17 + String(cycle), val);
      }
    }
    if (timeWeekDay == SUNDAY) {
      if (timeHour == "2") {
        Firebase.set(fbdo, SUNDAY_HOUR2 + String(cycle), val);
      }
      if (timeHour == "10") {
        Firebase.set(fbdo, SUNDAY_HOUR10 + String(cycle), val);
      }
      if (timeHour == "17") {
        Firebase.set(fbdo, SUNDAY_HOUR17 + String(cycle), val);
      }
    }
  }
  delay(10);
}

void shiftArray(FirebaseJsonArray *arr) {
  for (int i = 0; i < arr->size() - 1; i++) {
    FirebaseJsonData *dat = new FirebaseJsonData();
    arr->get(*dat, String("/["+String(i+1)+"]"));
    arr->set(i, dat);
  }
}
void printLocalTime(){
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Serial.println("Failed to obtain time");
    return;
  }
  //strftime(timeHour,3, "%H", &timeinfo);
  strftime(timeMin,3,"%M", &timeinfo);
  //strftime(timeWeekDay,10, "%A", &timeinfo);
}
