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
    const initialDate = addDays(today, 5); // Set session14 date as 5 days from today

    const updatedSessionDates: Record<string, { session_name: string; day: string; month: string; year: string; }> = {};

    let currentDate = initialDate;

    Object.entries(sessionList).forEach(([sessionKey, sessionName]) => {
        updatedSessionDates[sessionKey] = {
            session_name: sessionName,
            day: format(currentDate, 'dd'),
            month: format(currentDate, 'MM'),
            year: format(currentDate, 'yyyy'),
        };
        
        // Subtract 5 days for the next session
        currentDate = subDays(currentDate, 5);
    });

    return updatedSessionDates;
}

// To Run The code ---> npx ts-node utils/updateSessionDates.ts