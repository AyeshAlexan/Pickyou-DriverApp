import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView, MotiText } from 'moti';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  // PickU Brand Green
  const BRAND_GREEN = '#00A859';

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
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <MotiView 
            from={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 200 }}
            style={styles.header}
          >
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Feather name="arrow-left" size={26} color="#FFF" />
            </TouchableOpacity>
          </MotiView>

          <View style={styles.contentContainer}>
            <MotiView
              from={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 300 }}
              style={styles.iconCircle}
            >
              <MaterialCommunityIcons name="account-plus-outline" size={40} color={BRAND_GREEN} />
            </MotiView>

            <MotiText 
              from={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 400 }}
              style={styles.title}
            >
              Create Account
            </MotiText>
            
            <MotiText 
              from={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 500 }}
              style={styles.subtitle}
            >
              Start your journey as a driver
            </MotiText>

            <View style={styles.form}>
              <MotiView 
                from={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 600 }}
                style={styles.inputWrapper}
              >
                <Feather name="user" size={20} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#8E8E93"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </MotiView>

              <MotiView 
                from={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 700 }}
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
                transition={{ delay: 800 }}
                style={styles.inputWrapper}
              >
                <Feather name="phone" size={20} color="#8E8E93" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="#8E8E93"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </MotiView>

              <MotiView 
                from={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 900 }}
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
                transition={{ delay: 1000 }}
                style={styles.termsRow}
              >
                <TouchableOpacity 
                  onPress={() => setAgree(!agree)}
                  style={[styles.checkbox, agree && { backgroundColor: BRAND_GREEN, borderColor: BRAND_GREEN }]}
                >
                  {agree && <Feather name="check" size={14} color="#FFF" />}
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I agree to the <Text style={[styles.linkText, { color: BRAND_GREEN }]}>Terms of Service</Text> and <Text style={[styles.linkText, { color: BRAND_GREEN }]}>Privacy Policy</Text>
                </Text>
              </MotiView>

              <MotiView 
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1100, type: 'spring' }}
              >
                <TouchableOpacity style={[styles.continueBtn, { backgroundColor: BRAND_GREEN }]} onPress={() => navigation.navigate('OTP')}>
                  <Text style={styles.continueBtnText}>Continue</Text>
                </TouchableOpacity>
              </MotiView>

              <MotiView 
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1200 }}
                style={styles.footer}
              >
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={[styles.signInText, { color: BRAND_GREEN }]}>Sign In</Text>
                </TouchableOpacity>
              </MotiView>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBackground: { 
    flex: 1, 
    backgroundColor: '#0B1220' 
  },
  header: { 
    paddingHorizontal: 20, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    marginBottom: 10,
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
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 168, 89, 0.2)',
  },
  title: { fontSize: 32, fontWeight: '900', color: '#FFF', marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#94A3B8', marginBottom: 30 },
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
  termsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 35, paddingRight: 20 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'rgba(0, 168, 89, 0.5)',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: { color: '#94A3B8', fontSize: 13, lineHeight: 18 },
  linkText: { fontWeight: '700' },
  continueBtn: {
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
  continueBtnText: { color: '#FFF', fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: '#94A3B8', fontSize: 15 },
  signInText: { fontWeight: '800', fontSize: 15 },
});

export default RegisterScreen;