import { Browser } from "@playwright/test";
import { User } from "./User";
import { PageBridge } from "./PageBridge";

export async function Login<T extends PageBridge>(browser: Browser, user: User, newt: new () => T): Promise<T> {

    console.log("Login");

    const browserContext = await browser.newContext();

    const newPage = await browserContext.newPage();

    if (user != null) {
        await newPage.goto(process.env.PLAYWRIGHT_BASE_URL ?? "");

        await newPage.getByPlaceholder('Email').click();
        await newPage.getByPlaceholder('Email').fill(user.Email);
        await newPage.getByPlaceholder('Email').press('Tab');
        await newPage.getByPlaceholder('Password').fill(user.Password);
        await newPage.getByRole('button', { name: 'SUBMIT' }).click();

        await newPage.waitForURL(process.env.PLAYWRIGHT_HOME ?? "");
    }

    var instancedT = new newt();
    instancedT.Page = newPage;

    return instancedT;
}