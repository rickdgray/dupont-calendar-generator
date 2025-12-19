# DuPont Schedule Generator

A modern, printable calendar generator designed for the modified DuPont rotating shift schedule. Built with React, TypeScript, and Tailwind CSS, this tool creates clean, Excel-like calendars that can be printed or saved as PDFs.

## About the Modified DuPont Schedule

The DuPont schedule is a rotating shift pattern that provides continuous 24/7 coverage. This tool generates calendars for a **modified DuPont schedule** that includes five distinct phases over a 35-day cycle:

### Schedule Pattern (28 Days)
1. **4 Night Shifts** (Days 1-4)
2. **3 Days Off** (Days 5-7)
3. **3 Day Shifts** (Days 8-10)
4. **1 Day Off** (Day 11)
5. **3 Night Shifts** (Days 12-14)
6. **3 Days Off** (Days 15-17)
7. **4 Day Shifts** (Days 18-21)
8. **Off Week** (Days 22-28)
9. **Relief Week** (Days 29-35) - Standard 9-5 shifts, Monday-Friday

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

### Shift Indicators
- **N** - Night shift
- **D** - Day shift
- **R** - Relief week (9-5)
- *No label* - Off day

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)

## Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation above

---

**Made with ❤️ for shift workers everywhere**