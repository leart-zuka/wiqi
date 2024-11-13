// app/components/utils.ts

import { chromium, Browser, Page } from 'playwright';
import { NextRequest, NextResponse } from 'next/server';

// Deklaration globaler Variablen für Browser und Seiten-Pool
declare global {
  var browser: Browser | null;
  var pagePool: Page[];
  var maxPages: number;
}

// Initialisieren der globalen Browser- und Seiten-Pool-Variablen
if (!global.browser) {
  global.browser = null;
}

if (!global.pagePool) {
  global.pagePool = [];
}

if (!global.maxPages) {
  global.maxPages = 5; // Maximale Anzahl gleichzeitig geöffneter Seiten
}

export const maxDuration = 60000; // 60 Sekunden in Millisekunden

// Einfaches In-Memory-Caching
const cache: { [key: string]: string } = {};
const CACHE_TTL = 60 * 60 * 1000; // 1 Stunde in Millisekunden
const cacheTimestamps: { [key: string]: number } = {};

// Initialisierung des Caches-Bereinigungs-Intervalls
setInterval(() => {
  const currentTime = Date.now();
  for (const url in cacheTimestamps) {
    if (cacheTimestamps[url] + CACHE_TTL < currentTime) {
      delete cache[url];
      delete cacheTimestamps[url];
      console.log(`Cache-Eintrag entfernt für: ${url}`);
    }
  }
}, 60 * 60 * 1000); // Jede Stunde

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url: string = body.url;

    if (!url || typeof url !== "string" || !isValidUrl(url)) {
      return NextResponse.json({ error: "Ungültige URL angegeben." }, { status: 400 });
    }

    const image = await enqueueRequest(url);
    return NextResponse.json({ image: image }, { status: 200 });
  } catch (error) {
    console.error("Fehler im POST-Handler:", error);
    return NextResponse.json(
      { error: "Konnte Screenshot der Webseite nicht abrufen." },
      { status: 500 },
    );
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

async function getBrowserInstance(): Promise<Browser> {
  if (global.browser === null) {
    global.browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
      ],
      defaultViewport: { width: 1080, height: 1920 },
      ignoreHTTPSErrors: true,
    });
    console.log("Playwright Browser gestartet");
  }
  return global.browser;
}

async function getPageFromPool(): Promise<Page> {
  if (global.pagePool.length > 0) {
    console.log("Verwendung einer vorhandenen Seite aus dem Pool");
    return global.pagePool.pop()!;
  } else {
    const browser = await getBrowserInstance();
    if (global.pagePool.length < global.maxPages) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1920 });
      // Blockieren unnötiger Ressourcen (nur Bilder und Fonts)
      await page.route('**/*.{png,jpg,jpeg,woff,woff2}', route => route.abort());
      return page;
    } else {
      // Warten bis eine Seite verfügbar ist
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (global.pagePool.length > 0) {
            clearInterval(interval);
            console.log("Eine Seite ist jetzt verfügbar im Pool");
            resolve(global.pagePool.pop()!);
          }
        }, 100); // Überprüfen alle 100ms
      });
    }
  }
}

async function returnPageToPool(page: Page) {
  global.pagePool.push(page);
  console.log("Seite zurück in den Pool gelegt");
}

async function enqueueRequest(url: string): Promise<string> {
  const MAX_CONCURRENT_REQUESTS = global.maxPages;
  if (global.pagePool.length >= MAX_CONCURRENT_REQUESTS) {
    console.log(`Maximale Anzahl von ${MAX_CONCURRENT_REQUESTS} gleichzeitig offenen Seiten erreicht. Warten...`);
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (global.pagePool.length > 0) {
          clearInterval(interval);
          getImageBase64(url)
            .then(resolve)
            .catch(reject);
        }
      }, 100); // Überprüfen alle 100ms
    });
  } else {
    return getImageBase64(url);
  }
}

async function getImageBase64(url: string): Promise<string> {
  // Überprüfen, ob der Screenshot im Cache ist und noch gültig ist
  const currentTime = Date.now();
  if (cache[url] && cacheTimestamps[url] + CACHE_TTL > currentTime) {
    console.log(`Verwendung des gecachten Screenshots für: ${url}`);
    return cache[url];
  }

  const page = await getPageFromPool();

  try {
    console.log(`Navigiere zur URL: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: maxDuration });

    console.log(`Erstelle Screenshot für: ${url}`);
    const screenshot = await page.screenshot({ encoding: 'base64', fullPage: true, type: 'png' });

    // Screenshot im Cache speichern
    cache[url] = screenshot;
    cacheTimestamps[url] = currentTime;
    console.log(`Screenshot erfolgreich erstellt und im Cache gespeichert für: ${url}`);

    return screenshot;
  } catch (error) {
    console.error(`Fehler beim Erstellen des Screenshots für ${url}:`, error);
    throw error; // Fehler an den Aufrufer weitergeben
  } finally {
    // Zurücksetzen der Seite und Rückgabe zum Pool
    await page.evaluate(() => window.scrollTo(0, 0));
    returnPageToPool(page);
  }
}

// Optional: Browser und Seiten beim Prozessende schließen
process.on("SIGTERM", async () => {
  if (global.browser !== null) {
    console.log("Schließe alle Seiten im Pool");
    for (const page of global.pagePool) {
      await page.close();
    }
    console.log("Schließe den Browser");
    await global.browser.close();
    global.browser = null;
    global.pagePool = [];
  }
  process.exit(0);
});
