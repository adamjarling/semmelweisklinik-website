# Semmelweisklinik Website

Official website for the **Semmelweisklinik** arts and culture center in Vienna, Austria.

🌐 **Live Site**: [semmelweisklinik.at](https://www.semmelweisklinik.at/)

---

## About Semmelweisklinik

The Semmelweisklinik is a decentralized arts and culture center located at the site of the former Ignaz Semmelweis Women's Clinic (House 4) in Vienna. Opened in June 2022, this self-managed creative space spans **3,800 m²** and operates as an interim use project until the end of 2026.

### Mission

The center serves as a **low-threshold space** for:
- Independent artistic production
- Inclusive exchange and cooperation
- Education and social engagement
- Experimental possibilities for a diverse, robust, and sustainable urban society

### The Space

- **40 studios** hosting ~110 artists and cultural operators
- **7 public event spaces** for performances, exhibitions, and gatherings
- **Meeting zones** for collaboration and community building
- **Rentable rooms** including performance spaces, seminar rooms, a large-scale kitchen, and specialized workshops

### Values

The Semmelweisklinik actively addresses socio-political issues through artistic and regenerative approaches:
- Gender equality
- Diversity-oriented openness
- Climate-friendly methods
- Participatory decision-making
- Local and international networking

---

## Technical Implementation

This website is built with **Astro**, a modern static site generator that delivers exceptional performance while providing the flexibility needed for a dynamic, multilingual arts organization website.

### Why Astro?

Astro enables this website to be:

- **Blazingly Fast**: Zero JavaScript by default means instant page loads
- **Content-Focused**: Built-in content collections make managing 30+ artist profiles and room listings effortless
- **Multilingual**: Native i18n routing supports English (primary) and German seamlessly
- **Developer-Friendly**: Component-based architecture makes updates and maintenance straightforward
- **SEO Optimized**: Static HTML generation ensures excellent search engine visibility
- **Image Optimized**: Automatic image optimization with Sharp provides responsive, optimized images

### Key Features

- **Bilingual Content**: Full German and English support with automatic routing
- **Dynamic Routes**: Individual pages auto-generated for each artist and room from markdown files
- **Content Collections**: Structured content management for artists, rooms, and program events
- **Responsive Design**: Mobile-first approach ensures accessibility on all devices
- **Event Calendar**: Integrated program and event management system
- **Newsletter Integration**: Built-in newsletter signup functionality

### Tech Stack

- **Framework**: [Astro](https://astro.build) v5.17
- **Image Processing**: Sharp v0.33
- **Testing**: Vitest + Happy DOM
- **Deployment**: GitHub Actions with rsync to production server
- **Node Version**: Node 20

---

## Project Structure

```text
/
├── public/
│   ├── svg/              # Partner logos and icons
│   └── ...               # Static assets
├── src/
│   ├── assets/
│   │   └── images/       # Optimized images
│   ├── components/       # Reusable Astro components
│   ├── content/
│   │   ├── artists/      # Artist profiles (markdown)
│   │   └── rooms/        # Room descriptions (markdown)
│   ├── i18n/
│   │   ├── ui.ts         # Translation strings
│   │   └── utils.ts      # i18n utilities
│   ├── layouts/          # Page layouts
│   ├── pages/
│   │   ├── de/           # German pages
│   │   ├── en/           # English pages
│   │   └── index.astro   # Homepage (redirects to /en)
│   └── styles/           # Global styles
├── astro.config.mjs      # Astro configuration
└── package.json
```

### Content Management

**Artists**: Add new artist profiles by creating markdown files in `src/content/artists/`

**Rooms**: Add new rentable spaces by creating markdown files in `src/content/rooms/`

**Programs**: Add events and programs in `src/pages/[de|en]/program/`

---

## Development

### Prerequisites

- Node.js 20 or higher
- pnpm (preferred package manager)

### Commands

All commands are run from the root of the project:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `pnpm install`      | Install dependencies                             |
| `pnpm dev`          | Start local dev server at `localhost:4321`       |
| `pnpm build`        | Build production site to `./dist/`               |
| `pnpm preview`      | Preview build locally before deploying           |
| `pnpm test`         | Run tests with Vitest                            |
| `pnpm astro ...`    | Run Astro CLI commands                           |

### Local Development

```sh
# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Open http://localhost:4321 in your browser
```

---

## Deployment

Every push to the `main` branch automatically triggers a GitHub Actions workflow that builds the site and deploys via rsync to the production server.

**Production URL**: https://www.semmelweisklinik.at/

### Build Configuration

- **Build Command**: `pnpm build`
- **Publish Directory**: `dist`
- **Node Version**: 20.x

---

## Contact

**Website**: [semmelweisklinik.at](https://www.semmelweisklinik.at/) Questions? adam.arling@semmelweisklinik.at

**General Inquiries**: info@semmelweisklinik.at

**Program/Venue Bookings**: programm@semmelweisklinik.at

**Location**: Hockegasse 37, Haus 4, 1180 Vienna, Austria

---

## Contributing

This is the official website for a physical arts organization. For content updates, corrections, or technical improvements, please contact the team directly.

---

## License

©2022-2026 Kunst- und Kulturzentrum Semmelweisklinik. All Rights Reserved.

**Web Design & Development**: Webzauber, Sören Herschel & Maryann Alexy
