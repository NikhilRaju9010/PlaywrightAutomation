import { test ,chromium, Page} from '@playwright/test';
import { locators } from '../utils/locators';
import {sessionList} from '../utils/updateSessionDates';

test('Session Deliverables Submission' , async () => {

        test.setTimeout(0);

        const browser = await chromium.launch({ 
            headless: process.env.CI ? true : false
        });
        
        const page = await browser.newPage();

        await page.setViewportSize({ width: 1920, height: 1080 });
        page.setDefaultTimeout(30000); // Set default timeout for element actions to 30 seconds

        await page.goto("http://startcouncil.org?code=Y9Kk8NQEGN",{ timeout: 120000 });

        await page.click(locators.confirmedFounder.navbarAllSprintsButton);
        await page.waitForTimeout(5000);

        let completedSessionsCount = 0;

        for (const sessionName of Object.values(sessionList))  {
            completedSessionsCount++;
            console.log(`No of sessions submitted Answers: ${completedSessionsCount}`);
            await page.click(locators.confirmedFounder.sessiosnViewSprintButton(sessionName));
            if(completedSessionsCount <=1 ){
            await page.click(locators.confirmedFounder.deliverablesWelcomeButton);
            await page.click(locators.confirmedFounder.resourcesButton);
            }
            await page.click(locators.confirmedFounder.expandAllBtn);

            const deliverablesCount = await page.locator(locators.confirmedFounder.deliverablesCount).count();
            console.log(`Number of deliverables found: ${deliverablesCount}`);
            
            async function waitForElementOrReload(page: Page, selector: string, timeout = 3000) {
                try {
                    await page.waitForSelector(selector, { timeout });
                } catch (error) {
                    console.log(`Element ${selector} not found within ${timeout / 1000} seconds. Reloading page...`);
                    await page.reload({ waitUntil: 'networkidle' });
                    await page.click(locators.confirmedFounder.expandAllBtn);
                    await page.waitForSelector(selector, { timeout: 6000 }); // Retry after reload
                }
            }
            
            for (let i = 1; i <= deliverablesCount; i++) {

                const addAnswerSelector = locators.confirmedFounder.addAnswer(i);
                const inputSelector = locators.confirmedFounder.deliverablesInputFeild;
                const buttonSelector = locators.confirmedFounder.deliverablesUpdateButton;

                const addAnswerBtn = page.locator(addAnswerSelector);
                const inputLocator = page.locator(inputSelector);
                const buttonLocator = page.locator(buttonSelector);

                await waitForElementOrReload(page, addAnswerSelector);
                
                console.log(`Clicking Add Answer ${i}`);
                await addAnswerBtn.click();

                await waitForElementOrReload(page, inputSelector);          
                console.log(`Filling Deliverable ${i}`);
                await inputLocator.fill("Automation Deliverables Submitted");

                await waitForElementOrReload(page, buttonSelector);
                console.log(`Clicking Update Button ${i}`);
                await buttonLocator.click();

                await page.waitForLoadState('domcontentloaded');
                await page.waitForLoadState('load');
                await page.waitForTimeout(2000);
                if (i === deliverablesCount) {
                    console.log(`All Deliverables Submitted Successfully ${sessionName}`);
                }
            }
            await page.click(locators.confirmedFounder.navbarAllSprintsButton);
            await page.waitForTimeout(3000);
        }
        console.log("All Sprints Deliverables Submitted Successfully");
        await page.waitForTimeout(5000);
       
});

// To Run The code ---> npx playwright test tests/deliverablesSubmission.spec.ts