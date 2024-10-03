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
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome } from "@expo/vector-icons"; // for icons

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { signIn, getCurrentUser } from "../../hook/auth";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [ loginMessage, setLoginMessage ] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let errors = {};

    if (!form.email) errors.email = "Email is required";
    if (!form.password) errors.password = "Password is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
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
        Alert.alert("Success", "User signed in successfully");
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
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
      <View
        className="w-full flex items-center h-full px-4 mt-5"
        style={{
          minHeight: Dimensions.get("window").height - 100,
        }}
      >
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
          title="Login"
          handlePress={submit}
          containerStyles="mt-5"
          isLoading={isSubmitting}
        />

        <View className="w-full items-center">
          {/* OR separator */}
          <View className="flex-row items-center my-5">
            {/* Left line */}
            <View className="flex-1 h-px bg-gray-300" />

            {/* OR text */}
            <Text className="mx-2 text-gray-500">OR</Text>

            {/* Right line */}
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Apple Button */}
          <TouchableOpacity className="w-full py-4 flex-row items-center justify-center bg-gray-300 border-gray-300 rounded-2xl">
            <FontAwesome name="apple" size={24} color="black" />
            <Text className="text-gray-700 text-lg font-semibold ml-2">
              Sign in with Apple
            </Text>
          </TouchableOpacity>
 
          {/* Google Button */}
          <TouchableOpacity className="w-full py-4 mt-2 flex-row items-center justify-center border bg-gray-300 border-gray-300 rounded-2xl">
            <FontAwesome name="google" size={24} color="gray" />
            <Text className="text-gray-700 text-lg font-semibold ml-2">
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
              onPress={() => setModalVisible(false)}
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
