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

  // Using the brand green code you identified
  const BRAND_GREEN = '#00A859';

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
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
          <MotiView 
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 200, type: 'timing' }}
            style={styles.header}
          >
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              activeOpacity={0.7}
              style={styles.backButton}
            >
              <Feather name="chevron-left" size={28} color="#FFF" />
            </TouchableOpacity>
          </MotiView>

          <View style={styles.contentContainer}>
            <MotiView
              from={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 300 }}
              style={styles.iconCircle}
            >
              <MaterialCommunityIcons name="car-connected" size={40} color={BRAND_GREEN} />
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
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={BRAND_GREEN} />
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
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.9}>
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
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
              </MotiView>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal transparent visible={isLoading} animationType="fade">
        <View style={styles.loadingOverlay}>
          <MotiView
            from={{ translateX: -150, opacity: 0 }}
            animate={{ translateX: 150, opacity: 1 }}
            transition={{ loop: true, duration: 1200, type: 'timing' }}
          >
            <MaterialCommunityIcons name="car-sports" size={80} color={BRAND_GREEN} />
          </MotiView>
          <MotiText 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ loop: true, duration: 1500, type: 'timing' }}
            style={styles.loadingText}
          >
            Verifying...
          </MotiText>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBackground: { 
    flex: 1, 
    backgroundColor: '#0B1220', 
  },
  header: { 
    paddingHorizontal: 20, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    marginBottom: 20,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  contentContainer: { 
    flex: 1, 
    paddingHorizontal: 30, 
    alignItems: 'center',
    paddingBottom: 40 
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 168, 89, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 168, 89, 0.2)',
  },
  title: { fontSize: 32, fontWeight: '900', color: '#FFF', marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#94A3B8', marginBottom: 40 },
  form: { width: '100%' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 18,
    paddingHorizontal: 15,
    height: 64,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: '#FFF', fontSize: 16, fontWeight: '500' },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotText: { color: '#00A859', fontWeight: '700' },
  loginBtn: {
    backgroundColor: '#00A859',
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00A859',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 8,
  },
  loginBtnText: { color: '#FFF', fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 35 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
  dividerText: { marginHorizontal: 15, color: '#64748B', fontSize: 14, fontWeight: '500' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 40 },
  socialBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#94A3B8', fontSize: 15 },
  signUpText: { color: '#00A859', fontWeight: '800', fontSize: 15 },
  loadingOverlay: { 
    flex: 1, 
    backgroundColor: '#0B1220',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  loadingText: { color: '#FFF', marginTop: 25, fontSize: 18, fontWeight: '700', letterSpacing: 1 },
});

export default LoginScreen;