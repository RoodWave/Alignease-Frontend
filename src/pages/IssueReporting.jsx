import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Menu,
    MenuItem,
    CircularProgress,
    Alert
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import reportService from "../services/ReportService.js";

const tableHeaderStyle = { bgcolor: '#F3F3F3' };
const actionButtonStyle = {
    bgcolor: '#DB002B',
    color: '#fff',
    textTransform: 'none',
    '&:hover': { bgcolor: '#c41a18' },
    display: 'flex',
    alignItems: 'center'
};

const statusMap = {
    'resolve': 'RESOLVED',
    'manage': 'MANAGING',
    'cancel': 'CANCELLED'
};

const statusDisplayMap = {
    'RESOLVED': 'Resolved',
    'MANAGING': 'Managing',
    'CANCELLED': 'Cancelled',
    'OPEN': 'Open'
};

const IssueReporting = () => {
    const [reports, setReports] = useState([]);
    const [anchorEl, setAnchorEl] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const response = await reportService.getAllReports();

            if (response.status === "success") {
                setReports(response.reportList || []);
                setAnchorEl(Array(response.reportList?.length || 0).fill(null));
            } else {
                setError(response.message || "Failed to load reports");
            }
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch reports:", err);
            setError("Failed to load reports. Please try again later.");
            setLoading(false);
        }
    };

    const handleClick = (event, index) => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = event.currentTarget;
        setAnchorEl(newAnchorEl);
    };

    const handleClose = (index) => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = null;
        setAnchorEl(newAnchorEl);
    };

    const handleAction = async (action, report, index) => {
        try {
            const payload = {
                reportId: report.reportId,
                status: statusMap[action]
            };

            const response = await reportService.updateReportStatus(payload);

            if (response.status === "success") {
                const updatedReports = [...reports];
                updatedReports[index] = {
                    ...updatedReports[index],
                    reportStatus: payload.status
                };
                setReports(updatedReports);
            } else {
                setError(response.message || "Failed to update report status");
            }

            handleClose(index);
        } catch (err) {
            console.error("Failed to update report status:", err);
            setError("Failed to update report status. Please try again.");
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box mb={3}>
                <Alert severity="error">{error}</Alert>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchReports}
                    sx={{ mt: 2 }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    if (reports.length === 0) {
        return (
            <Box>
                <Typography variant="h5" fontWeight="600" mb={3}>
                    Issue Reporting
                </Typography>
                <Alert severity="info">No reports found</Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h5" fontWeight="600" mb={3}>
                Issue Reporting
            </Typography>
            <Box
                sx={{
                    bgcolor: '#F3F3F3',
                    p: 4,
                    borderRadius: '20px'
                }}
            >
                <TableContainer component={Paper} sx={{
                    maxHeight: 500,
                    border: 1,
                    borderColor: '#C6C6C6',
                    borderRadius: '10px'
                }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeaderStyle}>Name</TableCell>
                                <TableCell sx={tableHeaderStyle}>Email</TableCell>
                                <TableCell sx={tableHeaderStyle}>Contact</TableCell>
                                <TableCell sx={tableHeaderStyle}>Service</TableCell>
                                <TableCell sx={tableHeaderStyle}>Issue Title</TableCell>
                                <TableCell sx={tableHeaderStyle}>Status</TableCell>
                                <TableCell sx={tableHeaderStyle}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reports.map((report, index) => (
                                <TableRow key={report.reportId} sx={{ bgcolor: index % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                                    <TableCell>{report.reporterName}</TableCell>
                                    <TableCell>{report.reporterEmail}</TableCell>
                                    <TableCell>{report.reporterContact}</TableCell>
                                    <TableCell>{report.service}</TableCell>
                                    <TableCell>{report.issueTitle}</TableCell>
                                    <TableCell>{statusDisplayMap[report.reportStatus] || report.reportStatus}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={actionButtonStyle}
                                            aria-label={`Actions for ${report.reporterName}`}
                                            onClick={(event) => handleClick(event, index)}
                                            endIcon={<KeyboardArrowDownIcon />}
                                        >
                                            Action
                                        </Button>
                                        <Menu
                                            anchorEl={anchorEl[index]}
                                            open={Boolean(anchorEl[index])}
                                            onClose={() => handleClose(index)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <MenuItem
                                                onClick={() => handleAction('resolve', report, index)}
                                                disabled={report.reportStatus === 'RESOLVED'}
                                            >
                                                Resolve
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => handleAction('manage', report, index)}
                                                disabled={report.reportStatus === 'MANAGING'}
                                            >
                                                Manage
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => handleAction('cancel', report, index)}
                                                disabled={report.reportStatus === 'CANCELLED'}
                                            >
                                                Cancel
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default IssueReporting;