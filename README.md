# Nurudeen Segun Aribisala Portfolio

A single-page professional portfolio built from the CV. Plain HTML, CSS and JavaScript.
No build step, no dependencies, no external network requests.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All content and page structure |
| `styles.css` | Design system, layout, light/dark themes, print styles |
| `script.js` | Theme toggle, mobile menu, scroll progress, section filters, reveal animations |
| `assets/Nurudeen-Segun-Aribisala-CV.pdf` | The downloadable CV linked from the page |

## Viewing it

Double-click `index.html` and it opens in any browser and works offline.

To serve it locally instead:

```bash
python -m http.server 8123
```

Then visit `http://localhost:8123`.

## Publishing it

The site is fully static, so any of these work with zero configuration:

- **Netlify Drop**: drag this folder onto https://app.netlify.com/drop
- **GitHub Pages**: push the folder to a repo, then enable Pages on the `main` branch
- **Vercel**: `vercel deploy` from this folder

## Sections

1. **Hero**: name, positioning line, CV download, contact
2. **About**: profile narrative and skill areas
3. **Experience**: 10 roles on a filterable timeline (Publishing & Culture / Academic Administration / Teaching)
4. **Publications**: 5 entries, including forthcoming work and the *Lunaris Review* link
5. **Conferences & Academic Engagements**: 4 entries
6. **Credentials**: education, honours, professional memberships, languages
7. **Contact**: email, phone, location, full CV download

## Editing content

Everything is in `index.html` as ordinary markup, with no templates or data files.

- **Add a role**: copy an existing `<li class="tl" data-track="...">` block in the timeline.
  `data-track` must be `professional`, `admin`, or `teaching` for filtering to work.
- **Add a publication**: copy an `<li class="pub">` block.
- **Change colours**: edit the CSS custom properties in the `:root` and
  `[data-theme="dark"]` blocks at the top of `styles.css`.

## Notes

- The theme follows the visitor's system preference on first visit and remembers
  their choice afterwards.
- Only the city ("Ikorodu, Lagos, Nigeria") is shown on the page. The full street
  address remains in the downloadable PDF.
- Animations are disabled automatically for visitors who set
  "reduce motion" in their OS.
- The site copy contains no em dashes or en dashes by design. If you edit the
  content, keep to commas, colons and hyphens.

## Credits

Designed and developed by **LEKS TECH SOLUTION**.

Iliass Olamilekan Aribisala · iliassolamilekan@gmail.com
