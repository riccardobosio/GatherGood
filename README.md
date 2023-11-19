## Gather Good
Cross-platform open-source platform for one-to-one volunteering.

## Platform details
### Technologies
Django backend with postgres database and React frontend (Ionic framework).

### Recommender system
If a user has an historic, the list of available events will be ordered using a recommender system. It consists of a Natural Language Processing (NLP) pipeline with the following steps:
1) it retrieves from the db the available events and the events the user has joined in the past
2) it considers the description field
3) it applies text preprocessing (stop-words removal) and vectorization using GloVe (Global Vectors for Word Representation) model pretrained on the Wikipedia and Gigaword dataset with 100-dimensional word vectors. This model basically represents words in a continuous vector space where the distance between vectors reflects semantic similarity between words.
4) it creates an average vector for joined events
5) it computes cosine similarity between every available event and the average vector
6) it ranks available events according to the metric computed in the last point
