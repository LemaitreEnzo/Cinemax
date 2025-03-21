const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Film" }] //Pour crée une clé étrangère
});

const User = mongoose.model('User', UserSchema);

module.exports = User;



// function AddMovieForm() {
//     const [movie, setMovie] = useState({
//         title: '',
//         genre: '',
//         description: '',
//         duration: '',
//         releaseYear: '',
//     });

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setMovie({ ...movie, [name]: name === 'duration' || name === 'releaseYear' ? Number(value) : value });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/api/films', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(movie),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.error('Détails de l\'erreur :', errorData);
//                 throw new Error(errorData.error || 'Une erreur est survenue');
//             }

//             const data = await response.json();
//             console.log('Film ajouté avec succès :', data);
//             setMovie({
//                 title: '',
//                 genre: '',
//                 description: '',
//                 duration: '',
//                 releaseYear: '',
//             });
//         } catch (error) {
//             console.error('Erreur lors de l\'ajout du film :', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Titre :
//                 <input
//                     type="text"
//                     name="title"
//                     value={movie.title}
//                     onChange={handleChange}
//                     required
//                 />
//             </label>
//             <br />
//             <label>
//                 Genre :
//                 <input
//                     type="text"
//                     name="genre"
//                     value={movie.genre}
//                     onChange={handleChange}
//                     required
//                 />
//             </label>
//             <br />
//             <label>
//                 Description :
//                 <textarea
//                     name="description"
//                     value={movie.description}
//                     onChange={handleChange}
//                     required
//                 />
//             </label>
//             <br />
//             <label>
//                 Durée (en minutes) :
//                 <input
//                     type="number"
//                     name="duration"
//                     value={movie.duration}
//                     onChange={handleChange}
//                     required
//                 />
//             </label>
//             <br />
//             <label>
//                 Année de sortie :
//                 <input
//                     type="number"
//                     name="releaseYear"
//                     value={movie.releaseYear}
//                     onChange={handleChange}
//                     required
//                 />
//             </label>
//             <br />
//             <button type="submit">Ajouter le film</button>
//         </form>
//     );
// }