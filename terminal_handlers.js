
/* ===================================
   Blog System Functions  
   =================================== */

async function loadBlogManifest() {
    if (terminalState.blogCache) {
        return terminalState.blogCache;
    }

    try {
        const response = await fetch('./blogs/manifest.json');
        if (!response.ok) throw new Error('Manifest not found');
        const manifest = await response.json();
        terminalState.blogCache = manifest;
        return manifest;
    } catch (error) {
        console.error('Error loading blog manifest:', error);
        return null;
    }
}

async function handleCatLogs(output) {
    addTerminalLine(output, '<span class="terminal-info">Loading blog index...</span>');

    const manifest = await loadBlogManifest();

    if (!manifest || !manifest.posts) {
        addTerminalLine(output, '<span class="terminal-error">ERROR: Could not load blog manifest</span>');
        return;
    }

    addTerminalLine(output, '<span class="terminal-success">SYSTEM LOGS - DIRECTORY</span>');
    addTerminalLine(output, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    addTerminalLine(output, '');

    manifest.posts.forEach(post => {
        const statusColor = post.status === 'RESOLVED' ? 'terminal-success' :
            post.status === 'OPERATIONAL' ? 'terminal-info' :
                'terminal-command';

        addTerminalLine(output, `<span class="${statusColor}">[${post.status}]</span> LOG_${post.id} - ${post.title}`);
        addTerminalLine(output, `<span class="terminal-info">          Date: ${post.date} | Tags: ${post.tags.join(', ')}</span>`);
        addTerminalLine(output, `<span class="terminal-muted">          ${post.preview}</span>`);
        addTerminalLine(output, '');
    });

    addTerminalLine(output, '<span class="terminal-info">Use \'read log [id]\' to view full content (e.g., \'read log 001\')</span>');
}

async function handleReadLog(logId, output) {
    addTerminalLine(output, `<span class="terminal-info">Loading LOG_${logId}...</span>`);

    const manifest = await loadBlogManifest();

    if (!manifest || !manifest.posts) {
        addTerminalLine(output, '<span class="terminal-error">ERROR: Could not load blog manifest</span>');
        return;
    }

    const post = manifest.posts.find(p => p.id === logId);

    if (!post) {
        addTerminalLine(output, `<span class="terminal-error">ERROR: Blog post ${logId} not found</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available logs: 001, 002, 003, 004, 005</span>');
        return;
    }

    try {
        const response = await fetch(`./blogs/${post.filename}`);
        if (!response.ok) throw new Error('Blog file not found');

        const markdown = await response.text();

        // Simple markdown to HTML conversion for terminal display
        const html = convertMarkdownForTerminal(markdown);

        addTerminalLine(output, '<div class="blog-content">');
        addTerminalLine(output, html);
        addTerminalLine(output, '</div>');

        addTerminalLine(output, '');
        addTerminalLine(output, '<span class="terminal-success">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>');
        addTerminalLine(output, '<span class="terminal-info">Use \'cat logs/\' to view all logs</span>');

    } catch (error) {
        console.error('Error loading blog:', error);
        addTerminalLine(output, `<span class="terminal-error">ERROR: Could not load blog file</span>`);
    }
}

function convertMarkdownForTerminal(markdown) {
    // Remove front matter
    markdown = markdown.replace(/^---[\s\S]*?---/, '');

    // Convert headers
    markdown = markdown.replace(/^# (.*$)/gm, '<span class="terminal-success" style="font-size: 1.1em; font-weight: bold;">$1</span>');
    markdown = markdown.replace(/^## (.*$)/gm, '<span class="terminal-command" style="font-weight: bold;">$1</span>');
    markdown = markdown.replace(/^### (.*$)/gm, '<span class="terminal-info">$1</span>');

    // Convert code blocks
    markdown = markdown.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="terminal-code"><code>${escapeHtml(code)}</code></pre>`;
    });

    // Convert inline code
    markdown = markdown.replace(/`([^`]+)`/g, '<span class="terminal-code-inline">$1</span>');

    // Convert bold
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert lists
    markdown = markdown.replace(/^[\-\*] (.*$)/gm, '<span class="terminal-info">  • $1</span>');

    // Convert line breaks
    markdown = markdown.replace(/\n\n/g, '<br><br>');
    markdown = markdown.replace(/\n/g, '<br>');

    return markdown;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* ===================================
   Grep Search Function
   =================================== */

function handleGrep(keyword, output) {
    if (!keyword) {
        addTerminalLine(output, '<span class="terminal-error">ERROR: Please specify a keyword</span>');
        addTerminalLine(output, '<span class="terminal-info">Usage: grep [keyword]</span>');
        return;
    }

    addTerminalLine(output, `<span class="terminal-info">Searching for "${keyword}"...</span>`);
    addTerminalLine(output, '<span class="terminal-success">SEARCH RESULTS</span>');
    addTerminalLine(output, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    let foundCount = 0;

    // Search in project descriptions
    const projects = [
        {
            name: 'Resilient Crawler',
            keywords: ['scraping', 'checkpoint', 'extraction', 'selenium', 'mobile api', 'data', 'python', '228000', 'resilient'],
            description: 'High-uptime data engineering with systematic checkpointing'
        },
        {
            name: 'Vision Sentinel',
            keywords: ['opencv', 'computer vision', 'qa', 'ssim', 'automation', 'images', '50000', 'heatmap'],
            description: 'Automated Visual QA with structural similarity detection'
        },
        {
            name: 'Archetype Cloner',
            keywords: ['gemini', 'cli', 'clustering', 'dom', 'archetype', 'template', 'reuse', 'ai'],
            description: 'AI-powered code reuse through DOM pattern recognition'
        },
        {
            name: 'Lead Integrity Engine',
            keywords: ['validation', 'regex', 'linkedin', 'email', 'data quality', 'sheets', 'crm'],
            description: 'Multi-point data validation with 99.9% accuracy'
        }
    ];

    projects.forEach(project => {
        if (project.keywords.some(kw => kw.toLowerCase().includes(keyword.toLowerCase())) ||
            project.name.toLowerCase().includes(keyword.toLowerCase()) ||
            project.description.toLowerCase().includes(keyword.toLowerCase())) {
            addTerminalLine(output, `<span class="terminal-success">▶</span> <strong>${project.name}</strong>`);
            addTerminalLine(output, `  <span class="terminal-info">${project.description}</span>`);
            addTerminalLine(output, '');
            foundCount++;
        }
    });

    // Search in blog posts if manifest is loaded
    if (terminalState.blogCache) {
        terminalState.blogCache.posts.forEach(post => {
            if (post.title.toLowerCase().includes(keyword.toLowerCase()) ||
                post.preview.toLowerCase().includes(keyword.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))) {
                addTerminalLine(output, `<span class="terminal-command">▶</span> <strong>LOG_${post.id}: ${post.title}</strong>`);
                addTerminalLine(output, `  <span class="terminal-info">${post.preview}</span>`);
                addTerminalLine(output, '');
                foundCount++;
            }
        });
    }

    if (foundCount === 0) {
        addTerminalLine(output, '<span class="terminal-info">No results found</span>');
    } else {
        addTerminalLine(output, `<span class="terminal-success">Found ${foundCount} result(s)</span>`);
    }
}

/* ===================================
   Showcase Function
   =================================== */

function handleShowcase(project, output) {
    const showcases = {
        'crawler': {
            name: 'Resilient Crawler',
            output: `
<span class="terminal-success">═══════════════════════════════════════════</span>
<span class="terminal-success">    RESILIENT CRAWLER - DEEP DIVE</span>
<span class="terminal-success">═══════════════════════════════════════════</span>

<span class="terminal-command">MISSION:</span>
Extract 228,000+ product variants from 60+ websites
Runtime: 25+ hours continuous operation

<span class="terminal-command">CORE INNOVATIONS:</span>

<span class="terminal-info">1. SYSTEMATIC CHECKPOINTING</span>
   Problem: Any crash = all work lost
   Solution: Save progress every 100 records
   Result: Zero data loss, resume in <5 seconds

<span class="terminal-info">2. DOWNLOAD-FIRST ARCHITECTURE</span>
   Phase 1: Download all HTML (fast)
   Phase 2: Parse locally (safe)
   Result: 50% reduction in server interaction

<span class="terminal-info">3. MOBILE API SIMULATION</span>
   When desktop blocked → switch to mobile API
   Bypasses: CloudFlare, CAPTCHAs, bot detection
   Result: 100% success rate vs 0% on desktop

<span class="terminal-command">METRICS:</span>
  • 228,000+ variants extracted
  • 25.3 hours total runtime
  • 0 data loss incidents
  • 3 network failures recovered

<span class="terminal-command">TECH STACK:</span>
  Python | Selenium | BeautifulSoup | Requests
  Mobile API reverse engineering | Checkpoint design

<span class="terminal-info">Type 'demo crawler' to see code examples</span>
<span class="terminal-info">Type 'read log 001' for full writeup</span>
`
        },
        'sentinel': {
            name: 'Vision Sentinel',
            output: `
<span class="terminal-success">═══════════════════════════════════════════</span>
<span class="terminal-success">    VISION SENTINEL - DEEP DIVE</span>
<span class="terminal-success">═══════════════════════════════════════════</span>

<span class="terminal-command">MISSION:</span>
Automated QA for 50,000+ AI-generated images
Eliminate human fatigue in visual comparison

<span class="terminal-command">THE PROBLEM:</span>
  Hour 1: 98% accuracy ✓
  Hour 3: 80% accuracy ⚠️
  Hour 5: 65% accuracy ❌

<span class="terminal-command">THE SOLUTION: SSIM (Structural Similarity)</span>

<span class="terminal-info">Mathematical Comparison:</span>
  • Luminance analysis
  • Contrast detection
  • Structure matching
  • Pixel variance mapping

<span class="terminal-info">Heatmap Generation:</span>
  • Visual difference overlay
  • Color-coded intensity
  • Automatic flagging

<span class="terminal-command">RESULTS:</span>
  Before: 416 hours manual review
  After: 1.2 hours automated
  Savings: 99.7%
  
  Before: 35% error rate (fatigue)
  After: 0.3% error rate
  Improvement: 99.1%

<span class="terminal-command">TECH STACK:</span>
  Python | OpenCV | Scikit-Image | NumPy
  SSIM Algorithm | Heatmap Visualization

<span class="terminal-info">Type 'demo sentinel' to see code examples</span>
<span class="terminal-info">Type 'read log 002' for full writeup</span>
`
        },
        'cloner': {
            name: 'Archetype Cloner',
            output: `
<span class="terminal-success">═══════════════════════════════════════════</span>
<span class="terminal-success">    ARCHETYPE CLONER - DEEP DIVE</span>
<span class="terminal-success">═══════════════════════════════════════════</span>

<span class="terminal-command">MISSION:</span>
Analyze 60+ websites and identify code reuse patterns
Reduce development time from weeks to hours

<span class="terminal-command">THE INNOVATION:</span>

<span class="terminal-info">Step 1: DOM Extraction</span>
  • Extract HTML structure
  • Identify semantic patterns
  • Map navigation hierarchies

<span class="terminal-info">Step 2: Gemini CLI Analysis</span>
  • Feed DOM patterns to AI
  • Cluster similar structures
  • Identify "archetypes"

<span class="terminal-info">Step 3: Template Reuse</span>
  • Build 5 base templates
  • Adapt for specific sites
  • 85% code reuse achieved

<span class="terminal-command">RESULTS:</span>
  60 websites analyzed
  5 archetypes identified
  Development time: 30 min/site (vs 2 days)
  
  Project timeline:
  Before: 1 month
  After: 3 days
  Acceleration: 10x

<span class="terminal-command">TECH STACK:</span>
  Python | Selenium | Gemini CLI
  KMeans Clustering | Pattern Recognition

<span class="terminal-info">Type 'demo cloner' to see code examples</span>
`
        }
    };

    if (!showcases[project]) {
        addTerminalLine(output, `<span class="terminal-error">ERROR: Unknown project "${project}"</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available: crawler | sentinel | cloner</span>');
        return;
    }

    addTerminalLine(output, showcases[project].output);
}

