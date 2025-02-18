import { test ,chromium} from '@playwright/test';
import { locators } from '../utils/locators';
import {generateFirstName, generateLastName, generateEmail} from '../utils/userInfoGenerator';
import { dnaTest } from '../utils/dnaAssessement';
import { payment } from '../utils/paymentProcess';

test('DNA User Registeration' , async () => {

    test.setTimeout(0); 

    const browser = await chromium.launch({ 
        headless: process.env.CI ? true : false
    });

    const sampleEmails : Record<string, string> = {
        email_1: 'Your login for the Founder Institute Assessment',
      }
    
    const page = await browser.newPage();

    await page.setViewportSize({ width: 1920, height: 1080 });
    page.setDefaultTimeout(30000); // Set default timeout for element actions to 30 seconds

    await page.goto(locators.dnaRegisteration.dnaPageUrl,{ timeout: 120000 });

    await page.click(locators.dnaRegisteration.takeAssessmentButton);

    const userFirstName = generateFirstName();
    await page.fill(locators.dnaRegisteration.firstName,userFirstName );

    const userLastName = generateLastName();
    await page.fill(locators.dnaRegisteration.lastName, userLastName);

    const userEmail = generateEmail(userFirstName, userLastName);
    await page.fill(locators.dnaRegisteration.userEmail, userEmail);

    await page.selectOption(locators.dnaRegisteration.userSource, { value: 'Meetup' });
    await page.click(locators.dnaRegisteration.startAssessmentButton);
    await page.waitForSelector(locators.dnaRegisteration.regConfirmation,{state: 'visible'});
    console.log('User registered successfully');
    console.log(`User Name : ${userFirstName}  ${userLastName}`);
    console.log(`User Email : ${userEmail}`);

    await page.goto(locators.pageURL.startcouncil,{ timeout: 120000 });
    await page.click(locators.login.signInButton);
    await page.fill(locators.login.userEmailFeild,locators.login.adminEmail);
    await page.fill(locators.login.userPasswordFeild, locators.login.adminPassword);
    await page.click(locators.login.loginButton);
    console.log('SuperAdmin logged in successfully');

    await page.goto("https://admin.startcouncil.org/emails",{ timeout: 120000 });
    console.log('Navigated to Admin Emails page');
    await page.fill(locators.adminStartcouniclPage.emailToFeild,userEmail);
    await page.click(locators.adminStartcouniclPage.filterButton);
    await page.click(locators.adminStartcouniclPage.userEmails(userEmail));

    const subject = await page.textContent(locators.adminStartcouniclPage.userEmailSubject(userEmail));
    const sampleText = sampleEmails.email_1 || ''; 
    const subjectText = subject?.trim() || '';
    console.log('Sample Text:', sampleText);
    console.log('Subject Text:', subjectText);

    const isReceived = sampleText.split(/\s+/).every(word => subjectText.includes(word));

    if (isReceived) {
        console.log(`Founder received ${subject}`);
    } else {
        console.log(`Founder did NOT receive ${subject}`);
    }

    const magicLinkElement = await page.locator(locators.dnaRegisteration.superMagicLinkDNA);
    const hrefValue = await magicLinkElement.getAttribute('href'); 
    await page.click(locators.adminStartcouniclPage.logout);

    if (hrefValue) { 
    console.log(`Magic Link for DNA: ${hrefValue}`);
    await page.goto(hrefValue);
    } else {
    console.error('Error: Magic link href not found!');
    }

    await page.click(locators.dnaRegisteration.getStartedButton);
    await page.click(locators.dnaRegisteration.startTheAssessmentBtn);

    //dnaTest(page,test);
    for (let questionNumber = 1; questionNumber <= 2; questionNumber++) {
        for (let buttonIndex = 2; buttonIndex <= 5; buttonIndex += 3) {
            const dynamicXPath = locators.dnaTest.questionButton(questionNumber, buttonIndex);
            console.log(`Clicking button: ${dynamicXPath}`);

            const button = page.locator(dynamicXPath);
            await button.waitFor({ state: 'visible' });
            await button.click();
        }
    }
    
    await page.click(locators.dnaTest.fullTest);

    // Loop for questions 1 to 43
    for (let questionNumber = 1; questionNumber <= 43; questionNumber++) {
        for (let buttonIndex = 2; buttonIndex <= 5; buttonIndex += 3) {
            const dynamicXPath = locators.dnaTest.questionButton(questionNumber, buttonIndex);

            const button = page.locator(dynamicXPath);
            await button.waitFor({ state: 'visible' });
            await button.click();
        }
    }

    await page.click(locators.dnaTest.testContinue);
    await page.click(locators.dnaTest.imageAnswer);
    await page.click(locators.dnaTest.testContinue);

    // Loop for questions 44 to 54 (Image Questions)
    for (let imageQuestionNumber = 44; imageQuestionNumber <= 54; imageQuestionNumber++) {
        const dynamicXPath = locators.dnaTest.imageQuestionButton(imageQuestionNumber);

        const button = page.locator(dynamicXPath);
        await button.waitFor({ state: 'visible' });
        await button.click();
    }

    await page.click(locators.dnaTest.submitTest);

    console.log('DNA test completed successfully');
    await page.waitForTimeout(3000);



    await page.click(locators.dnaRegisteration.upgradeFullReport);

    payment(page,test);


});

// To run the test - npx playwright test tests/dnaRegisteration.spec.ts