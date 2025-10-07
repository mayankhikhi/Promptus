# PS Chosen SIH Hackathon

This README provides an overview of the project, including team details, relevant links, tasks completed, tech stack, key features, and steps to run the project locally.

## Team Details

**Team Name:** The Hashiras

**Team Leader:** Anurag Maurya [GITHUB](https://github.com/anurag-maurya-ece/)

**Team Members:**

# Promptus — PS Chosen SIH Hackathon

Promptus is a small static web project created as a prototype and presentation for the PS Chosen SIH Hackathon. It is a lightweight, dependency-free frontend built with plain HTML and CSS.

## Quick summary

- Type: Static website (HTML, CSS)
- Purpose: Prototype / presentation for the SIH Hackathon
- How to view: Open `index.html` in a browser or serve the folder with a simple HTTP server

## Files of interest

- `index.html` — Landing / main page
- `about.html` — About the project
- `register.html`, `signin.html`, `edit-profile.html` — Sample auth/profile pages
- `tracker.html` — Tracker / demo page
- `style.css` — Global styles
- `IMAGES/` — Team photos and mock images used in the prototype

## How to run locally

Open the site directly in a browser by double-clicking `index.html`, or from PowerShell run:

```powershell
Start-Process .\index.html
```

Or serve files with Python 3's simple HTTP server:

```powershell
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Tech stack

- HTML5
- CSS3

No build tools or external dependencies are required.

## Team — The Hashiras

Team members and roles (photos embedded from the `IMAGES/` folder). If an image does not display, check that the matching filename exists in `IMAGES/` (some filenames contain spaces). Use the file path exactly as shown below.

- Anurag Maurya — Team Lead, Visionary & Web Developer  
	![Anurag Maurya](IMAGES/anurag%20maurya.jpg)

- Mayank — Core Web Developer  
	![Mayank](IMAGES/mayank.jpg)

- Vaishnavi — UI/UX & Presentation Designer  
	![Vaishnavi](IMAGES/Vaishnavi%20.jpg)

- Sia — Presentation Specialist  
	![Sia](IMAGES/Sia.jpg)

- Smarth — Quality Assurance (QA) Analyst  
	![Smarth](IMAGES/smarath.jpg)

- Shaina — Lead Presenter  
	![Shaina](IMAGES/shaina2.jpg)

## Contribution

This repository contains the hackathon deliverable. To contribute UI improvements, accessibility fixes, or to wire up a backend, please open an issue or submit a pull request.

## Notes

- Some image filenames include spaces (for example `anurag maurya.jpg` and `Vaishnavi .jpg`). When embedding images in Markdown or HTML, spaces are URL-encoded as `%20`.
- The project is static — there is no build step.

---

If you'd like, I can:

1. Create a gallery page that lays out team photos and resizes them responsively.
2. Add small thumbnails in an `assets/` folder and update the README to use them.
3. Add GitHub links or contact details for each member.

Tell me which of the above you'd like next.
