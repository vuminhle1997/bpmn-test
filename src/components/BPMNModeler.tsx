import React, { useEffect, useState } from 'react';
import Bpmn from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

// this loads a sample xml bpmn model from the assets
import sample from '../assets/sample.bpmn';

export default function BPMNModeler() {
  const [modelXML, setModelXML] = useState<string>();
  const [modeler, setModeler] = useState<Bpmn>();

  const loadXMLFromStorage = async () => {
    const res = await fetch(sample);
    const xmlString = await res.text();
    setModelXML(xmlString);
  };

  useEffect(() => {
    // loads the model xml
    if (!modelXML) {
      loadXMLFromStorage();
    }
    // if component gets mounted and the modeler is not attached yet
    if (!modeler) {
      const viewer = new Bpmn({ container: '#modeler' });
      setModeler(viewer);
    }
    // example for saving xml
    if (modelXML) {
      modeler?.importXML(modelXML);
    }
  }, [modelXML, modeler]);

  useEffect(() => {
    if (modeler) console.log(modeler);
    modeler
      ?.saveXML({ format: true })
      .then((res) => console.log(res));
  }, [modeler]);

  return (
    <div
      id="modeler"
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
