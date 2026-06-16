module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run build && npm run preview -- --host 127.0.0.1",
      startServerReadyPattern: "Local:",
      url: [
        "http://127.0.0.1:4173/",
        "http://127.0.0.1:4173/tasks",
        "http://127.0.0.1:4173/tasks/new",
        "http://127.0.0.1:4173/tasks/1/edit",
        "http://127.0.0.1:4173/dashboard",
        "http://127.0.0.1:4173/settings",
        "http://127.0.0.1:4173/register",
      ],
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--no-sandbox",
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci-reports",
    },
    assert: {
      assertions: {
        "categories:accessibility": ["warn", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.8 }],
      },
    },
  },
};