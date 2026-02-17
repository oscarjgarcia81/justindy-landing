# Quick Start Guide

## 🚀 Start the Development Server

```bash
# Navigate to the project directory
cd /Users/oscargarcia/.openclaw/workspace/landing-page

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The server will start and output something like:
```
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
```

**Open your browser to:** `http://localhost:3000`

## 📝 Project Structure

```
landing-page/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   └── components/
│       ├── Header.tsx          # Navigation
│       ├── Footer.tsx          # Footer
│       └── sections/
│           ├── Hero.tsx        # Hero section
│           ├── Features.tsx     # Features (4 cards)
│           ├── HowItWorks.tsx   # 3-step process
│           └── Stats.tsx        # Metrics
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 What You Get

✅ **Fully responsive landing page** (mobile, tablet, desktop)
✅ **5 complete sections** with real structure
✅ **Tailwind CSS** for styling
✅ **lucide-react icons** built in
✅ **TypeScript** configured
✅ **Next.js App Router** (modern architecture)
✅ **Production-ready build** (`npm run build`)

## 💡 Customize It

### Change Colors
Edit `tailwind.config.ts` for custom color palette

### Modify Content
- Hero text → `src/components/sections/Hero.tsx`
- Features → `src/components/sections/Features.tsx`
- Steps → `src/components/sections/HowItWorks.tsx`
- Stats → `src/components/sections/Stats.tsx`

### Add Sections
1. Create new file: `src/components/sections/NewSection.tsx`
2. Import & add to `src/app/page.tsx`

## 📦 Available Commands

```bash
npm run dev      # Start dev server (with hot reload)
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Run linter
```

## ✨ Design Features

- **Minimalist aesthetic** - Clean, professional look
- **Generous whitespace** - Breathing room between sections
- **Max-width containers** - 1200px for readability
- **Mobile-first responsive** - Works on all screen sizes
- **Dark footer** - Professional contrast
- **Light theme** - Modern, clean appearance

## 🔧 Built With

- **Next.js 14+** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS 3** - Utility-first styling
- **TypeScript** - Type safety
- **lucide-react** - Icon library

## 📱 Responsive Breakpoints

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px

Example: `className="text-2xl sm:text-3xl lg:text-4xl"` scales text across devices

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm run dev`
3. 🔨 Customize colors in `tailwind.config.ts`
4. 📝 Update copy in component files
5. 🎨 Modify sections as needed
6. 🚀 Deploy to Vercel or your preferred host

## 🆘 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

**Need to clear build cache?**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**Check Node version:**
```bash
node --version  # Should be 16+ (18+ recommended)
```

---

**Happy building! 🎉**
