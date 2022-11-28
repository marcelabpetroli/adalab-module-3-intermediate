import '../styles/App.scss';
import data from '../data/data.json';
import { useState } from 'react';

function App() {
  //State variables
  const [adalabersData, setAdalabersData] = useState(data);

  const renderHtml = data.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.counselor}</td>
        <td>{item.speciality}</td>
      </tr>
    );
  });

  return (
    <div>
      <header className='search'>
        <h1>Adalabers</h1>
        <form className='search-form'>
          <div>
            <label htmlFor='name'>Nombre:</label>
            <input type='text' name='name' id='name' placeholder='Ej: MariCarmen' />
          </div>

          <div>
            <label htmlFor='counselor'>Tutora:</label>
            <select name='counselor' id='counselor'>
              <option value=''>Escoge una opción</option>
              <option value='Yanelis'>Yanelis</option>
              <option value='Dayana'>Dayana</option>
              <option value='Iván'>Iván</option>
            </select>
          </div>
        </form>
      </header>
      <main>
        <section className='adalabers'>
          <table className='adalabers__table'>
            <thead>
              <tr className='adalabers__table-title'>
                <th>Nombre</th>
                <th>Tutora</th>
                <th>Especialidad</th>
              </tr>
            </thead>
            <tbody className='adalabers__table-content'>{renderHtml}</tbody>
          </table>
        </section>
        <section className='add__new'>
          <h2>Añadir una Adalaber</h2>
          <form className='add__new-form'>
            <label htmlFor='name'>Nombre:</label>
            <input type='text' name='name' id='name' placeholder='Ej: Amparo' />

            <label htmlFor='counselor'>Tutora:</label>
            <input type='text' name='counselor' id='counselor' placeholder='Ej: Yanelis' />

            <label htmlFor='speciality'>Especialidad:</label>
            <input type='text' name='speciality' id='speciality' placeholder='Ej: React' />

            <input type='submit' value='Añadir una nueva Adalaber' />
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
