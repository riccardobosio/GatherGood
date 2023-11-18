## Demo
These are the steps we will show in the demo:
1) Show initial screens.
2) Signup. Don't use already exiting email (our 4 users already exist).
3) Login with the created user and check events list. Since the user doesn't have an history, the events are displayed oredered by date (no recommendation).
4) Click on one event created by Riccardo user in order to check the details.
5) Open creator details to see reviews.
6) Join event.
7) Logout and login again with levon user:
```bash
"email": "levon@email.com",
"password": "default"
```
8) Show list of current user past events. Since we have history, we the user gets the events, recommender system is ordering them.
9) Show events list. Notice that the order is different because of recommendation.