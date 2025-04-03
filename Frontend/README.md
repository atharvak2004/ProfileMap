# Welcome to ProfileMap! 👋

Hey there! Welcome to the ProfileMap frontend - a modern web application that helps you discover and connect with professionals through an interactive map interface. Whether you're looking to find local talent or showcase your own profile, we've got you covered!

## ✨ What's Cool About This?

- 🗺️ **Interactive Map View**: Browse professionals in your area with our intuitive map interface
- 🔍 **Smart Search**: Find exactly who you're looking for with powerful search and filter options
- 💼 **Professional Profiles**: Detailed profile pages with skills, experience, and contact info
- 📱 **Responsive Design**: Works beautifully on both desktop and mobile devices

## 🚀 Getting Started

Getting up and running is super easy! Here's what you need to do:

1. **Set Up Your Environment**
   ```bash
   npm install
   ```

2. **Start Development**
   ```bash
   npm run dev
   ```
   Your app will be running at http://localhost:5173 - check it out!

3. **Going to Production?**
   ```bash
   npm run build
   npm run preview
   ```

## 🏗️ Project Structure

Here's how everything is organized:

```
├── src/
│   ├── components/     # All our UI building blocks
│   │   ├── admin/     # Admin dashboard stuff
│   │   ├── common/    # Shared components
│   │   ├── map/       # Map visualization
│   │   ├── profiles/  # Profile components
│   │   ├── search/    # Search functionality
│   │   └── ui/        # Base UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Main page components
│   ├── App.jsx        # App entry point
│   └── main.jsx       # React initialization
```

## ⚙️ Environment Setup

Before you start, you'll need to set up one environment variable:

- `VITE_API_URL`: Where's your backend? (defaults to http://localhost:5000)

## 🛠️ Tech Stack

We're using some awesome modern tech:

- ⚛️ **React** - For building our UI
- ⚡ **Vite** - Lightning fast builds
- 🎨 **TailwindCSS** - Beautiful styling
- 🔄 **React Query** - Smooth data fetching
- 🎯 **Radix UI** - Accessible components

## 🤝 Want to Contribute?

We'd love your help! Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📫 Questions or Issues?

Spot a bug? Have a cool idea? Open an issue! We're here to help and make this project even better.
