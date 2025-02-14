export function extractId(name: string): string | null {
    name = name.trim();
    const match = name.match(/\((\d+)\)/); // Find digits inside parentheses
    return match ? match[1] : null;
}
// Example
// const name = "Silicon Valley Fall 2024 (11160)";
// const id = extractId(name);

// console.log(`Extracted ID: ${id}`)