import * as React from 'react';
import { Switch } from 'react-native-paper';

const SwitchComponent = ({onToggle}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)
  };

  React.useEffect(()=>{
    onToggle(isSwitchOn)
  }, [isSwitchOn])

  return <Switch  color={'#5CC6BA'} value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default SwitchComponent;