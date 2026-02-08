/* ===================================
   AutoArchitect.me - Interactive System v2.0
   =================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initMermaid();
    initScrollReveal();
    initSkillBars();
    initTypewriterEffect();
    initSmoothScroll();
    initNavbarScroll();
    initActivityLog();
    initExecutionsCounter();
    initTerminal();
    initPipelineTabs();
    initCodeModal();
    initManualOverride();
});

/* ===================================
   Mermaid.js Initialization
   =================================== */
function initMermaid() {
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            themeVariables: {
                primaryColor: '#1a1a25',
                primaryTextColor: '#f0f0f5',
                primaryBorderColor: '#00FF41',
                lineColor: '#00D1FF',
                secondaryColor: '#12121a',
                tertiaryColor: '#0a0a0f',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '14px'
            },
            flowchart: {
                curve: 'basis',
                padding: 20
            }
        });
    }
}

/* ===================================
   Scroll Reveal Animation
   =================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.project-card, .stack-category, .code-window, .pipeline-container');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                if (entry.target.classList.contains('project-card')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 150;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ===================================
   Skill Bars Animation
   =================================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.getPropertyValue('--fill');
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        const targetWidth = bar.style.getPropertyValue('--fill');
        bar.style.setProperty('--fill', targetWidth);
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

/* ===================================
   Typewriter Effect
   =================================== */
function initTypewriterEffect() {
    const prompt = document.querySelector('.hero-prompt');
    if (!prompt) return;

    const text = prompt.textContent.replace('_', '');
    prompt.innerHTML = '<span class="typed-text"></span><span class="cursor">_</span>';

    const typedText = prompt.querySelector('.typed-text');
    let charIndex = 0;

    function typeChar() {
        if (charIndex < text.length) {
            typedText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 50 + Math.random() * 50);
        }
    }

    setTimeout(typeChar, 500);
}

/* ===================================
   Smooth Scrolling
   =================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   Navbar Scroll Effect
   =================================== */
function initNavbarScroll() {
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
}

/* ===================================
   Activity Log (NEW)
   =================================== */
const activityMessages = [
    { level: 'info', message: 'Scanning LinkedIn profile...', highlight: 'VALID' },
    { level: 'success', message: 'Lead validation complete:', highlight: '99.9% accuracy' },
    { level: 'info', message: 'Gemini CLI clustering archetypes...', highlight: '' },
    { level: 'info', message: 'Image comparison complete:', highlight: '94% match' },
    { level: 'warn', message: 'Regex detected malformed email:', highlight: 'FLAGGED' },
    { level: 'info', message: 'DOM structure extracted from website #', highlight: '47' },
    { level: 'success', message: 'Archetype identified:', highlight: 'Type-B Commerce' },
    { level: 'info', message: 'Running SSIM comparison...', highlight: '' },
    { level: 'success', message: 'Heatmap overlay generated:', highlight: 'COMPLETE' },
    { level: 'info', message: 'Scraping batch job:', highlight: '58/60 sites' },
    { level: 'success', message: 'Pipeline execution:', highlight: 'OPTIMAL' },
    { level: 'info', message: 'Async API lookup for country code...', highlight: '' },
    { level: 'warn', message: 'Dead LinkedIn link detected:', highlight: 'QUEUED' },
    { level: 'success', message: 'Data sanitization:', highlight: '2,847 records clean' },
    { level: 'info', message: 'OpenCV loading image pair...', highlight: '' }
];

let logIndex = 0;

