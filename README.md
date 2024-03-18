Aaron Ducote & Liam Todd
CS 494 Final Project Proposal

Description:
Our main goal for this project is to create a site that takes data primarily from NASA’s
API’s and shows some of their data in effective and creative ways. For the most part, we want to
run a very interactive site that takes queries from users on what they want to see, rather than just
showing them some data. Some of the data we intend to display will be APOD’s, Rover photos,
satellite images, or just whatever the user wants to see through a linkage to NASA’s media
library.

APIs:
We plan on using two APIs at the moment. Our flagship API will be NASA’s API. Some
requests to this API require latitude and longitude and data. In order to get this data, we will
utilize a geocoding API that responds with latitude and longitude data with when given a request
body that contains a city.
NASA APIs to be called:
● APOD (Astronomy Picture of the Day)
● Earth (latitude and longitude data via Geocoding API)
● NASA Image and Video Library
● Mars Rover Photos

UI Description:
The primary form of user-interaction for our app will be the user providing data for us to
query to the APIs. The plan for routing is to have a page for each API request, plus a home page.
There will be a navigation bar for the user on every screen, so that they can go back and forth
between pages.

STRETCH GOAL:
Have a page that is designated as a scaled-down solar system that the user can interact
with (e.g.: click on planets for info, rotation/orbit speed, pictures, etc.).
