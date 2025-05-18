import React, {useState} from 'react';
import {Box, Typography, Paper, MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';

const generateTimeSlots = () => {
    const amSlots = [];
    const pmSlots = [];

    for (let hour = 1; hour <= 12; hour++) {
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;

        // AM Slots
        amSlots.push(`${formattedHour}:00 AM`);
        amSlots.push(`${formattedHour}:30 AM`);

        // PM Slots
        pmSlots.push(`${formattedHour}:00 PM`);
        pmSlots.push(`${formattedHour}:30 PM`);
    }

    return [...amSlots, ...pmSlots];
};

const AppointmentCalendar = ({selectedDate, setSelectedDate, startTime, setStartTime, endTime, setEndTime}) => {
    const timeSlots = generateTimeSlots();

    return (
        <Box sx={{mt: 3}}>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2
                }}
            >
                <Typography sx={{mb: 2, color: "#757575", fontSize: 15, fontWeight: 500}}>
                    Choose appointment dates
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 2,
                            '& .MuiDayCalendar-weekDayLabel': {
                                color: '#757575'
                            }
                        }}
                    />
                </LocalizationProvider>
            </Paper>

            <Box sx={{mt: 3, display: 'flex', gap: 4}}>
                <Box flex={1}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            backgroundColor: '#F8F9FA',
                            borderRadius: 2,
                            minHeight: 100
                        }}
                    >
                        <Typography sx={{mb: 2, color: "#757575", fontSize: 15, fontWeight: 500}}>
                            Choose Starting Time
                        </Typography>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>Start Time</InputLabel>
                            <Select
                                value={startTime}
                                label="Start Time"
                                onChange={(e) => setStartTime(e.target.value)}
                                sx={{backgroundColor: 'white'}}
                            >
                                {timeSlots.map((slot) => (
                                    <MenuItem key={slot} value={slot}>
                                        {slot}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>
                </Box>

                <Box flex={1}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            backgroundColor: '#F8F9FA',
                            borderRadius: 2,
                            minHeight: 100
                        }}
                    >
                        <Typography sx={{mb: 2, color: "#757575", fontSize: 15, fontWeight: 500}}>
                            Choose Ending Time
                        </Typography>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>End Time</InputLabel>
                            <Select
                                value={endTime}
                                label="End Time"
                                onChange={(e) => setEndTime(e.target.value)}
                                sx={{backgroundColor: 'white'}}
                            >
                                {timeSlots.map((slot) => (
                                    <MenuItem key={slot} value={slot}>
                                        {slot}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default AppointmentCalendar;