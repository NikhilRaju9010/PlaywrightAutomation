import { format, subDays, addDays } from 'date-fns';

export const sessionList = {
    session14:"Graduation",
    session13:"Funding",
    session12:"Growth",
    session11:"Co-Founders & Team",
    session10:"Investor Progress Review",
    session09:"Product Development",
    session08:"Go-to-Market & Scale",
    session07:"Legal & Equity",
    session06:"Mentor Idea Review",
    session05:"Pitch Mastery",
    session04:"Revenue & Business Models",
    session03:"Customer Development",
    session02:"Vision & Mission",
    session01:"Accelerator Kickoff"
};


export function generateSessionDates(sessionList: Record<string, string>) {
    const today = new Date();
    const initialDate = addDays(today, 5);
    const updatedSessionDates: Record<string, { session_name: string; day: string; month: number; year: string; }> = {};

    let currentDate = initialDate;

    Object.entries(sessionList).forEach(([sessionKey, sessionName]) => {
        updatedSessionDates[sessionKey] = {
            session_name: sessionName,
            day: format(currentDate, 'd'), 
            month: currentDate.getMonth(), 
            year: format(currentDate, 'yyyy'),
        };

        currentDate = subDays(currentDate, 5);
    });

    return updatedSessionDates;
}

export function getMonthName(monthIndex: number): string {
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    
    return months[monthIndex] || "Invalid month"; 
}

// To Run The code ---> npx ts-node utils/updateSessionDates.ts