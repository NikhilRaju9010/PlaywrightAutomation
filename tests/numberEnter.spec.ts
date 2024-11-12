import { Page } from '@playwright/test';

export class NumberEntry {
  static async enterNumber(page: Page, selector: string, number: string): Promise<void> {
    const numericInput = await page.locator(selector);
    // for (const digit of number.toString()) {
    //   const intDigit = parseInt(digit);
      
    //   switch (intDigit) {
    //     case 0:
    //       await numericInput.click();
    //       await page.keyboard.press('Numpad0');
    //       break;
    //     case 1:
    //       await numericInput.click();
    //       await page.keyboard.press('Numpad1');
    //       break;
    //     case 2:
    //       await numericInput.click();
    //       await page.keyboard.press('Numpad2');
    //       break;
    //     case 3:
    //       await numericInput.click();
    //       await page.keyboard.press('Numpad3');
    //       break;
    //     case 4:
    //       await numericInput.click();
    //       await page.keyboard.press('Numpad4');
    //       break;
    //     case 5:
    //       await numericInput.click();
    //       await page.keyboard.press('Numpad5');
    //       break;
    //     case 6:
    //       await numericInput.click();
    //       await page.keyboard.press('Numpad6');
    //       break;
    //     case 7:
    //       await numericInput.click();
    //       await page.keyboard.press('Numpad7');
    //       break;
    //     case 8:
    //       await numericInput.click();
    //       await page.keyboard.press('Numpad8');
    //       break;
    //     case 9:
    //       await numericInput.click();
    //       await page.keyboard.press('Numpad9');
    //       break;
    //     default:
    //       throw new Error(`Invalid digit: ${intDigit}`);
    //   }
    // }
    for (const digit of number) {
      const intDigit = parseInt(digit)
      if (intDigit >= 0 && intDigit <= 9) {
        await numericInput.click();
        await page.keyboard.press(`Numpad${intDigit}`);
      } else {
        throw new Error(`Invalid digit: ${intDigit}`);
      }
    }
  }
}
