import { test ,chromium} from '@playwright/test';
import { NumberEntry } from '../utils/numberEnter';
test('Founder logout Functionality', async () => {
    test.setTimeout(0);

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultTimeout(30000); // Set default timeout for element actions to 30 seconds

    await page.goto('https://startcouncil.org/join?target=11160',{ timeout: 120000 });
    await page.waitForTimeout(1000);
    await page.waitForSelector("//span[contains(text(),'Sign in')]", { state: 'visible' });
    await page.click("//span[contains(text(),'Sign in')]");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@name='user[email]' and @id='#form_email_address']", { state: 'visible' });
    await page.fill("//input[@name='user[email]' and @id='#form_email_address']", "hayaha@gmail.com");

    await page.waitForSelector("//input[@name='user[password]' and @placeholder='Password']", { state: 'visible' });
    await page.fill("//input[@name='user[password]' and @placeholder='Password']", "hayaha@gmail.com");

    await page.waitForSelector("//span[contains(text(),'Login')]", { state: 'visible' });
    await page.click("//span[contains(text(),'Login')]");
    await page.waitForTimeout(2000);
     
    // await page.waitForSelector("//i[@class='fi-icon-user']", {state: 'visible'});
    // await page.click("//i[@class='fi-icon-user']");

    // await page.waitForSelector("//div[contains(text(),'Logout')]", {state: 'visible'});
    // await page.click("//div[contains(text(),'Logout')]");

    // await page.waitForSelector("//span[contains(text(),'Log out')]", {state:'visible'});
    // await page.click("//span[contains(text(),'Log out')]");

    await page.waitForSelector("//button[contains(text(),'Pay the Entrance Fee')]");
    await page.click("//button[contains(text(),'Pay the Entrance Fee')]");
    await page.waitForTimeout(1000);
    
    //Filling card details
    await page.waitForSelector("//button[contains(text(),'Pay with Card')]", { state: 'visible', timeout: 12000  });
    await page.click("//button[contains(text(),'Pay with Card')]");
    await page.waitForTimeout(2000);

    await page.waitForSelector("(//span[@class='InputContainer'])[1]", { state: 'visible', timeout: 12000 });
    await NumberEntry.enterNumber(page, "(//span[@class='InputContainer'])[1]", '4242424242424242'); // Card Number
    
    await page.waitForTimeout(1000);

    await page.waitForSelector("(//span[@class='InputContainer'])[2]", { state: 'visible', timeout: 12000  });
    await NumberEntry.enterNumber(page, "(//span[@class='InputContainer'])[2]", '1234'); // Expiry Date (MM/YY)
 

    await page.waitForSelector("(//span[@class='InputContainer'])[3]", { state: 'visible', timeout: 12000  });
    await page.waitForSelector("(//span[@class='InputContainer'])[3]");
    await NumberEntry.enterNumber(page, "(//span[@class='InputContainer'])[3]", '567'); // CVV
  

    await page.waitForSelector("//input[@id='billingName']");
    await page.fill("//input[@id='billingName']","dummy"); // Card Holder Name
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@id='billingName']", { state: 'visible', timeout: 12000  });
    await page.locator("//input[@id='billingName']").press('Enter');
    await page.waitForTimeout(3000);
    


    await page.waitForTimeout(5000);


})

// npx playwright test example2.spec.ts    ### to run the test

// npm install
// npx playwright install
// npx playwright install --with-deps  # Installs required dependencies for browsers

