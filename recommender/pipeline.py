import gensim.downloader as api
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk
import numpy as np

# Download and load a pre-trained word embedding model
model = api.load('glove-wiki-gigaword-100')  # A medium-sized model

# Ensure you have the NLTK stopwords dataset downloaded
nltk.download('punkt')
nltk.download('stopwords')

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
    joined_vectors = [vectorize_text(event['description'], model) for event in joined_events]

    # Calculate average vector for joined events
    avg_joined_vector = np.mean(joined_vectors, axis=0)

    # Compute similarity scores and store them with available events
    recommendations = []
    for event in available_events:
        event_vector = vectorize_text(event['description'], model)
        similarity_score = cosine_similarity([avg_joined_vector], [event_vector])[0][0]
        recommendations.append((event, similarity_score))

    # Sort events by similarity score in descending order
    recommendations.sort(key=lambda x: x[1], reverse=True)
    return [event[0] for event in recommendations]

# Example data
joined_events = [
    {"id": 1, "description": "Help me paint my old room."},
    {"id": 2, "description": "Local park cleanup and tree planting."},
    {"id": 3, "description": "Drawing at the beach."},
    {"id": 4, "description": "Paint my old wood desk."},
]

available_events = [
    {"id": 101, "description": "City marathon for charity."},
    {"id": 102, "description": "Beach cleanup and environmental awareness workshop."},
    {"id": 103, "description": "Urban farming and sustainable living seminar."},
    {"id": 104, "description": "Kitchen painters."},
]

# Get recommendations
recommended_events = recommend_events(joined_events, available_events)
print("Recommended Events:", recommended_events)
