# Sourav Mallick — Portfolio

Portfolio site for **Sourav Mallick**, Front End Web Developer (BSc, North Western University, 2024). Built with **HTML5**, **CSS3**, **Bootstrap 5**, and **Vanilla JavaScript (ES6+)** — no frameworks.

## Project structure

```
CurSur/
├── index.html            # Home: hero, about, skills, projects, experience, social, contact
├── about.html            # About: profile card, counters, timeline, lazy images
├── skills.html           # Skills: filterable categories, progress bars, hover details
├── projects.html         # Projects: filter, sort, modal for details
├── experience.html       # Experience: vertical timeline, expand/collapse
├── contact.html          # Contact: form, validation, animated inputs, success/error
├── css/
│   └── style.css         # Global + page-specific styles (glassmorphism, theme, animations)
├── js/
│   └── main.js           # Theme, nav, scroll effects, form validation, page-specific logic
├── assets/
│   └── images/           # Local images (optional; placeholders use CDN)
└── README.md
```

## Features

- **Multi-page**: Home, About, Skills, Projects, Experience, Contact. Shared navbar and footer; active page link highlighting.
- **UI/UX**: Glassmorphism, gradients, hover effects, smooth transitions, fully responsive (mobile, tablet, desktop).
- **Theming**: Light/dark mode and accent colors (violet, blue, emerald, orange, rose); preferences saved in `localStorage`.
- **About**: Profile card with hover effects, animated counters on scroll, vertical timeline, lazy-loaded images.
- **Skills**: Animated progress bars, filterable categories (All, Markup, Script, Framework, Tools), hover tooltips.
- **Projects**: Filter by tech (All, React, JavaScript, HTML), sort by name, modal popup for project details.
- **Experience**: Vertical animated timeline, expand/collapse sections, scroll reveal.
- **Contact**: Advanced form with real-time validation, animated floating labels, success/error messages (frontend only).

## Run locally

Open `index.html` in a browser, or run a local server (recommended for correct routing):

```bash
# Python
python -m http.server 8000

# Node
npx serve
```

Visit `http://localhost:8000` (or the URL shown in the terminal).

## Tech stack

- **HTML5**
- **CSS3** (custom properties, Flexbox, Grid, animations, responsive)
- **Bootstrap 5**
- **Vanilla JavaScript (ES6+)**

## License

Personal portfolio. Replace placeholder content and links with your own.
