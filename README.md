## Platform details
### Technologies
Django backend with postgres database and React frontend.

### Recommender system
If a user has an historic, the list of available events will be ordered using a recommender system. It consists of a Natural Language Processing (NLP) pipeline with the following steps:
1) it retrieves from the db the available events and the events the user has joined in the past
2) it considers the description field
3) it applies text preprocessing (stop-words removal) and vectorization using GloVe (Global Vectors for Word Representation) model pretrained on the Wikipedia and Gigaword dataset with 100-dimensional word vectors. This model basically represents words in a continuous vector space where the distance between vectors reflects semantic similarity between words.
4) it creates an average vector for joined events
5) it computes cosine similarity between every available event and the average vector
6) it ranks available events according to the metric computed in the last point

## Demo
These are the steps we will show in the demo:
1) Show initial screens (registration).
2) Come back and login with levon user:
```bash
"email": "levon@email.com",
"password": "default"
```
3) Show events list.
4) Click on one event created by Riccardo user in order to check the details.
5) Open creator details to see reviews.
6) Join the event.
8) Show list of levon past events. Since we have history, we the user gets the events, recommender system is ordering them.
9) Show events list. Notice that the order is due to recommendation.