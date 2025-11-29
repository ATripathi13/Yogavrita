# YOGAVRITA Quick Start

## 🚀 Get Running in 3 Steps

### 1. Install Dependencies
```bash
cd yogavrita
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: `http://localhost:5173`

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 🌐 Deploy

### Netlify (Easiest)
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

---

## 🎯 Quick Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📝 Customize Class Sequences

Edit `src/data/classSequences.ts` to update yoga sequences with your own asanas and durations.

---

## 📚 Documentation

- **User Guide**: See `USER_GUIDE.md`
- **Developer Guide**: See `DEVELOPER_GUIDE.md`
- **Deployment**: See `DEPLOYMENT.md`
- **README**: See `README.md`

---

## 🆘 Troubleshooting

### Build fails?
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Port already in use?
```bash
npm run dev -- --port 3000
```

### TypeScript errors?
```bash
npx tsc --noEmit
```

---

## ✨ Features

- ✅ Daily yoga class sequences (Mon-Sat)
- ✅ Visual breathing indicators
- ✅ Streak tracking
- ✅ User profiles
- ✅ Session management (pause/resume/skip)
- ✅ Responsive design
- ✅ Offline support
- ✅ No backend required

---

## 🎨 Tech Stack

- React 19 + TypeScript
- Vite 7
- CSS (no preprocessor)
- LocalStorage API

---

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

---

**Ready to practice? Start the dev server and create your profile!** 🧘‍♀️
