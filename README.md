# ParkHangs

ParkHangs is an application that allows users to view details for all official Vancouver Parks. Users can get detailed information about a specific park, save favourite parks (if they are logged in), create and integrate events to their own calendar application, as well as write comments about parks and events.

**CPSC 436i Group Project**

**Who is it for?**

Our web application is intended for people who want to enjoy the Vancouver public park system. For people who want to organize a pickup game of basketball, check what facilities are available so they can plan before they go, see which parks are rating the best, and see what other users have to say about the park. Our application is available to both signed-in and non signed-in users.

**What will it do?** (What "human activity" will it support?)

This platform will allow users to organize meetups at Vancouver parks, write comments about parks/events,  filter parks by fields, determine the closest parks to them, or to a place they want to go, and make information about a park easily accessible.

**What type of data will it store?**

All 216 Vancouver parks and their information, user-generated events, park and event comments. We also store user information (through OAuth-based Google Sign-in) such as their first/last name, email.

**What will users be able to do with this data?**

View information about a particular park, view events that other users make at parks, create new events, write comments about a park or an event, and filter parks by information like parks near a certain address, what facilities are at a park, etc).

**What is some additional functionality you can add/remove based on time constraints?**

One stretch goal is to make the web application responsive to mobile and desktop users. Another stretch goal is to update park information occasionally using a cron job in case information about park changes and our app will be able to show the latest details about a park.

**Project task requirements:**

**3-5 minimal requirements (will definitely complete)**
- Make simple park Vancouver Parks information available to users (park address, if a park has facilities, size of park etc)
- Display all parks on Google Maps
- Create/view all/delete/update an event at a park
- Find events by entering a park name (or any part of a park name)

**3-7 "standard" requirements (will most likely complete)**
- Incorporate special feature and facilities (additional information) to park information by using additional Vancouver Open Data Portal APIs
- Filter parks by fields such as rating, park size, facilities, special features- Share events from parks to Google calendars
- Find parks by address
- Use OAuth-based Google Sign-in to allow users to create an account and save events and parks to their account
- Allows users to add events to their calendar application (Apple, Google etc)
- Allow both non-logged-in users and users to add comments to both events and parks, as well as add ratings to parks

**2-3 stretch requirements (plan to complete 1!)**
- Make the application mobile-friendly (responsive)
- Create a cron job that re-populates the park database weekly or monthly to ensure that all the park information is up to date
- Include weekend playfield status: display events at a playfield so that events are not scheduled at the same time

**Pick 2 of your minimal requirements and break each of them down into ~2-5 smaller tasks!**
- Create collections in our own MongoDB to represent parks and events
- Create a script to get all of the parks data from the Vancouver Open Data Portal API and then write them into our database (so we don’t have to do it by hand)

**Sketches of Main Functionality**
**Map Page With Menu**
![Map Page With Menu](https://github.com/cmaija/ParkHangs/blob/master/sketch1.png?raw=true)
**Calendar Page**
![Calendar Page](https://github.com/cmaija/ParkHangs/blob/master/sketch2.png?raw=true)
**Map Page with Modal describing park features**
![Map Page with Modal describing park features](https://github.com/cmaija/ParkHangs/blob/master/sketch3.png?raw=true)
