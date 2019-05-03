import React from 'react';
import './App.css';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});


function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <div className="App">

      </div>
    </JssProvider>
  );
}

export default App;
