# Code Buddy

A modern IDE-like platform that helps developers write, optimize, and share code more efficiently.

## Features

- **Light & Dark Mode**: Full theming support with accessibility compliance
- **Code Editor**: Interactive code editing with syntax highlighting
- **Code Analysis**: AI-powered optimization suggestions
- **Dashboard**: Track your coding activity and improvements
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: CSS Custom Properties (variables), Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd code-buddy
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. The application will be available at `http://localhost:3000`

### Build for Production

```
npm run build
npm run start
```

## Theming System

Code Buddy implements a robust theming system following a token-based approach:

- **CSS Custom Properties**: All colors, spacing, and typography use CSS variables
- **Theme Switching**: Supports light, dark, and system preference modes
- **Accessibility**: Ensures WCAG AA compliance with proper contrast ratios
- **Reduced Motion**: Respects user preferences for reduced motion

The theme implementation follows these principles:

1. All UI components use theme tokens, never hard-coded colors
2. Theme switching is persistent across sessions using localStorage
3. New components should follow the established pattern in `styles/tokens/`

## Project Structure

```
code-buddy/
├── client/                # Frontend code
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts (including theming)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS styles and tokens
│   │   └── main.tsx       # Entry point
│   │
│   └── ...
│
├── server/                # Backend code
├── shared/                # Shared types and utilities
└── ...
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 