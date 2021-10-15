import Toast from 'react-native-tiny-toast';

export const showToast = (msg, type, duration = 4000, marginBottom = 60) => {
    const mapColor = new Map();
    mapColor.set('success', '#3BDD99');
    mapColor.set('error', '#FF2C14');
    mapColor.set('error2', '#FFF');
    mapColor.set('warning', '#FFC933');
    const textColor = new Map();
    textColor.set('success', '#FFF');
    textColor.set('error', '#FFF');
    textColor.set('error2', '#FF2C14');
    textColor.set('warning', '#FFF');
    Toast.show(msg, {
        position: Toast.position.center,
        containerStyle: {
            marginBottom,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 30,
            backgroundColor: mapColor.get(type),
            opacity: 0.6,
        },
        textStyle: {
            color: textColor.get(type),
        },
        duration,
        animationDuration: 500,
    });
};
