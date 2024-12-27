import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class ScreenshotsUtil {
   
  static async captureScreenshot(page: Page, savePath: string, testName: string, browser: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0]; // Format: yyyyMMdd_HHmmss
    const screenshotName = `${testName}_${browser}_${timestamp}.png`;

    const destination = path.join(savePath, screenshotName);

    try {
      await page.screenshot({ path: destination });
      console.log(`Screenshot saved as: ${destination}`);
    } catch (error) {
      console.error(`Failed to save screenshot: `,error);
    }
  }

  static createScreenshotDirectory(directoryPath: string): void {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
      console.log(`Directory created at: ${directoryPath}`);
    }
  }


  static getRunFolder(basePath: string): string {
    const directories = fs.readdirSync(basePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const runNumber = directories.length + 1;
    const runFolder = `Test_Run${String(runNumber).padStart(2, '0')}`;

    return path.join(basePath, runFolder);
  }
}
