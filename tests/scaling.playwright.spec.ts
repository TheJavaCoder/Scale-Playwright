import { Login } from "../src/Authentication";
import { SPTest, SPTest_Userless } from "../src/Fixture";
import { AdminPage } from "../src/ExamplePages/AdminPage";
import { User } from "../src/User";
import { IndexPage } from "../src/ExamplePages/IndexPage";

const joeSmith = {
    Email: "joe.smith@gmail.com",
    Password: "password"
} as User;

const stevieGoodwin = {
    Email: "Stevie.Goodwin@gmail.com",
    Password: "password",
} as User;

SPTest("Can login", joeSmith, async (ip) => {
    await ip.About();
    await ip.Home();
    await ip.Profile();
}, IndexPage);

SPTest_Userless("Multiple users login and do stuff?", async ({ browser }) => {

    // Creates a brand new browser session with the admin page helpers
    var joeSession = await Login(browser, joeSmith, AdminPage);

    await joeSession.Dashboard();

    // Multiple page switches.
    (await (await joeSession.Home()).Profile()).CanChange_pfp().CanChange_Name_To("Joe").Can_Save();

    // Creates a brand new browser session with internal page helpers
    var stevieSession = await Login(browser, stevieGoodwin, IndexPage);

    // No access to a dashboard route.
    await stevieSession.Home();
    await stevieSession.ContactUs();
    (await stevieSession.ShoppingCart()).Clear().FillWithRandomItems().Checkout();
    (await stevieSession.Profile()).CanChange_Name_To("Stevie Goodwin").Can_Save();
});