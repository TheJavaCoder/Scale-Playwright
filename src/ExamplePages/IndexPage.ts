import { Page } from "playwright";
import { PageBridge } from "../PageBridge";
import { ProfilePage } from "./ProfilePage";
import { ShoppingCartPage } from "./ShoppingCartPage";

export class IndexPage implements PageBridge {

    Page: Page;

    goBack = async () => {
        return await this.Page.goBack();
    };

    goForward = async () => {
        return await this.Page.goForward();
    };

    NewTab = async () => {
        const toReturn = new IndexPage();
        toReturn.Page = await this.Page.context().newPage();
        return toReturn;
    };

    Home = async () => {
        await this.Page.goto(process.env.PLAYWRIGHT_HOME ?? "/");
        return this;
    }

    About = async () => {
        await this.Page.goto("/About.html");
        return this;
    }

    ContactUs = async () => {
        await this.Page.goto("/ContactUs.html");
        return this;
    }

    ShoppingCart = async () => {
        const toReturn = new ShoppingCartPage();
        toReturn.Page = this.Page;
        return toReturn;
    }

    Profile = async () => {
        const toReturn = new ProfilePage();
        toReturn.Page = this.Page;
        return toReturn;
    }
}