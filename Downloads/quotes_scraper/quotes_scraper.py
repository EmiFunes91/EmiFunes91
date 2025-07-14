import requests
from bs4 import BeautifulSoup

BASE_URL = "https://quotes.toscrape.com/page/{}/"

def scrape_quotes(pages=1):
    all_quotes = []
    for page in range(1, pages + 1):
        url = BASE_URL.format(page)
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Failed to retrieve page {page}")
            continue

        soup = BeautifulSoup(response.text, 'html.parser')
        quotes = soup.find_all("div", class_="quote")

        for quote in quotes:
            text = quote.find("span", class_="text").get_text()
            author = quote.find("small", class_="author").get_text()
            tags = [tag.get_text() for tag in quote.find_all("a", class_="tag")]
            all_quotes.append({
                "text": text,
                "author": author,
                "tags": tags
            })

    return all_quotes

if __name__ == "__main__":
    quotes = scrape_quotes(pages=3)
    for q in quotes:
        print(f"{q['text']} — {q['author']} [{', '.join(q['tags'])}]")
