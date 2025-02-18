import { test ,chromium} from '@playwright/test';
import { locators } from '../utils/locators';
import {extractId} from '../utils/extractSemesterID';
test('Creating a New Semester' , async () => {

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
    await page.goto(locators.adminNewSemesterPage.adminNewSemesterPageURL,{ timeout: 120000 });

    const iframe = await page.waitForSelector(locators.adminNewSemesterPage.newSemesterIframe);
    const frame = await iframe.contentFrame();
    if (frame) {
        const semesterCity = await frame.locator(locators.adminNewSemesterPage.semesterCity); 
        await semesterCity.selectOption({value : 'Austin'});

        // I recalled ti Iframe again because the page is reloaded after selecting the Semester city and then iframe is getting lost.
        const newIframe = await page.waitForSelector(locators.adminNewSemesterPage.newSemesterIframe);
        const newFrame = await newIframe.contentFrame();
        if(newFrame){
            await newFrame.waitForLoadState('domcontentloaded'); 
            await newFrame.waitForLoadState('load');

            const semesterName = await newFrame.locator(locators.adminNewSemesterPage.semesterName);
            await semesterName.fill('Test Semester');
            const acceleratorName = await newFrame.locator(locators.adminNewSemesterPage.acceleratorName);
            await acceleratorName.fill('Test Semster Automation');
            const programFormat = await newFrame.locator(locators.adminNewSemesterPage.programFormat);
            await programFormat.selectOption({value : 'virtual_first'});
            const programType = await newFrame.locator(locators.adminNewSemesterPage.programType);
            await programType.selectOption({value : 'regular'});
            const createSemester = await newFrame.locator(locators.adminNewSemesterPage.createSemester);
            await createSemester.click();
        }
    }
    page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept(); // Clicks "OK"
        // await dialog.dismiss(); // Clicks "Cancel"
      });
    console.log('New Semester got created successfully');

    await page.goto("https://startcouncil.org/admin/semester",{ timeout: 120000 });  
    const semesterNameLocator = await page.locator(locators.adminSemesterPage.semesterNameAndID);
    const semesterName = await semesterNameLocator.innerText();
    console.log('New Semester Created with Name :- '+ semesterName);

    const semesterID = semesterName ? extractId(semesterName) : null;
    console.log('New Semester Created with ID :- '+ semesterID);

    await page.waitForTimeout(2000);
});

// To Run The code ---> npx playwright test tests/createNewSemester.spec.ts
// To Run The code in headless mode ---> npx playwright test tests/createNewSemester.spec.ts --headed