import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/SignUp_or_Login/Login"
import Signup_Enterusername from './src/screens/SignUp_or_Login/Signup_Enterusername';
import Signup_Email from './src/screens/SignUp_or_Login/Signup_Email';
import ForgotPassword from "./src/screens/SignUp_or_Login/FogotPassword"
import Home from './src/screens/Post/Home';
import Otp from './src/screens/SignUp_or_Login/Otp';
import EnterPasswords from './src/screens/SignUp_or_Login/EnterPasswords';
import Allchats from './src/screens/Chats/Allchats';
import Search from './src/screens/Profile/Search';
import Notification from './src/screens/Notification';
import User from './src/screens/Profile/User';
import Setting from './src/screens/Settings/Setting';
import ChnagePassword from './src/screens/Settings/ChnagePassword';
import Editprofile from './src/screens/Settings/Edit_Profile/Editprofile';
import EditUserName from "./src/screens/Settings/Edit_Profile/EditUserName"
import EditDescription from "./src/screens/Settings/Edit_Profile/EditDescription"
import UploadProfile from './src/screens/Settings/Edit_Profile/UploadProfile';
import AddPost from './src/screens/Post/AddPost';
import OtherProfile from './src/screens/Profile/OtherProfile';
import Message from './src/screens/Chats/Message';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup_username" component={Signup_Enterusername} />
        <Stack.Screen name="Signup_Email" component={Signup_Email} />
        <Stack.Screen name="FogotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Enterotp" component={Otp} />
        <Stack.Screen name="EnterPasswords" component={EnterPasswords} />
        <Stack.Screen name="Allchats" component={Allchats} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="ChnagePassword" component={ChnagePassword} />
        <Stack.Screen name="Editprofile" component={Editprofile} />
        <Stack.Screen name="EditUserName" component={EditUserName} />
        <Stack.Screen name="EditDescription" component={EditDescription} />
        <Stack.Screen name="UploadProfile" component={UploadProfile} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="OtherProfile" component={OtherProfile} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Search" component={Search}
          options={{
            animation: "slide_from_bottom"
          }} />
        <Stack.Screen name="Notification" component={Notification}
          options={{
            animation: "slide_from_bottom"
          }} />
        <Stack.Screen name="User" component={User}
          options={{
            animation: "slide_from_bottom"
          }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
