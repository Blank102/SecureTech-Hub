import os
import requests

API_KEY = {API_KEY} 
GNEWS_BASE = "https://gnews.io/api/v4"

def fetch_news():
    try:
        headers = {"User-Agent": "Mozilla/5.0"}

        # Request 1: Topic = technology
        url_tech = f"{GNEWS_BASE}/top-headlines?topic=technology&lang=en&token={API_KEY}"
        response_tech = requests.get(url_tech, headers=headers)
        response_tech.raise_for_status()
        articles_tech = response_tech.json().get("articles", [])

        # Request 2: Query = ai + cybersecurity
        url_ai = f"{GNEWS_BASE}/search?q=ai+cybersecurity&lang=en&token={API_KEY}"
        response_ai = requests.get(url_ai, headers=headers)
        response_ai.raise_for_status()
        articles_ai = response_ai.json().get("articles", [])

        combined = articles_tech + articles_ai
        seen_urls = set()
        unique_articles = []
        for article in combined:
            if article["url"] not in seen_urls:
                unique_articles.append(article)
                seen_urls.add(article["url"])

        top_stories = unique_articles[:5]
        main_story = top_stories[0] if top_stories else {}
        secondary_stories = top_stories[1:] if len(top_stories) > 1 else []
        other_articles = unique_articles[5:] if len(unique_articles) > 5 else []

        return {
            "main_story": main_story,
            "secondary_stories": secondary_stories,
            "other_articles": other_articles
        }

    except Exception as e:
        print("⚠️ fetch_news() failed:", e)
        return fallback()


def fallback():
    return {
        "main_story": {},
        "secondary_stories": [],
        "other_articles": []
    }
