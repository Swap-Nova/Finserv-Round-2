import { useEffect, useState } from "react";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import './Search.css';

function Search() {
    const [nameList, setNameList] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);

    useEffect(() => {
    axios.get('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
        .then((response) => { setNameList(response.data.employees) })
      // .then((response)=>console.log(response))
    }, []);

    const handleSkillChange = (event) => {
            const { value, checked } = event.target;
            setSelectedSkills(prevSkills => {
            if (checked) {
                return [...prevSkills, value];
            } else {
                return prevSkills.filter(skill => skill !== value);
            }
        });
    };

    const filterEmployeesBySkills = (employee) => {
        if (selectedSkills.length === 0) {
            return true;
        } else {
            return selectedSkills.every(skill => employee.skills.includes(skill));
        }
    };

    return (
        <div className="top-container">
            <h1>Employees List</h1>
            <input type="text" placeholder="Type to search" onChange={(e) => setSearch(e.target.value)} />

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                Skills
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Form>
                    <div className="mb-3">
                    {['SQL', 'JavaScript', 'Python', 'HTML', 'CSS', 'Photoshop', 'Manual Testing', 'Java'].map((skill) => (
                        <Form.Check
                        key={skill}
                        type="checkbox"
                        id={skill}
                        label={skill}
                        value={skill}
                        checked={selectedSkills.includes(skill)}
                        onChange={handleSkillChange}
                        />
                    ))}
                    </div>
                </Form>
                </Dropdown.Menu>
            </Dropdown>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        {/* eslint-disable-next-line array-callback-return */}
        {nameList.filter((item) => {
            if (search === "") {
            return item;
            }
            else if (item.name && item.name.toLowerCase().includes(search.toLowerCase())) {
            return item;
            }
            else if (item.designation && item.designation.toLowerCase().includes(search.toLowerCase())) {
            return item;
            }
            return null;
        })
            .filter(filterEmployeesBySkills)
            .map((item) => {
            return (
                <ul key={item.id}>
                <p>{item.name}</p>
                <p>{item.designation}</p>
                <p>{item.skills}</p>
                </ul>
            );
            })}

        </div>
    );
}

export default Search;