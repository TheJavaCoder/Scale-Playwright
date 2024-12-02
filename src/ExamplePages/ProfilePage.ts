import { Page } from "playwright";
import { PageBridge } from "../PageBridge";

export class ProfilePage implements PageBridge {
    goBack: () => void;
    goForward: () => void;
    Page: Page;
    Home: () => void;
    NewTab: () => void;

    CanChange_pfp: () => ProfilePage;
    Can_Save: () => ProfilePage;
    CanChange_Name_To: (string: string) => ProfilePage;
}