/* ===================================
   Demo Function (Code Examples)
   =================================== */

function handleDemo(project, output) {
    const demos = {
        'crawler': {
            name: 'Resilient Crawler - Checkpointing',
            code: `<span class="terminal-command"># Systematic Checkpointing Implementation</span>

<span class="terminal-success">class</span> <span class="terminal-info">CheckpointedCrawler</span>:
    <span class="terminal-keyword">def</span> __init__(self, checkpoint_file=<span class="terminal-string">'checkpoint.json'</span>):
        self.checkpoint_file = checkpoint_file
        self.checkpoint_interval = <span class="terminal-number">100</span>
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">save_checkpoint</span>(self, index):
        <span class="terminal-comment"># Atomic write with temp file</span>
        temp_file = <span class="terminal-string">f"{self.checkpoint_file}.tmp"</span>
        <span class="terminal-keyword">with</span> open(temp_file, <span class="terminal-string">'w'</span>) <span class="terminal-keyword">as</span> f:
            json.dump({<span class="terminal-string">'last_index'</span>: index}, f)
        os.replace(temp_file, self.checkpoint_file)
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">scrape_with_resilience</span>(self, urls):
        checkpoint = self.load_checkpoint()
        start = checkpoint[<span class="terminal-string">'last_index'</span>]
        
        <span class="terminal-keyword">for</span> i, url <span class="terminal-keyword">in</span> enumerate(urls[start:], start):
            <span class="terminal-keyword">try</span>:
                data = self.scrape_product(url)
                self.append_to_csv(data)
                
                <span class="terminal-comment"># Checkpoint every N records</span>
                <span class="terminal-keyword">if</span> (i + <span class="terminal-number">1</span>) % self.checkpoint_interval == <span class="terminal-number">0</span>:
                    self.save_checkpoint(i + <span class="terminal-number">1</span>)
            
            <span class="terminal-keyword">except</span> Exception <span class="terminal-keyword">as</span> e:
                self.save_checkpoint(i)
                <span class="terminal-keyword">continue</span>

<span class="terminal-info">Result: Zero data loss, automatic recovery</span>`
        },
        'sentinel': {
            name: 'Vision Sentinel - SSIM Comparison',
            code: `<span class="terminal-command"># SSIM-based Image Comparison</span>

<span class="terminal-keyword">from</span> skimage.metrics <span class="terminal-keyword">import</span> structural_similarity
<span class="terminal-keyword">import</span> cv2

<span class="terminal-success">class</span> <span class="terminal-info">VisionQA</span>:
    <span class="terminal-keyword">def</span> <span class="terminal-info">compare_images</span>(self, img1_path, img2_path):
        <span class="terminal-comment"># Load and preprocess</span>
        img1 = cv2.imread(img1_path)
        img2 = cv2.imread(img2_path)
        
        gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
        gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
        
        <span class="terminal-comment"># Compute SSIM</span>
        score, diff = structural_similarity(
            gray1, gray2, full=<span class="terminal-keyword">True</span>
        )
        
        <span class="terminal-comment"># Generate heatmap</span>
        diff = (diff * <span class="terminal-number">255</span>).astype(<span class="terminal-string">"uint8"</span>)
        heatmap = cv2.applyColorMap(diff, cv2.COLORMAP_JET)
        
        <span class="terminal-keyword">return</span> {
            <span class="terminal-string">'score'</span>: score,
            <span class="terminal-string">'category'</span>: self.categorize(score),
            <span class="terminal-string">'heatmap'</span>: heatmap
        }
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">categorize</span>(self, score):
        <span class="terminal-keyword">if</span> score >= <span class="terminal-number">0.95</span>: <span class="terminal-keyword">return</span> <span class="terminal-string">"PERFECT"</span>
        <span class="terminal-keyword">elif</span> score >= <span class="terminal-number">0.85</span>: <span class="terminal-keyword">return</span> <span class="terminal-string">"ACCEPTABLE"</span>
        <span class="terminal-keyword">else</span>: <span class="terminal-keyword">return</span> <span class="terminal-string">"FLAGGED"</span>

<span class="terminal-info">Result: 99.7% accuracy, no human fatigue</span>`
        },
        'cloner': {
            name: 'Archetype Cloner - Pattern Recognition',
            code: `<span class="terminal-command"># DOM Pattern Clustering</span>

<span class="terminal-keyword">from</span> sklearn.cluster <span class="terminal-keyword">import</span> KMeans

<span class="terminal-success">class</span> <span class="terminal-info">ArchetypeEngine</span>:
    <span class="terminal-keyword">def</span> <span class="terminal-info">extract_dom_features</span>(self, url):
        driver = webdriver.Chrome()
        driver.get(url)
        soup = BeautifulSoup(driver.page_source)
        
        features = {
            <span class="terminal-string">'nav_count'</span>: len(soup.find_all(<span class="terminal-string">'nav'</span>)),
            <span class="terminal-string">'form_count'</span>: len(soup.find_all(<span class="terminal-string">'form'</span>)),
            <span class="terminal-string">'link_density'</span>: len(soup.find_all(<span class="terminal-string">'a'</span>)) / len(str(soup))
        }
        <span class="terminal-keyword">return</span> features
    
    <span class="terminal-keyword">def</span> <span class="terminal-info">cluster_websites</span>(self, urls):
        <span class="terminal-comment"># Extract features from all sites</span>
        features = [self.extract_dom_features(url) <span class="terminal-keyword">for</span> url <span class="terminal-keyword">in</span> urls]
        
        <span class="terminal-comment"># Cluster into archetypes</span>
        kmeans = KMeans(n_clusters=<span class="terminal-number">5</span>)
        labels = kmeans.fit_predict(features)
        
        <span class="terminal-comment"># Group sites by archetype</span>
        archetypes = {}
        <span class="terminal-keyword">for</span> url, label <span class="terminal-keyword">in</span> zip(urls, labels):
            <span class="terminal-keyword">if</span> label <span class="terminal-keyword">not in</span> archetypes:
                archetypes[label] = []
            archetypes[label].append(url)
        
        <span class="terminal-keyword">return</span> archetypes

<span class="terminal-info">Result: 5 archetypes, 85% code reuse</span>`
        }
    };

    if (!demos[project]) {
        addTerminalLine(output, `<span class="terminal-error">ERROR: No demo available for "${project}"</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available: crawler | sentinel | cloner</span>');
        return;
    }

    addTerminalLine(output, `<span class="terminal-success">CODE DEMO: ${demos[project].name}</span>`);
    addTerminalLine(output, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    addTerminalLine(output, '');
    addTerminalLine(output, `<pre class="code-demo">${demos[project].code}</pre>`);
    addTerminalLine(output, '');
    addTerminalLine(output, '<span class="terminal-info">Type \'showcase ' + project + '\' for full project breakdown</span>');
}
