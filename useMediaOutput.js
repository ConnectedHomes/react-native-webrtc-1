import {NativeModules} from 'react-native';

const {WebRTCModule} = NativeModules;

function useMediaOutput() {
    WebRTCModule.useMediaOutput();
}

export default useMediaOutput;

