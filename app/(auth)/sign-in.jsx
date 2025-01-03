import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

// import { useOAuth, useUser } from '@clerk/clerk-expo'

import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons"; // for icons

import { images, icons } from "../../constants";
import { CustomButton, FormField, CommonButton } from "../../components";
import { signIn, getCurrentUser, signOut, signWithGoogle } from "../../hook/auth";
import { useGlobalContext } from "../../context/GlobalProvider";


// export const useWarmUpBrowser = () => {
//   useEffect(() => {
//     void WebBrowser.warmUpAsync()
//     return () => {
//       void WebBrowser.coolDownAsync()
//     }
//   }, [])
// }


WebBrowser.maybeCompleteAuthSession()

const SignIn = () => {
  // useWarmUpBrowser()
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // const { user } = useUser();
  // const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '40387580751-9a0q1aabcfuqucqloafr1v5m5famkrtr.apps.googleusercontent.com',
    iosClientId: '40387580751-prk76d7fdf6gr8mljsnhsoa2q939suc8.apps.googleusercontent.com',
    androidClientId: '40387580751-1lv6o1d0gfbbrikaojk3mk6nhh5mvsh0.apps.googleusercontent.com',
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    handleToken();
  }, [response])

  const getUserProfile = async (token) => {
    if (!token) return;
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await response.json();

      // Call signWithGoogle with the user data
      const result = await signWithGoogle({
        email: userData.email,
        firstName: userData.given_name,
        lastName: userData.family_name
      });

      // Update global context
      setUser(result);
      setIsLogged(true);

      // Navigate to home
      router.replace("/home");
    }
    catch (error) {
      Alert.alert("Error", "Failed to sign in with Google");
      console.error(error);
    }
  }

  const handleToken = async () => {
    if (response?.type === "success") {
      setSubmitting(true);
      try {
        const { authentication } = response;
        const token = authentication?.accessToken;
        await getUserProfile(token);
      } catch (error) {
        Alert.alert("Error", "Authentication failed");
      } finally {
        setSubmitting(false);
      }
    }
  }


  // Function to handle Google Sign-In
  // const handleGoogleSignIn = async () => {
  //   try {
  //     const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
  //     });
  //     if (createdSessionId) {
  //       // Set the active session
  //       await setActive({ session: createdSessionId });
  //     } else {
  //       console.error("No session created, cannot proceed with sign-in.");
  //     }
  //   } catch (err) {
  //     console.error('OAuth error', err)
  //   }
  // }

  // const GoogleLogin = async () => {
  //   await GoogleSignin.hasPlayServices();
  //   const userInfo = await GoogleSignin.signIn();
  //   console.log('user', userInfo);
  //   return userInfo;
  // };


  const validateForm = () => {
    let newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (validateForm()) {
      setSubmitting(true);

      try {
        // Call the signIn function to authenticate the user
        await signIn(form.email, form.password);

        // Fetch the current user's details
        const result = await getCurrentUser();

        // Check if the user's account is activated
        if (result.is_activated === false) {
          // Set the login message and display the modal
          setLoginMessage(
            "Your account is not yet activated. Please check your email for activation instructions."
          );
          setModalVisible(true); // Show the modal
          return; // Prevent further execution if account is not activated
        }

        // If the account is activated, proceed to log in the user
        console.log(result);
        setUser(result); // Set the user context
        setIsLogged(true); // Mark the user as logged in

        // Redirect to the home page
        // Alert.alert("Success", "User signed in successfully");
        router.replace("/home");
      } catch (error) {
        // Handle any errors that occur during the sign-in process
        Alert.alert("Error", error.message);
      } finally {
        // Ensure that the submitting state is turned off
        setSubmitting(false);
      }
    }
  };


  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View
          className="w-full h-full px-4"
        >
          <View className="mt-4 flex-row">
            <TouchableOpacity onPress={() => router.replace("/home")}
              className="p-2 rounded-full bg-white">
              <Ionicons name="arrow-back" size={26} />
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <View>
              <Image
                source={images.perksIcon}
                resizeMode="contain"
                className="w-[300] h-[60]"
              />
            </View>

            <Text className="text-3xl font-psemibold text-black mt-5">
              Welcome back
            </Text>
            <Text className="text-base font-pregular text-gray-500 mt-2">
              Please enter your details to login.
            </Text>
          </View>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
            placeholder="perks@customer.com"
            errors={errors.email}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
            placeholder="• • • • • • • •"
            errors={errors.password}
          />

          <CustomButton
            title="Continue"
            handlePress={submit}
            containerStyles="mt-5"
            isLoading={isSubmitting}
          />

          <View className="w-full items-center">
            {/* OR separator */}
            <View className="flex-row items-center mx-16 my-5">
              {/* Left line */}
              <View className="flex-1 h-px bg-gray-300" />

              {/* OR text */}
              <Text className="mx-4 text-gray-300">OR</Text>

              {/* Right line */}
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Apple Button */}
            <TouchableOpacity className="w-full h-14 flex-row items-center justify-center border-[2px] border-gray-300 rounded-xl">
              <FontAwesome name="apple" size={20} color="black" />
              <Text className="text-gray-700 text-sm font-semibold ml-2">
                Sign in with Apple
              </Text>
            </TouchableOpacity>

            {/* Google Button */}
            <TouchableOpacity
              className="w-full h-14 mt-3 flex-row items-center justify-center border-[2px] border-gray-300 rounded-xl"
              onPress={() => promptAsync()}
            >
              <FontAwesome name="google" size={20} color="gray" />
              <Text className="text-gray-700 text-sm font-semibold ml-2">
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex justify-center flex-row gap-2 mt-2">
            <Text className="text-lg text-gray-500 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-primary">
              Register
            </Link>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-lg p-6 w-4/5 items-center">
              <Text className="text-lg font-psemibold text-center mb-6">
                {loginMessage}
              </Text>
              <TouchableOpacity
                className="bg-red-500 py-2 px-4 rounded-lg"
                onPress={() => { setModalVisible(false), signOut() }}
              >
                <Text className="text-white text-base text-center">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
