import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function AlertComponent({ severity, message, onClose }) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (severity && message) {
      setShowAlert(true);
      const timeout = setTimeout(() => {
        setShowAlert(false);
        if (onClose) {
          onClose();
        }
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [severity, message, onClose]);

  return (
    <div>
      {showAlert && (
      <Stack sx={{ width: '25%', position: 'absolute', top: '10px', right: '10px' }} spacing={5}>    
        <Alert severity={severity} onClose={() => setShowAlert(false)}>
          <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
          {message}
        </Alert>
        </Stack>
      )}
    </div>
  );
}

export default AlertComponent;
