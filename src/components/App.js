import '../styles/App.scss';
import callToApi from '../services/api';
import { useEffect, useState } from 'react';
import ls from '../services/localStorage';

function App() {
  //State variables
  const [adalabersData, setAdalabersData] = useState([]);
  const [newAdalaberInfo, setNewAdalaberInfo] = useState({
    name: '',
    counselor: '',
    speciality: '',
    social_networks: [],
  });
  const [searchName, setSearchName] = useState(ls.get('searchName', ''));
  const [searchCounselor, setSearchCounselor] = useState(ls.get('searchCounselor', ''));

  //Effect
  useEffect(() => {
    callToApi().then((data) => {
      setAdalabersData(data.results);
    });
  }, []);

  const renderHtml = adalabersData
    .filter((eachItem) => eachItem.name.toLowerCase().includes(searchName.toLowerCase()))
    .filter((eachItem) => eachItem.counselor.includes(searchCounselor))
    .map((item) => {
      return (
        <tr className='adalabers__table-content' key={item.id}>
          <td className='adalabers__table-line'>{item.name}</td>
          <td className='adalabers__table-line'>{item.counselor}</td>
          <td className='adalabers__table-line'>{item.speciality}</td>
          <td>
            {item.social_networks.map((eachSocialMedia, index) => {
              if (eachSocialMedia.name === 'GitHub') {
                return (
                  <span key={index}>
                    <a className='adalaber__medias github' href={eachSocialMedia.url} rel='noreferrer' target='_blank'>
                      <i className='fa-brands fa-github-alt'></i>
                    </a>
                  </span>
                );
              } else if (eachSocialMedia.name === 'LinkedIn') {
                return (
                  <span key={index}>
                    <a className='adalaber__medias' href={eachSocialMedia.url} rel='noreferrer' target='_blank'>
                      <i className='fa-brands fa-linkedin-in'></i>
                    </a>
                  </span>
                );
              } else if (eachSocialMedia.name === 'Twitter') {
                return (
                  <span key={index}>
                    <a className='adalaber__medias twitter' href={eachSocialMedia.url} rel='noreferrer' target='_blank'>
                      <i className='fa-brands fa-twitter'></i>
                    </a>
                  </span>
                );
              } else {
                return null;
              }
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
    if (newAdalaberInfo.name && newAdalaberInfo.counselor && newAdalaberInfo.speciality) {
      setAdalabersData([...adalabersData, newAdalaberInfo]);
      setNewAdalaberInfo({
        name: '',
        counselor: '',
        speciality: '',
        social_networks: [],
      });
    }
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
            <label className='search-label' htmlFor='name'>
              Nombre:
            </label>
            <input
              className='search-input'
              type='text'
              name='name'
              id='name'
              placeholder='Ej: MariCarmen'
              onChange={handleSearchName}
              value={searchName}
            />
          </div>

          <div>
            <label className='search-label' htmlFor='counselor'>
              Tutora:
            </label>
            <select className='search-input' name='counselor' id='counselor' onChange={handleSearchCounselor}>
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

            <input className='add__new-button' type='submit' value='Añadir' onClick={handleClick} />
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
