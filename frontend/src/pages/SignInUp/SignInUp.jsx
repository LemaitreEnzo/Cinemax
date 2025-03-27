import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import * as Components from './Components';
import './signinup.css'

const SignInUp = ({ setUser }) => {
    const [signIn, toggle] = useState(true);
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { updateUser } = useContext(UserContext);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    useEffect(() => {
        navigate(signIn ? '/login' : '/register');
    }, [signIn, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                setMessage({ type: 'error', text: data.error || 'Erreur lors de la création du compte.' });
            } else {
                setMessage({ type: 'success', text: 'Compte créé avec succès !' });
                setFormData({ lastname: '', firstname: '', email: '', password: '' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erreur de connexion au serveur.' });
            console.error(error);
        }
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5001/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                updateUser(data.user);
                window.location.href = "/"
            } else {
                setMessage({ type: 'error', text: 'Erreur de connexion.' });
                console.error("Erreur de connexion:", data.error);
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erreur serveur.' });
            console.error("Erreur serveur:", error);
        }
    };

    // Effect to navigate once user is logged in
    useEffect(() => {
        if (message.text === 'Compte créé avec succès !' || message.text === 'Connexion réussie !') {
            window.location.href = "/"
        }
    }, [message, navigate]);

    return (
        <div className='form'>
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSignUp}>
                        <Components.Title>Créer un compte</Components.Title>
                        <Components.Input type='text' name='lastname' placeholder='Nom' value={formData.lastname} onChange={handleChange} required />
                        <Components.Input type='text' name='firstname' placeholder='Prénom' value={formData.firstname} onChange={handleChange} required />
                        <Components.Input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
                        <Components.Input type='password' name='password' placeholder='Mot de passe' value={formData.password} onChange={handleChange} required />
                        <Components.Button type='submit'>S'inscrire</Components.Button>
                        {message.text && <p style={{ marginTop: "2rem", borderColor: message.type === 'error' ? '#f5c6cb' : '#c3e6cb', color: message.type === 'error' ? '#721c24' : '#155724', backgroundColor: message.type === 'error' ? '#f8d7da' : '#d4edda', borderRadius: ".25rem", padding: ".75rem 1.25rem" }}>{message.text}</p>}
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSignIn}>
                        <Components.Title>Connexion</Components.Title>
                        <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <Components.Input type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Components.Anchor href='#'>Mot de passe oublié ?</Components.Anchor>
                        <Components.Button type='submit'>Se connecter</Components.Button>
                        {message.text && <p style={{ marginTop: "2rem", borderColor: message.type === 'error' ? '#f5c6cb' : '#c3e6cb', color: message.type === 'error' ? '#721c24' : '#155724', backgroundColor: message.type === 'error' ? '#f5c6cb' : '#d4edda', borderRadius: ".25rem", padding: ".75rem 1.25rem" }}>{message.text}</p>}
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>
                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Bienvenue de retour !</Components.Title>
                            <Components.Paragraph>
                                Pour rester connecté, connectez-vous avec vos informations personnelles
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>Se connecter</Components.GhostButton>
                        </Components.LeftOverlayPanel>
                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Bonjour, ami !</Components.Title>
                            <Components.Paragraph>
                                Entrez vos détails personnels et commencez votre voyage avec nous
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>S'inscrire</Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>

                {message.text && (
                    <p style={{ color: message.type === 'error' ? 'red' : 'green', textAlign: 'center' }}>{message.text}</p>
                )}
            </Components.Container>
        </div>
    );
};

export default SignInUp;
