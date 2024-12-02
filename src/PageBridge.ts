import { Page } from "@playwright/test";

export interface PageBridge {
    goBack: () => void;
    goForward: () => void;
    Page: Page;
    Home: () => void;
    NewTab: () => void;
}