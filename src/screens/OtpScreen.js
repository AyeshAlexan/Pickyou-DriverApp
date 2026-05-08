import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StatusBar,
  Modal,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView, MotiText } from 'moti';

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const inputs = useRef([]);

  // PickU Brand Green
  const BRAND_GREEN = '#00A859';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1); 
    setOtp(newOtp);

    if (text.length !== 0 && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to your next screen here
    }, 2500);
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <View style={styles.mainBackground}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1220" translucent />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <MotiView 
          from={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backCircle}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
        </MotiView>

        <View style={styles.contentContainer}>
          <MotiText 
            from={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 100 }}
            style={styles.title}
          >
            Enter verification code
          </MotiText>
          
          <MotiText style={styles.subtitle}>
            We sent a 6-digit code to <Text style={[styles.phoneText, { color: BRAND_GREEN }]}>+94 7* *** **90</Text>
          </MotiText>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <MotiView 
                key={index}
                animate={{ 
                  borderColor: focusedIndex === index ? BRAND_GREEN : 'rgba(255,255,255,0.08)',
                  backgroundColor: focusedIndex === index ? 'rgba(0, 168, 89, 0.05)' : 'rgba(255,255,255,0.03)',
                  scale: focusedIndex === index ? 1.05 : 1
                }}
                style={styles.otpBox}
              >
                <TextInput
                  ref={(ref) => (inputs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  onFocus={() => setFocusedIndex(index)}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  value={digit}
                  selectionColor={BRAND_GREEN}
                  placeholder="-"
                  placeholderTextColor="rgba(255,255,255,0.15)"
                />
              </MotiView>
            ))}
          </View>

          <View style={styles.timerRow}>
             <MaterialCommunityIcons name="clock-outline" size={16} color="#64748B" style={{marginRight: 6}} />
             <Text style={styles.timerText}>
               {timer > 0 ? `Resend code in ${formatTime(timer)}` : 'Ready to resend'}
             </Text>
             {timer === 0 && (
               <TouchableOpacity onPress={() => {/* Handle Resend Logic */}}>
                 <Text style={[styles.resendAction, { color: BRAND_GREEN }]}> Resend Now</Text>
               </TouchableOpacity>
             )}
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[
                styles.verifyBtn, 
                { backgroundColor: BRAND_GREEN },
                !isOtpComplete && styles.disabledBtn
              ]} 
              onPress={handleVerify}
              disabled={!isOtpComplete}
            >
              <Text style={styles.verifyBtnText}>Verify Account</Text>
            </TouchableOpacity>
            
            {isOtpComplete && (
              <MotiView 
                from={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                style={[styles.btnGlow, { backgroundColor: BRAND_GREEN }]}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      <Modal transparent visible={isLoading} animationType="fade">
        <View style={styles.loadingOverlay}>
          <MotiView
            from={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 100, opacity: 1 }}
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
  mainBackground: { flex: 1, backgroundColor: '#0B1220' },
  header: { 
    paddingHorizontal: 20, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 60,
    marginBottom: 30
  },
  backCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  contentContainer: { flex: 1, paddingHorizontal: 25 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', marginBottom: 12, letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#94A3B8', marginBottom: 40, lineHeight: 22 },
  phoneText: { fontWeight: '700' },
  otpContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 35 
  },
  otpBox: {
    width: 48,
    height: 62,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: { fontSize: 24, fontWeight: '900', color: '#FFF', textAlign: 'center', width: '100%' },
  timerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  timerText: { color: '#64748B', fontSize: 14, fontWeight: '500' },
  resendAction: { fontWeight: '800' },
  buttonWrapper: { marginTop: 'auto', marginBottom: 50, position: 'relative' },
  verifyBtn: {
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 8,
    shadowColor: '#00A859',
    shadowOpacity: 0.35,
    shadowRadius: 15,
  },
  btnGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 18,
    blurRadius: 20,
    zIndex: 1,
  },
  disabledBtn: { backgroundColor: '#1E293B', opacity: 0.4 },
  verifyBtnText: { color: '#FFF', fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
  loadingOverlay: { 
    flex: 1, 
    backgroundColor: '#0B1220', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loadingText: { 
    color: '#FFF', 
    marginTop: 20, 
    fontSize: 18, 
    fontWeight: '700',
    letterSpacing: 1
  },
});

export default OTPScreen;