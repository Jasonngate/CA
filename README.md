# CA Automation (React + Vite)

A lightweight CA automation site with a marketing Home page plus a Dashboard containing four tools:

- GST Reconciliation
- TDS Calculation
- Invoice Extraction
- Ledger Classification

Each tool lets you upload a file and shows a loading state while a simulated process runs. A splash screen appears on first load.

## Requirements
- Node.js 18+ recommended

## Quick start (Windows PowerShell)

```powershell
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

### Backend (GSTIN Match Checker)

```powershell
# (Optional) create and activate virtual environment
python -m venv .venv
.venv\Scripts\Activate.ps1

# Install backend dependencies
pip install -r backend\python\requirements.txt

# Run Flask API (default port 5000)
python backend\python\app.py
```

Set an environment variable for frontend if hosting elsewhere:

```powershell
$env:VITE_API_URL="http://localhost:5000"
npm run dev
```

GST feature now sends the uploaded .xlsx to `/api/gst/check` and auto-downloads the processed `_checked.xlsx` file.

If you encounter script execution policy issues on Windows, you may need:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Navigation & Routing
- Uses `react-router-dom` with a hash-based router (`HashRouter`) for simpler static hosting (no server rewrite rules needed). Refreshing on routes like `/#/dashboard` is safe.
- Home: `src/pages/Home.jsx`
- Product Tour: `src/pages/ProductTour.jsx`
- Features: `src/pages/Features.jsx`
- Dashboard: `src/pages/Dashboard.jsx`
- About: `src/pages/About.jsx`
- Contact: `src/pages/Contact.jsx`
- FAQ: `src/pages/FAQ.jsx`
- Privacy Policy: `src/pages/Privacy.jsx`
- Terms & Conditions: `src/pages/Terms.jsx`
- Footer component: `src/components/SiteFooter.jsx`

## Notes
- This project simulates processing (2–4s) for demo purposes. Replace the `simulate*` functions in `src/features/**` with real logic or API calls.
- Vite base path is set to `./` for static hosting compatibility.
- Minimal dependencies: React, React DOM, React Router DOM, Vite, ESLint, Prettier.
- Animated splash screen lives in `src/components/SplashScreen.jsx` with keyframes in `globals.css`.
 - Light/Dark theme toggle stored in `localStorage` (`ca-theme`) and applied via `data-theme` attribute; component: `src/components/ThemeToggle.jsx`.
 - Logo image removed per design simplification; textual brand used instead.
