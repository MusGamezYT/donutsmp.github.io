# Donut SMP Bookshelf Profit Calculator

A minimalistic, monochrome profit calculator for the Donut SMP economy.

## Hosting on GitHub Pages

This project is configured to be hosted on GitHub Pages.

### Automatic Deployment (Recommended)

1. Push this code to a GitHub repository.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The included workflow in `.github/workflows/deploy.yml` will automatically build and deploy your site whenever you push to the `main` branch.

### Manual Deployment

1. Run `npm install`.
2. Run `npm run build`.
3. Upload the contents of the `dist/` folder to your hosting provider or the `gh-pages` branch.

## Configuration

The project uses relative paths (`base: './'` in `vite.config.ts`), which ensures it works correctly even if hosted at a sub-path like `https://<username>.github.io/<repo-name>/`.
