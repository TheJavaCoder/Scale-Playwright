import { Page } from "playwright";
import { PageBridge } from "../PageBridge";
import { IndexPage } from "./IndexPage";

export class ShoppingCartPage implements PageBridge {
    Page: Page;
    goBack: () => void;
    goForward: () => void;

    Home = async () => {
        await this.Page.goto(process.env.PLAYWRIGHT_HOME ?? "/");
        const toReturn = new IndexPage();
        toReturn.Page = this.Page;
        return toReturn;
    };
    NewTab: () => void;

    FillWithRandomItems: () => ShoppingCartPage;
    Clear: () => ShoppingCartPage;
    Checkout: () => ShoppingCartPage;
}