import { test ,chromium} from '@playwright/test';
import { locators } from '../utils/locators';
import {sessionList, generateSessionDates, getMonthName} from '../utils/updateSessionDates';
import { NumberEntry } from '../utils/numberEnter'; 

test('Updating the semester sessions dates to make semester to operating' , async () => {

        test.setTimeout(0); 

        const browser = await chromium.launch({ 
            headless: process.env.CI ? true : false
        });
        
        const page = await browser.newPage();

        await page.setViewportSize({ width: 1920, height: 1080 });
        page.setDefaultTimeout(30000); // Set default timeout for element actions to 30 seconds

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
            //console.log(`Clicked on session date icon for: ${session.session_name}`);

            await page.selectOption(locators.adminSemesterPage.sessionMonthSelect(session.session_name), { value: session.month.toString() });
            //console.log(`Selected session month: ${session.month} for ${session.session_name}`);

            await NumberEntry.enterNumber(page, locators.adminSemesterPage.sessionYearSelect(session.session_name), session.year);
            //console.log(`Filled session year: ${session.year} for ${session.session_name}`);

            await page.click(locators.adminSemesterPage.sessionDateSelect(session.session_name, session.day));
            //console.log(`Selected session date: ${session.day} for ${session.session_name}`);

            await NumberEntry.enterNumber(page, locators.adminSemesterPage.sessionTimeHours(session.session_name), '10');
            await NumberEntry.enterNumber(page, locators.adminSemesterPage.sessionTimeMinutes(session.session_name), '00');
            //console.log(`Filled session time for ${session.session_name}`);

            await page.click(locators.adminSemesterPage.sessionSaveButton(session.session_name));
            //console.log(`Clicked on save button for ${session.session_name}`);

            console.log(`<<<<<<<<< Successfully updated session: ${session.session_name} dates to ${session.day}/${getMonthName(session.month)}/${session.year} >>>>>>>>>`);
        }
        console.log(`Successfully updated All Session Dates`);
        await page.waitForTimeout(5000);
        await browser.close();

})

// To Run The code ---> npx playwright test tests/operatingSemesterSetup.spec.ts