function initActivityLog() {
    const logContainer = document.getElementById('activity-log');
    if (!logContainer) return;

    function addLogEntry() {
        const msg = activityMessages[logIndex % activityMessages.length];
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

        const entry = document.createElement('div');
        entry.className = 'log-entry';

        const levelClass = msg.level === 'success' ? 'level-success' :
            msg.level === 'warn' ? 'level-warn' : 'level-info';

        entry.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="${levelClass}">[${msg.level.toUpperCase()}]</span>
            <span class="message">${msg.message}</span>
            ${msg.highlight ? `<span class="highlight">${msg.highlight}</span>` : ''}
        `;

        logContainer.appendChild(entry);

        // Keep only last 8 entries
        while (logContainer.children.length > 8) {
            logContainer.removeChild(logContainer.firstChild);
        }

        // Scroll to bottom
        logContainer.scrollTop = logContainer.scrollHeight;

        logIndex++;
    }

    // Add initial entries
    for (let i = 0; i < 5; i++) {
        setTimeout(() => addLogEntry(), i * 200);
    }

    // Continue adding entries
    setInterval(addLogEntry, 3000);
}

/* ===================================
   Executions Counter (NEW)
   =================================== */
function initExecutionsCounter() {
    const counter = document.getElementById('executions-counter');
    if (!counter) return;

    const targetValue = 54200;
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * targetValue);

        counter.textContent = currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    // Start animation when visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            requestAnimationFrame(updateCounter);
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(counter);
}

/* ===================================
   Interactive Terminal (NEW)
   =================================== */
const terminalCommands = {
    help: `
<span class="terminal-success">Available Commands:</span>
  <span class="terminal-command">help</span>          - Show this help message
  <span class="terminal-command">list-projects</span> - Display all projects with animation
  <span class="terminal-command">whoami</span>        - Display developer bio
  <span class="terminal-command">contact</span>       - Show contact information
  <span class="terminal-command">run [project]</span> - Navigate to project pipeline
                  (archetype | lead | visionqa)
  <span class="terminal-command">clear</span>         - Clear terminal
  <span class="terminal-command">status</span>        - Show system status
`,
    whoami: `
<span class="terminal-success">IDENTITY: Automation Architect</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I build <span class="terminal-success">invisible engines</span> that solve visible problems.

<span class="terminal-command">Specializations:</span>
  → Scalable web scraping & data extraction
  → B2B data sanitization & validation
  → Computer Vision QA automation
  → LLM-powered workflow design

<span class="terminal-command">Philosophy:</span>
  "If you're doing it manually more than twice,
   it's time to automate."
`,
    contact: `
<span class="terminal-success">CONTACT INFORMATION</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📧 Email:    <span class="terminal-command">contact@autoarchitect.me</span>
  🔗 LinkedIn: <span class="terminal-command">linkedin.com/in/autoarchitect</span>
  💻 GitHub:   <span class="terminal-command">github.com/autoarchitect</span>

<span class="terminal-info">Type 'run discovery_script.sh' for a guided tour.</span>
`,
    status: `
<span class="terminal-success">SYSTEM STATUS</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  System:     <span class="terminal-success">OPERATIONAL</span>
  Uptime:     <span class="terminal-success">99.9%</span>
  Executions: <span class="terminal-success">54,200+</span>
  Health:     <span class="terminal-success">OPTIMAL</span>

  All subsystems nominal.
`
};

function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            processCommand(command, output);
            input.value = '';
        }
    });
}

function processCommand(cmd, output) {
    // Add command to output
    addTerminalLine(output, `<span class="terminal-prompt">guest@autoarchitect:~$</span> <span class="terminal-command">${cmd}</span>`);

    // Handle commands
    if (cmd === '') {
        return;
    } else if (cmd === 'clear') {
        output.innerHTML = `
            <div class="terminal-line">
                <span class="terminal-welcome">Welcome to AutoArchitect CLI v2.0</span>
            </div>
            <div class="terminal-line">
                <span class="terminal-info">Type 'help' to see available commands.</span>
            </div>
        `;
        return;
    } else if (cmd === 'list-projects') {
        addTerminalLine(output, '<span class="terminal-info">Revealing projects...</span>');
        revealProjects();
        setTimeout(() => {
            addTerminalLine(output, '<span class="terminal-success">✓ 3 projects revealed</span>');
        }, 2000);
    } else if (cmd.startsWith('run ')) {
        const project = cmd.replace('run ', '').trim();
        handleRunCommand(project, output);
    } else if (terminalCommands[cmd]) {
        addTerminalLine(output, `<span class="terminal-output">${terminalCommands[cmd]}</span>`);
    } else {
        addTerminalLine(output, `<span class="terminal-error">Command not found: ${cmd}</span>`);
        addTerminalLine(output, '<span class="terminal-info">Type \'help\' for available commands.</span>');
    }

    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
}

function addTerminalLine(output, content) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = content;
    output.appendChild(line);
}

function handleRunCommand(project, output) {
    const projectMap = {
        'archetype': { id: 'pipeline-archetype', tab: 'archetype', name: 'Archetype Engine' },
        'archetype-engine': { id: 'pipeline-archetype', tab: 'archetype', name: 'Archetype Engine' },
        'lead': { id: 'pipeline-lead', tab: 'lead', name: 'Lead Integrity Engine' },
        'lead-integrity': { id: 'pipeline-lead', tab: 'lead', name: 'Lead Integrity Engine' },
        'visionqa': { id: 'pipeline-visionqa', tab: 'visionqa', name: 'VisionQA' },
        'discovery_script.sh': { discovery: true }
    };

    const target = projectMap[project];

    if (target && target.discovery) {
        addTerminalLine(output, '<span class="terminal-success">Running discovery_script.sh...</span>');
        triggerManualOverride();
    } else if (target) {
        addTerminalLine(output, `<span class="terminal-success">Navigating to ${target.name} pipeline...</span>`);

        // Switch to correct tab
        document.querySelectorAll('.pipeline-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.pipeline === target.tab) {
                tab.classList.add('active');
            }
        });

        // Show correct pipeline
        document.querySelectorAll('.pipeline-flow').forEach(flow => {
            flow.classList.remove('active');
        });
        document.getElementById(target.id)?.classList.add('active');

        // Scroll to pipeline
        setTimeout(() => {
            document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    } else {
        addTerminalLine(output, `<span class="terminal-error">Unknown project: ${project}</span>`);
        addTerminalLine(output, '<span class="terminal-info">Available: archetype | lead | visionqa</span>');
    }
}

function revealProjects() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.classList.add('hidden');
        setTimeout(() => {
            card.classList.remove('hidden');
            card.classList.add('reveal-animation');
        }, index * 500);
    });

    // Scroll to projects
    setTimeout(() => {
        document.getElementById('blueprints')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
}

/* ===================================
   Pipeline Tabs (NEW)
   =================================== */
function initPipelineTabs() {
    const tabs = document.querySelectorAll('.pipeline-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const pipeline = tab.dataset.pipeline;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding pipeline
            document.querySelectorAll('.pipeline-flow').forEach(flow => {
                flow.classList.remove('active');
            });
            document.getElementById(`pipeline-${pipeline}`)?.classList.add('active');

            // Reinitialize mermaid for the new tab
            if (typeof mermaid !== 'undefined') {
                mermaid.contentLoaded();
            }
        });
    });
}

/* ===================================
   Code Modal (NEW)
   =================================== */
const codeSnippets = {
    'dom-extractor': {
        title: 'dom_extractor.py',
        code: `<span class="comment"># DOM Structure Extraction for Web Clustering</span>
<span class="keyword">from</span> selenium <span class="keyword">import</span> webdriver
<span class="keyword">from</span> bs4 <span class="keyword">import</span> BeautifulSoup
<span class="keyword">import</span> json

<span class="keyword">def</span> <span class="function">extract_dom_structure</span>(url):
    <span class="string">"""Extract semantic DOM structure for analysis."""</span>
    driver = webdriver.Chrome()
    driver.get(url)
    
    soup = BeautifulSoup(driver.page_source, <span class="string">'html.parser'</span>)
    
    <span class="variable">structure</span> = {
        <span class="string">'headers'</span>: [h.name <span class="keyword">for</span> h <span class="keyword">in</span> soup.find_all([<span class="string">'h1'</span>,<span class="string">'h2'</span>,<span class="string">'h3'</span>])],
        <span class="string">'nav_patterns'</span>: len(soup.find_all(<span class="string">'nav'</span>)),
        <span class="string">'form_count'</span>: len(soup.find_all(<span class="string">'form'</span>)),
        <span class="string">'link_density'</span>: len(soup.find_all(<span class="string">'a'</span>)) / len(str(soup))
    }
    
    driver.quit()
    <span class="keyword">return</span> structure`
    },
    'gemini-cluster': {
        title: 'gemini_clustering.py',
        code: `<span class="comment"># Gemini CLI for Archetype Identification</span>
<span class="keyword">import</span> subprocess
<span class="keyword">import</span> json

<span class="keyword">def</span> <span class="function">cluster_with_gemini</span>(dom_data):
    <span class="string">"""Use Gemini CLI to identify site archetypes."""</span>
    
    prompt = <span class="string">f"""
    Analyze these DOM structures and identify common patterns.
    Group similar sites into archetypes based on:
    - Navigation structure
    - Content layout
    - Form patterns
    
    Data: {json.dumps(dom_data)}
    """</span>
    
    <span class="variable">result</span> = subprocess.run(
        [<span class="string">'gemini'</span>, <span class="string">'--prompt'</span>, prompt],
        capture_output=True,
        text=True
    )
    
    <span class="keyword">return</span> json.loads(result.stdout)`
    },
    'pattern-logic': {
        title: 'pattern_recognition.py',
        code: `<span class="comment"># Template Reuse based on Archetype Matching</span>
<span class="keyword">from</span> sklearn.cluster <span class="keyword">import</span> KMeans
<span class="keyword">import</span> numpy <span class="keyword">as</span> np

<span class="keyword">class</span> <span class="function">ArchetypeEngine</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(self, n_archetypes=5):
        self.kmeans = KMeans(n_clusters=n_archetypes)
        self.templates = {}
    
    <span class="keyword">def</span> <span class="function">fit_archetypes</span>(self, features):
        <span class="string">"""Identify archetypes from DOM features."""</span>
        self.kmeans.fit(features)
        <span class="keyword">return</span> self.kmeans.labels_
    
    <span class="keyword">def</span> <span class="function">get_template</span>(self, site_features):
        <span class="string">"""Get reusable template for site archetype."""</span>
        archetype = self.kmeans.predict([site_features])[0]
        <span class="keyword">return</span> self.templates.get(archetype, <span class="string">'generic'</span>)`
    },
    'regex-validator': {
        title: 'regex_validator.py',
        code: `<span class="comment"># Multi-Point Data Validation with Regex</span>
<span class="keyword">import</span> re

<span class="keyword">class</span> <span class="function">LeadValidator</span>:
    <span class="variable">EMAIL_PATTERN</span> = re.compile(
        <span class="string">r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'</span>
    )
    
    <span class="variable">LINKEDIN_PATTERN</span> = re.compile(
        <span class="string">r'^https?://(www\\.)?linkedin\\.com/in/[\\w-]+/?$'</span>
    )
    
    <span class="keyword">def</span> <span class="function">validate_email</span>(self, email):
        <span class="keyword">return</span> bool(self.EMAIL_PATTERN.match(email))
    
    <span class="keyword">def</span> <span class="function">validate_linkedin</span>(self, url):
        <span class="keyword">if not</span> self.LINKEDIN_PATTERN.match(url):
            <span class="keyword">return</span> {<span class="string">'valid'</span>: False, <span class="string">'error'</span>: <span class="string">'Invalid format'</span>}
        <span class="comment"># Async check for dead links</span>
        <span class="keyword">return</span> self._check_profile_exists(url)`
    },
    'linkedin-api': {
        title: 'linkedin_checker.py',
        code: `<span class="comment"># Async LinkedIn Profile Verification</span>
<span class="keyword">import</span> aiohttp
<span class="keyword">import</span> asyncio

<span class="keyword">async def</span> <span class="function">verify_linkedin_profile</span>(url):
    <span class="string">"""Check if LinkedIn URL points to valid profile."""</span>
    
    <span class="keyword">async with</span> aiohttp.ClientSession() <span class="keyword">as</span> session:
        <span class="keyword">try</span>:
            <span class="keyword">async with</span> session.head(url, allow_redirects=True) <span class="keyword">as</span> resp:
                <span class="comment"># Check for redirect to 404 or login</span>
                <span class="keyword">if</span> <span class="string">'/404'</span> <span class="keyword">in</span> str(resp.url):
                    <span class="keyword">return</span> {<span class="string">'status'</span>: <span class="string">'DEAD_LINK'</span>}
                <span class="keyword">if</span> resp.status == 200:
                    <span class="keyword">return</span> {<span class="string">'status'</span>: <span class="string">'VALID'</span>}
        <span class="keyword">except</span>:
            <span class="keyword">return</span> {<span class="string">'status'</span>: <span class="string">'ERROR'</span>}`
    },
    'heatmap-error': {
        title: 'error_heatmap.py',
        code: `<span class="comment"># Visual Error Highlighting System</span>
<span class="keyword">class</span> <span class="function">ErrorHeatmap</span>:
    <span class="keyword">def</span> <span class="function">generate_report</span>(self, validation_results):
        <span class="string">"""Generate heatmap highlighting errors."""</span>
        
        <span class="variable">errors</span> = []
        <span class="keyword">for</span> field, result <span class="keyword">in</span> validation_results.items():
            <span class="keyword">if not</span> result[<span class="string">'valid'</span>]:
                errors.append({
                    <span class="string">'field'</span>: field,
                    <span class="string">'severity'</span>: self._calculate_severity(result),
                    <span class="string">'suggestion'</span>: result.get(<span class="string">'fix'</span>, <span class="string">'Manual review'</span>)
                })
        
        <span class="keyword">return</span> self._render_heatmap(errors)`
    },
    'opencv-load': {
        title: 'image_loader.py',
        code: `<span class="comment"># OpenCV Image Loading for QA Comparison</span>
<span class="keyword">import</span> cv2
<span class="keyword">import</span> numpy <span class="keyword">as</span> np

<span class="keyword">def</span> <span class="function">load_image_pair</span>(path_a, path_b):
    <span class="string">"""Load and preprocess image pair for comparison."""</span>
    
    img_a = cv2.imread(path_a)
    img_b = cv2.imread(path_b)
    
    <span class="comment"># Convert to grayscale for SSIM</span>
    gray_a = cv2.cvtColor(img_a, cv2.COLOR_BGR2GRAY)
    gray_b = cv2.cvtColor(img_b, cv2.COLOR_BGR2GRAY)
    
    <span class="comment"># Ensure same dimensions</span>
    <span class="keyword">if</span> gray_a.shape != gray_b.shape:
        gray_b = cv2.resize(gray_b, gray_a.shape[::-1])
    
    <span class="keyword">return</span> gray_a, gray_b, img_a, img_b`
    },
    'ssim-compare': {
        title: 'ssim_comparison.py',
        code: `<span class="comment"># Structural Similarity Index Comparison</span>
<span class="keyword">from</span> skimage.metrics <span class="keyword">import</span> structural_similarity
<span class="keyword">import</span> cv2

<span class="keyword">def</span> <span class="function">compare_images</span>(img_a, img_b):
    <span class="string">"""Calculate SSIM and generate difference map."""</span>
    
    <span class="variable">score</span>, <span class="variable">diff</span> = structural_similarity(
        img_a, img_b, full=True
    )
    
    <span class="comment"># Convert difference to uint8</span>
    diff = (diff * 255).astype(<span class="string">"uint8"</span>)
    
    <span class="comment"># Threshold for significant differences</span>
    thresh = cv2.threshold(
        diff, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU
    )[1]
    
    <span class="keyword">return</span> {
        <span class="string">'score'</span>: round(score * 100, 2),
        <span class="string">'diff_map'</span>: diff,
        <span class="string">'threshold'</span>: thresh
    }`
    },
    'heatmap-gen': {
        title: 'heatmap_overlay.py',
        code: `<span class="comment"># Heatmap Overlay Generation for Visual QA</span>
<span class="keyword">import</span> cv2
<span class="keyword">import</span> numpy <span class="keyword">as</span> np

<span class="keyword">def</span> <span class="function">generate_heatmap_overlay</span>(original, diff_map):
    <span class="string">"""Create visual heatmap showing intensity of differences."""</span>
    
    <span class="comment"># Apply colormap to difference intensity</span>
    heatmap = cv2.applyColorMap(diff_map, cv2.COLORMAP_JET)
    
    <span class="comment"># Blend with original image</span>
    <span class="variable">overlay</span> = cv2.addWeighted(
        original, 0.6,
        heatmap, 0.4,
        0
    )
    
    <span class="comment"># Add intensity legend</span>
    overlay = add_legend(overlay)
    
    <span class="keyword">return</span> overlay

<span class="keyword">def</span> <span class="function">add_legend</span>(img):
    <span class="string">"""Add color legend to heatmap."""</span>
    cv2.putText(img, <span class="string">'Low'</span>, (10, 30), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
    cv2.putText(img, <span class="string">'High'</span>, (10, 50), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1)
    <span class="keyword">return</span> img`
    }
};

function initCodeModal() {
    const modal = document.getElementById('code-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCode = document.getElementById('modal-code');
    const closeBtn = document.getElementById('modal-close');
    const overlay = modal?.querySelector('.modal-overlay');

    // Node card clicks
    document.querySelectorAll('.node-card').forEach(card => {
        card.addEventListener('click', () => {
            const nodeId = card.dataset.node;
            const snippet = codeSnippets[nodeId];

            if (snippet && modal) {
                modalTitle.textContent = snippet.title;
                modalCode.innerHTML = snippet.code;
                modal.classList.add('active');
            }
        });
    });

    // Close modal
    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modal?.classList.remove('active');
    }
}

/* ===================================
   Manual Override (NEW)
   =================================== */
function initManualOverride() {
    const btn = document.getElementById('manual-override');
    btn?.addEventListener('click', triggerManualOverride);
}

function triggerManualOverride() {
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');

    // Simulate typing
    const command = 'run discovery_script.sh';
    input.value = '';

    let charIndex = 0;
    function typeCommand() {
        if (charIndex < command.length) {
            input.value += command[charIndex];
            charIndex++;
            setTimeout(typeCommand, 50);
        } else {
            // Execute after typing
            setTimeout(() => {
                addTerminalLine(output, `<span class="terminal-prompt">guest@autoarchitect:~$</span> <span class="terminal-command">${command}</span>`);
                addTerminalLine(output, '<span class="terminal-success">MANUAL OVERRIDE ACTIVATED</span>');
                addTerminalLine(output, '<span class="terminal-info">Initiating discovery sequence...</span>');
                input.value = '';

                // Start discovery sequence
                startDiscoverySequence();
            }, 500);
        }
    }

    typeCommand();
}

function startDiscoverySequence() {
    const output = document.getElementById('terminal-output');
    const sections = [
        { id: 'blueprints', name: 'Featured Blueprints', delay: 1000 },
        { id: 'project-archetype', name: 'Archetype Engine', delay: 3000 },
        { id: 'project-lead', name: 'Lead Integrity Engine', delay: 5000 },
        { id: 'project-visionqa', name: 'VisionQA', delay: 7000 },
        { id: 'pipeline', name: 'Living Pipelines', delay: 9000 },
        { id: 'manifest', name: 'Tech Stack', delay: 11000 },
        { id: 'contact', name: 'Contact', delay: 13000 }
    ];

    sections.forEach((section) => {
        setTimeout(() => {
            addTerminalLine(output, `<span class="terminal-info">→ Highlighting: ${section.name}</span>`);
            output.scrollTop = output.scrollHeight;

            const element = document.getElementById(section.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Add highlight effect to cards
                if (element.classList.contains('project-card')) {
                    element.classList.add('highlight');
                    setTimeout(() => element.classList.remove('highlight'), 1500);
                }
            }
        }, section.delay);
    });

    // End sequence
    setTimeout(() => {
        addTerminalLine(output, '<span class="terminal-success">✓ Discovery sequence complete!</span>');
        output.scrollTop = output.scrollHeight;
    }, 15000);
}

/* ===================================
   Project Card Hover Effects
   =================================== */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

/* ===================================
   Console Easter Egg
   =================================== */
console.log('%c< AutoArchitect.me />', 'color: #00FF41; font-size: 20px; font-weight: bold;');
console.log('%cSYSTEM: OPERATIONAL', 'color: #00D1FF; font-size: 12px;');
console.log('%cThe invisible engines are running.', 'color: #a0a0b0; font-size: 12px;');
