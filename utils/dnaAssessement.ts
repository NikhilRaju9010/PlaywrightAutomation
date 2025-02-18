import { locators } from '../utils/locators';

export async function dnaTest(page: any, test:any) {

    test.setTimeout(0);
    page.setDefaultTimeout(30000);
    // Loop for the first 2 questions
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
}