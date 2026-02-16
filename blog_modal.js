
/* ===================================
   Blog Modal Functionality
   =================================== */

function initBlogModal() {
    const modal = document.getElementById('blog-modal');
    const modalBody = document.getElementById('blog-modal-body');
    const modalTitle = document.getElementById('blog-modal-title');
    const closeBtn = document.getElementById('blog-modal-close');
    const overlay = modal?.querySelector('.blog-modal-overlay');

    // Add click listeners to all log cards
    const logCards = document.querySelectorAll('.clickable-log');
    logCards.forEach(card => {
        card.addEventListener('click', async () => {
            const logId = card.dataset.logId;
            await openBlogModal(logId);
        });
    });

    // Close modal on close button
    closeBtn?.addEventListener('click', closeBlogModal);

    // Close modal on overlay click
    overlay?.addEventListener('click', closeBlogModal);

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeBlogModal();
        }
    });
}

async function openBlogModal(logId) {
    const modal = document.getElementById('blog-modal');
    const modalBody = document.getElementById('blog-modal-body');
    const modalTitle = document.getElementById('blog-modal-title');

    if (!modal || !modalBody || !modalTitle) return;

    // Show modal with loading state
    modal.classList.add('active');
    modalBody.innerHTML = `
        <div class="blog-loading">
            <span class="loading-spinner"></span>
            <span>Loading blog post...</span>
        </div>
    `;

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    try {
        // Load manifest to get filename
        const manifestResponse = await fetch('blogs/manifest.json');
        const manifest = await manifestResponse.json();
        const post = manifest.posts.find(p => p.id === logId);

        if (!post) {
            throw new Error('Blog post not found');
        }

        // Update modal title
        modalTitle.textContent = post.filename;

        // Load blog content
        const blogUrl = `blogs/${post.filename}`;
        const blogResponse = await fetch(blogUrl);
        if (!blogResponse.ok) {
            console.error(`Failed to load blog at: ${blogUrl}, Status: ${blogResponse.status}`);
            const errorText = await blogResponse.text();
            console.error('Error response:', errorText);
            throw new Error(`Failed to load blog (Status: ${blogResponse.status})`);
        }

        const markdown = await blogResponse.text();

        // Convert markdown to HTML
        const html = convertMarkdownToHTML(markdown);

        // Display content with fade-in animation
        modalBody.innerHTML = html;
        modalBody.style.opacity = '0';
        setTimeout(() => {
            modalBody.style.opacity = '1';
            modalBody.style.transition = 'opacity 0.3s ease';
        }, 50);

    } catch (error) {
        console.error('Error loading blog:', error);
        modalBody.innerHTML = `
            <div class="blog-loading">
                <span style="color: var(--danger-red); font-size: 2rem;">⚠</span>
                <span style="color: var(--danger-red);">Error loading blog post</span>
                <span style="color: var(--text-muted); font-size: 0.85rem;">${error.message}</span>
            </div>
        `;
    }
}

function closeBlogModal() {
    const modal = document.getElementById('blog-modal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function convertMarkdownToHTML(markdown) {
    // Remove front matter
    markdown = markdown.replace(/^---[\s\S]*?---/, '');

    // Convert headers
    markdown = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    markdown = markdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    markdown = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    markdown = markdown.replace(/^#### (.*$)/gm, '<h4>$1</h4>');

    // Convert code blocks (with language support)
    markdown = markdown.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const langLabel = lang ? `<span class="code-lang">${lang}</span>` : '';
        return `<pre>${langLabel}<code>${escapeHtml(code.trim())}</code></pre>`;
    });

    // Convert inline code
    markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert bold
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert italic
    markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert links
    markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Convert unordered lists
    markdown = markdown.replace(/^\* (.*$)/gm, '<li>$1</li>');
    markdown = markdown.replace(/^- (.*$)/gm, '<li>$1</li>');
    markdown = markdown.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Convert ordered lists
    markdown = markdown.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');

    // Convert blockquotes
    markdown = markdown.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

    // Convert horizontal rules
    markdown = markdown.replace(/^---$/gm, '<hr>');

    // Convert paragraphs (double newline = new paragraph)
    const lines = markdown.split('\n');
    let inList = false;
    let inCode = false;
    let result = [];
    let paragraph = '';

    for (let line of lines) {
        const trimmed = line.trim();

        // Check if we're in a special block
        if (trimmed.startsWith('<pre>')) inCode = true;
        if (trimmed.endsWith('</pre>')) {
            inCode = false;
            result.push(line);
            continue;
        }
        if (inCode) {
            result.push(line);
            continue;
        }

        if (trimmed.startsWith('<ul>') || trimmed.startsWith('<ol>')) inList = true;
        if (trimmed.startsWith('</ul>') || trimmed.startsWith('</ol>')) {
            inList = false;
            result.push(line);
            continue;
        }

        // Handle different line types
        if (trimmed === '') {
            if (paragraph) {
                result.push(`<p>${paragraph}</p>`);
                paragraph = '';
            }
        } else if (trimmed.startsWith('<h') || trimmed.startsWith('<pre>') ||
            trimmed.startsWith('<ul>') || trimmed.startsWith('<ol>') ||
            trimmed.startsWith('<blockquote>') || trimmed.startsWith('<hr>') ||
            inList) {
            if (paragraph) {
                result.push(`<p>${paragraph}</p>`);
                paragraph = '';
            }
            result.push(line);
        } else {
            if (paragraph) paragraph += ' ';
            paragraph += trimmed;
        }
    }

    if (paragraph) {
        result.push(`<p>${paragraph}</p>`);
    }

    return result.join('\n');
}

// Initialize blog modal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogModal);
} else {
    initBlogModal();
}
