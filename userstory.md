USER STORY:

Player Perspective

As a user, I am visiting the site most likely with a specific business in mind that I would like to look into
As a user, the business I would like to search, I would like the relevant data presented to me so I can come to a well-rounded decision in regards to the integrity/reputation of the company (whether I have an issue/possible complaint myself and want to see if my experience and perspective of the company is substantiated, or unique).
As a user, this relevant data should include raw data as is, along with manipulated data that gives me better perspective of the company
Manipulated data may include:
percentage of open claims (to give perspective in the behavior in regards to a business caring to resolve a claim on its own).
if possible, percentage of complaints, (if we can join data from total locations of a company from another dataset, as the current data only gives data to a location with a complaint)
As a user, I also to have the option to search by category, for instance, if I am interested in what company I should go with if there are multiple options available.
As a user, once I am returned data of a specific company and its location, I can see an overall rating/grade
As a user, based on the information provided, I can have access to a link/site where I can file a complaint myself, if that was the motivation behind using this site.

Developer Perspective

As developers, we will utilize good Markdown style to make this document easy for anyone viewing our code to follow, and so the code flows between all developers involved.
As developers, we will create a simplistic site aesthetic that is consistent with the app.
As developers, the group will write different functions which will compile the data, set up the template using handlebars , filter the data, then return and append the relevant data to the html, then the view of the user, using ajax, sequel and controllers.
As a developer we will choose specific raw data along with what to manipulate to represent the behavior/reputation of a business appropriately so the user can make a well-rounded decision about a specific business and even more specifically of a location.
This will involve writing some algorithms with data available to us in the current dataset
This will also take into consideration if we should join another dataset and how this will affect load speed on desktop vs. mobile, and the user experience in general.
[?] As developers, we will enable the user to save their previous searches so they can auto-fill by previous search (along with autofill by all business names if that is the first time a user has utilized the site) to local storage so they can be accessed in the future.
As developers, we will enable RESTful APIs to work with our app that tracks resources
As developers, Page.js will use history object so that a user can navigate back and forth between pages from previous and new user request
