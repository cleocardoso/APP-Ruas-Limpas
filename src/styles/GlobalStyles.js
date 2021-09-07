import { StyleSheet, Platform } from 'react-native';



export default StyleSheet.create({
    /*screenContainer: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },*/
    screenContainer: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center' 
    },
    screenContainer2: {
        flex: 1,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center' 
    },

    title: {
        fontSize: 30,
        top:-40,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        color:'#fff',
       
    },
 
    buttonText: {
        //color: Colors.buttonText,
        fontSize: 20,
        textAlign: 'center'
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 40 : 0
    },
    button: {
        backgroundColor:'#fff',
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
      },
});