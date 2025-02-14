import { test ,chromium} from '@playwright/test';
import { locators } from '../utils/locators';
import {getFutureDate} from '../utils/getFutureDate';

test('Converting a semester to Recruiting' , async () => {

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
        await page.goto(locators.adminSemesterPage.adminSemesterPageURL,{ timeout: 120000 });
        await page.click(locators.adminSemesterPage.acceleratorKickoffSession);
        console.log(getFutureDate(10).month.toString());
        await page.selectOption(locators.adminSemesterPage.monthDropDown, {value :getFutureDate(10).month.toString()});
        console.log(getFutureDate(10).day.toString());
        const newDate = await page.locator(locators.adminSemesterPage.dateSelect(getFutureDate(10).day.toString()));
        await newDate.click();
        await page.fill(locators.adminSemesterPage.yearSelect,getFutureDate(10).year.toString());
        await page.fill(locators.adminSemesterPage.timeHours, '10');
        await page.fill(locators.adminSemesterPage.timeMinutes, '00');
        await page.click(locators.adminSemesterPage.savetimeAndDate);
        const semesterStatus = await page.textContent(locators.adminSemesterPage.recruitingText);
        const { day, month, year } = getFutureDate(10)
        const newMonth = month + 1;
        console.log('Semester is converted to '+ semesterStatus + ` with startdate of :- ${day} / ${newMonth} / ${year}` );



});

// To Run The code ---> npx playwright test tests/recruitingSemesterSetup.spec.ts