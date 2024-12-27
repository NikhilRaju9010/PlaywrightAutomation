// UserInfoGenerator.ts
export function generateFirstName(): string {
    return generateRandomName(4, 5);
  }
  
  export function generateLastName(): string {
    return generateRandomName(4, 5);
  }
  
  function generateRandomName(minLength: number, maxLength: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nameLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let name = characters.charAt(Math.floor(Math.random() * 26)); // First character uppercase
    for (let i = 1; i < nameLength; i++) {
        name += characters.charAt(Math.floor(Math.random() * 26) + 26); // Rest are lowercase
    }
    return name;
  }
  
  export function generateEmail(firstName: string, lastName: string): string {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  }
  
  export function generateRandomPassword(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }
  