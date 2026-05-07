# EcoLens
![npm](https://img.shields.io/npm/v/ecolens)
![license](https://img.shields.io/npm/l/ecolens)
![Cloudinary](https://img.shields.io/badge/Built%20with-Cloudinary-blue)

EcoLens is a lightweight, production-ready Command Line Interface (CLI) designed to optimize image delivery in web applications. It scans your repository for image references and automatically rewrites them into optimized Cloudinary fetch URLs, reducing bandwidth consumption and improving page load performance.

## Features

- Recursive scanning of HTML, JSX, TSX, JS, and TS files.
- Automated URL transformation using Cloudinary fetch API.
- Intelligent exclusion of SVG, Base64, Blob URLs, and existing Cloudinary links.
- Configurable base URL for resolving relative image paths.
- Generation of optimization reports including bandwidth and CO2 reduction metrics.
- Built with TypeScript for reliability and performance.

## Installation

You can run EcoLens directly using npx:

```bash
npx ecolens [command]
```

Or install it globally:

```bash
npm install -g ecolens
```

## Commands

### install

Initializes EcoLens in your project.

```bash
npx ecolens install
```

This command creates:
- .env.example: Template for your Cloudinary configuration.
- ecolens.config.json: Default optimization settings.
- ecolens-report.md: Initial setup and integration guide.

### optimize

Scans the repository and rewrites image URLs.

```bash
npx ecolens optimize
```

This command:
1. Scans project files for image sources.
2. Applies Cloudinary fetch transformations.
3. Calculates estimated savings and environmental impact.
4. Updates ecolens-report.md with detailed results.

## Configuration

### Environment Variables

EcoLens requires your Cloudinary Cloud Name to be set in a .env file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### ecolens.config.json

The configuration file allows you to define how images are handled:

```json
{
  "baseUrl": "https://yourdomain.com",
  "quality": "auto",
  "format": "auto",
  "responsive": true
}
```

- **baseUrl**: The domain used to resolve relative image paths (e.g., /hero.png).
- **quality**: Cloudinary quality setting (default: auto).
- **format**: Cloudinary format setting (default: auto).

## Performance Impact

EcoLens applies the following transformations by default:
- f_auto: Automatic format selection (WebP, AVIF, etc.).
- q_auto: Intelligent quality compression.
- w_auto: Automatic width detection.
- dpr_auto: Device Pixel Ratio optimization.

By shifting image optimization to the edge via Cloudinary, you can significantly reduce the payload of your web application without manual asset management.

## License

MIT
