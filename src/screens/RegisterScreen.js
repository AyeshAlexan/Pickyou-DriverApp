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

  return (
    <View style={styles.mainBackground}>
      {/* Ensures notification bar matches the app theme */}
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
          {/* Header Section with Dynamic Padding for Status Bar */}
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
              <Feather name="arrow-left" size={28} color="#FFF" />
            </TouchableOpacity>
          </MotiView>

          <View style={styles.contentContainer}>
            {/* Top Icon */}
            <MotiView
              from={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 300 }}
              style={styles.iconCircle}
            >
              <MaterialCommunityIcons name="account-plus-outline" size={40} color="#FFE45C" />
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
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#FFE45C" />
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
                  style={[styles.checkbox, agree && styles.checkboxActive]}
                >
                  {agree && <Feather name="check" size={14} color="#000" />}
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>
              </MotiView>

              <MotiView 
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1100, type: 'spring' }}
              >
                <TouchableOpacity style={styles.continueBtn}>
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
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={styles.signInText}>Sign In</Text>
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
    // This creates the gap between status bar and button
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
    height: Platform.OS === 'android' ? 90 : 70, 
    justifyContent: 'center' 
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
    backgroundColor: 'rgba(255, 228, 92, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 92, 0.2)',
  },
  title: { fontSize: 32, fontWeight: '800', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#8E8E93', marginBottom: 30 },
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
  termsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, paddingRight: 20 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFE45C',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: { backgroundColor: '#FFE45C' },
  termsText: { color: '#8E8E93', fontSize: 13, lineHeight: 18 },
  linkText: { color: '#FFE45C', fontWeight: '600' },
  continueBtn: {
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
  continueBtnText: { color: '#000', fontSize: 18, fontWeight: '800' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: '#8E8E93', fontSize: 15 },
  signInText: { color: '#FFE45C', fontWeight: 'bold', fontSize: 15 },
});

export default RegisterScreen;