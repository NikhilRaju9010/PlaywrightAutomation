import { test ,chromium} from '@playwright/test';
import { locators } from '../utils/locators';
import {sessionList} from '../utils/updateSessionDates';

test('Session Deliverables Submission' , async () => {

        test.setTimeout(300000); // ## 5 Minutes Wait ##

        const browser = await chromium.launch({ 
            headless: process.env.CI ? true : false
        });
        
        const page = await browser.newPage();

        await page.setViewportSize({ width: 1920, height: 1080 });

        await page.goto("http://startcouncil.org?code=6PbDbq5Mzu",{ timeout: 120000 });

        //select any foundre

        await page.click(locators.confirmedFounder.navbarAllSprintsButton);
        await page.waitForTimeout(5000);
        await page.click(locators.confirmedFounder.sessiosnViewSprintButton(sessionList.session14));
        await page.click(locators.confirmedFounder.sessionEditAllButton);
        await page.click(locators.confirmedFounder.deliverablesWelcomeButton);
        await page.click(locators.confirmedFounder.resourcesButton);

        const trixelElements = await page.locator(locators.confirmedFounder.deliverablesInputFeild).all()
        console.log(trixelElements.length);
        console.log(trixelElements);
        for (const element of trixelElements) {
            console.log(element);
            await element.fill('Deliverable Submitted');
            await page.click(locators.confirmedFounder.deliverablesUpdateButton);
        }


});

// To Run The code ---> npx playwright test tests/deliverablesSubmission.spec.ts