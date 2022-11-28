import '../styles/App.scss';
import data from '../data/data.json';
import { useState } from 'react';
import ls from '../services/localStorage';

function App() {
  //State variables
  const [adalabersData, setAdalabersData] = useState(data);
  const [newAdalaberInfo, setNewAdalaberInfo] = useState({
    name: '',
    counselor: '',
    speciality: '',
  });
  const [searchName, setSearchName] = useState(ls.get('searchName', ''));
  const [searchCounselor, setSearchCounselor] = useState(ls.get('searchCounselor', ''));

  const renderHtml = adalabersData
    .filter((eachItem) => eachItem.name.toLowerCase().includes(searchName.toLowerCase()))
    .filter((eachItem) => eachItem.counselor.includes(searchCounselor))
    .map((item, id) => {
      return (
        <tr className='adalabers__table-content' key={id}>
          <td className='adalabers__table-line'>{item.name}</td>
          <td className='adalabers__table-line'>{item.counselor}</td>
          <td className='adalabers__table-line'>{item.speciality}</td>
          <td>
            {item.social_networks.map((eachSocialMedia, index) => {
              return (
                <a key={index} href={eachSocialMedia} className='adalaber__medias'>
                  {eachSocialMedia.name}
                </a>
              );
            })}
          </td>
        </tr>
      );
    });

  const handleNewAdalaberInfo = (ev) => {
    setNewAdalaberInfo({ ...newAdalaberInfo, [ev.target.id]: ev.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setAdalabersData([...adalabersData, newAdalaberInfo]);
  };

  const handleSearchName = (ev) => {
    ls.set('searchName', ev.target.value);
    setSearchName(ev.target.value);
  };
  const handleSearchCounselor = (ev) => {
    ls.set('searchCounselor', ev.target.value);
    setSearchCounselor(ev.target.value);
  };

  return (
    <div>
      <header className='search'>
        <h1 className='search-title'>Adalabers</h1>
        <form className='search-form'>
          <div>
            <label htmlFor='name'>Nombre:</label>
            <input type='text' name='name' id='name' placeholder='Ej: MariCarmen' onChange={handleSearchName} value={searchName} />
          </div>

          <div>
            <label htmlFor='counselor'>Tutora:</label>
            <select name='counselor' id='counselor' onChange={handleSearchCounselor}>
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
                <th className='adalabers__table-sub'>Nombre</th>
                <th className='adalabers__table-sub'>Tutora</th>
                <th className='adalabers__table-sub'>Especialidad</th>
                <th className='adalabers__table-sub'>Redes</th>
              </tr>
            </thead>
            <tbody className='adalabers__table-content'>{renderHtml}</tbody>
          </table>
        </section>
        <section className='add__new'>
          <h2 className='add__new-sub'>Añadir una nueva Adalaber</h2>
          <form className='add__new-form'>
            <label className='add__new-label' htmlFor='name'>
              Nombre:
            </label>
            <input
              className='add__new-input'
              type='text'
              name='name'
              id='name'
              placeholder='Ej: Amparo'
              onChange={handleNewAdalaberInfo}
              value={newAdalaberInfo.name}
            />

            <label className='add__new-label' htmlFor='counselor'>
              Tutora:
            </label>
            <input
              className='add__new-input'
              type='text'
              name='counselor'
              id='counselor'
              placeholder='Ej: Yanelis'
              onChange={handleNewAdalaberInfo}
              value={newAdalaberInfo.counselor}
            />

            <label className='add__new-label' htmlFor='speciality'>
              Especialidad:
            </label>
            <input
              className='add__new-input'
              type='text'
              name='speciality'
              id='speciality'
              placeholder='Ej: React'
              onChange={handleNewAdalaberInfo}
              value={newAdalaberInfo.speciality}
            />

            <input className='add__new-button' type='submit' value='Añadir una nueva Adalaber' onClick={handleClick} />
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
