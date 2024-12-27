import { test ,chromium} from '@playwright/test';
import { NumberEntry } from '../utils/numberEnter';
import { RandomWeightGenerator } from '../utils/randomWaitGenerator';
import { ScreenshotsUtil } from '../utils/screenShotsUtil';
import { generateFirstName, generateLastName, generateEmail, generateRandomPassword } from '../utils/userInfoGenerator';
test('Lead to Confirmed automation flow of a founder', async () => {

    test.setTimeout(300000); // ## 5 Minutes Wait ##

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.setViewportSize({ width: 1920, height: 1080 });

    //Screen Shots
    const savePath = './screen-shots';
    const browserName = 'chromium';

    ScreenshotsUtil.createScreenshotDirectory(savePath);
    const runFolder = ScreenshotsUtil.getRunFolder(savePath);
    ScreenshotsUtil.createScreenshotDirectory(runFolder);


    await page.goto('https://startcouncil.org/join?target=11160',{ timeout: 120000 });
    await ScreenshotsUtil.captureScreenshot(page, runFolder, 'Login Page', browserName);
    console.log("User landed on the FI login/signup page");
    const pageWaitTime = RandomWeightGenerator.getRandomWeight();
    await page.waitForTimeout(pageWaitTime);

    await page.waitForSelector("(//span[contains(text(),'Apply')])[1]", { state: 'visible' });
    await page.click("(//span[contains(text(),'Apply')])[1]");
    const applyButtonWaitTime = RandomWeightGenerator.getRandomWeight();
    await page.waitForTimeout(applyButtonWaitTime);

    // User Registration
    const userFirstName = generateFirstName();
    await page.waitForSelector("//input[@name='user[first_name]']", { state: 'visible' });
    await page.fill("//input[@name='user[first_name]']", userFirstName);
    const userFirstNameWaitTime = RandomWeightGenerator.getRandomWeight();
    await page.waitForTimeout(userFirstNameWaitTime);

    const userLastName = generateLastName();
    await page.waitForSelector("//input[@name='user[last_name]']", { state: 'visible' });
    await page.fill("//input[@name='user[last_name]']", userLastName);
    const userLastNameWaitTime = RandomWeightGenerator.getRandomWeight();
    await page.waitForTimeout(userLastNameWaitTime);

    const userEmail = generateEmail(userFirstName, userLastName);
    await page.waitForSelector("//input[@name='user[email]' and @id='top_email']", { state: 'visible' });
    await page.fill("//input[@name='user[email]' and @id='top_email']", userEmail);
    const userEmailWeightTime = RandomWeightGenerator.getRandomWeight();
    await page.waitForTimeout(userEmailWeightTime);

    const userPassword = generateRandomPassword(10);
    await page.waitForSelector("//input[@name='user[password]' and @id='top_password']", { state: 'visible' });
    await page.fill("//input[@name='user[password]' and @id='top_password']", userPassword);
    const userPasswordWaitTime = RandomWeightGenerator.getRandomWeight();
    await page.waitForTimeout(userPasswordWaitTime);

    await page.waitForSelector("//select[@id='top_idea_state_cd']", { state: 'visible' });
    await page.selectOption("//select[@id='top_idea_state_cd']", { label: "Early idea" });
    const ideStateWaightTime = RandomWeightGenerator.getRandomWeight();
    await page.waitForTimeout(ideStateWaightTime);

    await page.waitForSelector("(//div[contains(text(),'or Apply with')]/preceding::input)[13]", { state: 'visible' });
    await page.click("(//div[contains(text(),'or Apply with')]/preceding::input)[13]");
    await page.waitForTimeout(3000);

    console.log("A user registered successfully");
    console.log('Founder Email : ' + userEmail);
    console.log('Founder Name : ' + userFirstName + ' ' + userLastName);
    console.log('Founder Password : ' + userEmail);

    // Application Flow
    await page.waitForSelector("//select[@id='user_education_cd']", { state: 'visible' });
    await page.selectOption("//select[@id='user_education_cd']", { label: "High School" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@id='user_professional_experience_cd']", { state: 'visible' });
    await page.selectOption("//select[@id='user_professional_experience_cd']", { label: "3-4" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@id='user_start_up_experience_cd']", { state: 'visible' });
    await page.selectOption("//select[@id='user_start_up_experience_cd']", { label: "3-4" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@id='user_idea_field_experience_cd']", { state: 'visible' });
    await page.selectOption("//select[@id='user_idea_field_experience_cd']", { label: "5-10" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@id='user_working_hrs_on_idea_cd']", { state: 'visible' });
    await page.selectOption("//select[@id='user_working_hrs_on_idea_cd']", { label: "11-20" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@id='user_team_size_cd']", { state: 'visible' });
    await page.selectOption("//select[@id='user_team_size_cd']", { label: "2" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@id='user_team_working_hrs']", { state: 'visible' });
    await page.selectOption("//select[@id='user_team_working_hrs']", { label: "3-4" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@id='user_team_tech_experience']", { state: 'visible' });
    await page.selectOption("//select[@id='user_team_tech_experience']", { label: "Yes" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@id='user_team_business_experience']", { state: 'visible' });
    await page.selectOption("//select[@id='user_team_business_experience']", { label: "Yes" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@id='user_business_incorporated']", { state: 'visible' });
    await page.selectOption("//select[@id='user_business_incorporated']", { label: "Yes" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@id='user_primary_skill_cd']", { state: 'visible' });
    await page.selectOption("//select[@id='user_primary_skill_cd']", { label: "Marketing" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//textarea[@id='user_field_2']", { state: 'visible' });
    await page.fill("//textarea[@id='user_field_2']", "Write 1-­2 paragraphs describing your startup idea.");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@name='user[idea_align]']", { state: 'visible' });
    await page.selectOption("//select[@name='user[idea_align]']", { label: "04. Quality Education" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//textarea[@name='user[idea_and_positive_impact]']", { state: 'visible' });
    await page.fill("//textarea[@name='user[idea_and_positive_impact]']", "Write 1-­2 paragraphs describing your startup idea.");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@name='user[primary_industry]']", { state: 'visible' });
    await page.selectOption("//select[@name='user[primary_industry]']", { label: "AgriTech / PetTech" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@name='user[secondary_industry]']", { state: 'visible' });
    await page.selectOption("//select[@name='user[secondary_industry]']", { label: "AdTech / Marketing" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@name='user[primary_help]']", { state: 'visible' });
    await page.selectOption("//select[@name='user[primary_help]']", { label: "Improving My Idea/ Strategy" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//select[@name='user[secondary_help]']", { state: 'visible' });
    await page.selectOption("//select[@name='user[secondary_help]']", { label: "Internationalization" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//button[contains(text(),'Continue')]", { state: 'visible' });
    await page.click("//button[contains(text(),'Continue')]");
    await page.waitForTimeout(1000);

    // Personal Information
    await page.waitForSelector("//select[@id='user_gender']", { state: 'visible' });
    await page.selectOption("//select[@id='user_gender']", { label: "Non binary" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@id='user_phone_number_tmp']", { state: 'visible' });
    await page.fill("//input[@id='user_phone_number_tmp']", "2015551234");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@id='user_linkedin_website']", { state: 'visible' });
    await page.fill("//input[@id='user_linkedin_website']", "https://linkedin.com");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@id='location_city']", { state: 'visible' });
    await page.fill("//input[@id='location_city']", "Bali");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@id='location_country']", { state: 'visible' });
    await page.fill("//input[@id='location_country']", "Indonesia");
    await page.waitForTimeout(1000);

    await page.waitForSelector("(//span[@class='selection'])[2]", { state: 'visible' });
    await page.click("(//span[@class='selection'])[2]");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@class='select2-search__field']", { state: 'visible' });
    await page.fill("//input[@class='select2-search__field']", "algeria");
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);

    // Company Information
    await page.waitForSelector("//input[@id='company_name']", { state: 'visible' });
    await page.fill("//input[@id='company_name']", "Automation");
    await page.waitForTimeout(1000);

    // Referral Source
    await page.waitForSelector("//select[@id='user_source_3']", { state: 'visible' });
    await page.selectOption("//select[@id='user_source_3']", { value: "Twitter" });
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@id='user_source_1']", { state: 'visible' });
    await page.fill("//input[@id='user_source_1']", "Friend");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//button[contains(text(),'Submit Application')]", { state: 'visible' });
    await page.click("//button[contains(text(),'Submit Application')]");
    await page.waitForTimeout(1000);
    //await page.close(); // **<<<<< Delete this line to continue the DNA test >>>>>**

    // DNA Assessment
    await page.waitForSelector("//a[contains(text(),'Start the Assessment')]");
    await page.click("//a[contains(text(),'Start the Assessment')]");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//a[contains(text(),'Get Started')]");
    await page.click("//a[contains(text(),'Get Started')]");
    await page.waitForTimeout(1000);
    await ScreenshotsUtil.captureScreenshot(page, runFolder, 'DNA test', browserName);

    // First loop for questions 1 to 2
    for (let questionNumber = 1; questionNumber <= 2; questionNumber++) {
        for (let buttonIndex = 2; buttonIndex <= 5; buttonIndex += 3) {
            const dynamicXPath = `(//div[contains(text(),'question ${questionNumber}')]/following::button)[${buttonIndex}]`;
            console.log(`Clicking button for Question ${questionNumber}, Button Index ${buttonIndex}: ${dynamicXPath}`);
            
            const button = page.locator(dynamicXPath);
            await page.waitForSelector(dynamicXPath);
            await button.waitFor({ state: 'visible' });    
            await button.click();
        }
    }

    await page.waitForTimeout(1000);
    await page.waitForSelector("//button[contains(text(),'Start the full test')]");
    await page.click("//button[contains(text(),'Start the full test')]");
    await page.waitForTimeout(1000);

    // Second loop for questions 1 to 43
    for (let questionNumber = 1; questionNumber <= 43; questionNumber++) {
        for (let buttonIndex = 2; buttonIndex <= 5; buttonIndex += 3) {
            const dynamicXPath = `(//div[contains(text(),'question ${questionNumber}')]/following::button)[${buttonIndex}]`;
            //console.log(`Clicking button for Question ${questionNumber}, Button Index ${buttonIndex}: ${dynamicXPath}`);
            
            const button = page.locator(dynamicXPath);
            await page.waitForSelector(dynamicXPath);
            await button.waitFor({ state: 'visible' });
            await button.click();
        }
    }

    await page.waitForTimeout(1000);
    await page.waitForSelector("//button[contains(text(),'Continue')]");
    await page.click("//button[contains(text(),'Continue')]");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//div[@data-answer='3']");
    await page.click("//div[@data-answer='3']");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//button[contains(text(),'Continue')]");
    await page.click("//button[contains(text(),'Continue')]");
    await page.waitForTimeout(1000);

    for (let i = 1; i <= 11; i++) {
        await page.waitForTimeout(1000);
        await page.waitForSelector("//div[@data-answer='3']");
        await page.click("//div[@data-answer='3']");
        await page.waitForTimeout(1000);
    }

    await page.waitForTimeout(1000);
    await page.waitForSelector("//button[contains(text(),'Submit and view report')]");
    await page.click("//button[contains(text(),'Submit and view report')]");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//h4[contains(text(),'See Next Steps')]");
    await page.click("//h4[contains(text(),'See Next Steps')]");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//div[contains(text(),'Your Application to')]/preceding-sibling::div");
    const userNameText = await page.textContent("//div[contains(text(),'Your Application to')]/preceding-sibling::div");
    await page.waitForSelector("//div[contains(text(),'Your Application to')]");
    const applicationNameText = await page.textContent("//div[contains(text(),'Your Application to')]");
    console.log(`* ${userNameText} <---> ${applicationNameText} *`);
    await page.waitForTimeout(1000);

    await page.waitForSelector("//i[@class='fi-icon-user']", {state: 'visible'});
    await page.click("//i[@class='fi-icon-user']");

    await page.waitForSelector("//div[contains(text(),'Logout')]", {state: 'visible'});
    await page.click("//div[contains(text(),'Logout')]");
    await page.waitForTimeout(2000);

    // SuperAdmin Login

    await page.waitForSelector("//span[contains(text(),'Sign in')]", { state: 'visible' });
    await page.click("//span[contains(text(),'Sign in')]");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@name='user[email]' and @id='#form_email_address']", { state: 'visible' });
    await page.fill("//input[@name='user[email]' and @id='#form_email_address']", "bv@fi.co");

    await page.waitForSelector("//input[@name='user[password]' and @placeholder='Password']", { state: 'visible' });
    await page.fill("//input[@name='user[password]' and @placeholder='Password']", "qwerty@fiqa");

    await page.waitForSelector("//span[contains(text(),'Login')]", { state: 'visible' });
    await page.click("//span[contains(text(),'Login')]");
    await page.waitForTimeout(1000);

    await page.goto('https://startcouncil.org/admin/enrollmentmeta');
    await ScreenshotsUtil.captureScreenshot(page, runFolder, 'Super_Admin_Login', browserName);
    await page.waitForTimeout(1000);

    await page.waitForSelector("//iframe[@id='embedded_iframe']", { state: 'visible' });
    const iframe = await page.waitForSelector("//iframe[@id='embedded_iframe']");
    const frame = await iframe.contentFrame();

    if (frame) {
        await frame.waitForSelector("//input[@id='user_name']", { state: 'visible' });
        const searchField = await frame.locator("//input[@id='user_name']");

        await searchField.fill(userEmail);
        await page.waitForTimeout(1000);
        await frame.waitForSelector("//input[@value='Search']", { state: 'visible' });
        const searchButton = await frame.locator("//input[@value='Search']");
        await searchButton.click();
        await page.waitForTimeout(1000);

        await frame.waitForSelector("(//div[@id='search']/child::form/child::div/child::select)[1]", { state: 'visible' });
        const statusDropdown = await frame.locator("(//div[@id='search']/child::form/child::div/child::select)[1]");
        await statusDropdown.selectOption({ value: 'Accepted' });
        await page.waitForTimeout(1000);

        await frame.waitForSelector("//div[@id='search']/child::form/child::div/child::select/following-sibling::input", { state: 'visible' });
        const statusSave = await frame.locator("//div[@id='search']/child::form/child::div/child::select/following-sibling::input");
        await statusSave.click();
        await page.waitForTimeout(1000);
    }
    console.log("<<<<<< Founder moved to confirmed state >>>>>>");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//i[@class='fi-icon-user']", {state: 'visible'});
    await page.click("//i[@class='fi-icon-user']");

    await page.waitForSelector("//div[contains(text(),'Logout')]", {state: 'visible'});
    await page.click("//div[contains(text(),'Logout')]");
    await page.waitForTimeout(2000);


    // User Agreement and Payment

    await page.waitForSelector("//span[contains(text(),'Sign in')]");
    await page.click("//span[contains(text(),'Sign in')]");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@name='user[email]' and @id='#form_email_address']");
    await page.fill("//input[@name='user[email]' and @id='#form_email_address']", userEmail);

    await page.waitForSelector("//input[@name='user[password]' and @placeholder='Password']");
    await page.fill("//input[@name='user[password]' and @placeholder='Password']", userPassword);

    await page.waitForSelector("//span[contains(text(),'Login')]");
    await page.click("//span[contains(text(),'Login')]");
    await page.waitForTimeout(1000);

    await page.waitForSelector("//a[contains(text(),'Sign the Entrance Agreement')]");
    await page.click("//a[contains(text(),'Sign the Entrance Agreement')]");
    await page.waitForTimeout(1000);

    await page.waitForSelector("(//div[contains(text(),'Review and Sign')]/following-sibling::div/following::button)[1]");
    await page.click("(//div[contains(text(),'Review and Sign')]/following-sibling::div/following::button)[1]");
    await page.waitForTimeout(1000);

    const agreementFilePath = 'C:\\Users\\Nikhil Raju\\Documents\\AutomationFiles\\enterance_agreement_test.pdf';
    await page.waitForTimeout(2000);

    await page.waitForSelector("(//div[contains(text(),'Upload the signed')]/following::input)[1]");
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click("(//div[contains(text(),'Upload the signed')]/following::input)[1]")
    ]);
    await fileChooser.setFiles(agreementFilePath);
    await page.waitForTimeout(1000);

    await page.waitForSelector("(//div[contains(text(),'Upload the signed')]/following::input)[2]", { state: 'visible', timeout: 12000 });
    await page.click("(//div[contains(text(),'Upload the signed')]/following::input)[2]");
    await page.waitForTimeout(2000);

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
    await page.waitForTimeout(1000);

    await page.waitForSelector("(//span[@class='InputContainer'])[3]", { state: 'visible', timeout: 12000  });
    await page.waitForSelector("(//span[@class='InputContainer'])[3]");
    await NumberEntry.enterNumber(page, "(//span[@class='InputContainer'])[3]", '567'); // CVV
    
    await page.waitForSelector("//input[@id='billingName']");
    await page.fill("//input[@id='billingName']","dummy"); // Card Holder Name
    await page.waitForTimeout(1000);

    await page.waitForSelector("//input[@id='billingName']", { state: 'visible', timeout: 12000  });
    await page.locator("//input[@id='billingName']").press('Enter');
    await page.waitForTimeout(3000);
    
    await page.waitForSelector("(//div[@id='collapse_operating']/child::a)[1]");
    await page.click("(//div[@id='collapse_operating']/child::a)[1]");
    await ScreenshotsUtil.captureScreenshot(page, runFolder, 'Enrolled Founder UI', browserName);
  
    const welcomeMsg = await page.textContent("(//h3)[1]");
    console.log(`* ${welcomeMsg} *`);
  
    await page.waitForTimeout(10000);
    await page.waitForSelector("//span[contains(text(),'Log out')]", {state:'visible'});
    await page.click("//span[contains(text(),'Log out')]");
    await page.waitForTimeout(2000);
    await page.close();

});

//npx playwright test mainTest.spec.ts    ### to run the test
