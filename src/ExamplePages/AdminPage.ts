import { Page } from "playwright";
import { PageBridge } from "../PageBridge";
import { IndexPage } from "./IndexPage";

export class AdminPage implements PageBridge {

    Home = async () => {
        const toReturn = new IndexPage();
        toReturn.Page = this.Page;
        return toReturn;
    }

    NewTab = async () => {
        const toReturn = new AdminPage();
        toReturn.Page = await this.Page.context().newPage();
        return toReturn;
    }

    goBack: () => void;

    goForward: () => void;

    Page: Page;

    Dashboard = async () => {
        await this.Page.goto("/Dashboard");
        return this;
    }
}