export function getFutureDate(daysAfter: number) {
    const today = new Date(); 
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + daysAfter); 

    const day = futureDate.getDate();
    const month = futureDate.getMonth(); // Month will now be in 0-11 format
    const year = futureDate.getFullYear();

    return { day, month, year };
}


// const { day, month, year } = getFutureDate(10);
// console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);
