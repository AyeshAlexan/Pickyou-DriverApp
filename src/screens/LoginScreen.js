import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { MotiView, MotiText } from 'moti';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Mimicking a server request
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    // Matching main background color to prevent the flash
    <View style={styles.mainBackground}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#0B1220" 
        translucent={true} 
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section with Status Bar offset */}
          <MotiView 
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 200, type: 'timing' }}
            style={styles.header}
          >
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              activeOpacity={0.7}
            >
              <Feather name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          </MotiView>

          <View style={styles.contentContainer}>
            <MotiView
              from={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 300 }}
              style={styles.iconCircle}
            >
              <MaterialCommunityIcons name="car-connected" size={40} color="#FFE45C" />
            </MotiView>

            <MotiText 
              from={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 400 }}
              style={styles.title}
            >
              Welcome Back
            </MotiText>
            
            <MotiText 
              from={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 500 }}
              style={styles.subtitle}
            >
              Sign in to start your shift
            </MotiText>

            <View style={styles.form}>
              <MotiView 
                from={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 600 }}
                style={styles.inputWrapper}
              >
                <Feather name="mail" size={20} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#8E8E93"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </MotiView>

              <MotiView 
                from={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 700 }}
                style={styles.inputWrapper}
              >
                <Feather name="lock" size={20} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#8E8E93"
                  value={password}
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#FFE45C" />
                </TouchableOpacity>
              </MotiView>

              <MotiView 
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 800 }}
                style={styles.forgotBtn}
              >
                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </MotiView>

              <MotiView 
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 900, type: 'spring' }}
              >
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                  <Text style={styles.loginBtnText}>Login</Text>
                </TouchableOpacity>
              </MotiView>

              <MotiView 
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1000 }}
                style={styles.dividerRow}
              >
                <View style={styles.line} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.line} />
              </MotiView>

              <View style={styles.socialRow}>
                <MotiView 
                  from={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1100, type: 'spring' }}
                >
                  <TouchableOpacity style={styles.socialBtn}>
                    <FontAwesome name="google" size={22} color="#FFF" />
                  </TouchableOpacity>
                </MotiView>
                
                <MotiView 
                  from={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1200, type: 'spring' }}
                >
                  <TouchableOpacity style={styles.socialBtn}>
                    <FontAwesome name="facebook" size={22} color="#FFF" />
                  </TouchableOpacity>
                </MotiView>
              </View>

              <MotiView 
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1300 }}
                style={styles.footer}
              >
                <Text style={styles.footerText}>Dont have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                  <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
              </MotiView>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Loading Modal - Ensuring same background color to kill the flash */}
      <Modal transparent visible={isLoading} animationType="fade">
        <View style={styles.loadingOverlay}>
          <MotiView
            from={{ translateX: -150, opacity: 0 }}
            animate={{ translateX: 150, opacity: 1 }}
            transition={{ loop: true, duration: 1200, type: 'timing' }}
          >
            <MaterialCommunityIcons name="car-sports" size={100} color="#FFE45C" />
          </MotiView>
          <MotiText 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ loop: true, duration: 1500, type: 'timing' }}
            style={styles.loadingText}
          >
            Connecting to server...
          </MotiText>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBackground: { 
    flex: 1, 
    backgroundColor: '#0B1220', // Identical to the loading overlay
  },
  header: { 
    paddingHorizontal: 15, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
    height: Platform.OS === 'android' ? 90 : 70, 
    justifyContent: 'center',
  },
  contentContainer: { 
    flex: 1, 
    paddingHorizontal: 30, 
    alignItems: 'center',
    paddingBottom: 20 
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 228, 92, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 92, 0.2)',
  },
  title: { fontSize: 32, fontWeight: '800', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#8E8E93', marginBottom: 40 },
  form: { width: '100%' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: '#FFF', fontSize: 16 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotText: { color: '#FFE45C', fontWeight: '600' },
  loginBtn: {
    backgroundColor: '#FFE45C',
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFE45C',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  loginBtnText: { color: '#000', fontSize: 18, fontWeight: '800' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 35 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  dividerText: { marginHorizontal: 15, color: '#8E8E93', fontSize: 14 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 40 },
  socialBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#8E8E93', fontSize: 15 },
  signUpText: { color: '#FFE45C', fontWeight: 'bold', fontSize: 15 },
  loadingOverlay: { 
    flex: 1, 
    backgroundColor: '#0B1220', // MATCHING BACKGROUND TO PREVENT FLASH
    justifyContent: 'center', 
    alignItems: 'center',
  },
  loadingText: { color: '#FFF', marginTop: 30, fontSize: 18, fontWeight: '600', letterSpacing: 1 },
});

export default LoginScreen;