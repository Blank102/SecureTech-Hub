import requests
import os
API_KEY = os.environ.get("NEWS_API_KEY")

def fetch_news():
    url = f"https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=30&apiKey={API_KEY}"
    response = requests.get(url).json()

    # Filter out articles without images
    all_articles = [article for article in response["articles"] if article.get("urlToImage")]

    # Now slice after filtering
    top_stories = all_articles[:5]
    main_story = top_stories[0]
    secondary_stories = top_stories[1:]
    other_articles = all_articles[5:]

    return {
        "main_story": main_story,
        "secondary_stories": secondary_stories,
        "other_articles": other_articles
    }



