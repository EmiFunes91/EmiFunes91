# Quotes Scraper

A professional, modular Python project to extract quotes from [quotes.toscrape.com](https://quotes.toscrape.com) via web scraping or API, with support for JSON, CSV, and SQLite persistence.

## 🚀 Features

- Robust error handling
- Modular codebase (src/)
- CLI with multiple options (web/API, output formats, limits, etc.)
- Data persistence: JSON, CSV, SQLite (SQLAlchemy)
- Unit tests with pytest
- Professional docstrings and code style
- Custom User-Agent
- Configurable delays

## 📦 Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## 🎯 Usage

### CLI Example
```bash
python -m src.cli -m web -p 2 -o all -f myquotes --limit 5
```

### CLI Options
| Option         | Description                                      | Default         |
|---------------|--------------------------------------------------|-----------------|
| `-m, --mode`  | Scraping mode: `web` or `api`                    | web             |
| `-u, --url`   | API endpoint URL (required for api mode)          |                 |
| `-p, --pages` | Number of pages to scrape (web mode only)         | 1               |
| `-o, --output`| Output: `json`, `csv`, `sqlite`, or `all`         | json            |
| `-f, --file`  | Base filename or SQLite DB name                   | quotes          |
| `-d, --delay` | Delay between requests (web mode, seconds)        | 1.0             |
| `-l, --limit` | Limit number of quotes to display                 | all             |
| `--no-display`| Do not display quotes in the console              | False           |

### Examples
- Scrape 3 pages and save to all formats:
  ```bash
  python -m src.cli -m web -p 3 -o all
  ```
- Scrape from API and save to SQLite:
  ```bash
  python -m src.cli -m api -u https://api.example.com/quotes -o sqlite
  ```
- Only show 10 quotes in the console:
  ```bash
  python -m src.cli -p 2 --limit 10
  ```

## 🧪 Running Tests
```bash
pytest
```

## 🗂️ Project Structure
```
quotes_scraper/
│
├── src/
│   ├── __init__.py
│   ├── scraper.py
│   ├── persistence.py
│   ├── models.py
│   └── cli.py
│
├── tests/
│   └── test_scraper.py
│
├── requirements.txt
├── README.md
```

## 🛡️ Ethical Considerations
- Respectful delays between requests
- Proper error handling
- Configurable limits

## 🤝 Contributions
Contributions are welcome! Ideas:
- Add more quote sources
- Add filtering by author/tags
- Add concurrency
- Web interface

## 📄 License
MIT 