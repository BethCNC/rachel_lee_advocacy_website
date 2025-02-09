import nltk

def download_nltk_data():
    """Download required NLTK data packages"""
    packages = [
        'punkt',
        'stopwords',
        'averaged_perceptron_tagger',
        'maxent_ne_chunker',
        'words'
    ]
    
    for package in packages:
        print(f"Downloading {package}...")
        nltk.download(package)

if __name__ == "__main__":
    download_nltk_data() 