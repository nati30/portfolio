# Natnahel Demissie Portfolio

A responsive, static portfolio website generated from the supplied CV.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static web server.

## Publish on GitHub Pages

1. Create a repository, for example `nati30.github.io` or `portfolio`.
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Select **Deploy from a branch**, choose your main branch and `/ (root)`.
5. Save. GitHub will publish the static site.

## Add your real project screenshots

Each project now supports **3 screenshots**, with previous/next controls and a fullscreen lightbox.

Replace:

- `assets/projects/project-01-1.svg`
- `assets/projects/project-01-2.svg`
- `assets/projects/project-01-3.svg`

and similarly for projects 02–04.

You can use PNG/JPG/WebP instead. Just update the image paths in `index.html`.

The theme switch supports Light/Dark mode and remembers the visitor's selection using `localStorage`.

The CV did not contain project names, project URLs, or screenshots, so the project section deliberately uses editable placeholders rather than inventing project history.

## Customize

Edit the project titles/descriptions/tags in `index.html`. No framework or build step is required.
