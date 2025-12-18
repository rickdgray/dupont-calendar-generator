# DuPont Schedule Generator

A modern, printable calendar generator designed for the modified DuPont rotating shift schedule. Built with React, TypeScript, and Tailwind CSS, this tool creates clean, Excel-like calendars that can be printed or saved as PDFs.

## About the Modified DuPont Schedule

The DuPont schedule is a rotating shift pattern that provides continuous 24/7 coverage. This tool generates calendars for a **modified DuPont schedule** that includes five distinct phases over a 28-day cycle:

### Schedule Pattern (28 Days)
1. **4 Night Shifts** (Days 1-4)
2. **3 Days Off** (Days 5-7)
3. **3 Day Shifts** (Days 8-10)
4. **1 Day Off** (Day 11)
5. **3 Night Shifts** (Days 12-14)
6. **3 Days Off** (Days 15-17)
7. **4 Day Shifts** (Days 18-21)
8. **Relief Week** (Days 22-26) - Standard 9-5 shifts, Monday-Friday
9. **Off Week** (Days 27-28) - Weekend off

This modified schedule is commonly used in industries requiring 24/7 coverage, such as:
- Manufacturing facilities
- Chemical plants
- Healthcare facilities
- Emergency services
- Power generation

The addition of the "relief week" provides workers with a predictable standard workweek rotation, improving work-life balance while maintaining continuous operations.

## Features

- 📅 **Year-at-a-glance calendar** - All 12 months displayed in landscape format
- 🔄 **Automatic shift calculation** - Select which day of the cycle January 1st falls on
- 🎨 **Dark mode support** - System preference detection with manual override
- 🖨️ **Print-optimized** - Clean, Excel-like layout perfect for printing or PDF export
- 📱 **Responsive design** - Works on desktop and mobile devices
- 🌐 **Client-side only** - No backend required, perfect for GitHub Pages hosting
- ⚡ **Fast and modern** - Built with Vite, React, and TypeScript

### Shift Indicators
- **N** - Night shift
- **D** - Day shift
- **R** - Relief week (9-5)
- *No label* - Off day

## Demo

[Live Demo](#) *(Add your GitHub Pages URL here after deployment)*

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dupont-schedule-generator.git
   cd dupont-schedule-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Usage

1. **Select the year** you want to generate a calendar for
2. **Choose which day of the DuPont cycle** January 1st falls on (Day 1-28)
3. **Click "Generate"** to create the calendar
4. **Click "Print/Save PDF"** to print or save the calendar
5. **Toggle dark mode** using the theme button in the top right

### Deployment to GitHub Pages

1. **Update `vite.config.ts`** with your repository name:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/', // Replace with your repo name
   })
   ```

2. **Deploy**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages
   - Set source to `gh-pages` branch
   - Your site will be live at `https://yourusername.github.io/your-repo-name/`

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **SWC** - Fast TypeScript/JavaScript compiler
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## Project Structure

```
dupont-schedule-generator/
├── src/
│   ├── components/
│   │   └── CalendarGenerator.tsx    # Main calendar component
│   ├── App.tsx                       # Root component
│   ├── App.css                       # Global styles
│   ├── main.tsx                      # Application entry point
│   └── index.css                     # Tailwind imports
├── public/                           # Static assets
├── index.html                        # HTML template
├── vite.config.ts                    # Vite configuration
├── tailwind.config.js                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

### Customization

#### Modify the DuPont Pattern
Edit the `dupontPattern` array in `src/components/CalendarGenerator.tsx`:

```typescript
const dupontPattern = [
  'N', 'N', 'N', 'N',  // 4 nights
  'O', 'O', 'O',       // 3 off
  'D', 'D', 'D',       // 3 days
  'O',                 // 1 off
  'N', 'N', 'N',       // 3 nights
  'O', 'O', 'O',       // 3 off
  'D', 'D', 'D', 'D',  // 4 days
  'R', 'R', 'R', 'R', 'R',  // Relief week
  'O', 'O'             // Off week
];
```

#### Change Colors
Modify Tailwind classes in the component or extend the theme in `tailwind.config.js`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Modified DuPont schedule pattern used in industrial settings
- Built with modern web technologies for optimal performance
- Icons provided by [Lucide](https://lucide.dev/)

## Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation above

---

**Made with ❤️ for shift workers everywhere**