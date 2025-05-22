from firecrawl import FirecrawlApp

# Initialize the client
firecrawl = FirecrawlApp(api_key="fc-b7db263894074230b3a71cafd34130af")

# Generate LLMs.txt with polling
results = firecrawl.generate_llms_text(
    url="https://google.github.io/adk-docs",
    max_urls=100,
    show_full_text=True
)

# Access generation results
if results.success:
    print(f"Status: {results.status}")
    with open('llm_summary.md', 'w', encoding='utf-8') as f:
        f.write(str(results.data).encode().decode('unicode_escape'))
else:
    print(f"Error: {results.error}")