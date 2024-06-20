import { Browser } from "puppeteer";
import { Browser as CoreBrowser } from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const image = await getImageBase64(body.url);
    return NextResponse.json(
      { image: image, test: "this is a test" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Couldn't fetch screenshot off of website 2" },
      { status: 500 },
    );
  }
}

let getImageBase64 = async (url: string) => {
  try {
    let browser: Browser | CoreBrowser;
    if (process.env.NODE_ENV == "production") {
      const puppeteer = await import("puppeteer-core");
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      });
    } else {
      const puppeteer = await import("puppeteer");
      browser = await puppeteer.launch();
    }
    let page = await browser.newPage();
    await page.goto(url);
    const image = await page.screenshot({ encoding: "base64" });
    await browser.close();
    return image;
  } catch (error) {
    return `${error}`;
  }
};
