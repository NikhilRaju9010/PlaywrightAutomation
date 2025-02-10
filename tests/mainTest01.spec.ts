import { test ,chromium} from '@playwright/test';
import { NumberEntry } from '../utils/numberEnter';
import { RandomWeightGenerator } from '../utils/randomWaitGenerator';
import { ScreenshotsUtil } from '../utils/screenShotsUtil';
import { generateFirstName, generateLastName, generateEmail, generateRandomPassword } from '../utils/userInfoGenerator';
import { locators } from '../utils/locators';

test('User Registeration Flow' , async () => {

    test.setTimeout(300000); // ## 5 Minutes Wait ##

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.setViewportSize({ width: 1920, height: 1080 });

        const savePath = './screen-shots';
        const browserName = 'chromium';
    
        ScreenshotsUtil.createScreenshotDirectory(savePath);
        const runFolder = ScreenshotsUtil.getRunFolder(savePath);
        ScreenshotsUtil.createScreenshotDirectory(runFolder);  

        await page.goto(locators.pageURL.startcouncil,{ timeout: 120000 });
        await ScreenshotsUtil.captureScreenshot(page, runFolder, 'Login Page', browserName);
        console.log("User landed on the FI login/signup page");
        await page.waitForTimeout(RandomWeightGenerator.getRandomWeight());
    
        await page.waitForSelector(locators.loginPage.applyButton, { state: 'visible' });
        await page.click(locators.loginPage.applyButton);
        await page.waitForTimeout(RandomWeightGenerator.getRandomWeight());

        const userFirstName = generateFirstName();
        console.log('Locator:', locators.loginPage.firstName);
        await page.waitForSelector(locators.loginPage.firstName, { state: 'visible' });
        await page.fill(locators.loginPage.firstName, userFirstName);
        await page.waitForTimeout(RandomWeightGenerator.getRandomWeight());

        const userLastName = generateLastName();
        await page.waitForSelector(locators.loginPage.lastName, { state: 'visible' });
        await page.fill(locators.loginPage.lastName, userLastName);
        await page.waitForTimeout(RandomWeightGenerator.getRandomWeight());

        const userEmail = generateEmail(userFirstName, userLastName);
        await page.waitForSelector(locators.loginPage.userEmail, { state: 'visible' });
        await page.fill(locators.loginPage.userEmail, userEmail);
        await page.waitForTimeout(RandomWeightGenerator.getRandomWeight());

        const userPassword = generateRandomPassword(10);
        await page.waitForSelector(locators.loginPage.userPassword, { state: 'visible' });
        await page.fill(locators.loginPage.userPassword, userPassword);
        await page.waitForTimeout(RandomWeightGenerator.getRandomWeight());

        await page.waitForSelector(locators.loginPage.ideaState, { state: 'visible' });
        await page.selectOption(locators.loginPage.ideaState, { label: "Early idea" });
        await page.waitForTimeout(RandomWeightGenerator.getRandomWeight());

        await page.waitForSelector(locators.loginPage.applyToCohort, { state: 'visible' });
        await page.click(locators.loginPage.applyToCohort);
        await page.waitForTimeout(3000);

        console.log("A user registered successfully");
        console.log('Founder Email : ' + userEmail);
        console.log('Founder Name : ' + userFirstName + ' ' + userLastName);
        console.log('Founder Password : ' + userEmail);

        
})