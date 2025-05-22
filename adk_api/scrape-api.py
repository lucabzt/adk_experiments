# Install with pip install firecrawl-py
import asyncio
import os
import re
from pathlib import Path
from urllib.parse import urlparse
from firecrawl import AsyncFirecrawlApp
from firecrawl import ScrapeOptions


async def main():
    app = AsyncFirecrawlApp(api_key='fc-b7db263894074230b3a71cafd34130af')

    # Create output directory
    output_dir = Path('adk-docs-markdown')
    output_dir.mkdir(exist_ok=True)

    print("Starting crawl...")
    #https://www.m4rkus28.de/
    #https://google.github.io/adk-docs
    response = await app.crawl_url(
        url='https://google.github.io/adk-docs',
        limit=100,
        scrape_options=ScrapeOptions(
            formats=['markdown'],
            onlyMainContent=True
        )
    )

    # Check if the response contains data
    response = dict(response)
    if not response or 'data' not in response:
        print("No data found in response")
        print(type(response))
        print("Response:", response)
        return

    print(response['data'])

    pages = response['data']
    print(f"Found {len(pages)} pages to process")

    for i, page in enumerate(pages):
        page = dict(page)
        try:
            # Extract URL and content
            url = page.get('metadata', {}).get('sourceURL', '') or page.get('url', '')
            content = page.get('markdown', '') or page.get('content', '')
            title = page.get('metadata', {}).get('title', '') or page.get('title', '')

            if not content:
                print(f"No content found for page {i + 1}: {url}")
                continue

            # Generate filename from URL
            filename = generate_filename(url, title)
            filepath = output_dir / filename

            # Create subdirectories if needed
            filepath.parent.mkdir(parents=True, exist_ok=True)

            # Save the markdown content
            with open(filepath, 'w', encoding='utf-8') as f:
                # Add metadata header
                f.write(f"# {title}\n\n" if title else "")
                f.write(f"**Source:** {url}\n\n")
                f.write("---\n\n")
                f.write(content)

            print(f"✓ Saved: {filename}")

        except Exception as e:
            print(f"✗ Error processing page {i + 1}: {e}")
            continue

    print(f"\nCompleted! Files saved in '{output_dir}' directory")


def generate_filename(url, title=""):
    """Generate a safe filename from URL and title"""
    try:
        parsed_url = urlparse(url)
        path = parsed_url.path.strip('/')

        if not path or path == '':
            filename = 'index'
        else:
            # Replace slashes with underscores and clean up
            filename = path.replace('/', '_')
            # Remove any trailing slashes or underscores
            filename = filename.strip('_')

        # Clean the filename - remove or replace invalid characters
        filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
        filename = re.sub(r'_+', '_', filename)  # Replace multiple underscores with single

        # If we have a title, use it for better readability (optional)
        if title:
            title_clean = re.sub(r'[<>:"/\\|?*]', '_', title)
            title_clean = re.sub(r'_+', '_', title_clean)
            title_clean = title_clean.strip('_')[:50]  # Limit length
            if title_clean and title_clean != filename:
                filename = f"{filename}_{title_clean}"

        # Ensure we have a filename
        if not filename:
            filename = 'unnamed_page'

        return f"{filename}.md"

    except Exception as e:
        print(f"Error generating filename for {url}: {e}")
        return f"page_{hash(url) % 10000}.md"


def create_directory_structure(url, base_dir):
    """Create directory structure based on URL path"""
    try:
        parsed_url = urlparse(url)
        path_parts = [part for part in parsed_url.path.split('/') if part]

        if len(path_parts) > 1:
            # Create subdirectories for nested paths
            dir_path = base_dir
            for part in path_parts[:-1]:  # Exclude the last part (filename)
                safe_part = re.sub(r'[<>:"/\\|?*]', '_', part)
                dir_path = dir_path / safe_part
                dir_path.mkdir(exist_ok=True)
            return dir_path

        return base_dir
    except Exception:
        return base_dir


# Alternative version with better organization
async def main_organized():
    app = AsyncFirecrawlApp(api_key='fc-b7db263894074230b3a71cafd34130af')

    # Create output directory with organized structure
    output_dir = Path('adk-docs-organized')
    output_dir.mkdir(exist_ok=True)

    print("Starting organized crawl...")
    response = await app.crawl_url(
        url='https://google.github.io/adk-docs',
        limit=100,
        scrape_options=ScrapeOptions(
            formats=['markdown'],
            onlyMainContent=True
        )
    )

    if not response or 'data' not in response:
        print("No data found in response")
        return

    pages = response['data']
    print(f"Found {len(pages)} pages to process")

    for i, page in enumerate(pages):
        try:
            url = page.get('metadata', {}).get('sourceURL', '') or page.get('url', '')
            content = page.get('markdown', '') or page.get('content', '')
            title = page.get('metadata', {}).get('title', '') or page.get('title', '')

            if not content:
                continue

            # Create organized directory structure
            parsed_url = urlparse(url)
            path_parts = [part for part in parsed_url.path.split('/') if part]

            if not path_parts:
                filepath = output_dir / 'index.md'
            else:
                # Create nested directories
                current_dir = output_dir
                for part in path_parts[:-1]:
                    safe_part = re.sub(r'[<>:"/\\|?*]', '_', part)
                    current_dir = current_dir / safe_part
                    current_dir.mkdir(exist_ok=True)

                # Use the last part as filename
                filename = path_parts[-1] if path_parts else 'index'
                filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
                if not filename.endswith('.md'):
                    filename += '.md'

                filepath = current_dir / filename

            # Save with metadata
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(f"---\n")
                f.write(f"title: {title}\n" if title else "")
                f.write(f"source: {url}\n")
                f.write(f"---\n\n")
                f.write(content)

            print(f"✓ Saved: {filepath.relative_to(output_dir)}")

        except Exception as e:
            print(f"✗ Error processing page {i + 1}: {e}")

    print(f"\nCompleted! Organized files saved in '{output_dir}' directory")


if __name__ == "__main__":
    # Run the basic version
    asyncio.run(main())

    # Uncomment to run the organized version instead
    # asyncio.run(main_organized())