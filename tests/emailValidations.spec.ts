import { test ,chromium} from '@playwright/test';
import { locators } from '../utils/locators';


test('Validating emails received to the founder' , async () => {

        test.setTimeout(0); 

        const browser = await chromium.launch({ 
            headless: process.env.CI ? true : false
        });

        const sampleEmails : Record<string, string> = {
            email_1: 'You are now enrolled in the Here are the next steps..',
            email_2: 'Final Step: Take the "Entrepreneur DNA Assessment" for',
          }
        
        const page = await browser.newPage();

        await page.setViewportSize({ width: 1920, height: 1080 });
        page.setDefaultTimeout(30000); // Set default timeout for element actions to 30 seconds

        await page.goto(locators.pageURL.startcouncil,{ timeout: 120000 });
        await page.click(locators.login.signInButton);
        await page.fill(locators.login.userEmailFeild,locators.login.adminEmail);
        await page.fill(locators.login.userPasswordFeild, locators.login.adminPassword);
        await page.click(locators.login.loginButton);
        console.log('SuperAdmin logged in successfully');

        await page.goto("https://admin.startcouncil.org/emails",{ timeout: 120000 });
        const founderEmail = 'cdhkk.avhdj@example.com';
        await page.fill(locators.adminStartcouniclPage.emailToFeild,founderEmail);
        await page.click(locators.adminStartcouniclPage.filterButton);

        const userEmailsElements = await page.locator(locators.adminStartcouniclPage.userEmails(founderEmail)).all();
        const subjectMap: Record<string, string> = {};
        let emailCount = 1;

        for (const element of userEmailsElements) { 
            await element.click();
            const subject = await page.textContent(locators.adminStartcouniclPage.userEmailSubject(founderEmail));
            subjectMap[`email_${emailCount}`] = subject?.trim() || "No Subject"; 
            emailCount++;
        }

        console.log(`Below are emails received to the founder:`); 
        Object.entries(subjectMap).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
        
        let receivedCount = 0;

        for (const emailKey in sampleEmails) {
            if (subjectMap[emailKey]) { 
                const sampleText = sampleEmails[emailKey];
                const subjectText = subjectMap[emailKey];
        
                const isReceived = sampleText.split(/\s+/).every(word => subjectText.includes(word));
        
                if (isReceived) {
                    console.log(`Founder received ${emailKey}`);
                    receivedCount++;
                } else {
                    console.log(`Founder did NOT receive ${emailKey}`);
                }
            } else {
                console.log(`No subject found for ${emailKey}`);
            }
        }

        if (receivedCount >= 2){
            console.log('Founder received all th emails');
        }

});

// To run the test -  npx playwright test tests/emailValidations.spec.ts