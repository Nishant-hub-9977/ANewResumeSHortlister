# Resume Shortlister AI

A modern web application for analyzing and shortlisting resumes using AI.

## Features

- Resume upload and analysis
- AI-powered candidate matching
- Detailed resume insights
- Candidate comparison
- Integration with Bolt IoT and Google Analytics

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm 9 or later
- A Supabase account
- A Bolt IoT account (optional)
- A Google Analytics account (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your environment variables:
   ```bash
   cp .env.example .env
   ```

### Environment Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_BOLT_API_KEY`: Your Bolt IoT API key (optional)
- `VITE_BOLT_DEVICE_ID`: Your Bolt IoT device ID (optional)
- `VITE_GOOGLE_ANALYTICS_VIEW_ID`: Your Google Analytics view ID (optional)

### Development

Start the development server:

```bash
npm run dev
```

### Testing

Run Cypress tests:

```bash
npm run test
```

### Building for Production

```bash
npm run build
```

### Deployment

The application is configured for deployment on Netlify. Simply push to your repository and Netlify will handle the rest.

## Troubleshooting

### Common Issues

1. **Environment Variables Missing**
   - Ensure all required environment variables are set in your `.env` file
   - For production, set these in your Netlify environment variables

2. **Integration Issues**
   - Verify your API keys and credentials in the Settings page
   - Check the browser console for any error messages
   - Ensure your Bolt device is online and accessible

3. **Build Failures**
   - Clear your build cache: `rm -rf dist`
   - Ensure all dependencies are installed: `npm install`
   - Check your Node.js version matches the required version

## License

MIT