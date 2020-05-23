# ParkHangs
**CPSC 436i Group Project**

**Who is it for?**

Our web application is intended for people who want to enjoy the Vancouver public park system. For people who want to organize a pickup game of basketball, or check what facilities are available so they can plan before they go.

**What will it do?** (What "human activity" will it support?)

Allow users to organize meetups at Vancouver parks, determine the closest park to them or to a place they want to go, and make information about the facilities at a park easily accessible.  

**What type of data will it store?**

All 260 vancouver parks and their features, user-generated events, and potentially users themselves and their associated settings, “favorite parks”,  “wishlist parks”


**What will users be able to do with this data?**

View events that other users make at parks, create new events, perform queries on parks (like parks in their area, facilities at those parks etc).


**What is some additional functionality you can add/remove based on time constraints?**

One stretch goal is to add the ability to create a user profile and login, so that users are able to “favourite” parks or create private events where they can invite other users to those events. Another functionality that we can add/remove is the ability to export events to facebook, google calendar.


**Project task requirements:**

**3-5 minimal requirements (will definitely complete)**
- Make simple queryable park data available to users (address, facilities, size of park) data found at https://opendata.vancouver.ca/explore/dataset/parks/api/
- Display all parks on a map (google maps or another free api)
- Create an event at a park
- View all events at a park

**3-7 "standard" requirements (will most likely complete)**
- Make more complicated queries like “parks near me” or “parks near a given set of lat/long points”
- Allow users to create an account and have “favourite” parks, other customizable settings like “home”
- Share events from parks to Facebook and Google calendars
- Allow users to add comments to events and parks, as well as add ratings to parks and their facilities

**2-3 stretch requirements (plan to complete 1!)**
- Make the app only useable with an account, make the account secure
- Allow users to invite other users within the app
- Create a cron job that re-populates the park database weekly or monthly to ensure that all the park information is up to date
- Include “Weekend playfield status”: display events at a playfield so that events are not scheduled at the same time

**Pick 2 of your minimal requirements and break each of them down into ~2-5 smaller tasks!**
- Create tables in our own database to represent a park and an event
- Create a script to get all of the parks data from the Vancouver parks API and then write them into our database (so we don’t have to do it by hand)

**Sketches of Main Functionality**
**Map Page With Menu**
![Map Page With Menu](https://github.com/cmaija/ParkHangs/blob/master/sketch1.png?raw=true)
**Calendar Page**
![Calendar Page](https://github.com/cmaija/ParkHangs/blob/master/sketch2.png?raw=true)
**Map Page with Modal describing park features**
![Map Page with Modal describing park features](https://github.com/cmaija/ParkHangs/blob/master/sketch3.png?raw=true)
