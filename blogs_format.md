# Automation Writing Formats (Markdown Snippet)

---

## 1. The "System Log" Format (Best for Progress Updates)

Instead of a traditional blog post, frame it as a **Log Entry**.

**Filename:** `LOG_2024_05_12_clustering_logic.md`  
**The Vibe:** Feels like a protected file inside a server.

### Markdown Structure

```markdown
---
layout: post
title: "LOG_ENTRY: [042] - Scaling Scraping with Gemini CLI"
date: 2024-05-12
category: automation-logs
---

## STATUS: SUCCESSFUL_DEPLOYMENT
**TIMESTAMP:** 14:02:44 UTC  
**OPERATOR:** Adnan

### 01. OBJECTIVE
Automate the categorization of 60 unique DOM structures to minimize custom script writing.

### 02. EXECUTION
I piped the raw HTML through the Gemini CLI. The goal was to identify *Structural Archetypes*.

> *Logic:* If Site A and Site B share 80% of their div-class naming conventions, reuse `Module_Alpha`.

### 03. TERMINAL_OUTPUT
```bash
$ gemini-analyze --input sites_dump/ --mode clustering
> Archetypes identified: 5
> Script reuse potential: 85%

---

## 2. The "Man Page" Format (Best for Deep Dives)

In Linux, `man` stands for **Manual**. Use this format when explaining *how* you built something (e.g., VisionQA).

- **Title:** `MAN VISION_QA(1)`
- **The Vibe:** Classic, old-school hacker documentation.

### Markdown Structure

```markdown
# MAN(1) - VisionQA Manual

## NAME
VisionQA — An automated computer vision system for heatmap difference detection.

## SYNOPSIS
`compare_images --input image1.png --target image2.png --method SSIM`

## DESCRIPTION
VisionQA was architected to solve the human fatigue problem in data annotation.
By utilizing **OpenCV**, the system calculates pixel-variance and outputs a high-contrast heatmap.

## OPTIONS
- **--heatmap-intensity**: Adjust the glow of the error regions.
- **--strict**: Flags differences even at the 1-pixel level.

## AUTHOR
Written by AutoArchitect.
3. The "Post-Mortem" Format (Best for Solving Problems)
When something breaks and you fix it with automation, write a Post-Mortem. Recruiters love these.

Title: INCIDENT_REPORT: The LinkedIn Link-Rot Problem

Structure
Incident: Why the data was getting dirty

Diagnosis: Finding the error patterns

Resolution: The script you wrote to automate the fix

Terminal Visual Tips
ASCII Art Header
Use an online generator to create an ASCII title for a terminal-themed site.

 _____ _      _____  _____ 
|  __ \ |    |  _  |/ ____|
| |__) | |    | | | | |  __ 
|  ___/| |    | | | | | |_ |
| |    | |____\ \_/ / |__| |
|_|    |______|\___/ \_____|
Syntax Highlighting
Since this is automation-focused, aim for ~50% code.
Use fenced blocks with language hints:

# example
process(dom_tree)
Reading Progress Bar
Replace the standard bar with a terminal-style loader:

[|||||||||||----------] 54%