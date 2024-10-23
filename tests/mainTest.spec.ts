import { test ,chromium} from '@playwright/test';
import { NumberEntry } from './numberEnter.spec';
import { generateFirstName, generateLastName, generateEmail, generateRandomPassword } from './userInfoGenerator.spec';
import { Console, log } from 'console';
test('Lead to Confirmed automation flow of a founder', async () => {
    test.setTimeout(60000);

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://startcouncil.org/join?target=11160');
    console.log("User landed on the FI login/signup page");
    await page.click("(//span[contains(text(),'Apply')])[1]");

    // User Registration
    const userFirstName = generateFirstName();
    await page.fill("//input[@name='user[first_name]']", userFirstName);

    const userLastName = generateLastName();
    await page.fill("//input[@name='user[last_name]']", userLastName);

    const userEmail = generateEmail(userFirstName, userLastName);
    await page.fill("//input[@name='user[email]' and @id='top_email']", userEmail);

    const userPassword = generateRandomPassword(10);
    await page.fill("//input[@name='user[password]' and @id='top_password']", userPassword);

    await page.selectOption("//select[@id='top_idea_state_cd']", { label: "Early idea" });
    await page.click("(//div[contains(text(),'or Apply with')]/preceding::input)[13]");
    console.log("A user registered successfully");
    console.log('Founder Email : ' + userEmail)
    console.log('Founder Name : ' + userFirstName + ' ' + userLastName);
    console.log('Founder Password : ' + userEmail)

    // Application Flow
    await page.selectOption("//select[@id='user_education_cd']", { label: "High School" });
    await page.selectOption("//select[@id='user_professional_experience_cd']", { label: "3-4" });
    await page.selectOption("//select[@id='user_start_up_experience_cd']", { label: "3-4" });
    await page.selectOption("//select[@id='user_idea_field_experience_cd']", { label: "5-10" });
    await page.selectOption("//select[@id='user_working_hrs_on_idea_cd']", { label: "11-20" });
    await page.selectOption("//select[@id='user_team_size_cd']", { label: "2" });
    await page.selectOption("//select[@id='user_team_working_hrs']", { label: "3-4" });
    await page.selectOption("//select[@id='user_team_tech_experience']", { label: "Yes" });
    await page.selectOption("//select[@id='user_team_business_experience']", { label: "Yes" });
    await page.selectOption("//select[@id='user_business_incorporated']", { label: "Yes" });
    await page.selectOption("//select[@id='user_primary_skill_cd']", { label: "Marketing" });

    await page.fill("//textarea[@id='user_field_2']", "Write 1-­2 paragraphs describing your startup idea (or ideas). If you do not have a final startup idea, then describe an industry or customer problem that you might want to build a business around");

    await page.selectOption("//select[@name='user[idea_align]']", { label: "04. Quality Education" });
    await page.fill("//textarea[@name='user[idea_and_positive_impact]']", "Write 1-­2 paragraphs describing your startup idea (or ideas). If you do not have a final startup idea, then describe an industry or customer problem that you might want to build a business around");

    await page.selectOption("//select[@name='user[primary_industry]']", { label: "AgriTech / PetTech" });
    await page.selectOption("//select[@name='user[secondary_industry]']", { label: "AdTech / Marketing" });
    await page.selectOption("//select[@name='user[primary_help]']", { label: "Improving My Idea/ Strategy" });
    await page.selectOption("//select[@name='user[secondary_help]']", { label: "Internationalization" });

    await page.click("//button[contains(text(),'Continue')]");

    // Personal Information
    await page.selectOption("//select[@id='user_gender']", { label: "Non binary" });
    await page.fill("//input[@id='user_phone_number_tmp']", "2015551234");
    await page.fill("//input[@id='user_linkedin_website']", "https://linkedin.com");

    await page.fill("//input[@id='location_city']", "Bali");
    await page.fill("//input[@id='location_country']", "Indonesia");

    await page.click("(//span[@class='selection'])[2]");
    await page.fill("//input[@class='select2-search__field']", "algeria");
    await page.keyboard.press('Enter');

    // Company Information
    await page.fill("//input[@id='company_name']", "Automation");

    // Referral Source
    await page.selectOption("//select[@id='user_source_3']", { label: "Twitter" });
    await page.fill("//input[@id='user_source_1']", "Friend");
    await page.waitForTimeout(1000);

    await page.click("//button[contains(text(),'Submit Application')]");
    await page.waitForTimeout(1000);
    await page.close(); // **Delete this line to continue the DNA test**

    /*
    // DNA Assessment
    await page.waitForTimeout(1000);
    await page.click("//a[contains(text(),'Start the Assessment')]");
    await page.waitForTimeout(1000);
    await page.click("//a[contains(text(),'Get Started')]");

    for (let questionNumber = 1; questionNumber <= 2; questionNumber++) {
        for (let buttonIndex = 2; buttonIndex <= 5; buttonIndex += 3) {
            const dynamicXPath = `(//div[contains(text(),'question ${questionNumber}')]/following::button)[${buttonIndex}]`;
            console.log(`Clicking button for Question ${questionNumber}, Button Index ${buttonIndex}: ${dynamicXPath}`);
            const button = page.locator(dynamicXPath);
            await button.waitFor({ state: 'visible' });    
            await button.click();
        }
    }

    await page.waitForTimeout(1000);
    await page.click("//button[contains(text(),'Start the full test')]");

    for (let questionNumber = 1; questionNumber <= 43; questionNumber++) {
        for (let buttonIndex = 2; buttonIndex <= 5; buttonIndex += 3) {
            const dynamicXPath = `(//div[contains(text(),'question ${questionNumber}')]/following::button)[${buttonIndex}]`;
            console.log(`Clicking button for Question ${questionNumber}, Button Index ${buttonIndex}: ${dynamicXPath}`);
            const button = page.locator(dynamicXPath);
            await button.waitFor({ state: 'visible' });
            await button.click();
        }
    }

    await page.waitForTimeout(1000);
    await page.click("//button[contains(text(),'Continue')]");
    await page.waitForTimeout(1000);
    await page.click("//div[@data-answer='3']");
    await page.waitForTimeout(1000);
    await page.click("//button[contains(text(),'Continue')]");
    await page.waitForTimeout(1000);

    for (let i = 1; i <= 11; i++) {
        await page.waitForTimeout(1000);
        await page.click("//div[@data-answer='3']");
        await page.waitForTimeout(1000);
    }

    await page.waitForTimeout(1000);
    await page.click("//button[contains(text(),'Submit and view report')]");
    await page.waitForTimeout(1000);
    await page.click("//h4[contains(text(),'See Next Steps')]");
    await page.waitForTimeout(1000);

    const userNameText = await page.textContent("//div[contains(text(),'Your Application to')]/preceding-sibling::div");
    const applicationNameText = await page.textContent("//div[contains(text(),'Your Application to')]");
    console.log(`* ${userNameText} <---> ${applicationNameText} *`);

    await browser.close();
    */

    // SuperAdmin Login
    await page.goto('https://startcouncil.org/join?target=11160');
    await page.click("//span[contains(text(),'Sign in')]");
    await page.fill("//input[@name='user[email]' and @id='#form_email_address']", "bv@fi.co");
    await page.fill("//input[@name='user[password]' and @placeholder='Password']", "qwerty@fiqa");
    await page.click("//span[contains(text(),'Login')]");

    await page.goto('https://startcouncil.org/admin/enrollmentmeta');

    const iframe = await page.waitForSelector("//iframe[@id='embedded_iframe']");
    const frame = await iframe.contentFrame();

    if(frame){

    const searchField = await frame.locator("//input[@id='user_name']");
    const searchButton = await frame.locator("//input[@value='Search']");

    await searchField.fill(userEmail);
    await searchButton.click();

    const statusDropdown = await frame.locator("(//div[@id='search']/child::form/child::div/child::select)[1]");
    await statusDropdown.selectOption({value:'Accepted'});
    const statusSave = await frame.locator("//div[@id='search']/child::form/child::div/child::select/following-sibling::input");
    await statusSave.click();
    }
    await page.close();
    console.log("Founder moved to confirmed state");
    
    // User Agreement and Payment
    await page.goto('https://startcouncil.org/join?target=11160');
    await page.click("//span[contains(text(),'Sign in')]");

    await page.waitForSelector("//input[@name='user[email]' and @id='#form_email_address']");
    await page.fill("//input[@name='user[email]' and @id='#form_email_address']", userEmail);
    await page.fill("//input[@name='user[password]' and @placeholder='Password']", userPassword);

    await page.click("//span[contains(text(),'Login')]");
    
    await page.waitForSelector("//a[contains(text(),'Sign the Entrance Agreement')]");
    await page.click("//a[contains(text(),'Sign the Entrance Agreement')]");
  
    await page.waitForSelector("(//div[contains(text(),'Review and Sign')]/following-sibling::div/following::button)[1]");
    await page.click("(//div[contains(text(),'Review and Sign')]/following-sibling::div/following::button)[1]");
  
    const agreementFilePath = 'C:\\Users\\NIKHHIL\\Documents\\Automation\\enterance_agreement_test.pdf';
    await page.waitForTimeout(2000);
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click("(//div[contains(text(),'Upload the signed')]/following::input)[1]") // Trigger file chooser
    ]);
    await fileChooser.setFiles(agreementFilePath);
  
    await page.waitForSelector("(//div[contains(text(),'Upload the signed')]/following::input)[2]");
    await page.click("(//div[contains(text(),'Upload the signed')]/following::input)[2]");
  
    await page.click("//button[contains(text(),'Pay the Entrance Fee')]");
  
    await page.click("//button[contains(text(),'Pay with Card')]");
    await page.frameLocator('iframe').locator("(//span[@class='InputContainer'])[1]").fill('4242424242424242'); // Card Number
    await page.frameLocator('iframe').locator("(//span[@class='InputContainer'])[2]").fill('1234'); // Expiry Date (MM/YY)
    await page.frameLocator('iframe').locator("(//span[@class='InputContainer'])[3]").fill('567'); // CVV
    await page.frameLocator('iframe').locator("(//span[@class='InputContainer'])[4]").fill('dummy'); // Cardholder Name
  
    await page.click("//span[contains(text(),'Pay')]");
  
    await page.waitForSelector("(//div[@id='collapse_operating']/child::a)[1]");
    await page.click("(//div[@id='collapse_operating']/child::a)[1]");
  
    const welcomeMsg = await page.textContent("(//h3)[1]");
    console.log(`* ${welcomeMsg} *`);
  
    await page.waitForTimeout(10000);
    
    await browser.close();
    //Application flow of the founder ends

});
