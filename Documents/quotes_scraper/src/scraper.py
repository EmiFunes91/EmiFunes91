"""
scraper.py
Web and API scraping logic for quotes.
"""

import time
import requests
from typing import List, Dict, Optional
from bs4 import BeautifulSoup

class QuoteScraper:
    """
    Scraper for extracting quotes from a website or an API.
    """
    def __init__(self, base_url: str = "https://quotes.toscrape.com/page/{}/", delay: float = 1.0, timeout: int = 10):
        self.base_url = base_url
        self.delay = delay
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

    def scrape_web(self, pages: int = 1) -> List[Dict]:
        """
        Scrape quotes from the website.
        Args:
            pages (int): Number of pages to scrape.
        Returns:
            List[Dict]: List of quotes.
        """
        all_quotes = []
        for page in range(1, pages + 1):
            url = self.base_url.format(page)
            try:
                response = self.session.get(url, timeout=self.timeout)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, 'html.parser')
                quotes = soup.find_all("div", class_="quote")
                for quote in quotes:
                    text_elem = quote.find("span", class_="text")
                    author_elem = quote.find("small", class_="author")
                    tags_elem = quote.find_all("a", class_="tag")
                    if not text_elem or not author_elem:
                        continue
                    text = text_elem.get_text(strip=True)
                    author = author_elem.get_text(strip=True)
                    tags = [tag.get_text(strip=True) for tag in tags_elem]
                    all_quotes.append({
                        "text": text,
                        "author": author,
                        "tags": tags,
                        "page": page
                    })
                if page < pages:
                    time.sleep(self.delay)
            except Exception as e:
                print(f"[ERROR] Failed to scrape page {page}: {e}")
                continue
        return all_quotes

    def scrape_api(self, api_url: str) -> List[Dict]:
        """
        Scrape quotes from a REST API endpoint.
        Args:
            api_url (str): API endpoint URL.
        Returns:
            List[Dict]: List of quotes.
        """
        try:
            response = self.session.get(api_url, timeout=self.timeout)
            response.raise_for_status()
            data = response.json()
            # Expecting a list of quotes in the API response
            if isinstance(data, list):
                return data
            elif isinstance(data, dict) and 'quotes' in data:
                return data['quotes']
            else:
                print("[ERROR] Unexpected API response format.")
                return []
        except Exception as e:
            print(f"[ERROR] Failed to fetch from API: {e}")
            return [] 