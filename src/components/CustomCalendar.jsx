import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

const CustomCalendar = ({ onDateSelect, sessionDates = [] }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [displayDates, setDisplayDates] = useState([]);

    const monthYearDisplay = currentMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    const handlePrevMonth = () => {
        const prevMonth = new Date(currentMonth);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setCurrentMonth(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };

    useEffect(() => {
        const generateDateRange = () => {
            if (sessionDates && sessionDates.length > 0) {
                const formattedSessionDates = sessionDates.map(sessionDate => {
                    const date = new Date(sessionDate);
                    return {
                        date: date,
                        day: date.getDate().toString().padStart(2, '0'),
                        weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    };
                });

                const currentMonthDates = formattedSessionDates.filter(date =>
                    date.month === currentMonth.getMonth() &&
                    date.year === currentMonth.getFullYear()
                );

                if (currentMonthDates.length > 0) {
                    setDisplayDates(currentMonthDates);
                    if (!selectedDate) {
                        handleDateSelect(currentMonthDates[0].date);
                    }
                } else {
                    setDisplayDates([]);
                }
                return;
            }

            const today = new Date();
            const dates = [];
            for (let i = -3; i <= 7; i++) {
                const date = new Date(currentMonth);
                date.setDate(today.getDate() + i);

                if (date.getMonth() === currentMonth.getMonth() &&
                    date.getFullYear() === currentMonth.getFullYear()) {
                    dates.push({
                        date: date,
                        day: date.getDate().toString().padStart(2, '0'),
                        weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    });
                }
            }
            setDisplayDates(dates);

            const todayInCurrentMonth = dates.find(date =>
                date.day === today.getDate().toString().padStart(2, '0') &&
                date.month === today.getMonth() &&
                date.year === today.getFullYear()
            );

            if (todayInCurrentMonth && !selectedDate) {
                handleDateSelect(todayInCurrentMonth.date);
            }
        };

        generateDateRange();
    }, [currentMonth, sessionDates]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    const isSameDay = (date1, date2) => {
        if (!date1 || !date2) return false;
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <IconButton size="small" onClick={handlePrevMonth}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {monthYearDisplay}
                </Typography>
                <IconButton size="small" onClick={handleNextMonth}>
                    <ArrowForward />
                </IconButton>
            </Box>

            <Box display="flex" gap={1} sx={{ overflowX: 'auto', pb: 1 }}>
                {displayDates.length > 0 ? (
                    displayDates.map(({ date, day, weekday }) => (
                        <Box
                            key={`${day}-${weekday}`}
                            onClick={() => handleDateSelect(date)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '80px',
                                padding: '12px 8px',
                                cursor: 'pointer',
                                border: '2px solid',
                                borderColor: isSameDay(selectedDate, date) ? '#0077B6' : 'transparent',
                                borderRadius: '24px',
                                backgroundColor: isSameDay(selectedDate, date) ? '#0077B6' : 'transparent',
                                color: isSameDay(selectedDate, date) ? 'white' : 'inherit',
                                '&:hover': {
                                    backgroundColor: isSameDay(selectedDate, date) ? '#0077B6' : '#f5f5f5',
                                },
                                transition: 'all 0.2s ease-in-out'
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '18px'
                                }}
                            >
                                {day}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '14px',
                                    mt: 0.5
                                }}
                            >
                                {weekday}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography sx={{ color: "#757575", width: "100%", textAlign: "center", py: 2 }}>
                        No available dates this month
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default CustomCalendar;