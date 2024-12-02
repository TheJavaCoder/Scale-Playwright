# Scaling Playwright Originization Wide.
For a large multi-tenant, multi-deployment app.
#
This project is a study on how far you could abstract your tests away from Playwright and talk in more domain specific terms, which make tests faster to write and hopefully less error prone.
#
Basic Example:
```typescript
// Login by joeSmith
SPTest("Can login", joeSmith, async (ip) => {
        // Navigating and running tests 
        await ip.About();
        await ip.Home();
        await ip.Profile();
    // Requesting the IndexPage
}, IndexPage);
```
#
Advanced Multi-User example:

```typescript
// Extention method of Playwright.test
SPTest_Userless("Multiple users login and do stuff?", async ({ browser }) => {

    // Login by joeSmith for the AdminPage
    var joeSession = await Login(browser, joeSmith, AdminPage);

    // Navigating to Dashboard.
    await joeSession.Dashboard();

    // joe -> index -> profile -> changed profile picture, name, and saved.
    (await (await joeSession.Home()).Profile()).CanChange_pfp().CanChange_Name_To("Joe").Can_Save();

    // Login by stevie for the IndexPage
    var stevieSession = await Login(browser, stevieGoodwin, IndexPage);

    // Stevie can't access the .Dashboard()

    // Navigation and 'shopping'
    await stevieSession.Home();
    await stevieSession.ContactUs();
    (await stevieSession.ShoppingCart()).Clear().FillWithRandomItems().Checkout();
    (await stevieSession.Profile()).CanChange_Name_To("Stevie Goodwin").Can_Save();
});
```

*Suggest consolidating most of your playwright work into your custom PageBridge and parameterizing your playwright tests all the way to PageBridge methods.*

*Explore using PageBridges to keep current session state. Especially if you have a stateful api model.*

#

### Light Control Surface

Playwright's test run in parallel, tests need a clean known starting point as ground truth.

100s if not 1000s of tests that will be written, how could this possiblely work?

The only way to garentee that tests' states don't get squashed, is by creating a new environment for every test to run in with static copies of data.

Using pre and post test hooks, and making api requests to our target machine to spin up and down environments on the test suite's behalf when they're needed all based on the testId.
