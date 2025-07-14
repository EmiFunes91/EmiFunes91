"""
cli.py
Command-line interface for the quotes scraper project.
"""

import argparse
from .scraper import QuoteScraper
from .persistence import PersistenceManager


def main():
    parser = argparse.ArgumentParser(
        description="Quotes Scraper: Scrape quotes from web or API and save to JSON, CSV, or SQLite.",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '-m', '--mode',
        choices=['web', 'api'],
        default='web',
        help='Scraping mode: web (default) or api'
    )
    parser.add_argument(
        '-u', '--url',
        type=str,
        help='API endpoint URL (required for api mode)'
    )
    parser.add_argument(
        '-p', '--pages',
        type=int,
        default=1,
        help='Number of pages to scrape (web mode only)'
    )
    parser.add_argument(
        '-o', '--output',
        choices=['json', 'csv', 'sqlite', 'all'],
        default='json',
        help='Output format: json, csv, sqlite, or all (default: json)'
    )
    parser.add_argument(
        '-f', '--file',
        type=str,
        default='quotes',
        help='Base filename or SQLite DB name (default: quotes)'
    )
    parser.add_argument(
        '-d', '--delay',
        type=float,
        default=1.0,
        help='Delay between requests in seconds (web mode, default: 1.0)'
    )
    parser.add_argument(
        '-l', '--limit',
        type=int,
        help='Limit number of quotes to display'
    )
    parser.add_argument(
        '--no-display',
        action='store_true',
        help='Do not display quotes in the console'
    )
    args = parser.parse_args()

    scraper = QuoteScraper(delay=args.delay)
    persistence = PersistenceManager()

    # Select scraping mode
    if args.mode == 'web':
        quotes = scraper.scrape_web(pages=args.pages)
    elif args.mode == 'api':
        if not args.url:
            print('[ERROR] API URL is required for api mode.')
            return
        quotes = scraper.scrape_api(api_url=args.url)
    else:
        print('[ERROR] Invalid mode.')
        return

    if not quotes:
        print('[ERROR] No quotes were scraped.')
        return

    # Save results
    if args.output in ['json', 'all']:
        persistence.save_json(quotes, f'{args.file}.json')
    if args.output in ['csv', 'all']:
        persistence.save_csv(quotes, f'{args.file}.csv')
    if args.output in ['sqlite', 'all']:
        persistence.save_sqlite(quotes, f'{args.file}.sqlite3')

    # Display quotes
    if not args.no_display:
        print(f'\n[INFO] Displaying {min(len(quotes), args.limit) if args.limit else len(quotes)} quotes:')
        for i, q in enumerate(quotes[:args.limit] if args.limit else quotes, 1):
            print(f"\n{i}. \"{q['text']}\"\n   — {q['author']}\n   Tags: {', '.join(q['tags']) if q['tags'] else '-'}\n   Page: {q.get('page', '-')}")

    print(f"\n[INFO] Successfully processed {len(quotes)} quotes!")

if __name__ == "__main__":
    main() 