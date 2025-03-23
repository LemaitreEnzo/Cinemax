import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();
    const location = useLocation();

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
            const response = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                setMessage({ type: 'error', text: data.error || 'Erreur de connexion.' });
            } else {
                setMessage({ type: 'success', text: 'Connexion réussie !' });
                setUser(data.user); // Met à jour l'état global
                navigate("/");
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Impossible de se connecter au serveur.' });
            console.error(error);
        }
    };



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
                        {message.text && <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>{message.text}</p>}
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSignIn}>
                        <Components.Title>Connexion</Components.Title>
                        <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <Components.Input type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Components.Anchor href='#'>Mot de passe oublié ?</Components.Anchor>
                        <Components.Button type='submit'>Se connecter</Components.Button>
                        {message.text && <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>{message.text}</p>}
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

// function SignupForm() {
//     const [formData, setFormData] = useState({
//         lastname: '',
//         firstname: '',
//         email: '',
//         password: '',
//     });
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value }); 
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await fetch('http://localhost:5001/api/users', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 setErrorMessage(data.error || 'Une erreur est survenue lors de la création du compte.');
//             } else {
//                 setSuccessMessage('Compte créé avec succès !');
//                 setErrorMessage('');
//                 setFormData({ lastname: '', firstname: '', email: '', password: '' });
//             }
//         } catch (error) {
//             setErrorMessage('Erreur de connexion au serveur.');
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <h1>Création de compte</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Nom :
//                     <input
//                         type="text"
//                         name="lastname"
//                         value={formData.lastname}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Prénom :
//                     <input
//                         type="text"
//                         name="firstname"
//                         value={formData.firstname}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Email :
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Mot de passe :
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Créer un compte</button>
//             </form>
//             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//             {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//         </div>
//     );
// }

// function LoginForm() {
//     const [user, setUser] = useState();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await fetch('http://localhost:5001/api/users/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }), 
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 setErrorMessage(data.error || 'Une erreur est survenue lors de la connexion.');
//             } else {
//                 setSuccessMessage('Connexion réussie !');
//                 setErrorMessage('');
//                 setUser(data.user);

//                 console.log('Données utilisateur :', user);
//             }
//         } catch (error) {
//             setErrorMessage('Impossible de se connecter au serveur.');
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <h1>Connexion</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Email :
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Mot de passe :
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Se connecter</button>
//             </form>
//             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//             {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//         </div>
//     );
// }