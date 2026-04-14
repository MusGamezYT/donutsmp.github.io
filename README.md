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

### Troubleshooting Deployment

If you encounter an error regarding a missing "lock file" (like `package-lock.json`) in GitHub Actions:
- I have updated the workflow to disable automatic caching, which allows the build to succeed without a lockfile.
- **Recommended**: For faster builds, run `npm install` in your local environment, which will generate a `package-lock.json`. Commit this file to your repository. You can then re-enable caching in `.github/workflows/deploy.yml` by adding `cache: 'npm'` back to the `setup-node` step.
