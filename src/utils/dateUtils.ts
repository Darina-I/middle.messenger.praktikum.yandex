export const getTime = (dateTime: string): string => {
    return new Date(dateTime).toTimeString().slice(0,5);
};

export const getDate = (dateTime: string, formatMonth: 'short' | 'long' = 'long' ): string => {
    return new Date(dateTime).toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: formatMonth 
    });
};

export const canShowDate = (messageDate: string, nextMessageDate: string): boolean => {
    console.log(messageDate);
    const prevDate = new Date(messageDate).toLocaleDateString('ru-RU');
    const nextDate = new Date(nextMessageDate).toLocaleDateString('ru-RU');
    console.log(prevDate, nextDate);

    return prevDate !== nextDate;
};



