import requests

API_KEY = "f05d697c6c3849c3be8441d623e4f4f0"

def fetch_news():
    try:
        url = f"https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=30&apiKey={API_KEY}"
        response = requests.get(url)

        # Log status and text for debugging
        print("NewsAPI status:", response.status_code)
        print("NewsAPI body:", response.text)

        # Raise an error if response failed (like 401, 403, etc.)
        response.raise_for_status()

        data = response.json()

        if data.get("status") != "ok":
            return fallback()

        articles = data.get("articles", [])
        top_stories = articles[:5]
        main_story = top_stories[0] if top_stories else {}
        secondary_stories = top_stories[1:] if len(top_stories) > 1 else []
        other_articles = articles[5:] if len(articles) > 5 else []

        return {
            "main_story": main_story,
            "secondary_stories": secondary_stories,
            "other_articles": other_articles
        }

    except Exception as e:
        print("⚠️ fetch_news() failed:", str(e))
        return fallback()


def fallback():
    return {
        "main_story": {},
        "secondary_stories": [],
        "other_articles": []
    }


