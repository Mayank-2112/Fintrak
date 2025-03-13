import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { GoogleIcon } from '../sign-in/components/CustomIcons';


export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            console.log(resultsFromGoogle);
            const res = await fetch(`${import.meta.env.VITE_PORT}/server/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoURL: resultsFromGoogle.user.photoURL,
                }),
            });
            const data = await res.json()
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleClick}
            startIcon={<GoogleIcon />}
        >
            Sign in with Google
        </Button>
    )
}
