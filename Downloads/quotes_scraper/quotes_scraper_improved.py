#!/usr/bin/env python3
"""
Improved Quotes Scraper
A robust web scraper for quotes.toscrape.com with CLI interface and data persistence.
"""

import requests
import json
import csv
import time
import sys
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import argparse
from pathlib import Path

class QuotesScraper:
    """A robust quotes scraper with error handling and data persistence."""
    
    def __init__(self, delay: float = 1.0, timeout: int = 10):
        self.base_url = "https://quotes.toscrape.com/page/{}/"
        self.delay = delay
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def scrape_quotes(self, pages: int = 1) -> List[Dict]:
        """Scrape quotes from specified number of pages."""
        all_quotes = []
        
        print(f"🔍 Scraping {pages} page(s) from quotes.toscrape.com...")
        
        for page in range(1, pages + 1):
            try:
                print(f"📄 Processing page {page}/{pages}...")
                
                url = self.base_url.format(page)
                response = self.session.get(url, timeout=self.timeout)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.text, 'html.parser')
                quotes = soup.find_all("div", class_="quote")
                
                if not quotes:
                    print(f"⚠️  No quotes found on page {page}")
                    continue
                
                page_quotes = []
                for quote in quotes:
                    try:
                        text_elem = quote.find("span", class_="text")
                        author_elem = quote.find("small", class_="author")
                        tags_elem = quote.find_all("a", class_="tag")
                        
                        if not text_elem or not author_elem:
                            continue
                            
                        text = text_elem.get_text(strip=True)
                        author = author_elem.get_text(strip=True)
                        tags = [tag.get_text(strip=True) for tag in tags_elem]
                        
                        page_quotes.append({
                            "text": text,
                            "author": author,
                            "tags": tags,
                            "page": page
                        })
                        
                    except Exception as e:
                        print(f"⚠️  Error parsing quote on page {page}: {e}")
                        continue
                
                all_quotes.extend(page_quotes)
                print(f"✅ Found {len(page_quotes)} quotes on page {page}")
                
                # Respectful delay between requests
                if page < pages:
                    time.sleep(self.delay)
                    
            except requests.RequestException as e:
                print(f"❌ Error fetching page {page}: {e}")
                continue
            except Exception as e:
                print(f"❌ Unexpected error on page {page}: {e}")
                continue
        
        print(f"🎉 Scraping completed! Total quotes: {len(all_quotes)}")
        return all_quotes
    
    def save_to_json(self, quotes: List[Dict], filename: str = "quotes.json"):
        """Save quotes to JSON file."""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(quotes, f, indent=2, ensure_ascii=False)
            print(f"💾 Quotes saved to {filename}")
        except Exception as e:
            print(f"❌ Error saving to JSON: {e}")
    
    def save_to_csv(self, quotes: List[Dict], filename: str = "quotes.csv"):
        """Save quotes to CSV file."""
        try:
            with open(filename, 'w', newline='', encoding='utf-8') as f:
                if quotes:
                    writer = csv.DictWriter(f, fieldnames=['text', 'author', 'tags', 'page'])
                    writer.writeheader()
                    for quote in quotes:
                        # Convert tags list to string for CSV
                        quote_copy = quote.copy()
                        quote_copy['tags'] = ', '.join(quote['tags'])
                        writer.writerow(quote_copy)
            print(f"💾 Quotes saved to {filename}")
        except Exception as e:
            print(f"❌ Error saving to CSV: {e}")
    
    def display_quotes(self, quotes: List[Dict], limit: Optional[int] = None):
        """Display quotes in a formatted way."""
        display_quotes = quotes[:limit] if limit else quotes
        
        print(f"\n📚 Displaying {len(display_quotes)} quotes:")
        print("=" * 80)
        
        for i, quote in enumerate(display_quotes, 1):
            print(f"\n{i}. \"{quote['text']}\"")
            print(f"   — {quote['author']}")
            if quote['tags']:
                print(f"   Tags: {', '.join(quote['tags'])}")
            print(f"   Page: {quote['page']}")
            print("-" * 40)

def main():
    """Main CLI function."""
    parser = argparse.ArgumentParser(
        description="Scrape quotes from quotes.toscrape.com",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python quotes_scraper_improved.py                    # Scrape 1 page
  python quotes_scraper_improved.py -p 5              # Scrape 5 pages
  python quotes_scraper_improved.py -p 3 -o json      # Save as JSON
  python quotes_scraper_improved.py -p 2 -o csv -l 10 # Save as CSV, show 10 quotes
        """
    )
    
    parser.add_argument(
        '-p', '--pages',
        type=int,
        default=1,
        help='Number of pages to scrape (default: 1)'
    )
    
    parser.add_argument(
        '-o', '--output',
        choices=['json', 'csv', 'both'],
        help='Output format (json, csv, or both)'
    )
    
    parser.add_argument(
        '-l', '--limit',
        type=int,
        help='Limit number of quotes to display'
    )
    
    parser.add_argument(
        '-d', '--delay',
        type=float,
        default=1.0,
        help='Delay between requests in seconds (default: 1.0)'
    )
    
    parser.add_argument(
        '--no-display',
        action='store_true',
        help='Skip displaying quotes (useful when only saving)'
    )
    
    args = parser.parse_args()
    
    # Validate arguments
    if args.pages < 1:
        print("❌ Number of pages must be at least 1")
        sys.exit(1)
    
    if args.delay < 0:
        print("❌ Delay must be non-negative")
        sys.exit(1)
    
    # Initialize scraper
    scraper = QuotesScraper(delay=args.delay)
    
    try:
        # Scrape quotes
        quotes = scraper.scrape_quotes(args.pages)
        
        if not quotes:
            print("❌ No quotes were scraped")
            sys.exit(1)
        
        # Save to files if requested
        if args.output in ['json', 'both']:
            scraper.save_to_json(quotes)
        
        if args.output in ['csv', 'both']:
            scraper.save_to_csv(quotes)
        
        # Display quotes if not disabled
        if not args.no_display:
            scraper.display_quotes(quotes, args.limit)
        
        print(f"\n✨ Successfully processed {len(quotes)} quotes!")
        
    except KeyboardInterrupt:
        print("\n⏹️  Scraping interrupted by user")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 