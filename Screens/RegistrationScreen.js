import { StyleSheet,Keyboard, Dimensions, Text, View,TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Image, TextInput, ImageBackground } from 'react-native';
import { useState, useEffect } from "react"


const RegistrationScreen =({navigation})=>{
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [isFocusInput, setIsFocusInput]=useState('')
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowKeyboard, setIsShowKeyboard]=useState(false);

    useEffect(() => {
        const onChange = () => {
          const width = Dimensions.get("window").width;
          setWindowWidth(width);
          const height = Dimensions.get("window").height;
          setWindowHeight(height);
        };
        const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    
        return () => dimensionsHandler.remove();
      }, []);
    const focusInput = (input)=>{
        setIsFocusInput(input),
        setIsShowKeyboard(true)
        
      }
      
      const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
      };
      const handleKeyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        
        
      };
      const handleSubmit=()=>{
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        // dispatch(authSignUpUser())
        // setFormState(initialState)
        setLogin("")
          setEmail("");
          setPassword("");
      
      }
      


    return(

    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
    
    <View style={styles.container}>
    
    <ImageBackground
    source={require("../assets/images/PhotoBG.jpeg")} 
    style={styles.image}>
    
      <View style={styles.wrapper}>
     
    <KeyboardAvoidingView
    behavior={Platform.OS == "android" ? "padding" : "height"}
    
    >
    
    <View style={{...styles.formRegistration}}>
    <View style={styles.addPhoto}>
    
      <TouchableOpacity style={styles.btnAddPhoto} activeOpacity={0.8}>
    <Image
    source={require("../assets/images/add.png")}
    resizeMode="contain"
    />
    </TouchableOpacity>
    </View>
      <Text style={styles.title}>Реєстрація</Text>
      <View style={{...styles.inputContainer}}>
        <TextInput 
        style={[styles.input,
        isFocusInput==='login' && styles.inputActive,]} 
        onFocus={()=>{
          focusInput('login') }}
        placeholder="Логін"
        value={login}
        // onChangeText={(value)=>{setFormState((prevState)=>({...prevState, login: value}))}}
        onChangeText={setLogin}
        onSubmitEditing={handleKeyboardHide}
        />
      </View>
    
      <View style={styles.inputContainer}>
      <TextInput style={[styles.input,
      isFocusInput==='email' && styles.inputActive,]} 
      onFocus={()=>{
        focusInput('email')}}
      placeholder="Адреса електронної пошти"
      value={email}
      // onChangeText={(value)=>{setFormState((prevState)=>({...prevState, email: value}))}}
      onChangeText={setEmail}
      onSubmitEditing={handleKeyboardHide}
      />
      </View>
      <View style={{...styles.inputWrapper,  marginBottom: isShowKeyboard ? 90 : 43,}}>
    
      <TextInput style={[styles.input,
      isFocusInput==='password' && styles.inputActive,]} 
      onFocus={()=>{
        focusInput('password')
      }}
      secureTextEntry={!isShowPassword}
      placeholder="Пароль"
      value={password}
      // onChangeText={(value)=>{setFormState((prevState)=>({...prevState, password: value}))}}
      onChangeText={setPassword}
      onSubmitEditing={handleKeyboardHide}
      />
       <TouchableOpacity 
      activeOpacity={0.8}
      onPress={()=>{toggleShowPassword()}}>
        <Text style={styles.titleShowPasswordBtn}>{!isShowPassword? "Показати" : "Сховати"}</Text>
      </TouchableOpacity>
      </View>
     
    
    
    </View>
    </KeyboardAvoidingView>
    <TouchableOpacity 
    style={styles.btn} 
      activeOpacity={0.8} 
      onPress={handleSubmit}>
    <Text style={styles.btnTitle}>Зареєстуватися</Text>
    
      </TouchableOpacity>
    
      <TouchableOpacity
      activeOpacity={0.8}
       >
        <Text  style={styles.textLogin}>Вже є акаунт? Увійти</Text>
        </TouchableOpacity>
    
    
    
      </View>
    
    </ImageBackground>
    
    </View>
    
    </TouchableWithoutFeedback>
      )
    }
    const styles= StyleSheet.create({
      container: {
    flex: 1,
      },
      image:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        
      },
      wrapper:{
        justifyContent: 'flex-end',
        backgroundColor: "#FFFFFF",
        paddingBottom:78,
        paddingHorizontal: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      },
      addPhoto: {
        position: "absolute",
        top: -60,
        alignSelf: "center",
        width: 120,
        height: 120,
        backgroundColor: "#f6f6f6",
        borderRadius: 16,
      },
      btnAddPhoto:{
        position: "absolute",
        bottom: 14,
        right: -12.5,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        width: 25,
        height: 25,
        backgroundColor: "transparent",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#FF6C00",
      },
          
      formRegistration:{
        
      
        paddingTop: 92,
        
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    
      },
      inputContainer:{
        marginBottom:16,
      },
      input:{
        
        borderWidth: 1,
        borderColor: '#E8E8E8',
        height: 50,
        
        borderStyle: 'solid',
       
        borderRadius: 8,
        padding: 16,
        color: '#BDBDBD',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        lineHeight: 19,
       
        
        
    },
      inputActive: {
        borderWidth: 1,
        borderColor: "#FF6C00",
        borderRadius: 8,
        borderStyle: "solid",
        backgroundColor: "#FFFFFF",
        padding: 16,
        maxHeight: 50,
        
        color: "#212121",
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        
        lineHeight: 19,
      },
      inputWrapper:{
        position: 'relative',
      
        
      },
      title: {
        
        marginHorizontal: 'auto',
        fontFamily:'Roboto-Medium',
        fontSize: 30,
    //    fontWeight: 500,
        lineHeight: 35,
        color: '#212121',
        textAlign: 'center',
        marginBottom: 33,
      },
      btn:{
        height: 51,
        backgroundColor:'#FF6C00',
    
        borderRadius: 100,
        alignItems: 'center',
        
        paddingTop:16,
        paddingBottom: 16,
        marginBottom: 16,
       
     
    
      },
      btnTitle:{
        color: '#FFFFFF',
        fontFamily: 'Roboto-Regular',
        // fontWeight: 400,
        lineHeight: 19,
        
       
    
      },
      textLogin:{
        color: '#1B4371',
        fontFamily: 'Roboto-Regular',
        // fontWeight: 400,
        lineHeight: 19,
        textAlign: 'center',
      },
      btnAddPhoto:{
        position: "absolute",
        bottom: 14,
        right: -12.5,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        width: 25,
        height: 25,
        backgroundColor: "transparent",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#FF6C00",
      },
      titleShowPasswordBtn:{
        color: '#1B4371',
        fontFamily: 'Roboto-Regular',
        // fontWeight: 400,
        lineHeight: 19,
        fontSize: 16,
        position:'absolute',
        right:16,
        bottom: 16,
      },
      
    })
    

export default RegistrationScreen;