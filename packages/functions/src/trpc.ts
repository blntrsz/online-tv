import { initTRPC } from "@trpc/server";
import { z } from "zod";
import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer";

export const t = initTRPC.create();

const INDAVIDEO_URL = "https://indavideo.hu/";

const INDAVIDEO_SEARCH_URL = `${INDAVIDEO_URL}search/text/`;

export const appRouter = t.router({
  getIndavideoSearch: t.procedure.input(z.string()).query(async (req) => {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
    });
    const page = await browser.newPage();

    await page.goto(INDAVIDEO_SEARCH_URL + req.input);
    await page.waitForSelector("#p_uni");

    const results = await page.evaluate(() => {
      const arr = [];
      // @ts-ignore
      for (const anchor of document.querySelectorAll("#p_uni a.title")) {
        arr.push({
          // @ts-ignore
          title: anchor.innerText,
          // @ts-ignore
          href: anchor.href,
        });
      }
      return arr;
    });

    await browser.close();

    return results as { title: string; href: string }[];
  }),
  getIndavideoLinkVideo: t.procedure.input(z.string()).query(async (req) => {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
    });
    const page = await browser.newPage();

    await page.goto(req.input);

    const title = await page.evaluate(() => {
      // @ts-ignore
      return document.querySelector("iframe").src;
    });

    await browser.close();

    return { link: title };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
