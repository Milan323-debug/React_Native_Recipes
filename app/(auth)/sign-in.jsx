import { View, Text, Alert,  KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native'
import { useRouter } from 'expo-router'
import { useSignIn, useAuth } from '@clerk/clerk-expo'
import { useState } from 'react'
import { authStyles } from '../../assets/styles/auth.styles.js'
import { Image } from "expo-image"
import { COLORS } from '../../constants/colors.js'
import Ionicons from '@expo/vector-icons/Ionicons.js'

const SignInScreen = () => {
  const router = useRouter()
  

  const { signIn, setActive, isLoaded } = useSignIn();
  const { signOut } = useAuth();

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetShowPassword, setResetShowPassword] = useState(false);
  // Forgot Password Handler
  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      Alert.alert('Please enter your email');
      return;
    }
    if (!isLoaded) return;
    setForgotLoading(true);
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: forgotEmail,
      });
      setForgotModalVisible(false);
      setResetModalVisible(true);
    } catch (error) {
      Alert.alert('Error', error.errors?.[0]?.longMessage || 'Failed to send reset email.');
    } finally {
      setForgotLoading(false);
    }
  };

  // Handle password reset with code and new password
  const handleResetPassword = async () => {
    if (!resetCode || !resetPassword) {
      Alert.alert('Please enter the code and new password');
      return;
    }
    if (!isLoaded) return;
    setResetLoading(true);
    try {
      const res = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: resetCode,
        password: resetPassword,
      });
      if (res.status === 'complete') {
        // Sign the user out after password reset
        await signOut();
        Alert.alert('Success', 'Password has been reset. Please sign in with your new password.');
        setResetModalVisible(false);
        setResetCode('');
        setResetPassword('');
        setForgotEmail('');
      } else {
        Alert.alert('Error', 'Reset failed. Please check the code and try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.errors?.[0]?.longMessage || 'Failed to reset password.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleSignIn = async () => {
   if (!email || !password) {
      Alert.alert('Please enter your email and password');
      return;
    }

    if (!isLoaded) return;
        setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });
        if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId });
            router.replace('/(tabs)'); // Navigate to main tabs page after sign-in
        } else {
            Alert.alert('Sign in failed', 'Please check your credentials and try again.');
            console.error('Sign in failed:', signInAttempt, null, 2);
        }
    } catch (error) {
      Alert.alert("Error", error.errors?.[0]?.longMessage || "An unexpected error occurred. Please try again.");
        console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>

      {/* Forgot Password Modal */}
      <Modal
        visible={forgotModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setForgotModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <View style={[authStyles.formContainer, { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '85%' }]}> 
            <Text style={authStyles.title}>Forgot Password</Text>
            <Text style={authStyles.subtitle}>Enter your email to receive a reset code.</Text>
            <TextInput
              style={authStyles.textInput}
              placeholder="Enter Email"
              placeholderTextColor={COLORS.textLight}
              value={forgotEmail}
              onChangeText={setForgotEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TouchableOpacity
              style={[authStyles.authButton, forgotLoading && authStyles.buttonDisabled]}
              onPress={handleForgotPassword}
              disabled={forgotLoading}
              activeOpacity={0.7}
            >
              <Text style={authStyles.buttonText}>{forgotLoading ? 'Sending...' : 'Send Reset Code'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={authStyles.linkContainer} onPress={() => setForgotModalVisible(false)}>
              <Text style={authStyles.linkText}><Text style={authStyles.link}>Cancel</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        visible={resetModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setResetModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <View style={[authStyles.formContainer, { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '85%' }]}> 
            <Text style={authStyles.title}>Reset Password</Text>
            <Text style={authStyles.subtitle}>Enter the code sent to your email and your new password.</Text>
            <TextInput
              style={authStyles.textInput}
              placeholder="Enter Code"
              placeholderTextColor={COLORS.textLight}
              value={resetCode}
              onChangeText={setResetCode}
              autoCapitalize="none"
              keyboardType="number-pad"
            />
            <View style={{ height: 16 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[authStyles.textInput, { flex: 1 }]}
                placeholder="Enter New Password"
                placeholderTextColor={COLORS.textLight}
                value={resetPassword}
                onChangeText={setResetPassword}
                autoCapitalize="none"
                secureTextEntry={!resetShowPassword}
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setResetShowPassword(!resetShowPassword)}
              >
                <Ionicons
                  name={resetShowPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[authStyles.authButton, resetLoading && authStyles.buttonDisabled]}
              onPress={handleResetPassword}
              disabled={resetLoading}
              activeOpacity={0.7}
            >
              <Text style={authStyles.buttonText}>{resetLoading ? 'Resetting...' : 'Reset Password'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={authStyles.linkContainer} onPress={() => setResetModalVisible(false)}>
              <Text style={authStyles.linkText}><Text style={authStyles.link}>Cancel</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <KeyboardAvoidingView 
        style={authStyles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require('../../assets/images/login-bro.png')}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>
          <Text style={authStyles.title}>Welcome Back!</Text>
          {/* FORM CONTAINER */}
          <View style={authStyles.formContainer}>
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter Email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            {/* PASSWORD INPUT */ }
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter Password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>
            {/* Forgot Password Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => setForgotModalVisible(true)}
            >
              <Text style={authStyles.linkText}><Text style={authStyles.link}>Forgot Password?</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.7}
            >
              <Text style={authStyles.buttonText}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push('/(auth)/sign-up')}
            >
              <Text style={authStyles.linkText}>
                Don&apos;t have an account? <Text style={authStyles.link}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignInScreen