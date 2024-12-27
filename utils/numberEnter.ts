import { Page } from '@playwright/test';

export class NumberEntry {
  static async enterNumber(page: Page, selector: string, number: string): Promise<void> {
    const numericInput = await page.locator(selector);
    for (const digit of number.toString()) {
      const intDigit = parseInt(digit);
      
      switch (intDigit) {
        case 0:
          await numericInput.click();
          await page.keyboard.type('0');
          break;
        case 1:
          await numericInput.click();
          await page.keyboard.type('1');
          break;
        case 2:
          await numericInput.click();
          await page.keyboard.type('2');
          break;
        case 3:
          await numericInput.click();
          await page.keyboard.type('3');
          break;
        case 4:
          await numericInput.click();
          await page.keyboard.type('4');
          break;
        case 5:
          await numericInput.click();
          await page.keyboard.type('5');
          break;
        case 6:
          await numericInput.click();
          await page.keyboard.type('6');
          break;
        case 7:
          await numericInput.click();
          await page.keyboard.type('7');
          break;
        case 8:
          await numericInput.click();
          await page.keyboard.type('8');
          break;
        case 9:
          await numericInput.click();
          await page.keyboard.type('9');
          break;
        default:
          throw new Error(`Invalid digit: ${intDigit}`);
      }
    }
  }
}
