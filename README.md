# Scaling Playwright Originization Wide.

For a large multi-tenant, multi-deployment app.

This project is a study on how far you could abstract your tests away from Playwright and talk in more domain-specific terms, which make tests faster to write and hopefully less error-prone.
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
// Extension method of Playwright.test
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

*Suggest consolidating most of your Playwright work into your custom PageBridge and parameterizing your Playwright tests all the way to PageBridge methods.*

*Explore using PageBridges to keep current session state, especially if you have a stateful API model.*

#

### Light Control Surface

Playwright's tests run in parallel, so tests need a clean known starting point as ground truth.

With hundreds, if not thousands, of tests that will be written, how could this possibly work?

The only way to guarantee that tests' states don't get squashed is by creating a new environment for every test to run in with static copies of data.

Using pre and post-test hooks and making API requests to our target machine to spin up and down environments on the test suite's behalf when they're needed, all based on the testId.
