import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';

const Logo = props => {
  const [path, setPath] = useState('');
  const [styleObj, setStyleObj] = useState({});

  useEffect(() => {
    if (props.airline == 'IndiGo') {
      setPath(require('../assets/IndiGo.png'));
      setStyleObj({height: 40, width: 60, marginRight: 10});
    } else if (props.airline == 'Air India') {
      setPath(require('../assets/AirIndia.png'));
      setStyleObj({height: 30, width: 80, marginRight: 10});
    } else if (props.airline == 'SpiceJet') {
      setPath(require('../assets/SpiceJet.png'));
      setStyleObj({height: 40, width: 75, marginRight: 10});
    } else if (props.airline == 'Vistara') {
      setPath(require('../assets/Vistara.png'));
      setStyleObj({height: 40, width: 50, marginRight: 10});
    } else if (props.airline == 'GoAir') {
      setPath(require('../assets/GoAir.png'));
      setStyleObj({height: 40, width: 70, marginRight: 10});
    } else if (props.airline == 'AirAsia') {
      setPath(require('../assets/AirAsia.png'));
      setStyleObj({height: 25, width: 70, marginRight: 10});
    }
  }, []);

  return path !== '' ? <Image style={styleObj} source={path} /> : null;
};

export default Logo;
