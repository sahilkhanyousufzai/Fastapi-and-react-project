# ⚛️ React + TypeScript + Vite

A modern frontend application built with **React, TypeScript, Vite, and Tailwind CSS**.

This project is the frontend part of the **FastAPI + React Dataset Generator** application.

The frontend provides a modern interface for interacting with the backend API and managing dataset-generation functionality.

---

## 🚀 Tech Stack

| Technology      | Purpose                           |
| --------------- | --------------------------------- |
| ⚛️ React        | Frontend UI                       |
| 🔷 TypeScript   | Type-safe JavaScript              |
| ⚡ Vite          | Development server and build tool |
| 🎨 Tailwind CSS | Styling                           |
| 🧹 Oxlint       | Code linting                      |
| 📦 npm          | Package management                |

### Current Versions

This project currently uses:

* React `19.2.8`
* React DOM `19.2.8`
* TypeScript `6.0.2`
* Vite `8.3.0`
* Tailwind CSS `4.3.3`
* Oxlint `1.81.0`

These versions are based on the project's current `package.json`.

---

# ✨ Features

* ⚛️ Modern React application
* 🔷 TypeScript support
* ⚡ Fast Vite development environment
* 🎨 Tailwind CSS styling
* 📡 Ready to communicate with a FastAPI backend
* 🧹 Oxlint code-quality checks
* 📦 npm dependency management
* 🏗️ Production-ready build process
* 🔥 Hot Module Replacement during development

---

# 📁 Project Structure

A typical structure for the frontend is:

```text
Frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── ...
```

Your exact `src` folders can change as the application grows.

---

# 🧰 Prerequisites

Before running the project, make sure you have installed:

### 1. Node.js

Install a current Node.js version compatible with your Vite version.

Check your installed version:

```bash
node --version
```

Example:

```text
v22.x.x
```

### 2. npm

npm normally comes with Node.js.

Check it:

```bash
npm --version
```

Example:

```text
10.x.x
```

If both commands return version numbers, your Node.js environment is ready.

---

# 📥 Installation

## Step 1 — Clone the Repository

Clone the complete project:

```bash
git clone https://github.com/sahilkhanyousufzai/Fastapi-and-react-project.git
```

Move into the repository:

```bash
cd Fastapi-and-react-project
```

Then move into the frontend:

```bash
cd Frontend
```

Your terminal should now be inside:

```text
Fastapi-and-react-project/Frontend
```

---

# 📦 Step 2 — Install Dependencies

Run:

```bash
npm install
```

This command reads your:

```text
package.json
```

and installs all required dependencies.

It also creates:

```text
node_modules/
```

and uses:

```text
package-lock.json
```

to keep dependency versions consistent.

---

# 🔍 What Does `npm install` Do?

When you run:

```bash
npm install
```

npm installs packages such as:

```text
React
React DOM
TypeScript
Vite
Tailwind CSS
Oxlint
Vite React plugin
TypeScript React types
Node types
```

Your project's current `package.json` defines React, Tailwind CSS, Vite, TypeScript, Oxlint, and their supporting packages.

---

# ▶️ Step 3 — Start the Development Server

After installing dependencies:

```bash
npm run dev
```

Vite will start the development server.

You should see something similar to:

```text
VITE v8.x.x ready

➜ Local: http://localhost:5173/
```

Open the displayed local URL in your browser.

Usually:

```text
http://localhost:5173
```

---

# 🔥 Development Workflow

The normal development workflow is:

```text
Clone Repository
       ↓
cd Frontend
       ↓
npm install
       ↓
npm run dev
       ↓
Open Browser
       ↓
Develop React Application
       ↓
Save Changes
       ↓
Vite Hot Reload
```

Vite's Hot Module Replacement allows changes to appear in the browser without manually restarting the development server.

---

# 🧹 Lint the Project

This project uses **Oxlint**.

Run:

```bash
npm run lint
```

The project's `package.json` defines the lint script as:

