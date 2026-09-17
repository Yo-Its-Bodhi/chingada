# Continue La Chingada at Work

The current website source is backed up in the private GitHub repository:

`https://github.com/Yo-Its-Bodhi/la-chingada-website`

## First time on the work laptop

1. Sign in to GitHub as `Yo-Its-Bodhi`.
2. Install Git and Node.js 22 or newer if they are not already installed.
3. Open PowerShell and run:

```powershell
git clone https://github.com/Yo-Its-Bodhi/la-chingada-website.git
cd la-chingada-website
npm.cmd ci
npm.cmd run dev:windows
```

Open `http://127.0.0.1:7332` in the browser.

## Each time after that

Before working:

```powershell
cd path\to\la-chingada-website
git pull
npm.cmd run dev:windows
```

After making and testing changes:

```powershell
git add -A
git commit -m "Describe the changes"
git push
```

Back on the home computer, run `git pull` before continuing.

The three local `scripts/check_*login*.py` / Bluehost-history helper files were intentionally not uploaded because they are machine-specific and may contain sensitive browser-history paths.
