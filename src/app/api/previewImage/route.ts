import puppeteer from "puppeteer";
import { chromium } from "playwright";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const image = await getImageBase64(body.url);
        return NextResponse.json({ 'image': image, 'test': 'this is a test' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ "error": "Couldn't fetch screenshot off of website 2" }, { status: 500 })
    }
}

let getImageBase64 = async (url: string) => {
    try {
        let browser = await chromium.launch();
        let page = await browser.newPage();
        await page.goto(url);
        const image = await page.screenshot();
        await browser.close();
        return image.toString('base64')
    } catch (error) {
        return `${error}`
    }
};
