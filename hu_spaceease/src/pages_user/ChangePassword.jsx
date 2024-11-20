import React, { useState } from 'react';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            setSuccessMessage("");
        } else {
            setErrorMessage("");
            HandleUpdatePassword();
        }
    };

    const HandleUpdatePassword = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword, confirmPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || "Password updated successfully!");
                setErrorMessage("");
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setErrorMessage(data.message || "Failed to update password.");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            setSuccessMessage("");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                {errorMessage && <div style={styles.error}>{errorMessage}</div>}
                {successMessage && <div style={styles.success}>{successMessage}</div>}
                <button type="submit" style={styles.button} onClick={HandleUpdatePassword}>Update Password</button>
            </form>
        </div>
    );
};

const styles = { 
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    error: {
        color: 'red',
        fontSize: '0.9em',
        marginBottom: '10px',
    },
    success: {
        color: 'green',
        fontSize: '0.9em',
        marginBottom: '10px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ChangePassword;
