import { test } from '@playwright/test';

export class RandomWeightGenerator {
    private static waitNumbers: number[] = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];

    public static getRandomWeight(): number {
        const randomIndex = Math.floor(Math.random() * this.waitNumbers.length);
        return this.waitNumbers[randomIndex];
    }
}