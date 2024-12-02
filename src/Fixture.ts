import { test as base, TestInfo } from '@playwright/test'
import { PageBridge } from "./PageBridge";
import { User } from "./User";
import { Login } from './Authentication';

const defaultPreTestProceess = async (ti: TestInfo) => {
    await fetch("/api/testing/pre", {
        method: "POST",
        body: JSON.stringify({ test: ti.testId })
    });
};

const defulatPostTestProcess = async (ti: TestInfo) => {
    await fetch("/api/testing/post", {
        method: "POST",
        body: JSON.stringify({ test: ti.testId })
    });
};

export let PreTestProcess: (ti: TestInfo) => void = defaultPreTestProceess;
export let PostTestProcess: (ti: TestInfo) => void = defulatPostTestProcess;

export function SPTest<T extends PageBridge>(testDescription: string, user: User,
    funct: (internalPage: T) => void, pageBridge: new () => T) {

    SPTest_Userless(testDescription, async ({ browser }) => {
        funct(await Login<T>(browser, user, pageBridge));
    });
};

export const SPTest_Userless = base.extend<{ forEachTest: void } & PageBridge>({

    baseURL: process.env.PLAYWRIGHT_BASE_URL,

    forEachTest: [async ({ }, use, testInfo) => {

        PreTestProcess(testInfo);

        await use();

        PostTestProcess(testInfo);

    }, { auto: true }]
});