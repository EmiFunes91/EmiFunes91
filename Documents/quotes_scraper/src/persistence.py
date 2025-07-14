"""
persistence.py
Persistence logic for saving/loading quotes in JSON, CSV, and SQLite.
"""

import json
import csv
from typing import List, Dict
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base, Quote

class PersistenceManager:
    """
    Handles saving and loading quotes to/from JSON, CSV, and SQLite.
    """
    def save_json(self, quotes: List[Dict], filename: str):
        """Save quotes to a JSON file."""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(quotes, f, indent=2, ensure_ascii=False)

    def save_csv(self, quotes: List[Dict], filename: str):
        """Save quotes to a CSV file."""
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            if quotes:
                writer = csv.DictWriter(f, fieldnames=['text', 'author', 'tags', 'page'])
                writer.writeheader()
                for quote in quotes:
                    quote_copy = quote.copy()
                    quote_copy['tags'] = ', '.join(quote['tags']) if isinstance(quote['tags'], list) else quote['tags']
                    writer.writerow(quote_copy)

    def save_sqlite(self, quotes: List[Dict], db_path: str):
        """Save quotes to a SQLite database using SQLAlchemy."""
        engine = create_engine(f'sqlite:///{db_path}')
        Base.metadata.create_all(engine)
        Session = sessionmaker(bind=engine)
        session = Session()
        for q in quotes:
            tags_str = ', '.join(q['tags']) if isinstance(q['tags'], list) else q['tags']
            quote_obj = Quote(text=q['text'], author=q['author'], tags=tags_str, page=q.get('page'))
            session.add(quote_obj)
        session.commit()
        session.close()

    def load_json(self, filename: str) -> List[Dict]:
        """Load quotes from a JSON file."""
        with open(filename, 'r', encoding='utf-8') as f:
            return json.load(f)

    def load_csv(self, filename: str) -> List[Dict]:
        """Load quotes from a CSV file."""
        quotes = []
        with open(filename, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                row['tags'] = [tag.strip() for tag in row['tags'].split(',')] if row.get('tags') else []
                row['page'] = int(row['page']) if row.get('page') else None
                quotes.append(row)
        return quotes

    def load_sqlite(self, db_path: str) -> List[Dict]:
        """Load quotes from a SQLite database using SQLAlchemy."""
        engine = create_engine(f'sqlite:///{db_path}')
        Session = sessionmaker(bind=engine)
        session = Session()
        quotes = []
        for q in session.query(Quote).all():
            quotes.append({
                'text': q.text,
                'author': q.author,
                'tags': [tag.strip() for tag in q.tags.split(',')] if q.tags else [],
                'page': q.page
            })
        session.close()
        return quotes 