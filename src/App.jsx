import { useContext, useState } from 'react';
import { DoctorContext } from './DoctorContext';
import './App.css';

function App() {
  const { doctors, loading } = useContext(DoctorContext);
  const [filters, setFilters] = useState({
    specialties: [],
    consultationMode: '',
    sort: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    // Filter top 3 matches based on the name key
    const matches = doctors
      .filter((doctor) => doctor.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 3);
    setSuggestions(matches);
  };

  const handleSearchSelect = (name) => {
    setSearchTerm(name);
    setFilters((prev) => ({
      ...prev,
      specialties: [],
      consultationMode: '',
      sort: '',
    }));

    // Filter doctors by the selected name
    setSuggestions([]);
  };

  const handleClearAll = () => {
    setFilters({
      specialties: [],
      consultationMode: '',
      sort: '',
    });
    setSearchTerm('');
    setSuggestions([]);
    const inputs = document.querySelectorAll('.filter-options input');
    inputs.forEach((input) => {
      input.checked = false;
    });
  };

  // Filter the doctors list based on the selected filters
  const filteredDoctors = doctors.filter((doctor) => {
    // Filter by specialties
    if (filters.specialties.length > 0) {
      const doctorSpecialties = doctor.specialities.map((s) => s.name);
      if (!filters.specialties.some((specialty) => doctorSpecialties.includes(specialty))) {
        return false;
      }
    }

    // Filter by consultation mode
    if (filters.consultationMode) {
      if (
        (filters.consultationMode === 'Video Consult' && !doctor.video_consult) ||
        (filters.consultationMode === 'In Clinic' && !doctor.in_clinic)
      ) {
        return false;
      }
    }

    // Filter by search term
    if (searchTerm && !doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Sort the filtered doctors list
  if (filters.sort === 'Fees') {
    filteredDoctors.sort((a, b) => parseInt(a.fees.replace('₹', '')) - parseInt(b.fees.replace('₹', '')));
  } else if (filters.sort === 'Experience') {
    filteredDoctors.sort((a, b) => {
      const experienceA = parseInt(a.experience.split(' ')[0]);
      const experienceB = parseInt(b.experience.split(' ')[0]);
      return experienceB - experienceA;
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by doctor name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSearchSelect(suggestion.name)}
                className="suggestion-item"
              >
                <img
                  src={suggestion.photo}
                  alt={`${suggestion.name}'s photo`}
                  className="suggestion-photo"
                />
                <div>
                  <p className="suggestion-name">{suggestion.name}</p>
                  <p className="suggestion-specialty">
                    {suggestion.specialities.map((s) => s.name).join(', ')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="layout">
        {/* Filter Section */}
        <div className="filter-section">
          <h2 className="filter-header-speciality">Speciality</h2>
          <div className="filter-options">
            <label>
              General Physician
              <input
                type="checkbox"
                className="filter-specialty-General-Physician"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'General Physician']
                      : prev.specialties.filter((s) => s !== 'General Physician'),
                  }));
                }}
              />
            </label>
            <label>
              Dentist
              <input
                type="checkbox"
                className="filter-specialty-Dentist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Dentist']
                      : prev.specialties.filter((s) => s !== 'Dentist'),
                  }));
                }}
              />
            </label>
            <label>
              Dermatologist
              <input
                type="checkbox"
                className="filter-specialty-Dermatologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Dermatologist']
                      : prev.specialties.filter((s) => s !== 'Dermatologist'),
                  }));
                }}
              />
            </label>
            <label>
              Paediatrician
              <input
                type="checkbox"
                className="filter-specialty-Paediatrician"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Paediatrician']
                      : prev.specialties.filter((s) => s !== 'Paediatrician'),
                  }));
                }}
              />
            </label>
            <label>
              Gynaecologist
              <input
                type="checkbox"
                className="filter-specialty-Gynaecologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Gynaecologist']
                      : prev.specialties.filter((s) => s !== 'Gynaecologist'),
                  }));
                }}
              />
            </label>
            <label>
              ENT
              <input
                type="checkbox"
                className="filter-specialty-ENT"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'ENT']
                      : prev.specialties.filter((s) => s !== 'ENT'),
                  }));
                }}
              />
            </label>
            <label>
              Diabetologist
              <input
                type="checkbox"
                className="filter-specialty-Diabetologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Diabetologist']
                      : prev.specialties.filter((s) => s !== 'Diabetologist'),
                  }));
                }}
              />
            </label>
            <label>
              Cardiologist
              <input
                type="checkbox"
                className="filter-specialty-Cardiologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Cardiologist']
                      : prev.specialties.filter((s) => s !== 'Cardiologist'),
                  }));
                }}
              />
            </label>
            <label>
              Physiotherapist
              <input
                type="checkbox"
                className="filter-specialty-Physiotherapist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Physiotherapist']
                      : prev.specialties.filter((s) => s !== 'Physiotherapist'),
                  }));
                }}
              />
            </label>
            <label>
              Endocrinologist
              <input
                type="checkbox"
                className="filter-specialty-Endocrinologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Endocrinologist']
                      : prev.specialties.filter((s) => s !== 'Endocrinologist'),
                  }));
                }}
              />
            </label>
            <label>
              Orthopaedic
              <input
                type="checkbox"
                className="filter-specialty-Orthopaedic"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Orthopaedic']
                      : prev.specialties.filter((s) => s !== 'Orthopaedic'),
                  }));
                }}
              />
            </label>
            <label>
              Ophthalmologist
              <input
                type="checkbox"
                className="filter-specialty-Ophthalmologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Ophthalmologist']
                      : prev.specialties.filter((s) => s !== 'Ophthalmologist'),
                  }));
                }}
              />
            </label>
            <label>
              Gastroenterologist
              <input
                type="checkbox"
                className="filter-specialty-Gastroenterologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Gastroenterologist']
                      : prev.specialties.filter((s) => s !== 'Gastroenterologist'),
                  }));
                }}
              />
            </label>
            <label>
              Pulmonologist
              <input
                type="checkbox"
                className="filter-specialty-Pulmonologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Pulmonologist']
                      : prev.specialties.filter((s) => s !== 'Pulmonologist'),
                  }));
                }}
              />
            </label>
            <label>
              Psychiatrist
              <input
                type="checkbox"
                className="filter-specialty-Psychiatrist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Psychiatrist']
                      : prev.specialties.filter((s) => s !== 'Psychiatrist'),
                  }));
                }}
              />
            </label>
            <label>
              Urologist
              <input
                type="checkbox"
                className="filter-specialty-Urologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Urologist']
                      : prev.specialties.filter((s) => s !== 'Urologist'),
                  }));
                }}
              />
            </label>
            <label>
              Dietitian/Nutritionist
              <input
                type="checkbox"
                className="filter-specialty-Dietitian-Nutritionist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Dietitian/Nutritionist']
                      : prev.specialties.filter((s) => s !== 'Dietitian/Nutritionist'),
                  }));
                }}
              />
            </label>
            <label>
              Psychologist
              <input
                type="checkbox"
                className="filter-specialty-Psychologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Psychologist']
                      : prev.specialties.filter((s) => s !== 'Psychologist'),
                  }));
                }}
              />
            </label>
            <label>
              Sexologist
              <input
                type="checkbox"
                className="filter-specialty-Sexologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Sexologist']
                      : prev.specialties.filter((s) => s !== 'Sexologist'),
                  }));
                }}
              />
            </label>
            <label>
              Nephrologist
              <input
                type="checkbox"
                className="filter-specialty-Nephrologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Nephrologist']
                      : prev.specialties.filter((s) => s !== 'Nephrologist'),
                  }));
                }}
              />
            </label>
            <label>
              Neurologist
              <input
                type="checkbox"
                className="filter-specialty-Neurologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Neurologist']
                      : prev.specialties.filter((s) => s !== 'Neurologist'),
                  }));
                }}
              />
            </label>
            <label>
              Oncologist
              <input
                type="checkbox"
                className="filter-specialty-Oncologist"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Oncologist']
                      : prev.specialties.filter((s) => s !== 'Oncologist'),
                  }));
                }}
              />
            </label>
            <label>
              Ayurveda
              <input
                type="checkbox"
                className="filter-specialty-Ayurveda"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Ayurveda']
                      : prev.specialties.filter((s) => s !== 'Ayurveda'),
                  }));
                }}
              />
            </label>
            <label>
              Homeopath
              <input
                type="checkbox"
                className="filter-specialty-Homeopath"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFilters((prev) => ({
                    ...prev,
                    specialties: checked
                      ? [...prev.specialties, 'Homeopath']
                      : prev.specialties.filter((s) => s !== 'Homeopath'),
                  }));
                }}
              />
            </label>
          </div>

          <h2 className="filter-header-moc">Consultation Mode</h2>
          <div className="filter-options">
            <label>
              Video Consult
              <input
                type="radio"
                name="consultation-mode"
                className="filter-video-consult"
                onChange={() =>
                  setFilters((prev) => ({ ...prev, consultationMode: 'Video Consult' }))
                }
              />
            </label>
            <label>
              In Clinic
              <input
                type="radio"
                name="consultation-mode"
                className="filter-in-clinic"
                onChange={() =>
                  setFilters((prev) => ({ ...prev, consultationMode: 'In Clinic' }))
                }
              />
            </label>
          </div>

          <h2 className="filter-header-sort">Sort</h2>
          <div className="filter-options">
            <label>
              Sort by Fees
              <input
                type="radio"
                name="sort"
                onChange={() => setFilters((prev) => ({ ...prev, sort: 'Fees' }))}
              />
            </label>
            <label>
              Sort by Experience
              <input
                type="radio"
                name="sort"
                onChange={() => setFilters((prev) => ({ ...prev, sort: 'Experience' }))}
              />
            </label>
          </div>

          {/* Clear All Button */}
          <button className="clear-all-button" onClick={handleClearAll}>
            Clear All
          </button>
        </div>

        {/* Doctor List Section */}
        <div className="doctor-list-section">
          <h1>Doctor Listing</h1>
          <ul>
            {filteredDoctors.map((doctor) => (
              <li key={doctor.id} className="doctor-card">
                <img src={doctor.photo} alt={`${doctor.name}'s photo`} className="doctor-photo" />
                <h2 className="doctor-name">{doctor.name}</h2>
                <p className="doctor-specialty"><strong>Specialities:</strong> {doctor.specialities.map((s) => s.name).join(', ')}</p>
                <p className="doctor-experience"><strong>Experience:</strong> {doctor.experience}</p>
                <p className="doctor-fee"><strong>Fees:</strong> {doctor.fees}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