```json
{
  "scripts": {
    "lint": "oxlint"
  }
}
```

Linting helps identify potential code-quality problems.

---

# 🏗️ Create a Production Build

When you're ready to create a production build:

```bash
npm run build
```

The project currently uses:

```json
"build": "tsc -b && vite build"
```

This means TypeScript is checked/built first, followed by the Vite production build.

The generated production files are placed inside:

```text
dist/
```

Typical structure:

```text
Frontend/
│
├── dist/
│   ├── assets/
│   └── index.html
│
└── ...
```

---

# 👀 Preview the Production Build

After running:

```bash
npm run build
```

you can preview the production version locally:

```bash
npm run preview
```

The project defines:

```json
"preview": "vite preview"
```

in `package.json`.

Vite will display a local URL where you can test the production build.

---

# 📜 Available npm Commands

Your current project provides these commands:

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm install`     | Install dependencies         |
| `npm run dev`     | Start development server     |
| `npm run build`   | Build production application |
| `npm run lint`    | Run Oxlint                   |
| `npm run preview` | Preview production build     |

These scripts are defined in the project's `package.json`.

---

# 🎨 Tailwind CSS

This project uses **Tailwind CSS 4** for styling.

Tailwind allows you to style React components using utility classes.

Example:

```tsx
function Welcome() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">
        Welcome to Dataset Generator
      </h1>
    </div>
  );
}

export default Welcome;
```

Instead of writing traditional CSS for every component, Tailwind utilities can be applied directly to JSX elements.

---

# ⚛️ React Component Example

A simple React component:

```tsx
interface UserProps {
  name: string;
}

function User({ name }: UserProps) {
  return (
    <div className="rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold">
        Hello, {name}!
      </h2>
    </div>
  );
}

export default User;
```

Use it:

```tsx
<User name="Sahil Khan" />
```

---

# 🔷 TypeScript

TypeScript provides type safety for the React application.

Example:

```tsx
interface Dataset {
  id: number;
  name: string;
  rows: number;
}

const dataset: Dataset = {
  id: 1,
  name: "Customer Dataset",
  rows: 1000,
};
```

This helps catch incorrect data types before the application runs.

---

# 🔗 Connecting React to FastAPI

This frontend is designed to work with a FastAPI backend.

The overall architecture is:

```text
┌──────────────────────┐
│                      │
│   React + TypeScript │
│                      │
└──────────┬───────────┘
           │
           │ HTTP Request
           │ JSON
           ▼
┌──────────────────────┐
│                      │
│   FastAPI Backend    │
│       Python         │
│                      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Dataset Generator  │
│                      │
│ Faker / NumPy /      │
│ Pandas / Scikit-learn│
└──────────────────────┘
```

The frontend sends HTTP requests to the FastAPI backend and receives JSON responses.

---

# 🌐 API Example

A frontend request can look like:

```typescript
const response = await fetch(
  "http://127.0.0.1:8000/generate_datasets",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number_of_datasets: 100,
      fields: [
        "first_name",
        "last_name",
        "email",
        "age",
      ],
    }),
  }
);

const data = await response.json();

console.log(data);
```

Make sure your FastAPI backend is running before sending requests.

---

# 🔐 Environment Variables

If the frontend needs configurable API URLs, create an environment file such as:

```text
.env
```

For Vite applications, client-side environment variables normally use the:

```text
VITE_
```

prefix.

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Then access it in TypeScript:

```typescript
const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL);
```

### ⚠️ Important

Do not put secret API keys or passwords in frontend environment variables.

Anything exposed through a Vite client application can potentially become visible to users.

---

# 🔄 Example Frontend + Backend Setup

You can run the two parts separately.

### Terminal 1 — FastAPI

```bash
cd Backend
```

Activate your Python environment and run:

```bash
uvicorn src.main:app --reload
```

Example:

```text
http://127.0.0.1:8000
```

### Terminal 2 — React

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Example:

```text
http://localhost:5173
```

You now have:

```text
React
  │
  │ HTTP
  ▼
