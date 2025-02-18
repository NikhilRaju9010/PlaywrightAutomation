import { locators } from '../utils/locators';
import { NumberEntry } from '../utils/numberEnter';

export async function payment(page: any,test:any) {
    test.setTimeout(0); 
    page.setDefaultTimeout(30000); // Set default timeout for element actions to 30 seconds
    await NumberEntry.enterNumber(page, locators.acceptedUser.cardNumber, '4242424242424242'); // Card Number
    await NumberEntry.enterNumber(page, locators.acceptedUser.mmAndyy, '1234'); // Expiry Date (MM/YY)
    await NumberEntry.enterNumber(page, locators.acceptedUser.cvc, '567'); // CVV
    await page.fill(locators.acceptedUser.cardHolderName, locators.acceptedUser.cardHolderNameText); // Card Holder Name
    await page.locator(locators.acceptedUser.cardHolderName).press('Enter');
    console.log('Payment completed successfully');
}