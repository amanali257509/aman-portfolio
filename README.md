# Aman Ali — Personal Portfolio & Engineering Showcase

> **AI Automation & Full Stack Engineer | E-commerce Technology Lead**  
> *"I build e-commerce systems and AI automations that help brands grow faster."*  
> Karachi, Pakistan • Available for remote full-time roles, contracts & freelance worldwide.

---

## ⚡ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Visual Motif**: n8n-style workflow nodes, SVG animated flow lines, glassmorphism, responsive bento grid
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: Polished Dark (#0B1224 navy base + #F5B74D gold accent) & Light theme toggle
- **SEO & Metadata**: JSON-LD Person schema, dynamic OpenGraph image (1200x630), sitemap.xml, robots.txt
- **Accessibility**: Keyboard navigable, Command Palette (`Ctrl/Cmd+K`), ARIA landmarks, `prefers-reduced-motion` support

---

## 🚀 Quick Setup & Local Development

### Prerequisites
- Node.js 18+ (tested on Node 22 / 24)
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/amanali257509/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📝 How to Edit Content & Add Real Projects

All configurable content lives in a single source of truth:
📂 `src/data/content.ts`

### 1. Adding Real Projects
In `src/data/content.ts`, navigate to the `projects` array:
```ts
{
  id: 'my-real-project',
  title: 'Autonomous Multi-Store Inventory Sync',
  category: 'AI Automation',
  problem: 'Detailed explanation of client bottleneck...',
  whatBuilt: 'Constructed an event-driven n8n pipeline...',
  tech: ['n8n', 'Shopify Liquid', 'OpenAI API', 'MySQL'],
  result: 'Reduced stockouts by 40% with zero overselling.',
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/amanali257509/...',
  isWorkflow: true,
  workflowSteps: [
    { id: '1', label: 'Order Webhook', type: 'trigger', badge: 'Shopify' },
    { id: '2', label: 'OpenAI Classifier', type: 'ai', badge: 'GPT-4o' },
  ],
  isPlaceholder: false, // Set to false to show on the live site!
}
```
> **Automatic Placeholder Hiding**: Any project with `isPlaceholder: true` or containing `[ADD PROJECT]` is **strictly hidden** from the live site so recruiters and clients never see dummy text.

### 2. Adding Real Testimonials
In `src/data/content.ts`, add client reviews to the `testimonials` array and set `isPlaceholder: false`. The Testimonials section automatically appears on the live site as soon as at least one verified testimonial is added.

### 3. Updating Profile Photo & CV
- **CV**: Replace `public/Aman_Ali_CV.pdf` with your updated resume PDF.
- **Profile Photo**: Place `photo.jpg` in `public/` and reference it in the Hero component. If not provided, an initials avatar ("AA") with a status pulse is displayed.

---

## 📬 Contact Form Configuration

The contact form is wired to the Next.js API Route handler at `/api/contact`:
- Includes a honeypot spam field (`_gotcha`) to deflect automated bots.
- Server-side email and string validation.
- Optionally integrates with [Resend](https://resend.com):
  ```env
  RESEND_API_KEY=re_your_api_key_here
  CONTACT_RECEIVER_EMAIL=amanali257509@gmail.com
  ```
- If `RESEND_API_KEY` is omitted, the form gracefully logs submissions to the console and returns a success response.

---

## 🚢 Deploying to Vercel

### Automatic Deployment via GitHub
1. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```
2. Import the repository into your [Vercel Dashboard](https://vercel.com/new).
3. Set your environment variables (`RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`).
4. Vercel will automatically build and deploy every push to `main`.

### Deployment via Vercel CLI
```bash
# Link project
npx vercel link

# Deploy to production
npx vercel --prod
```

---

## 🔒 Strict Quality & Honesty Standard

- **No Invented Claims**: No fake testimonials, fake client names, fictitious metrics, or fabricated logos.
- **Privacy First**: Phone number is never published on the public web.
- **Clean Code**: Zero lint warnings, strict TypeScript types, Lighthouse 95+ targeted.
