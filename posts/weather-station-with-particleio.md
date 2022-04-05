---
title: 'Building your own Weather station with Particle Electron'
date: 'Fed 8th, 2019'
excerpt: 'Building your own weather station with Arduino family micro controller'
cover_image: 'https://github.com/datduyng/datduyng.github.io/blob/2170af7581dc2fe4fd411549f84ae1785671faaa/assets/img/post/2019-03-10-hmm-graphical.png?raw=true'
---

**Layout:** 

- [cover_image: '[/images/posts/img3.jpg](https://github.com/datduyng/datduyng.github.io/blob/2170af7581dc2fe4fd411549f84ae1785671faaa/assets/img/post/2019-02-08-weather-station-01.png?raw=true)'](#cover_image-imagespostsimg3jpghttpsgithubcomdatduyngdatduynggithubioblob2170af7581dc2fe4fd411549f84ae1785671faaaassetsimgpost2019-02-08-weather-station-01pngrawtrue)
  - [I Introduction](#i-introduction)
    - [1. Particle Electron](#1-particle-electron)
    - [2. ThingSpeak](#2-thingspeak)
  - [II. Weather station Project layout](#ii-weather-station-project-layout)
    - [1. Components](#1-components)
    - [2. Wiring](#2-wiring)
    - [3. Particle Connection](#3-particle-connection)
      - [Particle Mode](#particle-mode)
    - [4. ThingSpeak connection](#4-thingspeak-connection)
    - [5. Weather database connection](#5-weather-database-connection)
  - [III. Final product](#iii-final-product)
  - [IV.References](#ivreferences)

### I Introduction
If you a type of person who like to work with Arduino project, then I have something for you. As a person who like to work with Arduino, I always wanted to find a way to connect arduino to the internet and some how view live sensors data. Roughly last year, My professor urged me to put together a Arduino end to end project that can connect to the internet and visualize sensor data via [ThingSpeak](https://thingspeak.com/). 
I designed a weather station control by Arduino and connect to Thingspeak using internet module, [Particle Electron](https://www.particle.io/cellular/). The weather station constantly query a weather database, [openweathermap.org](https://openweathermap.org/) to smooth out the sensor value and get a better approximation of the weather. 

#### 1. Particle Electron
Particle Electron is a tiny microcontroller about the size of an Arduino Nano for creating 3-G cellular- connnected electronics projects and products. The particle electron box come with a SIM card, antenna, and battery as main components. The Particle electron look like as below: 


<p align="center"><img src="https://user-images.githubusercontent.com/35666615/52460095-50775a80-2b2e-11e9-82bb-f80e2c67d18f.jpg"></p>

Particle Electron can be power through the 5V power jack or straight from the battery provided in the packages. 

#### 2. ThingSpeak
One of my favorite section to discuss about. I had to much fun exploring this website so let's jump right in. 
ThingSpeak is a free web service that let's you collect and store sensor data in the cloud and develop internet of thing application. The Thingspeak web services provide tool that let you analyze and visualize data on their website. Most app and service on Thingspeak is run completely with MATLAB, a easy to pick language for data processing and visualization. 
Thingspeak is more than just a free web service. They create a rigid communities. I love being a part of Arduino communites opensource project. This thought really give me a feeling of beloning to the ThinkSpeak communities.

Channels can be public or kept private. Below are picture showing example of a public channel. 
<p align="center"><img height="500" width="550" src="https://user-images.githubusercontent.com/35666615/52460524-5ec67600-2b30-11e9-97df-2419456bfa30.PNG"><img height="500" width="550" src="https://user-images.githubusercontent.com/35666615/52460527-6128d000-2b30-11e9-899a-cf1e8efaccff.PNG"></p>

Alright it is not enough of the talking business so let's jump right in.
### II. Weather station Project layout
Link to our weather station project: [https://github.com/datduyng/particle-iot-weather-station](https://github.com/datduyng/particle-iot-weather-station)
Flow chart of the project:
<p align="center"><img height="550" width="670" src=" https://user-images.githubusercontent.com/35666615/51284584-9f0f5a00-19b1-11e9-9326-608e5ffdcf01.jpg"></p>

Some part on the chart to note:  here particle Electron is an independent node as in future we might want to be able to add sub-node like more Arduino and more raspberry pi. 


#### 1. Components
- [Arduino uno](https://store.arduino.cc/usa/arduino-uno-rev3)/
- [Paticle Electron](https://store.particle.io/collections/electron)
- [Weather meter](https://www.sparkfun.com/products/8942)
- [Sparkfun Weather meter Shield](https://www.sparkfun.com/products/13956)
- Project water proof enclosure.

In this project, I use the Sparkfun weather station shield, which is packed with a humidity and temperature sensor in it. This https://user-images.githubusercontent.com/35666615/52514662-6f7ef680-2bd9-11e9-8ba0-ad4a5964d5ea.pngsave me huge amount of wiring and coding times. 

#### 2. Wiring
Connection between arduino to Particle is via I2c bus. 
-   `SDA(arduino) -> SDA(electron-pinD0)`
-   `SCL(arduino) -> SCL(electron-pinD1)`

Below is the pinout of Arduino(left) and Particle electron(right)
<p align="center"><img height="400" width="480" src="https://user-images.githubusercontent.com/35666615/52514653-6130da80-2bd9-11e9-85f0-df561c31529a.png"><img height="400" width="480" src="https://user-images.githubusercontent.com/35666615/52514662-6f7ef680-2bd9-11e9-8ba0-ad4a5964d5ea.png"></p>

The weather shield would just plug straight on the Arduino so that is easy. 
> <p align="center"><img height="400" width="480" src="https://user-images.githubusercontent.com/35666615/42290717-b720172a-7f8c-11e8-975b-02a0eb231c07.jpg"></p>
Note: above the gray wire with 'R' tag stand for 'raingauge' and 'W' stand for 'Windspeed' are the input of the Sparkfun weather meters. 

#### 3. Particle Connection

##### Particle Mode
Particle is a multi purpose device. It has a bunch of mode[(particle mode)](https://docs.particle.io/tutorials/device-os/led/electron/). Few mode that you need to be familiar is
- Connected mode 
	- When it is breathing cyan, your Electron is happily connected to the Internet. When it is in this mode, you can call functions and flash code.
- Looking for the internet
	-	If Electron is blinking, then It is trying to connect to Cellular. 
- Safe mode
	- Safe mode, breathing magenta (red and blue at the same time), connects the Electron to the cloud, but does not run any application firmware

Particle website allow you to download library and upload code right on the cloud. In this project, The Particle only need to include the 'ThingSpeak' library(Since the particle is a bridge device between 'the ground' and 'the cloud'). So make sure you have downloaded the library. 

Looking at our flow chart we are currently interested in the Arduino to particle part as shown below.
<center><img height="400" width="480" src="https://user-images.githubusercontent.com/35666615/52515101-51b39080-2bdd-11e9-80b5-9e054bcb5120.PNG"> </center>

Ex: I2c connection from Arduino to Particle
Note: copy this code straight in to your IDE will not compile. Refer to my github for runnable code.

In this project, We used the Arduino as Master and Particle as slave. 
```c++
#include<Wire.h> // i2c Communication

// Here you would define the address of the 
// SLAVE. why in byte?? max of a byte is 2^8 = 255 
// this mean that I2C communication is valid for only
// 255 node(module)
byte SLAVE_ADDRESS = 8;

// here buff is the package. We need to append
// all sensor values into one big string.
// or one big string package
int packageLength = 255;
char buff[255];

// this indicate the period you would like to send
// your data to the particle. Design this carefully, 
// here: 2000 mean that the Arduino will send data to particle
// every 2 seconds(2000 ms)
#define period_between_data 2000
long last_send = 0;

// NOTE: it is good to define sensor value as global 
// variable. So ALL function can view it.(You can use the variable in all scopes of the program)
int sensor_value1 = 0;
int sensor_value2 = 0; 

int update_sensor1(){
	// write some code to update sensor value here
	return 0;
}

void setup(){
	Serial.begin(9600); // as usual just open the display usb port
	Wire.begin(); // join all the i2c connection
}

void loop(){
	// read and update data sensor here
	sensor_value1 = update_sensor1();

	if((millis() - last_send) > period_between_data){
		last_send = millis(); // update the time you last send
		snprintf(buff, packageLength, "%d;%d", sensor_value1,sensor_value2);
		//ex: buff = "12;234";

		// send data to Particle
		Wire.beginTransmission(SLAVE_ADDRESS);
	    Wire.write(buff);// send the package
	    Wire.endTransmission();
	}
}
```

#### 4. ThingSpeak connection
Now, we can create an account and setup our thingspeak webserver. This [blog](https://roboindia.com/tutorials/thingspeak-setup) does a really good job of step by step on setting up Thingspeak. 
Here we are interested in the connection from the Particle electron to Thingspeak webserver. 
> <center><img height="200" width="400" src="https://user-images.githubusercontent.com/35666615/52515304-5a0ccb00-2bdf-11e9-97f1-c53235621c72.PNG"></center>

Code can be write in [particle online IDE](https://build.particle.io/build)


We can set our program to send sensor data to thing speak using `Thingspeak.setField` function. Let's take a closer look at the function prototype: 
- setField take a `int field` value and a values. field below is shown as 1, 2, 3 represent ThingSpeak Field.
```c++
  ThingSpeak.setField(1,String(sensor_value1));//temp
  ThingSpeak.setField(2,String(sensor_value2));//humd
  ThingSpeak.setField(3,String(sensor_value3));//rain

  // Write the fields that you've set all at once.
  ThingSpeak.writeFields(myChannelID, myWriteAPIKey);
```

On the side, you can also send sensors data to particle.io console via `Particle.publish()` function. 

#### 5. Weather database connection 
The idea behind using a weather database is to have a more sensor value accuracy. In our project, we only use one weather live database. To get a more accuracy, one can query multiple live database and average all out. 
In our project, we used [openweathermap.org](https://openweathermap.org/) API. As a free plan, they allows individual to have 60 API calls per minutes. 
Thingspeak allow users to integrate apps to their projects. In this case, I ultilize the [React](https://thingspeak.com/apps/reacts) ThingSpeak apps. 
Everytime, Thingspeak receive sensors value, we have React setup so that It would query the openweathermap.org for current sensor value and average out our actual sensor values.

To Query weather datas from openweathermap.org, we can use MATLAB `webread()` function.  Refer to [openweathermap.org](https://openweathermap.org/current) on constructing api to query data for your location. Below is usage example of querying data from weather database:
```matlab
%NOTE: this url below is API that query value
% for my location. TODO: change this line below
api = 'https://api.openweathermap.org/data/2.5/weather?id=5034652&appid=3551223b0f56ff975fe725c7c49e8a64'

%query data from api
dataFromDb = webread(api)
``` 
after querying, `datafromDb` variable will hold a struct and would look like below:
```matlab
dataFromDb =
		struct with fields:
		coord: [1×1 struct]
		weather: [1×1 struct]
		base: 'stations'
		main: [1×1 struct]
		visibility: 16093
		wind: [1×1 struct]
		clouds: [1×1 struct]
		dt: 1.5342e+09
		sys: [1×1 struct]
		id: 5034652
		name: 'Lincoln County'
		cod: 200
```
### III. Final product
Note picture shown below are not what describe above. I do not have original design of the project saved. Pictures below show an improvement version. Same idea apply as above. I only swap out the Arduino Uno with a Nano and add a circuit board for convinient. 

> <img height="380" width="410" src="https://user-images.githubusercontent.com/35666615/52516027-d0162f80-2be9-11e9-89e3-e8d4f18ce4be.jpg"><img height="380" width="410" src="https://user-images.githubusercontent.com/35666615/52516034-dd331e80-2be9-11e9-95c6-4bd4d4512e73.jpg"> 


Have fun exploring. I would appreciated any feedback thank you. 

### IV.References

- https://www.mathworks.com/help/thingspeak/
- https://openweathermap.org/
- https://docs.particle.io/electron/
- https://roboindia.com/tutorials/thingspeak-setup