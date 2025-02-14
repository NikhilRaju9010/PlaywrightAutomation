import { test ,chromium} from '@playwright/test';
import { locators } from '../utils/locators';
import {sessionList, generateSessionDates} from '../utils/updateSessionDates';

test('Updating the semester sessions dates to make semester to operating' , async () => {

        test.setTimeout(300000); // ## 5 Minutes Wait ##

        const browser = await chromium.launch({ 
            headless: process.env.CI ? true : false
        });
        
        const page = await browser.newPage();

        await page.setViewportSize({ width: 1920, height: 1080 });

        await page.goto(locators.pageURL.startcouncil,{ timeout: 120000 });
        await page.click(locators.login.signInButton);
        await page.fill(locators.login.userEmailFeild,locators.login.adminEmail);
        await page.fill(locators.login.userPasswordFeild, locators.login.adminPassword);
        await page.click(locators.login.loginButton);
        console.log('SuperAdmin logged in successfully');
        await page.goto("https://startcouncil.org/admin/semester/10966",{ timeout: 120000 });
        
        const newSessionDates = generateSessionDates(sessionList);
        console.log(newSessionDates);

        
        for (const [sessionKey, session] of Object.entries(newSessionDates)) {
            await page.click(locators.adminSemesterPage.sessionDateIcon(session.session_name));
            console.log(`Clicked on session date icon for: ${session.session_name}`);

            await page.fill(locators.adminSemesterPage.sessionTimeHours(session.session_name), '10'); 
            await page.fill(locators.adminSemesterPage.sessionTimeMinutes(session.session_name), '00');
            console.log(`Filled session time for ${session.session_name}`);

            await page.fill(locators.adminSemesterPage.sessionYearSelect(session.session_name), session.year);
            console.log(`Filled session year: ${session.year} for ${session.session_name}`);

            await page.click(locators.adminSemesterPage.sessionDateSelect(session.session_name, session.day));
            console.log(`Selected session date: ${session.day} for ${session.session_name}`);


            await page.selectOption(locators.adminSemesterPage.sessionMonthSelect(session.session_name), { value: session.month });
            console.log(`Selected session month: ${session.month} for ${session.session_name}`);

            await page.click(locators.adminSemesterPage.sessionSaveButton(session.session_name));
            console.log(`Clicked on save button for ${session.session_name}`);

            console.log(`Successfully updated session: ${session.session_name}`);
        }
        console.log(`Successfully updated All Session Dates: ${newSessionDates}`);
        await page.waitForTimeout(5000);
        await browser.close();

        // await page.click(locators.adminSemesterPage.sessionDateIcon(newSessionDates.session14.session_name));
        // await page.fill(locators.adminSemesterPage.sessionYearSelect(newSessionDates.session14.session_name),newSessionDates.session14.year);
        // await page.click(locators.adminSemesterPage.sessionDateSelect(newSessionDates.session14.session_name, newSessionDates.session14.day));
        // await page.fill(locators.adminSemesterPage.sessionTimeHours(newSessionDates.session14.session_name), '10');
        // await page.fill(locators.adminSemesterPage.sessionTimeMinutes(newSessionDates.session14.session_name), '00');
        // await page.selectOption(locators.adminSemesterPage.sessionMonthSelect(newSessionDates.session14.session_name), {value : newSessionDates.session14.month});
        // await page.click(locators.adminSemesterPage.sessionSaveButton(newSessionDates.session14.session_name));
})

// To Run The code ---> npx playwright test tests/operatingSemesterSetup.spec.ts