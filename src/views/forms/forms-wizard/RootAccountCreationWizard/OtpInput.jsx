import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@mui/material';

const OtpInput = ({ length = 6, value, onChange }) => {
    const inputs = useRef([]);

    // Update local state when value prop changes
    useEffect(() => {
        if (!value) {
            // Clear all input fields when value is empty
            inputs.current.forEach(input => {
                if (input) input.value = '';
            });
        }
    }, [value]);

    const focusNext = (index) => {
        if (index < length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const focusPrevious = (index) => {
        if (index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleChange = (e, index) => {
        const newChar = e.target.value.slice(-1);
        if (!/^\d*$/.test(newChar) && newChar !== '') return;

        // Create new value string
        const newValue = value.split('');
        newValue[index] = newChar;
        const finalValue = newValue.join('');
        
        onChange(finalValue.trim());

        if (newChar !== '') {
            focusNext(index);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (!value[index]) {
                focusPrevious(index);
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, length).replace(/[^0-9]/g, '');
        const newValue = value.split('');
        
        for (let i = 0; i < pasteData.length; i++) {
            newValue[i] = pasteData[i];
        }
        
        const finalValue = newValue.join('');
        onChange(finalValue.trim());
        
        if (pasteData.length > 0) {
            inputs.current[Math.min(pasteData.length - 1, length - 1)].focus();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center'
            }}
        >
            {Array(length)
                .fill(0)
                .map((_, index) => (
                    <TextField
                        key={index}
                        inputRef={(el) => (inputs.current[index] = el)}
                        value={value[index] || ''}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        inputProps={{
                            maxLength: 1,
                            style: { 
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                padding: '12px 0',
                                width: '48px'
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderRadius: 1
                                }
                            }
                        }}
                    />
                ))}
        </Box>
    );
};

OtpInput.propTypes = {
    length: PropTypes.number,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default OtpInput;