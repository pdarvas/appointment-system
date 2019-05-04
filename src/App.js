import React, {useState} from 'react';
import './App.css';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import {SchedulePicker} from './components/SchedulePicker/SchedulePicker';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

const initialSchedule = [
  {
    label: 'Segunda',
    selectedHours: []
  },
  {
    label: 'Terça',
    selectedHours: []
  },
  {
    label: 'Quarta',
    selectedHours: []
  },
  {
    label: 'Quinta',
    selectedHours: []
  },
  {
    label: 'Sexta',
    selectedHours: []
  },
];


function App() {
  const [schedule, setSchedule] = useState(initialSchedule);
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <div className="App">
        <SchedulePicker schedule={schedule} setSchedule={(newSchedule) => setSchedule(newSchedule)}/>
      </div>
    </JssProvider>
  );
}

export default App;
