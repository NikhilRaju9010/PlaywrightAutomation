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

        //User Signup

        await page.goto(locators.pageURL.startcouncil,{ timeout: 120000 });
        await ScreenshotsUtil.captureScreenshot(page, runFolder, 'Login Page', browserName);
        console.log("User landed on the FI login/signup page");
        await page.waitForTimeout(RandomWeightGenerator.getRandomWeight());
    
        await page.waitForSelector(locators.loginPage.applyButton, { state: 'visible' });
        await page.click(locators.loginPage.applyButton);
        await page.waitForTimeout(RandomWeightGenerator.getRandomWeight());

        const userFirstName = generateFirstName();
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
        console.log('Founder Password : ' + userPassword);

        //Application Questions

        await page.selectOption(locators.applicationQuestions.highest_level_of_education, { value: "1" });
        await page.selectOption(locators.applicationQuestions.years_of_professional_experience, { value : "1" });
        await page.selectOption(locators.applicationQuestions.years_of_startUp_experience, { value : "1" });
        await page.selectOption(locators.applicationQuestions.years_of_experience_on_idea, { value: "1" });
        await page.selectOption(locators.applicationQuestions.working_hours_per_week_on_idea, { value : "1" });
        await page.selectOption(locators.applicationQuestions.team_size, { value : "1" });
        await page.selectOption(locators.applicationQuestions.working_together, { value : "1" });
        await page.selectOption(locators.applicationQuestions.technical_experience_team, { value : "Yes" });
        await page.selectOption(locators.applicationQuestions.team_members_with_business_experience, { value: "Yes" });
        await page.selectOption(locators.applicationQuestions.business_already_incorporated, { value : "Yes" });
        await page.selectOption(locators.applicationQuestions.primary_skill_set, { value: "1" });
        await page.fill(locators.applicationQuestions.Describe_your_startup, locators.applicationQuestions.AboutMyStartup);
        await page.selectOption(locators.applicationQuestions.Sustainable_Development_Goal, { value : "07. Renewable Energy" });
        await page.fill(locators.applicationQuestions.positive_impact_on_idea, locators.applicationQuestions.positiveImpact);
        await page.selectOption(locators.applicationQuestions.primary_industry, { value : "AdTech / Marketing" });
        await page.selectOption(locators.applicationQuestions.secondary_industry, { value : "Consumer / Music & Entertainment / Art & Creative / Gaming" });
        await page.selectOption(locators.applicationQuestions.primary_help, { value : "Improving My Idea/ Strategy" });
        await page.selectOption(locators.applicationQuestions.secondary_help, { value : "Product Development" });
        await page.click(locators.applicationQuestions.continue_button);

        // Personal Information

        await page.selectOption(locators.personalInformation.gender, { value : "1" });
        await page.fill(locators.personalInformation.phone_Number, locators.personalInformation.phoneNumber);
        await page.fill(locators.personalInformation.LinkedIn, locators.personalInformation.linkedinURL);
        await page.fill(locators.personalInformation.city, locators.personalInformation.cityName);
        await page.fill(locators.personalInformation.Country_of_residence, locators.personalInformation.residenceName );
        await page.click(locators.personalInformation.Country_of_Origin);
        await page.fill(locators.personalInformation.countrySearch, locators.personalInformation.countreySelect );
        await page.keyboard.press('Enter');
        await page.fill(locators.personalInformation.Company_Name, locators.personalInformation.nameOfCompany);
        await page.selectOption(locators.personalInformation.how_you_heard_about, {value : "Facebook"});
        await page.fill(locators.personalInformation.how_you_heard_about_more, locators.personalInformation.how_you_heard_Text);
        await page.click(locators.personalInformation.submit_application_button);

        // DNA Assessment

        await page.click(locators.dnaTest.startAssessment);
        await page.click(locators.dnaTest.getStarted);
        await ScreenshotsUtil.captureScreenshot(page, runFolder, 'DNA test', browserName);

        // First loop for questions 1 to 2
        for (let questionNumber = 1; questionNumber <= 2; questionNumber++) {
            for (let buttonIndex = 2; buttonIndex <= 5; buttonIndex += 3) {
                const dynamicXPath = locators.dnaTest.questionButton(questionNumber,buttonIndex);
                console.log(locators.dnaTest.questionButton(questionNumber,buttonIndex));
                
                const button = page.locator(dynamicXPath);
                await page.waitForSelector(dynamicXPath);
                await button.waitFor({ state: 'visible' });    
                await button.click();
            }
        }
        await page.click(locators.dnaTest.fullTest);

        // Second loop for questions 1 to 43
        for (let questionNumber = 1; questionNumber <= 43; questionNumber++) {
            for (let buttonIndex = 2; buttonIndex <= 5; buttonIndex += 3) {
                const dynamicXPath = locators.dnaTest.questionButton(questionNumber,buttonIndex);
                
                const button = page.locator(dynamicXPath);
                await page.waitForSelector(dynamicXPath);
                await button.waitFor({ state: 'visible' });    
                await button.click();
            }
        }
        await page.click(locators.dnaTest.testContinue);
        await page.click(locators.dnaTest.imageAnswer);
        await page.click(locators.dnaTest.testContinue);

        for (let i = 1; i <= 11; i++) {
            await page.waitForSelector(locators.dnaTest.imageAnswer);
            await page.click(locators.dnaTest.imageAnswer);
        }
        await page.click(locators.dnaTest.submitTest);
        await page.click(locators.dnaTest.nextStep);

})