import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const UserSettingsContext = createContext();

export const useUserSettings = () => {
    const context = useContext(UserSettingsContext);
    if (!context) {
        throw Error('useUserSettings must be used inside a UserSettingsProvider');
    }
    return context;
};

export const UserSettingsProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [volume, setVolume] = useState(50);
    const [brightness, setBrightness] = useState(80);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadUserSettings = async () => {
        if (!user) return;
        
        console.log('Loading user settings for:', user.username);
        setLoading(true);
        setError(null);
        
        try {
            const url = `${process.env.REACT_APP_API}/api/user/user/${user.username}`;
            console.log('Fetching from:', url);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            console.log('Received data:', data);

            if (!response.ok) {
                setError(data.error);
                console.error('Response not ok:', data.error);
                return;
            }

            console.log('Setting volume:', data.volume, 'brightness:', data.brightness);
            setVolume(data.volume || 50);
            setBrightness(data.brightness || 80);

        } catch (error) {
            setError('Failed to load settings');
            console.error('Error loading user settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveUserSettings = async (settings) => {
        if (!user) return;
        
        console.log('Saving settings:', settings, 'for user:', user.username);
        setLoading(true);
        setError(null);

        try {
            const url = `${process.env.REACT_APP_API}/api/user/user/${user.username}/settings`;
            console.log('Saving to:', url);
            
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settings)
            });

            const data = await response.json();
            console.log('Save response:', data);

            if (!response.ok) {
                setError(data.error);
                console.error('Save failed:', data.error);
                return false;
            }

            return true;

        } catch (error) {
            setError('Failed to save settings');
            console.error('Error saving user settings:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateVolume = async (newVolume) => {
        console.log('Updating volume to:', newVolume);
        setVolume(newVolume);
        const success = await saveUserSettings({ volume: newVolume });
        console.log('Volume update success:', success);
    };

    const updateBrightness = async (newBrightness) => {
        console.log('Updating brightness to:', newBrightness);
        setBrightness(newBrightness);
        const success = await saveUserSettings({ brightness: newBrightness });
        console.log('Brightness update success:', success);
    };

    useEffect(() => {
        loadUserSettings();
    }, [user]);

    const value = {
        volume,
        brightness,
        loading,
        error,
        updateVolume,
        updateBrightness,
        loadUserSettings
    };

    return (
        <UserSettingsContext.Provider value={value}>
            {children}
        </UserSettingsContext.Provider>
    );
};