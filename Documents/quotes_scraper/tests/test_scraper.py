import os
import sys
import pytest

# Add src directory to sys.path for imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from scraper import QuoteScraper
from persistence import PersistenceManager
from models import Base, Quote
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

TEST_DB = 'test_quotes.sqlite3'
TEST_JSON = 'test_quotes.json'
TEST_CSV = 'test_quotes.csv'

@pytest.fixture
def sample_quotes():
    return [
        {"text": "Test quote 1", "author": "Author 1", "tags": ["tag1", "tag2"], "page": 1},
        {"text": "Test quote 2", "author": "Author 2", "tags": ["tag3"], "page": 2}
    ]

def test_scrape_web():
    scraper = QuoteScraper(delay=0)
    quotes = scraper.scrape_web(pages=1)
    assert isinstance(quotes, list)
    if quotes:
        assert 'text' in quotes[0]
        assert 'author' in quotes[0]
        assert 'tags' in quotes[0]

def test_save_and_load_json(sample_quotes):
    pm = PersistenceManager()
    pm.save_json(sample_quotes, TEST_JSON)
    loaded = pm.load_json(TEST_JSON)
    assert loaded == sample_quotes
    os.remove(TEST_JSON)

def test_save_and_load_csv(sample_quotes):
    pm = PersistenceManager()
    pm.save_csv(sample_quotes, TEST_CSV)
    loaded = pm.load_csv(TEST_CSV)
    assert len(loaded) == len(sample_quotes)
    assert loaded[0]['text'] == sample_quotes[0]['text']
    os.remove(TEST_CSV)

def test_save_and_load_sqlite(sample_quotes):
    pm = PersistenceManager()
    pm.save_sqlite(sample_quotes, TEST_DB)
    loaded = pm.load_sqlite(TEST_DB)
    assert len(loaded) == len(sample_quotes)
    assert loaded[0]['text'] == sample_quotes[0]['text']
    os.remove(TEST_DB) 