FastAPI
  │
  ▼
Dataset Generator
```

---

# 🧪 Development Checklist

After cloning the project:

```bash
# 1. Enter frontend
cd Frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Then open the URL shown by Vite.

Before committing your changes:

```bash
npm run lint
```

Then create a production build:

```bash
npm run build
```

---

# 🛠️ Troubleshooting

## `npm` is not recognized

If Windows says:

```text
'npm' is not recognized as an internal or external command
```

Node.js is probably not installed correctly or isn't available in your PATH.

Check:

```bash
node --version
```

and:

```bash
npm --version
```

Restart your terminal after installing Node.js.

---

## `node_modules` is missing

Run:

```bash
npm install
```

You should not normally commit `node_modules` to Git.

Make sure it is included in `.gitignore`:

```gitignore
node_modules/
```

---

## Port 5173 is already in use

Vite can automatically select another available port.

Alternatively, you can specify one:

```bash
npm run dev -- --port 3000
```

Then open:

```text
http://localhost:3000
```

---

## API Request Failed

If the React application cannot communicate with FastAPI, check:

### FastAPI is running

```text
http://127.0.0.1:8000
```

### React is running

```text
http://localhost:5173
```

### API URL is correct

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Also check the browser's Developer Tools:

```text
F12
→ Console
→ Network
```

---

# 📦 Production Deployment

Create the production build:

```bash
npm run build
```

This generates:

```text
dist/
```

The `dist` folder contains the optimized frontend application.

You can deploy the generated files to a static hosting service or serve them through a web server.

---

# 🔒 Security Notes

Never commit:

```text
.env
API secrets
Private keys
Passwords
Access tokens
```

Use environment variables for configuration.

Also remember that frontend code is delivered to the browser, so frontend environment variables should never contain true secrets.

---

# 🚀 Future Improvements

Possible future improvements:

* [ ] Dataset preview
* [ ] Dataset download
* [ ] CSV export
* [ ] Excel export
* [ ] Better API error handling
* [ ] Loading states
* [ ] Authentication
* [ ] User dashboard
* [ ] Dataset history
* [ ] Dataset visualization
* [ ] Responsive mobile interface
* [ ] Dark mode
* [ ] Pagination
* [ ] Advanced dataset configuration

---

# 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

Create your own fork of the project.

### 2. Clone your fork

```bash
git clone YOUR_FORK_URL
```

### 3. Enter the frontend

```bash
cd Fastapi-and-react-project/Frontend
```

### 4. Install dependencies

```bash
npm install
```

### 5. Create a branch

```bash
git checkout -b feature/my-feature
```

### 6. Start development

```bash
npm run dev
```

### 7. Check the code

```bash
npm run lint
```

### 8. Build the project

```bash
npm run build
```

### 9. Commit your changes

```bash
git add .
git commit -m "Add new frontend feature"
```

### 10. Push your branch

```bash
git push origin feature/my-feature
```

Then create a Pull Request.

---

# 👨‍💻 Author

## Sahil Khan

Computer Engineering Student | Python Developer | FastAPI | React | TypeScript | AI/ML

Building real-world projects and continuously learning modern software development.

---

# 🌟 Project

**FastAPI + React Dataset Generator**

Frontend technologies:

```text
React
TypeScript
Vite
Tailwind CSS
Oxlint
```

Backend:

```text
Python
FastAPI
Faker
NumPy
Pandas
Scikit-learn
```

---

# 📄 License

This project is intended for learning, development, and experimentation.

If you decide to distribute the project publicly, add an appropriate open-source license such as MIT.

---

# ❤️ Support

If this project helped you:

⭐ Star the repository
🍴 Fork the project
🐛 Report bugs
💡 Suggest improvements
📢 Share the project

---

<div align="center">

### 🚀 Learn • Build • Debug • Improve

**Made with ❤️ by Sahil Khan**

</div>
