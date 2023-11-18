from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import numpy as np
from django.conf import settings


def preprocess_text(text):
    """Preprocess text: tokenize and remove stopwords."""
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(text.lower())
    filtered_tokens = [w for w in tokens if w not in stop_words]
    return filtered_tokens


def vectorize_text(text, embedding_model):
    """Convert text to a vector using the word embedding model."""
    tokens = preprocess_text(text)
    word_vectors = [embedding_model[w] for w in tokens if w in embedding_model]
    if not word_vectors:  # handle cases where none of the words are in the model
        return np.zeros(embedding_model.vector_size)
    return np.mean(word_vectors, axis=0)


def recommend_events(joined_events, available_events):
    """Recommend events based on similarity to joined events."""
    # Vectorize joined events' descriptions
    joined_vectors = [vectorize_text(event['description'], settings.RECOMMENDER_MODEL) for event in joined_events]

    # Calculate average vector for joined events
    avg_joined_vector = np.mean(joined_vectors, axis=0)

    # Compute similarity scores and store them with available events
    recommendations = []
    for event in available_events:
        event_vector = vectorize_text(event['description'], settings.RECOMMENDER_MODEL)
        similarity_score = cosine_similarity([avg_joined_vector], [event_vector])[0][0]
        recommendations.append((event, similarity_score))

    # Sort events by similarity score in descending order
    recommendations.sort(key=lambda x: x[1], reverse=True)
    return [event[0]["id"] for event in recommendations]
